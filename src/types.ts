export interface Language {
  code: string;
  name: string;
}

export interface Translation {
  id: string;
  value: string;
}

export interface Word {
  id: string;
  value: string;
  translations: Translation[];
  category: string;
  complexity: number;
}

export interface WordList {
  id: string;
  title: string;
  description: string;
  fromLanguage: Language;
  toLanguage: Language;
  words: Word[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface TestResult {
  id: string;
  wordListId: string;
  userId: string;
  date: Date;
  correctCount: number;
  totalCount: number;
  duration: number;
  complexWords: ComplexWord[];
}

export interface ComplexWord {
  wordId: string;
  value: string;
  correctTranslations: string[];
  userTranslation: string;
  matchScore: number;
  attempts: number;
}