import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json(
        { message: "Déconnexion réussie." },
        { status: 200 }
    );

    response.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
        maxAge: 0,
    });

    response.cookies.set("role", "", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
        maxAge: 0,
    });

    return response;
}
