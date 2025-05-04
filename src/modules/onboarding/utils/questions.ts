// src/modules/onboarding/questions.ts
// for onboarding logic 
export type OnboardingOption = {
    emoji: string;
    text: string;
  };
  
  export type OnboardingQuestion = {
    id: number;
    question: string;
    subtitle: string;
    options: OnboardingOption[];
  };
  
  export const onboardingQuestions: OnboardingQuestion[] = [
    {
      id: 1,
      question: "Why are you learning to type better?",
      subtitle: "Help us understand your goal",
      options: [
        { emoji: "🧑‍🎓", text: "School or studies (e.g., essays, assignments)" },
        { emoji: "💼", text: "Work and productivity (e.g., emails, reports)" },
        { emoji: "👨‍💻", text: "Coding or software development" },
        { emoji: "🎮", text: "Just for fun / self-improvement" }
      ]
    },
    {
      id: 2,
      question: "What's your current typing level?",
      subtitle: "Help us personalize your learning journey",
      options: [
        { emoji: "🐢", text: "Beginner (I look at the keyboard often)" },
        { emoji: "🐇", text: "Intermediate (I can touch type slowly)" },
        { emoji: "⚡️", text: "Advanced (Fast but not consistent)" },
        { emoji: "🔥", text: "Pro (I'm here to optimize and get even faster)" }
      ]
    },
    {
      id: 3,
      question: "What frustrates you most about your current typing?",
      subtitle: "Let us know what's holding you back",
      options: [
        { emoji: "⌛️", text: "I'm too slow — I can't keep up with my thoughts" },
        { emoji: "🎯", text: "I make too many mistakes" },
        { emoji: "😣", text: "I plateaued and can't seem to improve" },
        { emoji: "🤷‍♂️", text: "I don't know what to focus on" }
      ]
    },
    {
      id: 4,
      question: "What would make you feel like you're making progress?",
      subtitle: "Help us understand what motivates you",
      options: [
        { emoji: "📈", text: "Seeing my speed or accuracy improve" },
        { emoji: "🧠", text: "Getting lessons that target my weaknesses" },
        { emoji: "🏁", text: "Finishing lessons or milestones" },
        { emoji: "🔁", text: "Just feeling more fluid and confident when typing" }
      ]
    },
    {
      id: 5,
      question: "How do you want this coach to behave?",
      subtitle: "Let us match your preferred learning style",
      options: [
        { emoji: "🎮", text: "Fun and motivating — like a game" },
        { emoji: "🧘‍♀️", text: "Calm and supportive — no stress" },
        { emoji: "🚀", text: "Push me — I want to improve fast" },
        { emoji: "🧑‍🏫", text: "Structured and professional — like a real coach" }
      ]
    }
  ];