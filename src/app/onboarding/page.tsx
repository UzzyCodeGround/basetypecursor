'use client';

import QuestionCard from '@/components/questionCard';
import { useOnboarding } from '@/modules/onboarding/useOnboarding';

export default function OnboardingPage() {
  const {
    currentStep,
    totalSteps,
    currentQuestion,
    answers,
    setAnswer,
    goNext,
    goBack,
    isComplete,
    submit,
  } = useOnboarding();

  const selected = answers[currentStep];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 space-y-10">
      <div className="text-xs text-gray-400 uppercase tracking-widest">
        Step {currentStep + 1} of {totalSteps}
      </div>

      <QuestionCard
        question={currentQuestion}
        selected={selected}
        onSelect={(option) => setAnswer(currentStep, option)}
      />

      <div className="flex justify-between w-full max-w-md pt-6">
        <button
          onClick={goBack}
          disabled={currentStep === 0}
          className="text-gray-500 text-sm hover:underline disabled:opacity-30"
        >
          Back
        </button>

        {isComplete ? (
          <button
            onClick={submit}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 text-sm"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={goNext}
            disabled={!selected}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 text-sm disabled:opacity-50"
          >
            Next
          </button>
        )}
      </div>
    </main>
  );
}
