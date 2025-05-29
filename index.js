import 'dotenv/config'
import { Telegraf } from 'telegraf'
import express from 'express'
import addIssue from './commands/addIssue.js'
import listTasks from './commands/listTasks.js'
import markDone from './commands/markDone.js'
import setInProgress from './commands/setInProgress.js'
import deleteTask from './commands/deleteTask.js'

const app = express()
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)

bot.command('add', addIssue)
bot.command('list', listTasks)
bot.command('done', markDone)
bot.command('progress', setInProgress)
bot.command('delete', deleteTask)
bot.command('ping', async (ctx) => ctx.reply(ctx.chat.id))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`🤖 Server is running on port ${port}...`)
  bot.launch()
  console.log('🤖 Bot is running...')
})
