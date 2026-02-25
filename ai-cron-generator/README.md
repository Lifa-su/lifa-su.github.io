# 🤖 AI Cron Expression Generator

A single-page AI-powered Cron expression generator tool. Convert natural language to Cron expressions using DeepSeek API.

## Features

- **AI Natural Language → Cron**: Describe your schedule in English or Chinese, AI generates the Cron expression
- **AI Cron Explanation**: Get human-readable explanations of any Cron expression (bilingual)
- **Visual Editor**: Dropdown-based editor for minute/hour/day/month/weekday fields
- **Next 10 Executions**: Preview upcoming execution times with relative time display
- **Common Templates**: Quick-apply templates (daily, weekly, monthly, weekdays, etc.)
- **Standard & Extended Cron**: Support for 5-field (standard) and 6-field (with seconds) formats
- **Timezone Selection**: Choose any timezone for execution time preview
- **One-Click Copy**: Copy Cron expression to clipboard instantly
- **Responsive Design**: Works on desktop and mobile
- **Dark Theme**: Modern dark UI

## Usage

1. Open `index.html` in any modern browser
2. Enter your DeepSeek API key (stored locally in browser)
3. Either:
   - Type a natural language description and click "AI Generate"
   - Use the visual editor to build an expression
   - Select a common template
   - Type a Cron expression directly

## API Key

This tool uses the [DeepSeek API](https://platform.deepseek.com/) for AI features. You need a valid API key.
The key is stored in your browser's localStorage and never sent anywhere except DeepSeek's API.

## Tech Stack

- Pure HTML + CSS + JavaScript (no dependencies, no build step)
- DeepSeek Chat API (`deepseek-chat` model)
- Modern CSS with CSS variables, grid, flexbox
- Responsive design with mobile support

## License

MIT
