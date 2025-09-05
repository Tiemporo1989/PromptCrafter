export interface PromptData {
  input: string;
  outputType: string;
  tone: string;
  detail: string;
  constraints: string[];
}

export interface EnhancedPrompt {
  content: string;
  tags: string[];
  score: number;
  debugInfo: {
    intent: string;
    audience: string;
    structure: string[];
    enhancements: string[];
  };
  previewOutput?: string;
}