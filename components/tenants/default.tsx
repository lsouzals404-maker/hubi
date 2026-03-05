"use client";
import { Tenant } from "@/types/tenant";

export default function TenantDefault({
  tenant,
}: {
  tenant: Tenant;
}) {
  const whatsapp = tenant.whatsapp
    ? `https://wa.me/${tenant.whatsapp.replace(/\D/g, "")}`
    : null;

  return (
    <div className="container">

      <header className="header">
        <h1 className="title">{tenant.name}</h1>

        {tenant.shortName && (
          <p className="subtitle">{tenant.shortName}</p>
        )}
      </header>

      <section className="actions">

        <button className="primaryButton">
          Agendar Horário
        </button>

        {whatsapp && (
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="secondaryButton"
          >
            WhatsApp
          </a>
        )}

      </section>

      <section className="info">
        <p>Este comércio ainda não configurou um layout personalizado.</p>
      </section>

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
          text-align: center;
        }

        .header {
          margin-bottom: 30px;
        }

        .title {
          font-size: 32px;
          margin: 0;
          color: var(--color-primary);
        }

        .subtitle {
          margin-top: 6px;
          color: #6b7280;
        }

        .actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .primaryButton {
          padding: 12px 20px;
          background: var(--color-primary);
          border: none;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
        }

        .secondaryButton {
          padding: 12px 20px;
          border: 1px solid var(--color-primary);
          color: var(--color-primary);
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
        }

        .info {
          color: #6b7280;
          font-size: 14px;
        }
      `}</style>

    </div>
  );
}