import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'your-api-key',
  dangerouslyAllowBrowser: true,
});

export async function generateWordsFromText(text: string, targetLanguage: string) {
  const prompt = `Extract vocabulary words from this text and translate them to ${targetLanguage}. Format as JSON array with properties: foreign, native, category. Text: ${text}`;
  
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  try {
    return JSON.parse(response.choices[0].message.content || '[]');
  } catch (e) {
    return [];
  }
}