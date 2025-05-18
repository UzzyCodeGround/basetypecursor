export interface OnboardingResponse {
  id: string;
  user_id: string;
  goal: string;
  typing_level: string;
  frustration: string;
  progress_metric: string;
  coach_style: string;
  created_at: string;
}

export interface GeneratedText {
  id: string;
  text: string;
  difficulty_level?: string;
  created_at: string;
}

export interface TypingSession {
  id: string;
  user_id: string;
  type: 'initial_test' | 'ai_drill';
  text_id?: string;
  wpm?: number;
  accuracy?: number;
  error_map?: { [key: string]: number };
  duration_seconds?: number;
  started_at: string;
  completed_at?: string;
}

// Database schema type
export type Database = {
  public: {
    Tables: {
      onboarding_response: {
        Row: OnboardingResponse;
        Insert: Omit<OnboardingResponse, 'id' | 'created_at'>;
        Update: Partial<Omit<OnboardingResponse, 'id' | 'created_at'>>;
      };
      generated_text: {
        Row: GeneratedText;
        Insert: Omit<GeneratedText, 'id' | 'created_at'>;
        Update: Partial<Omit<GeneratedText, 'id' | 'created_at'>>;
      };
      typing_session: {
        Row: TypingSession;
        Insert: Omit<TypingSession, 'id'>;
        Update: Partial<Omit<TypingSession, 'id'>>;
      };
    };
  };
}; 