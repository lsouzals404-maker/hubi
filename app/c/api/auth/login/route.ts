import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { hashPassword, normalizePhone } from "@/lib/utils";
import { ApiResponse } from "@/types/api";
import { AuthResponse } from "@/types/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const whatsapp = normalizePhone(body.whatsapp || "");
    const password = body.password || "";

    if (!whatsapp || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_INPUT",
          message: "WhatsApp e senha são obrigatórios",
        },
        { status: 400 }
      );
    }

    const passwordHash = hashPassword(password);

    const { rows } = await pool.query(
      `
      SELECT id, tenant_id, name, whatsapp
      FROM customers
      WHERE whatsapp = $1
      AND password_hash = $2
      LIMIT 1
      `,
      [whatsapp, passwordHash]
    );

    const customer = rows[0];

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_CREDENTIALS",
          message: "WhatsApp ou senha inválidos",
        },
        { status: 401 }
      );
    }

    /**
     * MVP: token simples
     * Depois podemos trocar por JWT
     */
    const token = crypto.randomUUID();

    const response: ApiResponse<AuthResponse> = {
      success: true,
      data: {
        token,
        customer: {
          id: customer.id,
          tenantId: customer.tenant_id,
          name: customer.name,
          whatsapp: customer.whatsapp,
        },
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Erro no login:", error);

    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_ERROR",
        message: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}