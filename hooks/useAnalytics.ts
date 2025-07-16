import { useCallback } from 'react';

export interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: number;
}

export function useAnalytics() {
  const trackEvent = useCallback((event: string, properties: Record<string, any> = {}) => {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      },
      timestamp: Date.now()
    };
    
    // Log to console for development
    console.log('Analytics Event:', analyticsEvent);
    
    // In production, you would send this to your analytics service
    // Example: analytics.track(event, properties);
    
    // Store locally for demo purposes
    const events = JSON.parse(localStorage.getItem('quizAnalytics') || '[]');
    events.push(analyticsEvent);
    localStorage.setItem('quizAnalytics', JSON.stringify(events));
  }, []);
  
  const trackQuizStart = useCallback(() => {
    trackEvent('quiz_started', {
      category: 'engagement',
      quiz_type: 'spm_math'
    });
  }, [trackEvent]);
  
  const trackQuestionAnswer = useCallback((questionId: number, answer: string, timeSpent: number) => {
    trackEvent('question_answered', {
      category: 'engagement',
      question_id: questionId,
      answer,
      time_spent_seconds: Math.round(timeSpent / 1000)
    });
  }, [trackEvent]);
  
  const trackQuizComplete = useCallback((totalTime: number, score: number) => {
    trackEvent('quiz_completed', {
      category: 'completion',
      total_time_seconds: Math.round(totalTime / 1000),
      score,
      completion_rate: 100
    });
  }, [trackEvent]);
  
  const trackQuizPause = useCallback((questionNumber: number) => {
    trackEvent('quiz_paused', {
      category: 'engagement',
      question_number: questionNumber
    });
  }, [trackEvent]);
  
  const trackQuizResume = useCallback((questionNumber: number) => {
    trackEvent('quiz_resumed', {
      category: 'engagement',
      question_number: questionNumber
    });
  }, [trackEvent]);
  
  const trackQuizAbandonment = useCallback((questionNumber: number, timeSpent: number) => {
    trackEvent('quiz_abandoned', {
      category: 'abandonment',
      question_number: questionNumber,
      time_spent_seconds: Math.round(timeSpent / 1000)
    });
  }, [trackEvent]);
  
  return {
    trackQuizStart,
    trackQuestionAnswer,
    trackQuizComplete,
    trackQuizPause,
    trackQuizResume,
    trackQuizAbandonment
  };
}