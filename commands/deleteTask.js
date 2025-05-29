import client from '../linear.js'

export default async (ctx) => {
  if (String(ctx.chat.id) !== process.env.ALLOWED_TELEGRAM_GROUP_ID) return

  const taskId = ctx.message.text.split(' ')[1]
  if (!taskId) return ctx.reply('❗ Usage: /delete <task_id>')

  const mutation = `
    mutation {
      issueDelete(id: "${taskId}") {
        success
      }
    }
  `

  try {
    await client.request(mutation)
    ctx.reply(`🗑️ Task ${taskId} deleted.`)
  } catch (e) {
    ctx.reply(`❌ Error deleting task.\n${e.message}`)
  }
}
