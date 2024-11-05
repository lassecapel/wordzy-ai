import type { WordList } from '../types';

export const sampleWordLists: Partial<WordList>[] = [
  {
    title: "Essential French Phrases",
    description: "Common French phrases for everyday conversations",
    fromLanguage: { code: 'en', name: 'English' },
    toLanguage: { code: 'fr', name: 'French' },
    words: [
      {
        value: "bonjour",
        translations: [{ value: "hello" }],
        category: "greetings",
        complexity: 1
      },
      {
        value: "merci",
        translations: [{ value: "thank you" }],
        category: "greetings",
        complexity: 1
      },
      {
        value: "s'il vous plaît",
        translations: [{ value: "please" }],
        category: "greetings",
        complexity: 2
      }
    ]
  },
  {
    title: "Basic Spanish Vocabulary",
    description: "Essential Spanish words for beginners",
    fromLanguage: { code: 'en', name: 'English' },
    toLanguage: { code: 'es', name: 'Spanish' },
    words: [
      {
        value: "hola",
        translations: [{ value: "hello" }],
        category: "greetings",
        complexity: 1
      },
      {
        value: "gracias",
        translations: [{ value: "thank you" }],
        category: "greetings",
        complexity: 1
      },
      {
        value: "por favor",
        translations: [{ value: "please" }],
        category: "greetings",
        complexity: 1
      }
    ]
  },
  {
    title: "German Food Words",
    description: "Common German words related to food and dining",
    fromLanguage: { code: 'en', name: 'English' },
    toLanguage: { code: 'de', name: 'German' },
    words: [
      {
        value: "Brot",
        translations: [{ value: "bread" }],
        category: "food",
        complexity: 1
      },
      {
        value: "Wasser",
        translations: [{ value: "water" }],
        category: "food",
        complexity: 1
      },
      {
        value: "Apfel",
        translations: [{ value: "apple" }],
        category: "food",
        complexity: 1
      }
    ]
  }
];