"use server";

import transporter from "@/lib/nodemailer";

const styles = {
  container: {
    backgroundColor: "#f2f2f2",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    margin: "20px",
    border: "1px solid black",
    borderRadius: "69px",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  paragraph: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  link: {
    fontSize: "16px",
    color: "blue",
    textDecoration: "underline",
  },
};

export async function sendEmailAction({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
  };
}) {
  const mailOptions = {
    from: process.env.NODEMAIL_USER,
    to,
    subject: `BetterAuthTodo - ${subject}`,
    html: `
    <div style=""${JSON.stringify(styles.container)}>
    <h1  style="${JSON.stringify(styles.header)}">${subject}</h1>
    <p style="${JSON.stringify(styles.paragraph)}">${meta.description}</p>
    <a href="${meta.link}" style="${JSON.stringify(styles.link)}">${
      meta.link
    }</a>
    </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("sendEmailAction", err);
    return { error: false };
  }
}
