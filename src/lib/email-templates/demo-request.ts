import type { DemoRequest } from "@/lib/validations/demo-request"

/** Të dhënat e klientit nuk bëhen dot markup ose script brenda email-it. */
function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

/** Email-i që merr ekipi për çdo kërkesë prove 14-ditore (HTML + tekst i thjeshtë). */
export function renderDemoRequestEmail(
  data: DemoRequest,
  meta: { requestId: string; submittedAt?: Date }
): { subject: string; html: string; text: string } {
  const submittedAt = (meta.submittedAt ?? new Date()).toISOString()
  const email = escapeHtml(data.email)
  // Skema garanton të paktën 6 shifra, ndaj lidhja `tel:` s'del kurrë bosh.
  const phoneHref = escapeHtml(data.phone.replace(/[^\d+]/g, ""))

  const rows = [
    { label: "Full Name", text: data.name, html: escapeHtml(data.name) },
    {
      label: "Business Email",
      text: data.email,
      html: `<a href="mailto:${email}" style="color: #0052ff; text-decoration: none;">${email}</a>`,
    },
    {
      label: "Phone Number",
      text: data.phone,
      html: `<a href="tel:${phoneHref}" style="color: #0f172a; text-decoration: none;">${escapeHtml(data.phone)}</a>`,
    },
    { label: "Company / Business", text: data.company, html: escapeHtml(data.company) },
    { label: "Estimated Screens", text: data.screens, html: escapeHtml(data.screens) },
  ]

  const htmlRows = rows
    .map((row, index) => {
      const border = index < rows.length - 1 ? "border-bottom: 1px solid #f1f5f9;" : ""
      return `
        <tr>
          <td style="padding: 10px 0; ${border} color: #64748b; width: 170px;"><strong>${row.label}</strong></td>
          <td style="padding: 10px 0; ${border}">${row.html}</td>
        </tr>`
    })
    .join("")

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; color: #0f172a; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #080f24 0%, #0052ff 100%); padding: 24px 28px; color: #ffffff;">
        <h2 style="margin: 0; font-size: 20px; font-weight: 700;">New 14-Day Free Trial Request</h2>
        <p style="margin: 6px 0 0; font-size: 13px; color: #cbd5e1;">ABSignage Demo Booking Form</p>
      </div>
      <div style="padding: 24px 28px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6;">${htmlRows}
        </table>
      </div>
      <div style="background-color: #f8fafc; padding: 14px 28px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
        Sent from ABSignage website · ${submittedAt} · Ref: ${escapeHtml(meta.requestId)}
      </div>
    </div>
  `.trim()

  const text = [
    "New 14-Day Free Trial Request (ABSignage)",
    "-----------------------------------------",
    ...rows.map((row) => `${row.label}: ${row.text}`),
    `Submitted At: ${submittedAt}`,
    `Request ID: ${meta.requestId}`,
  ].join("\n")

  // Fushat janë njëreshëshe nga skema; `replace` mbetet si mbrojtje e dytë për header-in.
  const subject = `New 14-Day Trial Request: ${data.company} (${data.name})`.replace(/[\r\n]+/g, " ")

  return { subject, html, text }
}
