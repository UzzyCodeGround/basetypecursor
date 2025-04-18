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