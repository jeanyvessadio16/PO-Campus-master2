import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const tokenCookie = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("token="));

    if (!tokenCookie) {
      return NextResponse.json(
        { message: "Non authentifié." },
        { status: 401 },
      );
    }

    const token = tokenCookie.split("=")[1];
    const payload = await verifyToken(token);

    if (!payload || !payload.userId) {
      return NextResponse.json({ message: "Token invalide." }, { status: 401 });
    }

    const result = await query(
      "SELECT id, first_name AS firstName, last_name AS lastName, email, role FROM users WHERE id = $1",
      [payload.userId],
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Utilisateur introuvable." },
        { status: 404 },
      );
    }

    const user = result.rows[0];

    return NextResponse.json({ user, role: user.role }, { status: 200 });
  } catch (error) {
    console.error("/api/auth/me error:", error);
    return NextResponse.json({ message: "Erreur serveur." }, { status: 500 });
  }
}
