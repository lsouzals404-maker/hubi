import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    // Testa conexão com o banco
    await pool.query("SELECT 1");

    return NextResponse.json({
      status: "ok",
      service: "hubi-api",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check error:", error);

    return NextResponse.json(
      {
        status: "error",
        service: "hubi-api",
        database: "disconnected",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}