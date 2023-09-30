import { EmailOptions, EmailRecipent } from "@/types";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || "",
});

export default async function (options: EmailOptions) {
  if (!options) {
    throw new Error("no email options provided!");
  }
  const sentFrom = new Sender(options.from.email, options.from.name);

  const recipients = options.to.map(
    (recipient: EmailRecipent) => new Recipient(recipient.email, recipient.name)
  );

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject(options.subject)
    .setHtml(options.html)
    .setText(options.text ?? "");

  await mailerSend.email.send(emailParams);
}
