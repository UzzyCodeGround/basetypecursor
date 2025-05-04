// Insert type — used when writing to Supabase
export interface OnboardingResponseInsert {
  user_id: string;
  typing_goal: string;
  experience_level: string;
  platform_use_case: string;
  game_motivation: string;
  coach_learning_style: string;
}

// Select type — used when reading from Supabase
export interface OnboardingResponse extends OnboardingResponseInsert {
  id: string;
  created_at: string;
}





  // question: "Why are you learning to type better?",
  // subtitle: "Help us understand your motivation",
  // typing_goal 

  // question: "What's your current typing level?",
  // subtitle: "Help us personalize your learning journey",
  // experience_level

  // question: "What frustrates you most about your current typing?",
  // subtitle: "Let us know what's holding you back",
  // platform_use_case

  // question: "What would make you feel like you're making progress?",
  // subtitle: "Help us understand what motivates you",
  // motivation

  // question: "How do you want this coach to behave?",
  // subtitle: "Let us match your preferred learning style",
  