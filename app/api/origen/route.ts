import { registrosLogistica } from "@/mocks/mocks";
import { RutaViajero } from "@/types/types.interface";
import { NextRequest, NextResponse } from "next/server";

// In-memory store initialized with mock data
const store: RutaViajero[] = [...registrosLogistica];

export function GET() {
    return NextResponse.json(store);
}

export async function POST(req: NextRequest) {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const body = await req.json();
    const newRecord: RutaViajero = {
        id: `LOG-${Date.now().toString().slice(-5)}`,
        ...body,
    };
    store.push(newRecord);

    return NextResponse.json(newRecord, { status: 201 });
}
