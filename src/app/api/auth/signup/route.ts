import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { z } from "zod";
import { userScheme } from "@/lib/zodSchema/userSchema";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // Using the shared schema directly. Note: The schema might validate 'id' which we generate on server.
        // We should probably omit 'id' from the schema for registration if it's required there.
        // Let's check the schema again. 'id' is required. We need to omit it.
        const registerSchema = userScheme.omit({ id: true });

        // Wait, existing schema doesn't have createdAt/updatedAt.
        // Let's re-read the userSchema content I saw in Step 106.
        // It has: id, firstname (now firstName), lastname (now lastName), email, password, role.

        const { firstName, lastName, email, password, role } = registerSchema.parse(body);

        // Check if user exists
        const existingUser = await query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rowCount && existingUser.rowCount > 0) {
            return NextResponse.json(
                { message: "Cet email est déjà utilisé." },
                { status: 409 }
            );
        }

        const hashedPassword = await hashPassword(password);

        // Insert user
        await query(
            "INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES ($1, $2, $3, $4, $5)",
            [firstName, lastName, email, hashedPassword, role]
        );

        return NextResponse.json(
            { message: "Utilisateur créé avec succès." },
            { status: 201 }
        );
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: "Données invalides", errors: (error as any).errors }, { status: 400 });
        }
        console.error("Register error:", error);
        return NextResponse.json(
            { message: "Erreur lors de l'inscription." },
            { status: 500 }
        );
    }
}
