import { sendEmail, buildContactEmail } from '../../lib/mailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { firstName, lastName, email, phone, subject, message } = req.body || {}

  if (!firstName || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required' })
  }

  try {
    const mail = buildContactEmail({ firstName, lastName, email, phone, subject, message })
    await sendEmail(mail)
    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Contact form email failed:', err)
    return res.status(500).json({ message: 'Failed to send message. Please try again.' })
  }
}
