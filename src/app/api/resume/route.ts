import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  const resumePath = path.join(
    process.cwd(),
    "src",
    "content",
    "Mysore Sridhar Resume Final.pdf",
  );

  try {
    const file = await fs.readFile(resumePath);
    return new Response(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="Mysore-Sridhar-Resume.pdf"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response("Resume not found", { status: 404 });
  }
}
