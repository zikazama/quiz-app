export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    value: string;
    formula?: string;
  }[];
  correctAnswer: string;
  explanation: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const spmMathQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "It is given that 0.3, 0.6, 0.9, 1.2, ... is a number sequence. Find the inductive conclusion for the given number sequence.",
    options: [
      { label: "(A)", value: "A", formula: "0.1n; n = 3, 6, 9, 12, ..." },
      { label: "(B)", value: "B", formula: "3n⁻¹; n = 1, 2, 3, 4, ..." },
      { label: "(C)", value: "C", formula: "³⁄₁₀n; n = 1, 2, 3, 4, ..." },
      { label: "(D)", value: "D", formula: "0.15n; n = 2, 3, 4, 5, ..." }
    ],
    correctAnswer: "C",
    explanation: "The sequence increases by 0.3 each time. The nth term is 0.3n where n = 1, 2, 3, 4, ... which equals ³⁄₁₀n.",
    topic: "Number Sequences",
    difficulty: "medium"
  },
  {
    id: 2,
    question: "Given that the first term of a geometric sequence is 2 and the common ratio is 3, find the 5th term.",
    options: [
      { label: "(A)", value: "A", formula: "162" },
      { label: "(B)", value: "B", formula: "243" },
      { label: "(C)", value: "C", formula: "486" },
      { label: "(D)", value: "D", formula: "54" }
    ],
    correctAnswer: "A",
    explanation: "For a geometric sequence, the nth term is ar^(n-1). Here a=2, r=3, so T₅ = 2 × 3⁴ = 2 × 81 = 162.",
    topic: "Geometric Sequences",
    difficulty: "medium"
  },
  {
    id: 3,
    question: "Solve the quadratic equation: x² - 5x + 6 = 0",
    options: [
      { label: "(A)", value: "A", formula: "x = 2, x = 3" },
      { label: "(B)", value: "B", formula: "x = 1, x = 6" },
      { label: "(C)", value: "C", formula: "x = -2, x = -3" },
      { label: "(D)", value: "D", formula: "x = 2, x = -3" }
    ],
    correctAnswer: "A",
    explanation: "Factoring: (x - 2)(x - 3) = 0, so x = 2 or x = 3. We can verify: 2² - 5(2) + 6 = 0 and 3² - 5(3) + 6 = 0.",
    topic: "Quadratic Equations",
    difficulty: "easy"
  },
  {
    id: 4,
    question: "Find the area of a triangle with vertices at A(1,2), B(4,6), and C(7,2).",
    options: [
      { label: "(A)", value: "A", formula: "6 square units" },
      { label: "(B)", value: "B", formula: "8 square units" },
      { label: "(C)", value: "C", formula: "12 square units" },
      { label: "(D)", value: "D", formula: "10 square units" }
    ],
    correctAnswer: "C",
    explanation: "Using the formula: Area = ½|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)|. Area = ½|1(6-2) + 4(2-2) + 7(2-6)| = ½|4 + 0 - 28| = ½ × 24 = 12.",
    topic: "Coordinate Geometry",
    difficulty: "hard"
  },
  {
    id: 5,
    question: "A bag contains 3 red balls, 4 blue balls, and 5 green balls. What is the probability of drawing a blue ball?",
    options: [
      { label: "(A)", value: "A", formula: "1/3" },
      { label: "(B)", value: "B", formula: "1/4" },
      { label: "(C)", value: "C", formula: "4/12" },
      { label: "(D)", value: "D", formula: "5/12" }
    ],
    correctAnswer: "A",
    explanation: "Total balls = 3 + 4 + 5 = 12. Blue balls = 4. Probability = 4/12 = 1/3.",
    topic: "Probability",
    difficulty: "easy"
  }
];

export const motivationalMessages = {
  start: "Let's begin your SPM Math journey! 🚀",
  25: "Great start! You're doing well! 💪",
  50: "Halfway there! Keep up the momentum! 🔥",
  75: "Almost done! You're so close! ⭐",
  100: "Fantastic work! Quiz completed! 🎉"
};

export const quizMetadata = {
  totalQuestions: 5,
  estimatedTime: "8-12 minutes",
  difficulty: "Mixed (Easy to Hard)",
  topics: ["Number Sequences", "Geometric Sequences", "Quadratic Equations", "Coordinate Geometry", "Probability"]
};