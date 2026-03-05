import { registrosLogistica } from "@/mocks/mocks";
import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json(registrosLogistica)
}

export async function POST() {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({ ok: true });
}