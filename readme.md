# 📡 Linear-Telegram Bot

A Telegram bot built with Node.js that connects your **Linear project management** system to a **Telegram group**.  
It allows team members to create, update, list, and delete tasks directly from Telegram.

## ✨ Features

- ✅ Create tasks with `/add` and assign by name/email
- 📋 List all tasks grouped by status (Todo, In Progress, Done)
- 🔄 Change task status with `/done` and `/progress`
- 🗑️ Delete tasks with `/delete`
- 🔒 Restrict bot usage to a specific Telegram group
- 📎 Task IDs are shown in Markdown for easy copy-paste

## 🚀 Commands

| Command               | Description                                         |
| --------------------- | --------------------------------------------------- |
| `/add title @user`    | Create a new task and optionally assign it          |
| `/list`               | Show all tasks grouped by status                    |
| `/done <task_id>`     | Mark a task as Done                                 |
| `/progress <task_id>` | Move a task to In Progress                          |
| `/delete <task_id>`   | Delete a task by its ID                             |
| `/ping`               | Check if the bot is online + logs Telegram group ID |

> 💡 **Tip:** To get your Telegram group ID, simply type `/ping` in the group. The bot will reply with the group ID — copy and use it in `ALLOWED_TELEGRAM_GROUP_ID`.

## ⚙️ Environment Variables

Create a `.env` file with the following:

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
LINEAR_API_KEY=your_linear_api_key
LINEAR_TEAM_ID=your_linear_team_id

LINEAR_TODO_STATE_ID=todo_state_id
LINEAR_IN_PROGRESS_STATE_ID=in_progress_state_id
LINEAR_DONE_STATE_ID=done_state_id

ALLOWED_TELEGRAM_GROUP_ID=-100111111111
```

## 📦 Setup

```bash
git clone https://github.com/mehrabsha/linear-telegram-bot.git
cd linear-telegram-bot
npm install
node index.js
```

> Make sure your bot is added as an **admin** to the allowed Telegram group.

## 📁 File Structure

```
linear-telegram-bot/
├── commands/
│   ├── addIssue.js
│   ├── listTasks.js
│   ├── markDone.js
│   ├── setInProgress.js
│   ├── deleteTask.js
│   └── ping.js
├── linear.js
├── index.js
└── .env
```

## 🛡️ Security

- All commands are restricted to a single Telegram group using `ALLOWED_TELEGRAM_GROUP_ID`.
- Sensitive data (API keys, tokens) should never be committed to version control.

## 📄 License

MIT License

## 👨‍💻 Contributions

PRs welcome! For improvements or bug reports, feel free to open an issue or submit a pull request.
