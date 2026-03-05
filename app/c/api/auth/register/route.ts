import { NextResponse } from "next/server";
import crypto from "crypto";
import { pool } from "@/lib/db";
import { hashPassword, normalizePhone } from "@/lib/utils";
import type { ApiResponse } from "@/types/api";
import type { AuthResponse } from "@/types/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const tenantId = (body.tenantId || "").toString();
    const name = (body.name || "").toString().trim();
    const whatsapp = normalizePhone((body.whatsapp || "").toString());
    const password = (body.password || "").toString();

    if (!tenantId) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_INPUT",
          message: "tenantId é obrigatório",
        },
        { status: 400 }
      );
    }

    if (!name || name.length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_INPUT",
          message: "Nome inválido",
        },
        { status: 400 }
      );
    }

    if (!whatsapp || whatsapp.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_INPUT",
          message: "WhatsApp inválido",
        },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_INPUT",
          message: "Senha deve ter no mínimo 6 caracteres",
        },
        { status: 400 }
      );
    }

    // Verifica se já existe esse WhatsApp nesse tenant
    const existing = await pool.query(
      `SELECT id FROM customers WHERE tenant_id = $1 AND whatsapp = $2 LIMIT 1`,
      [tenantId, whatsapp]
    );

    if (existing.rows[0]) {
      return NextResponse.json(
        {
          success: false,
          error: "ALREADY_EXISTS",
          message: "Já existe uma conta com esse WhatsApp neste comércio",
        },
        { status: 409 }
      );
    }

    const passwordHash = hashPassword(password);

    const insert = await pool.query(
      `
      INSERT INTO customers (tenant_id, name, whatsapp, password_hash)
      VALUES ($1, $2, $3, $4)
      RETURNING id, tenant_id, name, whatsapp
      `,
      [tenantId, name, whatsapp, passwordHash]
    );

    const customer = insert.rows[0];

    // MVP: token simples (depois trocamos por JWT + sessão persistida)
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

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Erro no register:", error);

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