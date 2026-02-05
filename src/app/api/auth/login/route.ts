import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyPassword, signToken } from "@/lib/auth";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = loginSchema.parse(body);

        const result = await query("SELECT * FROM users WHERE email = $1", [email]);

        if (result.rowCount === 0) {
            return NextResponse.json(
                { message: "Email ou mot de passe incorrect." },
                { status: 401 }
            );
        }

        const user = result.rows[0];
        const isValid = await verifyPassword(password, user.password_hash);

        if (!isValid) {
            return NextResponse.json(
                { message: "Email ou mot de passe incorrect." },
                { status: 401 }
            );
        }

        const token = await signToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        const response = NextResponse.json(
            { message: "Connexion réussie.", role: user.role },
            { status: 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
            maxAge: 86400, // 24h
        });

        response.cookies.set("role", user.role, {
            httpOnly: false, // Accessible by client for redirection logic
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
            maxAge: 86400,
        });

        return response;
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: "Données invalides", errors: (error as any).errors }, { status: 400 });
        }
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "Erreur lors de la connexion." },
            { status: 500 }
        );
    }
}
