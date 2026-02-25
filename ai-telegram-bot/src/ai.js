import OpenAI from 'openai';
import { config } from './config.js';
import { logger } from './logger.js';

const client = new OpenAI({
  apiKey: config.deepseek.apiKey,
  baseURL: config.deepseek.baseURL,
});

export async function chatCompletion(messages, systemPrompt) {
  const fullMessages = [
    { role: 'system', content: systemPrompt || 'You are a helpful AI assistant. Reply in the same language the user uses.' },
    ...messages,
  ];
  try {
    const res = await client.chat.completions.create({
      model: config.deepseek.model,
      messages: fullMessages,
      max_tokens: 2048,
      temperature: 0.7,
    });
    return res.choices[0]?.message?.content?.trim() || 'No response.';
  } catch (err) {
    logger.error(`DeepSeek API error: ${err.message}`);
    throw err;
  }
}
