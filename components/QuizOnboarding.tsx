import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock, BookOpen, Target, Play } from "lucide-react";
import { quizMetadata } from "../utils/quizData";

interface QuizOnboardingProps {
  onStart: () => void;
}

export function QuizOnboarding({ onStart }: QuizOnboardingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl mb-2">SPM Math Quiz</CardTitle>
          <p className="text-muted-foreground">
            Test your knowledge with carefully selected questions
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <p className="font-medium">Duration</p>
                <p className="text-sm text-muted-foreground">{quizMetadata.estimatedTime}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Target className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-medium">{quizMetadata.totalQuestions} Questions</p>
                <p className="text-sm text-muted-foreground">{quizMetadata.difficulty}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Topics Covered:</h3>
            <div className="flex flex-wrap gap-2">
              {quizMetadata.topics.map((topic) => (
                <Badge key={topic} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">What to Expect:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• You can pause and resume anytime</li>
              <li>• Progress is automatically saved</li>
              <li>• Get detailed explanations after completion</li>
              <li>• Track your performance across topics</li>
            </ul>
          </div>
          
          <Button 
            onClick={onStart} 
            className="w-full h-12 bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}