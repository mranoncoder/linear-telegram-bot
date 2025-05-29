import client from '../linear.js'

export default async (ctx) => {
  if (String(ctx.chat.id) !== process.env.ALLOWED_TELEGRAM_GROUP_ID) return

  const taskId = ctx.message.text.split(' ')[1]
  if (!taskId) return ctx.reply('❗ Usage: /done <task_id>')

  const mutation = `
    mutation {
      issueUpdate(id: "${taskId}", input: { stateId: "${process.env.LINEAR_DONE_STATE_ID}" }) {
        success
      }
    }
  `

  try {
    await client.request(mutation)
    ctx.reply(`✅ Marked task ${taskId} as Done.`)
  } catch (e) {
    ctx.reply(`❌ Error marking task as Done.\n${e.message}`)
  }
}
