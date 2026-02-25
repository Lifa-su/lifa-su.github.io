const OpenAI = require('openai');
const config = require('../config');

const client = new OpenAI({
  apiKey: config.deepseek.apiKey,
  baseURL: config.deepseek.baseURL,
});

async function chatCompletion(messages, options = {}) {
  const response = await client.chat.completions.create({
    model: options.model || config.deepseek.model,
    messages,
    max_tokens: options.maxTokens || 2048,
    temperature: options.temperature ?? 0.7,
  });
  return response.choices[0].message.content;
}

module.exports = { chatCompletion };
