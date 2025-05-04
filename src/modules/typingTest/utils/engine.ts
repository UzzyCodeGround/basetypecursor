export interface TypingStats {
  wpm: number;
  accuracy: number;
  mistakes: { [key: string]: number };
  totalTime: number;
  totalCharacters: number;
  correctCharacters: number;
}

export class TypingTestEngine {
  private startTime: number | null = null;
  private mistakes: { [key: string]: number } = {};
  private totalCharacters = 0;
  private correctCharacters = 0;
  private isComplete = false;

  constructor(private readonly targetText: string) {}

  start(): void {
    this.startTime = Date.now();
    this.isComplete = false;
    this.mistakes = {};
    this.totalCharacters = 0;
    this.correctCharacters = 0;
  }

  processInput(input: string): boolean {
    if (!this.startTime) {
      this.start();
    }

    this.totalCharacters = input.length;
    this.correctCharacters = 0;

    for (let i = 0; i < input.length; i++) {
      if (input[i] === this.targetText[i]) {
        this.correctCharacters++;
      } else {
        const key = this.targetText[i];
        this.mistakes[key] = (this.mistakes[key] || 0) + 1;
      }
    }

    this.isComplete = input.length === this.targetText.length;
    return this.isComplete;
  }

  getStats(): TypingStats {
    if (!this.startTime) {
      throw new Error('Test has not been started');
    }

    const totalTime = (Date.now() - this.startTime) / 1000; // in seconds
    const words = this.targetText.length / 5; // standard word length
    const wpm = (words / totalTime) * 60;
    const accuracy = (this.correctCharacters / this.totalCharacters) * 100;

    return {
      wpm: Math.round(wpm * 100) / 100,
      accuracy: Math.round(accuracy * 100) / 100,
      mistakes: this.mistakes,
      totalTime,
      totalCharacters: this.totalCharacters,
      correctCharacters: this.correctCharacters,
    };
  }

  isTestComplete(): boolean {
    return this.isComplete;
  }
} 


// Absolutely — let’s walk through your TypingTestEngine line by line and make sure it supports everything you’ll need in the playground and beyond.

// ⸻

// 🔍 OVERVIEW: What the engine does

// You’ve created a class-based engine that:
// 	•	Accepts a targetText to type
// 	•	Starts a typing session when input begins
// 	•	Compares user input to target text
// 	•	Tracks:
// 	•	✅ total and correct characters
// 	•	✅ character-level mistakes
// 	•	✅ typing completion
// 	•	Calculates:
// 	•	✅ WPM (words per minute)
// 	•	✅ Accuracy
// 	•	✅ Total time

// This is great foundational logic — now let’s break it down in chunks:

// ⸻

// 🔧 CLASS: TypingTestEngine

// export class TypingTestEngine {
//   private startTime: number | null = null;
//   private mistakes: { [key: string]: number } = {};
//   private totalCharacters = 0;
//   private correctCharacters = 0;
//   private isComplete = false;

//   constructor(private readonly targetText: string) {}

// ✅ What it does:
// 	•	startTime: Tracks when the test begins
// 	•	mistakes: Key-by-key mistake counter (e.g. { "q": 2 })
// 	•	totalCharacters / correctCharacters: Input metrics
// 	•	isComplete: Boolean to check if user has finished typing
// 	•	targetText: The text the user needs to type (injected at instantiation)

// ✅ Yes — this setup is solid. All state is encapsulated inside the class.

// ⸻

// 🟢 start()

// start(): void {
//   this.startTime = Date.now();
//   this.isComplete = false;
//   this.mistakes = {};
//   this.totalCharacters = 0;
//   this.correctCharacters = 0;
// }

// Called manually or automatically on first input

// ✅ Resets all tracking variables — this is good. You might want to expose this publicly in your hook so it can be triggered when switching paragraphs later.

// ⸻

// 🟡 processInput(input: string)

// processInput(input: string): boolean {
//   if (!this.startTime) {
//     this.start();  // lazy-init
//   }

//   this.totalCharacters = input.length;
//   this.correctCharacters = 0;

//   for (let i = 0; i < input.length; i++) {
//     if (input[i] === this.targetText[i]) {
//       this.correctCharacters++;
//     } else {
//       const key = this.targetText[i];
//       this.mistakes[key] = (this.mistakes[key] || 0) + 1;
//     }
//   }

//   this.isComplete = input.length === this.targetText.length;
//   return this.isComplete;
// }

// ✅ What it does:
// 	•	Ensures start() is called on first keystroke
// 	•	Loops through all typed characters
// 	•	Tracks mistakes and correct characters
// 	•	Returns true if typing is complete

// ⸻

// ⚠️ One subtle issue:

// The mistakes counter logs mistakes based on the expected character, not the actual one the user typed.

// This means: If user types a instead of s, it will increment s, not a.

// 👁️ Possible Enhancement (later):
// You might want to track both:
// 	•	The wrong key typed
// 	•	The expected key that was missed
// So you can say: “You keep mistyping ‘s’ as ‘a’.”

// ⸻

// 🔵 getStats()

// getStats(): TypingStats {
//   if (!this.startTime) {
//     throw new Error('Test has not been started');
//   }

//   const totalTime = (Date.now() - this.startTime) / 1000; // in seconds
//   const words = this.targetText.length / 5;
//   const wpm = (words / totalTime) * 60;
//   const accuracy = (this.correctCharacters / this.totalCharacters) * 100;

//   return {
//     wpm: Math.round(wpm * 100) / 100,
//     accuracy: Math.round(accuracy * 100) / 100,
//     mistakes: this.mistakes,
//     totalTime,
//     totalCharacters: this.totalCharacters,
//     correctCharacters: this.correctCharacters,
//   };
// }

// ✅ What it does:
// 	•	Computes WPM = (words typed / time) * 60
// 	•	Accuracy = % of characters correct
// 	•	Returns full TypingStats object

// 👌 This is exactly what you need for showing results post-test.

// ⸻

// 🔚 isTestComplete()

// isTestComplete(): boolean {
//   return this.isComplete;
// }

// Helpful for the UI to know when to transition to feedback screen

// ✅ All good.

// ⸻

// ✅ Final Verdict

// Your TypingTestEngine is:

// Feature	✅ Covered
// Start typing trigger	✅
// Live tracking of input	✅
// WPM calculation	✅
// Accuracy calculation	✅
// Mistake map (per key)	✅
// Typing completion detection	✅
// Stateless output	✅



// ⸻

// 🔮 Future Enhancements (not needed yet):
// 	•	Track which keys were mistyped as which ("a → s")
// 	•	Track time between keys (for flow/hesitation)
// 	•	Record cursor position (for backspace and corrections)
// 	•	Support multi-line or paragraph chunks

// ⸻

// Let’s move to useTypingTest.ts next — and hook this engine up to React. Shall we?