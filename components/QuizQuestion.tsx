import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { ChevronLeft, ChevronRight, Pause, Play, ChevronUp, ChevronDown } from "lucide-react";
import { QuizQuestion as QuizQuestionType } from "../utils/quizData";

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedAnswer: string | undefined;
  onAnswerChange: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onPause: () => void;
  onResume: () => void;
  isPaused: boolean;
  canGoNext: boolean;
  isLastQuestion: boolean;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export function QuizQuestion({
  question,
  selectedAnswer,
  onAnswerChange,
  onNext,
  onPrevious,
  onPause,
  onResume,
  isPaused,
  canGoNext,
  isLastQuestion,
  currentQuestionIndex,
  totalQuestions
}: QuizQuestionProps) {
  const [timeSpent, setTimeSpent] = useState(0);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const getDifficultyColor = () => {
    switch (question.difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Pause overlay */}
      {isPaused && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-sm mx-4">
            <CardContent className="p-6 text-center">
              <Pause className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Quiz Paused</h3>
              <p className="text-muted-foreground mb-4">
                Take your time! Your progress is saved.
              </p>
              <Button onClick={onResume} className="w-full">
                <Play className="w-4 h-4 mr-2" />
                Resume Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      {/* Question content */}
      <div className="flex-1 p-4 pb-20">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between mb-3">
              <Badge className={getDifficultyColor()}>
                {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
              </Badge>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {formatTime(timeSpent)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={isPaused ? onResume : onPause}
                  className="h-11 w-11 p-0 min-h-[44px] min-w-[44px]"
                >
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHeader((prev) => !prev)}
                  className="h-11 w-11 p-0 min-h-[44px] min-w-[44px]"
                  aria-label={showHeader ? 'Hide question details' : 'Show question details'}
                >
                  {showHeader ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            {showHeader && (
              <>
                <Badge variant="outline" className="w-fit mb-2">
                  {question.topic}
                </Badge>
                <CardTitle className="text-lg leading-relaxed">
                  {question.question}
                </CardTitle>
              </>
            )}
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswer}
              onValueChange={val => {
                onAnswerChange(val);
              }}
              className="space-y-4"
            >
              {question.options.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer min-h-[44px] min-w-[44px] mb-4 ${selectedAnswer === option.value ? 'ring-2 ring-blue-500 border-blue-500' : ''}`}
                  onClick={() => onAnswerChange(option.value)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={selectedAnswer === option.value}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onAnswerChange(option.value);
                    }
                  }}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{option.label}</span>
                      {option.formula && (
                        <span className="text-sm text-gray-600">{option.formula}</span>
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 min-h-[44px] min-w-[44px] h-12"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {currentQuestionIndex + 1} of {totalQuestions}
            </p>
          </div>
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 min-h-[44px] min-w-[44px] h-12"
          >
            {isLastQuestion ? 'Finish' : 'Next'}
            {!isLastQuestion && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}