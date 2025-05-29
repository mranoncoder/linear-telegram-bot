import client, { getLinearUsers } from '../linear.js'

export default async (ctx) => {
  if (String(ctx.chat.id) !== process.env.ALLOWED_TELEGRAM_GROUP_ID) return

  const text = ctx.message.text.split(' ').slice(1).join(' ')
  if (!text) return ctx.reply('❗ Usage: /add Task Title @username')

  const [titlePart, mentionPart] = text.split('@')
  const taskTitle = titlePart.trim()
  const assigneeInput = mentionPart ? mentionPart.trim() : null

  let assigneeId = null

  if (assigneeInput) {
    const users = await getLinearUsers()
    const match = users.find(
      (u) =>
        u.name.toLowerCase().includes(assigneeInput.toLowerCase()) ||
        u.email.toLowerCase().includes(assigneeInput.toLowerCase())
    )

    if (!match)
      return ctx.reply(`❌ Could not find a user matching @${assigneeInput}`)
    assigneeId = match.id
  }

  const mutation = `
    mutation CreateIssue($input: IssueCreateInput!) {
      issueCreate(input: $input) {
        issue { id title }
        success
      }
    }
  `

  try {
    const variables = {
      input: {
        title: taskTitle,
        teamId: process.env.LINEAR_TEAM_ID,
        stateId: process.env.LINEAR_TODO_STATE_ID,
        assigneeId: assigneeId || undefined,
      },
    }

    const data = await client.request(mutation, variables)
    const { id, title } = data.issueCreate.issue

    ctx.reply(`✅ Created task: *${title}*\n\`${id}\``, {
      parse_mode: 'Markdown',
    })
  } catch (err) {
    ctx.reply(`❌ Error: ${err.message}`)
  }
}
