import { saveRetreatInquiry } from '../../lib/mysql'
import { sendEmail, buildSurfRetreatEmail } from '../../lib/mailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const {
    fullName, country, email, whatsapp,
    arrivalDate, departureDate, surfLevel,
    numGuests, duration, lessonType, notes,
  } = req.body || {}

  if (!fullName || !email) {
    return res.status(400).json({ message: 'Full name and email are required' })
  }

  const data = {
    fullName, country, email, whatsapp,
    arrivalDate: arrivalDate || null,
    departureDate: departureDate || null,
    surfLevel, numGuests, duration, lessonType, notes,
  }

  try {
    await saveRetreatInquiry(data)
  } catch (err) {
    console.error('Retreat inquiry DB save failed:', err)
    return res.status(500).json({ message: 'Failed to save inquiry' })
  }

  try {
    const mail = buildSurfRetreatEmail(data)
    await sendEmail(mail)
  } catch (err) {
    console.error('Retreat inquiry email failed:', err)
    // Saved to DB — still return success so the user isn't blocked
  }

  return res.status(200).json({ success: true })
}
