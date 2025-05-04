import React from 'react';
import type { OnboardingQuestion, OnboardingOption } from '@/modules/onboarding/utils/questions';

type QuestionCardProps = {
  question: OnboardingQuestion;
  selected: OnboardingOption | null;
  onSelect: (option: OnboardingOption) => void;
};

export default function QuestionCard({ question, selected, onSelect }: QuestionCardProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">{question.question}</h2>
        <p className="text-sm text-gray-500 mt-2">{question.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        {question.options.map((option, idx) => {
          const isSelected = selected?.text === option.text;

          return (
            <button
              key={idx}
              onClick={() => onSelect(option)}
              className={`flex items-center p-4 border rounded-md transition-colors duration-200 text-left hover:bg-gray-50
                ${isSelected ? 'border-black bg-gray-100 font-medium' : 'border-gray-200'}`}
            >
              <span className="text-xl mr-3">{option.emoji}</span>
              <span className="text-sm text-gray-700">{option.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
