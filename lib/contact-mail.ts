export type ContactMessage = {
  name: string
  email: string
  phone: string
  comment: string
}

export class MailNotConfiguredError extends Error {}

/**
 * Deliver a contact-form message.
 *
 * TODO(SMTP): replace the body of this function with your SMTP sending code,
 * e.g. with nodemailer (`npm install nodemailer`) and SMTP_HOST / SMTP_PORT /
 * SMTP_USER / SMTP_PASS / CONTACT_TO environment variables. Throw an error if
 * sending fails; the API route turns it into a friendly message for the form.
 */
export async function sendContactEmail(message: ContactMessage): Promise<void> {
  void message
  throw new MailNotConfiguredError("Contact email is not set up yet.")
}
