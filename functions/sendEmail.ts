import { EmailOptions, EmailRecipent } from "@/types";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export default async function (options: EmailOptions) {
  if (!options) {
    throw new Error("no email options provided!");
  }
  const msg = {
    to: options.to.email,
    from: options.from.email, // Use the email address or domain you verified above
    subject: options.subject,
    html: options.html,
  };

  await sgMail.send(msg);
  console.log("email sent");
}
