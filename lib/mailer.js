import nodemailer from 'nodemailer'

const NOTIFY_ADDRESSES = ['Villahillcrestweligama@gmail.com', 'dulanjansej@gmail.com']

function createTransporter() {
  const { SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error('Missing SMTP_USER or SMTP_PASS — add these to your .env.local file')
  }
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

export async function sendEmail({ subject, html, replyTo }) {
  const transporter = createTransporter()
  await transporter.sendMail({
    from: `"Villa Hillcrest Website" <${process.env.SMTP_USER}>`,
    to: NOTIFY_ADDRESSES.join(', '),
    replyTo: replyTo || undefined,
    subject,
    html,
  })
}

/* Shared HTML wrapper */
function emailWrapper(title, rows) {
  const rowsHtml = rows
    .filter(([, v]) => v)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;font-weight:600;color:#444;background:#f4f4f4;white-space:nowrap;width:170px;vertical-align:top;">${label}</td>
        <td style="padding:8px 12px;color:#222;">${value}</td>
      </tr>`
    )
    .join('')

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f0eeea;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0eeea;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:6px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:#1e3a2f;padding:24px 32px;">
            <p style="margin:0;color:#c8921d;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Villa Hillcrest</p>
            <h1 style="margin:6px 0 0;color:#fff;font-size:22px;font-weight:400;">${title}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              ${rowsHtml}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px;background:#f9f6f1;border-top:1px solid #e4e0da;">
            <p style="margin:0;color:#888;font-size:11px;">This email was sent automatically from the Villa Hillcrest website.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export function buildSurfRetreatEmail(data) {
  const {
    fullName, country, email, whatsapp,
    arrivalDate, departureDate, surfLevel,
    numGuests, duration, lessonType, notes,
  } = data

  const html = emailWrapper('New Surf Retreat Inquiry', [
    ['Name', fullName],
    ['Country', country],
    ['Email', email ? `<a href="mailto:${email}">${email}</a>` : ''],
    ['WhatsApp', whatsapp],
    ['Arrival Date', arrivalDate],
    ['Departure Date', departureDate],
    ['Surf Level', surfLevel],
    ['Number of Guests', numGuests],
    ['Retreat Duration', duration],
    ['Lesson Type', lessonType],
    ['Additional Notes', notes ? notes.replace(/\n/g, '<br>') : ''],
  ])

  return {
    subject: `New Surf Retreat Inquiry — ${fullName}`,
    html,
    replyTo: email,
  }
}

export function buildContactEmail(data) {
  const { firstName, lastName, email, phone, subject, message } = data

  const html = emailWrapper('New Contact Form Submission', [
    ['Name', `${firstName || ''} ${lastName || ''}`.trim()],
    ['Email', email ? `<a href="mailto:${email}">${email}</a>` : ''],
    ['Phone', phone],
    ['Subject', subject],
    ['Message', message ? message.replace(/\n/g, '<br>') : ''],
  ])

  return {
    subject: `New Contact Message — ${firstName || ''} ${lastName || ''}`.trim(),
    html,
    replyTo: email,
  }
}
