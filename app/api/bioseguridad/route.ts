import { reportesSanitarios } from "@/mocks/mocks";
import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json(reportesSanitarios)
}

export async function POST() {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({ ok: true });
}