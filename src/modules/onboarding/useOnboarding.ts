import { supabase } from '@/lib/supabase'
import { useState } from 'react'
import { onboardingQuestions, OnboardingOption } from './questions'

export function useOnboarding() {
  const totalSteps = onboardingQuestions.length

  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<(OnboardingOption | null)[]>(
    Array(totalSteps).fill(null)
  )

  const currentQuestion = onboardingQuestions[currentStep]

  const setAnswer = (step: number, option: OnboardingOption) => {
    const updatedAnswers = [...answers]
    updatedAnswers[step] = option
    setAnswers(updatedAnswers)
  }

  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const isComplete = currentStep === totalSteps - 1

  const submit = async (userId?: string | null) => {
    if (!userId) {
      console.error('No user ID — cannot submit onboarding')
      return
    }

    const payload = {
      user_id: userId,
      typing_goal: answers[0]?.text,
      experience_level: answers[1]?.text,
      pain_point: answers[2]?.text,
      motivation: answers[3]?.text,
      coach_style: answers[4]?.text,
    }

    const { error } = await supabase.from('onboarding_responses').insert([payload])

    if (error) {
      console.error('Error submitting to Supabase:', error.message)
    } else {
      console.log('✅ Onboarding submitted to Supabase')
    }
  }

  return {
    currentStep,
    totalSteps,
    currentQuestion,
    answers,
    setAnswer,
    goNext,
    goBack,
    isComplete,
    submit,
  }
}