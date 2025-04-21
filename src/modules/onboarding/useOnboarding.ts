import { useState } from 'react';
import { onboardingQuestions, OnboardingOption } from './questions';

export function useOnboarding() {
  const totalSteps = onboardingQuestions.length;

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<(OnboardingOption | null)[]>(
    Array(totalSteps).fill(null)
  );

  const currentQuestion = onboardingQuestions[currentStep];

  const setAnswer = (step: number, option: OnboardingOption) => {
    const updatedAnswers = [...answers];
    updatedAnswers[step] = option;
    setAnswers(updatedAnswers);
  };

  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isComplete = currentStep === totalSteps - 1;

  const submit = () => {
    console.log('Submitting answers:', answers);
    // Later: call API route to store in Supabase
  };

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
  };
}


