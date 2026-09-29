import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, company, screens } = body

    if (!name || !email || !phone || !company) {
      return NextResponse.json(
        { error: "Të gjitha fushat kryesore janë të detyrueshme." },
        { status: 400 }
      )
    }

    const targetEmail = process.env.CONTACT_EMAIL || "andi.bevapi@gmail.com"

    const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        "Emri dhe Mbiemri": name,
        "Email Klienti": email,
        "Numri i Telefonit": phone,
        "Kompania / Biznesi": company,
        "Numri i Ekraneve": screens || "Pa specifikuar",
        _subject: `Kërkesë për Provë 14-Ditore ABSignage - ${company} (${name})`,
        _template: "table",
        _captcha: "false",
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: result.message || "Dërgimi i email-it dështoi nga serveri." },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true, result })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Ndodhi një gabim gjatë përpunimit të kërkesës."
    console.error("Gabim në /api/send-demo:", error)
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
