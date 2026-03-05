export default function AdminPage() {
  return (
    <div>

      <h1>Painel Administrativo</h1>

      <p style={{ marginTop: 8, color: "#9ca3af" }}>
        Bem-vindo ao painel do Hubi.
      </p>

      <div className="grid">

        <div className="card">
          <h3>Comércios</h3>
          <p>Gerenciar comércios cadastrados</p>
        </div>

        <div className="card">
          <h3>Usuários</h3>
          <p>Gerenciar contas de clientes</p>
        </div>

        <div className="card">
          <h3>Agendamentos</h3>
          <p>Ver e confirmar horários</p>
        </div>

        <div className="card">
          <h3>Notificações Push</h3>
          <p>Enviar notificações para usuários</p>
        </div>

      </div>

      <style jsx>{`
        .grid {
          margin-top: 30px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
        }

        .card {
          background: #111827;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #1f2937;
        }

        .card h3 {
          margin: 0 0 10px 0;
        }

        .card p {
          margin: 0;
          color: #9ca3af;
        }
      `}</style>

    </div>
  );
}