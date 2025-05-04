import { supabase } from '@/lib/supabase';
import type { OnboardingResponseInsert } from '@/types/onboarding_types';
import type { OnboardingOption } from '../utils/questions';

export async function submitOnboarding(userId: string, answers: (OnboardingOption | null)[]) {
  const payload: OnboardingResponseInsert = {
    user_id: userId,
    typing_goal: answers[0]?.text || '',
    experience_level: answers[1]?.text || '',
    platform_use_case: answers[2]?.text || '',
    game_motivation: answers[3]?.text || '',
    coach_learning_style: answers[4]?.text || '',
  };

  const { error } = await supabase.from('onboarding_response').insert([payload]);

  if (error) {
    console.error('❌ Error submitting onboarding:', error.message);
  } else {
    console.log('✅ Onboarding submitted');
  }
}
  // export interface OnboardingResponseInsert {
  //   user_id: string;
  //   typing_goal: string;
  //   experience_level: string;
  //   platform_use_case: string;
  //   game_motivation: string;
  //   coach_learning_style: string;
  // }
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
  
  



// import { supabase } from '@/lib/supabase'
// import { useState } from 'react'
// import { onboardingQuestions, OnboardingOption } from '../utils/questions'

// export function useOnboarding() {
//   const totalSteps = onboardingQuestions.length

//   const [currentStep, setCurrentStep] = useState(0)
//   const [answers, setAnswers] = useState<(OnboardingOption | null)[]>(
//     Array(totalSteps).fill(null)
//   )

//   const currentQuestion = onboardingQuestions[currentStep]

//   const setAnswer = (step: number, option: OnboardingOption) => {
//     const updatedAnswers = [...answers]
//     updatedAnswers[step] = option
//     setAnswers(updatedAnswers)
//   }

//   const goNext = () => {
//     if (currentStep < totalSteps - 1) {
//       setCurrentStep((prev) => prev + 1)
//     }
//   }

//   const goBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep((prev) => prev - 1)
//     }
//   }

//   const isComplete = currentStep === totalSteps - 1

//   const submit = async (userId?: string | null) => {
//     if (!userId) {
//       console.error('No user ID — cannot submit onboarding')
//       return
//     }

//     const payload = {
//       user_id: userId,
//       typing_goal: answers[0]?.text,
//       experience_level: answers[1]?.text,
//       pain_point: answers[2]?.text,
//       motivation: answers[3]?.text,
//       coach_style: answers[4]?.text,
//     }

//     const { error } = await supabase.from('onboarding_responses').insert([payload])

//     if (error) {
//       console.error('Error submitting to Supabase:', error.message)
//     } else {
//       console.log('✅ Onboarding submitted to Supabase')
//     }
//   }

//   return {
//     currentStep,
//     totalSteps,
//     currentQuestion,
//     answers,
//     setAnswer,
//     goNext,
//     goBack,
//     isComplete,
//     submit,
//   }
// }