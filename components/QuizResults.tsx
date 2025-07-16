import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Trophy, Clock, Target, BookOpen, RotateCcw, Share2 } from "lucide-react";
import { QuizQuestion } from "../utils/quizData";
import { QuizState } from "../hooks/useQuizState";

interface QuizResultsProps {
  state: QuizState;
  questions: QuizQuestion[];
  onRestart: () => void;
}

export function QuizResults({ state, questions, onRestart }: QuizResultsProps) {
  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (state.answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: questions.length, percentage: (correct / questions.length) * 100 };
  };
  
  const calculateTotalTime = () => {
    if (!state.endTime) return 0;
    return Math.round((state.endTime - state.startTime - state.totalPausedTime) / 1000);
  };
  
  const getTopicPerformance = () => {
    const topicStats: Record<string, { correct: number; total: number }> = {};
    
    questions.forEach(question => {
      const topic = question.topic;
      if (!topicStats[topic]) {
        topicStats[topic] = { correct: 0, total: 0 };
      }
      topicStats[topic].total++;
      if (state.answers[question.id] === question.correctAnswer) {
        topicStats[topic].correct++;
      }
    });
    
    return topicStats;
  };
  
  const score = calculateScore();
  const totalTime = calculateTotalTime();
  const topicPerformance = getTopicPerformance();
  
  const getPerformanceMessage = () => {
    if (score.percentage >= 80) return { message: "Excellent work!", color: "text-green-600", icon: Trophy };
    if (score.percentage >= 60) return { message: "Good job!", color: "text-blue-600", icon: Target };
    if (score.percentage >= 40) return { message: "Keep practicing!", color: "text-yellow-600", icon: BookOpen };
    return { message: "Don't give up!", color: "text-red-600", icon: BookOpen };
  };
  
  const performanceMessage = getPerformanceMessage();
  const PerformanceIcon = performanceMessage.icon;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };
  
  const getRecommendations = () => {
    const weakTopics = Object.entries(topicPerformance)
      .filter(([_, stats]) => (stats.correct / stats.total) < 0.6)
      .map(([topic, _]) => topic);
    
    if (weakTopics.length === 0) {
      return ["Try more advanced topics", "Practice under time pressure", "Explore related mathematical concepts"];
    }
    
    return [
      `Focus on ${weakTopics.join(", ")}`,
      "Review fundamental concepts",
      "Practice more problems in weak areas"
    ];
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PerformanceIcon className={`w-8 h-8 ${performanceMessage.color}`} />
            </div>
            <CardTitle className="text-2xl mb-2">Quiz Complete!</CardTitle>
            <p className={`text-lg ${performanceMessage.color}`}>
              {performanceMessage.message}
            </p>
          </CardHeader>
        </Card>
        
        {/* Score Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Your Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {score.correct}/{score.total}
              </div>
              <div className="text-lg text-muted-foreground">
                {Math.round(score.percentage)}% Correct
              </div>
            </div>
            <Progress value={score.percentage} className="h-3" />
          </CardContent>
        </Card>
        
        {/* Performance Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xl font-bold">{formatTime(totalTime)}</div>
              <div className="text-sm text-muted-foreground">Total Time</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-xl font-bold">{Math.round(totalTime / questions.length)}s</div>
              <div className="text-sm text-muted-foreground">Avg per Question</div>
            </div>
          </CardContent>
        </Card>
        
        {/* Topic Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Topic Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(topicPerformance).map(([topic, stats]) => (
              <div key={topic}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{topic}</span>
                  <span className="text-sm text-muted-foreground">
                    {stats.correct}/{stats.total}
                  </span>
                </div>
                <Progress value={(stats.correct / stats.total) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Detailed Results */}
        <Card>
          <CardHeader>
            <CardTitle>Question Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = state.answers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Question {index + 1}</span>
                    <Badge variant={isCorrect ? "default" : "destructive"}>
                      {isCorrect ? "Correct" : "Incorrect"}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{question.question}</p>
                  
                  {!isCorrect && (
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-sm">
                        <span className="font-medium">Correct Answer:</span> {question.correctAnswer}
                      </p>
                      <p className="text-sm mt-1 text-muted-foreground">
                        {question.explanation}
                      </p>
                    </div>
                  )}
                  
                  {index < questions.length - 1 && <Separator className="mt-4" />}
                </div>
              );
            })}
          </CardContent>
        </Card>
        
        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {getRecommendations().map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        {/* Actions */}
        <div className="grid grid-cols-1 gap-4">
          <Button onClick={onRestart} className="h-12 bg-blue-600 hover:bg-blue-700">
            <RotateCcw className="w-5 h-5 mr-2" />
            Take Quiz Again
          </Button>
          
          <Button variant="outline" className="h-12">
            <Share2 className="w-5 h-5 mr-2" />
            Share Results
          </Button>
        </div>
      </div>
    </div>
  );
}