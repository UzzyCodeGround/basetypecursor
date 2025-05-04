import { useState, useEffect, useCallback } from 'react';
import { TypingTestEngine, TypingStats } from './engine';

export function useTypingTest(targetText: string) {
  const [input, setInput] = useState('');
  const [stats, setStats] = useState<TypingStats | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [engine] = useState(() => new TypingTestEngine(targetText));

  // function useTypingTest(targetText: string): {
//     input: string;
//     stats: TypingStats | null;
//     isComplete: boolean;
//     handleInput: (value: string) => void;
//     reset: () => void;
// }   why is this in red ? because it is not used - why is it not used ? because it is not used in the app.tsx file - should i remove it ? yes - the function is already defined in the engine.ts file, so i can remove it from here.  

  const handleInput = useCallback((value: string) => {
    setInput(value);
    const complete = engine.processInput(value);
    setStats(engine.getStats());
    setIsComplete(complete);
  }, [engine]);

  const reset = useCallback(() => {
    setInput('');
    setStats(null);
    setIsComplete(false);
    engine.start();
  }, [engine]);

  useEffect(() => {
    reset();
  }, [targetText, reset]);

  return {
    input,
    stats,
    isComplete,
    handleInput,
    reset,
  };
} 

//Yes, I fully understand your prompt — and I really like your approach. You’re not just trying to build quickly — you’re trying to understand deeply, which is how real mastery is built. 🔥

// ⸻

// Let’s slow it down and walk through this step-by-step with your context in mind.

// ⸻

// 🧠 Big Picture: Where does useTypingTest fit in?

// 💡 You already nailed this:
// 	•	engine.ts = raw logic for calculating typing stats
// 	•	useTypingTest.ts = wraps that logic in a way React components can safely and easily use
// 	•	✅ It connects the React state and UI to the logic in engine.ts
// 	•	✅ It exposes useful data (input, stats, isComplete) and functions (handleInput, reset) to your components

// ⸻

// 🧩 Think of it like this:

// Imagine engine.ts is a car engine.

// It knows how to drive — but it’s raw, mechanical, and doesn’t come with a steering wheel, dashboard, or speedometer.

// useTypingTest.ts is the driver’s cockpit:
// 	•	It gives you the dashboard (stats),
// 	•	The steering wheel (handleInput),
// 	•	And the ignition/reset button (reset)

// ⸻

// 📦 What does useTypingTest actually do?

// Here’s a super clear breakdown of each part:

// ⸻

// 1. const [input, setInput] = useState('')

// This is a React hook that stores the current string the user is typing.

// So if the user types: The quick,
// input === 'The quick'

// This is what your UI will display and track live.

// ⸻

// 2. const [stats, setStats] = useState<TypingStats | null>(null)

// This holds the live stats coming from the engine:
// 	•	WPM
// 	•	Accuracy
// 	•	Mistakes

// After every keystroke, this will be updated and can be shown in the UI.

// ⸻

// 3. const [isComplete, setIsComplete] = useState(false)

// This tells the UI whether the typing test is done.

// If the user finishes typing the whole paragraph, this becomes true.

// You might use this to show a “Congrats” screen or to stop the timer.

// ⸻

// 4. const [engine] = useState(() => new TypingTestEngine(targetText))

// We create a new instance of your TypingTestEngine, passing in the sentence to type.

// This engine will:
// 	•	Start the timer
// 	•	Compare the user’s input to the sentence
// 	•	Track mistakes

// We store it in React useState so that it doesn’t get reset on every re-render.

// ⸻

// 5. handleInput(value)

// This is the most important function.

// Every time the user types a letter:
// 	•	handleInput() is called
// 	•	It updates input state (so the UI shows the letters)
// 	•	It sends the input to the engine
// 	•	It updates the live stats
// 	•	It checks if typing is complete

// You’ll pass this function to your input box — and the whole loop is wired up.

// ⸻

// 6. reset()

// Resets everything:
// 	•	Clears the input
// 	•	Clears the stats
// 	•	Restarts the timer in the engine

// You’ll use this when the user wants to try again or when you load a new sentence.

// ⸻

// 7. useEffect(() => { reset(); }, [targetText])

// This makes sure the test is automatically reset when the sentence changes.

// Imagine you press “New Paragraph” — it clears and starts over.

// ⸻

// 8. What gets returned?

// return {
//   input,         // The string the user has typed so far
//   stats,         // The live WPM, accuracy, mistakes, etc.
//   isComplete,    // Whether the test is done
//   handleInput,   // Function to call on every keypress
//   reset,         // Function to reset the test
// };

// You’ll use these directly inside TypingBox.tsx or your UI.

// ⸻

// 🧠 Summary

// Element	What it is	Why it matters
// input	The user’s current typing	Needed to display progress in real-time
// handleInput	Called on every keypress	Updates engine + state
// stats	What comes out of the engine	Used for analytics/feedback after test
// isComplete	Whether they finished typing the sentence	Can be used to trigger a results view
// reset	Clears the test	For retry or changing sentences



// ⸻

// ✅ Do You Understand So Far?

// Here’s a quick comprehension check — feel free to answer casually:
// 	1.	In your own words, what is the role of useTypingTest?
// 	2.	When might the reset() function be triggered?
// 	3.	Why do we wrap the engine inside a hook instead of calling it directly in the component?

// If you want, we can move to TypingBox.tsx next. But I’m happy to sit here with this part until you feel clear and confident.