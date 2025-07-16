import { useReducer, useEffect } from 'react';
import { QuizQuestion } from '../utils/quizData';

export interface QuizState {
  currentQuestion: number;
  answers: Record<number, string>;
  isComplete: boolean;
  startTime: number;
  endTime: number | null;
  isPaused: boolean;
  pausedAt: number | null;
  totalPausedTime: number;
}

type QuizAction =
  | { type: 'START_QUIZ' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'ANSWER_QUESTION'; questionId: number; answer: string }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'PAUSE_QUIZ' }
  | { type: 'RESUME_QUIZ' }
  | { type: 'LOAD_STATE'; state: QuizState }
  | { type: 'RESET_QUIZ' };

const initialState: QuizState = {
  currentQuestion: 0,
  answers: {},
  isComplete: false,
  startTime: 0,
  endTime: null,
  isPaused: false,
  pausedAt: null,
  totalPausedTime: 0
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START_QUIZ':
      return {
        ...state,
        startTime: Date.now(),
        currentQuestion: 0
      };
    
    case 'NEXT_QUESTION': {
      const currentQuestion = state.currentQuestion;
      const nextQuestion = Math.min(currentQuestion + 1, 4);
      // Remove the answer for the current question
      const newAnswers = { ...state.answers };
      delete newAnswers[currentQuestion];
      return {
        ...state,
        currentQuestion: nextQuestion,
        answers: newAnswers,
      };
    }
    
    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentQuestion: Math.max(state.currentQuestion - 1, 0)
      };
    
    case 'ANSWER_QUESTION':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.answer
        }
      };
    
    case 'COMPLETE_QUIZ':
      return {
        ...state,
        isComplete: true,
        endTime: Date.now()
      };
    
    case 'PAUSE_QUIZ':
      return {
        ...state,
        isPaused: true,
        pausedAt: Date.now()
      };
    
    case 'RESUME_QUIZ':
      const additionalPausedTime = state.pausedAt ? Date.now() - state.pausedAt : 0;
      return {
        ...state,
        isPaused: false,
        pausedAt: null,
        totalPausedTime: state.totalPausedTime + additionalPausedTime
      };
    
    case 'LOAD_STATE':
      return action.state;
    
    case 'RESET_QUIZ':
      return initialState;
    
    default:
      return state;
  }
}

export function useQuizState(questions: QuizQuestion[]) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  
  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', state: parsedState });
      } catch (error) {
        console.error('Error loading saved quiz state:', error);
      }
    }
  }, []);
  
  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('quizState', JSON.stringify(state));
  }, [state]);
  
  const startQuiz = () => dispatch({ type: 'START_QUIZ' });
  const nextQuestion = () => dispatch({ type: 'NEXT_QUESTION' });
  const previousQuestion = () => dispatch({ type: 'PREVIOUS_QUESTION' });
  const answerQuestion = (questionId: number, answer: string) => 
    dispatch({ type: 'ANSWER_QUESTION', questionId, answer });
  const completeQuiz = () => dispatch({ type: 'COMPLETE_QUIZ' });
  const pauseQuiz = () => dispatch({ type: 'PAUSE_QUIZ' });
  const resumeQuiz = () => dispatch({ type: 'RESUME_QUIZ' });
  const resetQuiz = () => {
    localStorage.removeItem('quizState');
    dispatch({ type: 'RESET_QUIZ' });
  };
  
  const progress = ((state.currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = state.currentQuestion === questions.length - 1;
  const currentQuestionData = questions[state.currentQuestion];
  const canGoNext = state.answers[currentQuestionData?.id] !== undefined;
  
  return {
    state,
    startQuiz,
    nextQuestion,
    previousQuestion,
    answerQuestion,
    completeQuiz,
    pauseQuiz,
    resumeQuiz,
    resetQuiz,
    progress,
    isLastQuestion,
    currentQuestionData,
    canGoNext
  };
}