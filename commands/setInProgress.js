import client from '../linear.js'

export default async (ctx) => {
  if (String(ctx.chat.id) !== process.env.ALLOWED_TELEGRAM_GROUP_ID) return

  const taskId = ctx.message.text.split(' ')[1]
  if (!taskId) return ctx.reply('❗ Usage: /progress <task_id>')

  const mutation = `
    mutation {
      issueUpdate(id: "${taskId}", input: { stateId: "${process.env.LINEAR_IN_PROGRESS_STATE_ID}" }) {
        success
      }
    }
  `

  try {
    await client.request(mutation)
    ctx.reply(`✅ Task ${taskId} is now In Progress.`)
  } catch (e) {
    ctx.reply(`❌ Error updating task.\n${e.message}`)
  }
}
