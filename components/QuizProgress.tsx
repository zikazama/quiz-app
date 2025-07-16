import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { motivationalMessages } from "../utils/quizData";

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
}

export function QuizProgress({ currentQuestion, totalQuestions, progress }: QuizProgressProps) {
  const milestones = [25, 50, 75, 100];
  const getMotivationalMessage = () => {
    if (progress >= 100) return motivationalMessages[100];
    if (progress >= 75) return motivationalMessages[75];
    if (progress >= 50) return motivationalMessages[50];
    if (progress >= 25) return motivationalMessages[25];
    return motivationalMessages.start;
  };
  
  const getMilestoneColor = (milestone: number) => {
    if (progress >= milestone) {
      if (progress < milestone + 5 && progress >= milestone) {
        return 'bg-blue-500 animate-pulse scale-110'; // animate when just reached
      }
      return 'bg-blue-500';
    }
    return 'bg-gray-200';
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm min-h-[44px] min-w-[44px] flex items-center justify-center">
            Question {currentQuestion + 1} of {totalQuestions}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="flex items-center gap-2">
          {milestones.map((milestone) => (
            <div
              key={milestone}
              className={`w-11 h-11 rounded-full transition-all duration-500 flex items-center justify-center ${getMilestoneColor(milestone)}`}
              aria-label={`Milestone ${milestone}%`}
            >
              <span className="sr-only">{milestone}%</span>
            </div>
          ))}
        </div>
      </div>
      <Progress value={progress} className="mb-3 min-h-[12px]" />
      <div className="text-center">
        <p className="text-sm font-medium text-blue-700 animate-pulse">
          {getMotivationalMessage()}
        </p>
      </div>
    </div>
  );
}