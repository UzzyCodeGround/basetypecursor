export interface TypingTestInsert {
    user_id: string;
    sentence: string;
    wpm: number;
    accuracy: number;
    mistakes: { [key: string]: number }; // jsonb
    total_time: number;
    total_characters: number;
    correct_characters: number;
  }
  
  export interface TypingTest extends TypingTestInsert {
    id: string;
    created_at: string;
  }