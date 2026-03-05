import "@/styles/variables.css";
import "../globals.css";

export const metadata = {
  title: "Hubi Admin",
  description: "Painel administrativo Hubi",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="adminLayout">

      <aside className="sidebar">
        <h2 className="logo">HUBI</h2>

        <nav className="menu">
          <a href="/admin">Dashboard</a>
          <a href="/admin/tenants">Comércios</a>
          <a href="/admin/users">Usuários</a>
          <a href="/admin/appointments">Agendamentos</a>
          <a href="/admin/push">Notificações Push</a>
          <a href="/admin/settings">Configurações</a>
        </nav>
      </aside>

      <main className="content">
        {children}
      </main>

      <style jsx>{`
        .adminLayout {
          display: flex;
          min-height: 100vh;
          background: #0a0e17;
          color: white;
        }

        .sidebar {
          width: 220px;
          background: #111827;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .logo {
          color: var(--color-primary);
          margin-bottom: 30px;
        }

        .menu {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .menu a {
          text-decoration: none;
          color: #e5e7eb;
          padding: 10px;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .menu a:hover {
          background: #1f2937;
        }

        .content {
          flex: 1;
          padding: 30px;
          background: #0a0e17;
        }
      `}</style>
    </div>
  );
}