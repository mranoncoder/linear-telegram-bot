import client from '../linear.js'

export default async (ctx) => {
  if (String(ctx.chat.id) !== process.env.ALLOWED_TELEGRAM_GROUP_ID) return

  const query = `
    query {
      issues(filter: { team: { id: { eq: "${process.env.LINEAR_TEAM_ID}" } } }) {
        nodes {
          id
          title
          state { id name }
          assignee { name }
        }
      }
    }
  `

  try {
    const data = await client.request(query)
    const categorized = {
      Todo: [],
      'In Progress': [],
      Done: [],
    }

    for (const issue of data.issues.nodes) {
      const { id, title, state, assignee } = issue
      const stateId = state.id

      const entry = `• *${title}*\n\`${id}\`\n👤 ${
        assignee?.name || 'Unassigned'
      }`

      if (stateId === process.env.LINEAR_TODO_STATE_ID)
        categorized.Todo.push(entry)
      else if (stateId === process.env.LINEAR_IN_PROGRESS_STATE_ID)
        categorized['In Progress'].push(entry)
      else if (stateId === process.env.LINEAR_DONE_STATE_ID)
        categorized.Done.push(entry)
    }

    const format = (label, items) =>
      items.length ? `*🟢 ${label}*\n\n${items.join('\n\n')}\n\n` : ''

    const message =
      format('Todo', categorized.Todo) +
      format('In Progress', categorized['In Progress']) +
      format('Done', categorized.Done)

    ctx.replyWithMarkdown(message || '📭 No tasks found.')
  } catch (err) {
    ctx.reply(`❌ Failed to fetch tasks.\n${err.message}`)
  }
}
