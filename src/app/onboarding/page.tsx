'use client'

console.log('SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

import { useSession } from '@/components/SessionWrapper'
import QuestionCard from '@/components/questionCard'
import { useOnboarding } from '@/modules/onboarding/utils/useOnboarding'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const { session } = useSession()
  const router = useRouter()

  // Show loading state while SessionWrapper is still determining auth status
  if (session === undefined) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </main>
    )
  }

  const userEmail = session?.user?.email
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
  } = useOnboarding()

  const selected = answers[currentStep]

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
            onClick={async () => {
              await submit(userEmail);
              router.push('/playground');
            }}
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
  )
}

