import { useState, useEffect } from "react";
import { QuizOnboarding } from "./components/QuizOnboarding";
import { QuizProgress } from "./components/QuizProgress";
import { QuizQuestion } from "./components/QuizQuestion";
import { QuizResults } from "./components/QuizResults";
import { useQuizState } from "./hooks/useQuizState";
import { useAnalytics } from "./hooks/useAnalytics";
import { spmMathQuestions } from "./utils/quizData";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

type QuizStage = "onboarding" | "quiz" | "results";

export default function App() {
  const [stage, setStage] = useState<QuizStage>("onboarding");
  const [questionStartTime, setQuestionStartTime] = useState(
    Date.now(),
  );

  const {
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
    canGoNext,
  } = useQuizState(spmMathQuestions);

  const {
    trackQuizStart,
    trackQuestionAnswer,
    trackQuizComplete,
    trackQuizPause,
    trackQuizResume,
    trackQuizAbandonment,
  } = useAnalytics();

  // Check for saved quiz state on mount
  useEffect(() => {
    const savedState = localStorage.getItem("quizState");
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        if (parsedState.startTime && !parsedState.isComplete) {
          setStage("quiz");
          toast.success(
            "Welcome back! Your progress has been restored.",
          );
        }
      } catch (error) {
        console.error("Error loading saved state:", error);
      }
    }
  }, []);

  // Track quiz abandonment on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (stage === "quiz" && !state.isComplete) {
        const timeSpent =
          Date.now() - state.startTime - state.totalPausedTime;
        trackQuizAbandonment(
          state.currentQuestion + 1,
          timeSpent,
        );
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () =>
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload,
      );
  }, [stage, state, trackQuizAbandonment]);

  const handleStart = () => {
    startQuiz();
    setStage("quiz");
    setQuestionStartTime(Date.now());
    trackQuizStart();
    toast.success("Quiz started! Good luck! 🍀");
  };

  const handleAnswerChange = (answer: string) => {
    if (currentQuestionData) {
      const timeSpent = Date.now() - questionStartTime;
      answerQuestion(currentQuestionData.id, answer);
      trackQuestionAnswer(
        currentQuestionData.id,
        answer,
        timeSpent,
      );
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      completeQuiz();
      setStage("results");

      // Calculate score and total time for analytics
      const score = spmMathQuestions.reduce((acc, question) => {
        return (
          acc +
          (state.answers[question.id] === question.correctAnswer
            ? 1
            : 0)
        );
      }, 0);
      const totalTime =
        Date.now() - state.startTime - state.totalPausedTime;

      trackQuizComplete(totalTime, score);
      toast.success("Quiz completed! 🎉");
    } else {
      nextQuestion();
      setQuestionStartTime(Date.now());

      // Show motivational messages at milestones
      const newProgress =
        ((state.currentQuestion + 2) /
          spmMathQuestions.length) *
        100;
      if (newProgress === 25)
        toast.success("Great start! 25% complete! 💪");
      if (newProgress === 50)
        toast.success("Halfway there! Keep going! 🔥");
      if (newProgress === 75)
        toast.success("Almost done! You're doing great! ⭐");
    }
  };

  const handlePrevious = () => {
    previousQuestion();
    setQuestionStartTime(Date.now());
  };

  const handlePause = () => {
    pauseQuiz();
    trackQuizPause(state.currentQuestion + 1);
    toast.info("Quiz paused. Take your time! ⏸️");
  };

  const handleResume = () => {
    resumeQuiz();
    setQuestionStartTime(Date.now());
    trackQuizResume(state.currentQuestion + 1);
    toast.success("Quiz resumed! Let's continue! ▶️");
  };

  const handleRestart = () => {
    resetQuiz();
    setStage("onboarding");
    toast.success("Ready for another round? 🔄");
  };

  // Handle quiz completion
  useEffect(() => {
    if (state.isComplete && stage !== "results") {
      setStage("results");
    }
  }, [state.isComplete, stage]);

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />

      {stage === "onboarding" && (
        <QuizOnboarding onStart={handleStart} />
      )}

      {stage === "quiz" && currentQuestionData && (
        <>
          <QuizProgress
            currentQuestion={state.currentQuestion}
            totalQuestions={spmMathQuestions.length}
            progress={progress}
          />
          <QuizQuestion
            question={currentQuestionData}
            selectedAnswer={
              state.answers[currentQuestionData.id]
            }
            onAnswerChange={handleAnswerChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onPause={handlePause}
            onResume={handleResume}
            isPaused={state.isPaused}
            canGoNext={canGoNext}
            isLastQuestion={isLastQuestion}
            currentQuestionIndex={state.currentQuestion}
            totalQuestions={spmMathQuestions.length}
          />
        </>
      )}

      {stage === "results" && (
        <QuizResults
          state={state}
          questions={spmMathQuestions}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}