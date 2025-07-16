# SPM Math Quiz Application

An educational quiz application designed to address student abandonment issues through improved user experience, progress tracking, and motivational elements.

## 🎯 Features

- **5 SPM Math Questions** covering algebra, geometry, sequences, and probability
- **Progress Tracking** with visual progress bar and milestone celebrations
- **Mobile-First Design** optimized for mobile devices with touch-friendly interface
- **Pause/Resume Functionality** with local storage persistence
- **Motivational Elements** including encouragement messages and achievement milestones
- **Comprehensive Results** with detailed performance analysis and actionable insights
- **Analytics Ready** with structured event tracking for user behavior analysis

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spm-math-quiz.git
cd spm-math-quiz
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
├── components/
│   ├── fallback/           # Fallback components for image handling
│   │   └── ImageWithFallback.tsx
│   ├── ui/                 # ShadCN UI components
│   ├── QuizOnboarding.tsx  # Onboarding screen
│   ├── QuizProgress.tsx    # Progress tracking component
│   ├── QuizQuestion.tsx    # Question display component
│   └── QuizResults.tsx     # Results and analytics screen
├── hooks/
│   ├── useQuizState.ts     # Quiz state management
│   └── useAnalytics.ts     # Analytics tracking
├── utils/
│   └── quizData.ts         # Quiz questions and metadata
├── styles/
│   └── globals.css         # Global styles (Tailwind v4)
└── App.tsx                 # Main application component
```

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: ShadCN UI (Radix UI primitives)
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Build Tool**: Vite
- **State Management**: React hooks (useReducer, custom hooks)

## 🎨 Design Principles

### Mobile-First Approach
- Touch-friendly interface with minimum 44px touch targets
- Bottom-anchored navigation for thumb accessibility
- Responsive design that works across all device sizes

### User Experience
- Clear time expectations (8-12 minutes)
- Visual progress indicators with motivational milestones
- Pause/resume functionality with state persistence
- Error handling and loading states

### Analytics Structure
- Event tracking for user engagement
- Performance metrics (completion rate, time per question)
- Behavioral patterns (navigation flow, drop-off points)

## 📊 Quiz Content

The quiz includes 5 carefully selected SPM Math questions:

1. **Number Sequences** (Medium) - Inductive reasoning
2. **Geometric Sequences** (Medium) - Formula application
3. **Quadratic Equations** (Easy) - Factoring and solving
4. **Coordinate Geometry** (Hard) - Area calculation
5. **Probability** (Easy) - Basic probability concepts

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking

## 🎯 Analytics Events

The application tracks the following events:

- `quiz_started` - User begins quiz
- `question_answered` - User answers a question
- `quiz_completed` - User completes entire quiz
- `quiz_paused` - User pauses quiz
- `quiz_resumed` - User resumes quiz
- `quiz_abandoned` - User leaves without completing

## 📱 Mobile Optimization

- Progressive Web App (PWA) ready
- Optimized touch interactions
- Responsive design patterns
- Performance optimizations with code splitting

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Configure build settings (automatic detection)
3. Deploy with zero configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- ShadCN UI for beautiful, accessible components
- Radix UI for primitive components
- Tailwind CSS for utility-first styling
- Lucide React for consistent icons# quiz-app
