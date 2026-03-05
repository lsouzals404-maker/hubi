import "@/styles/variables.css";
import styles from "./layout.module.css";

export const metadata = {
  title: "Hubi Admin",
  description: "Painel administrativo Hubi",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>HUBI</h2>

        <nav className={styles.menu}>
          <a href="/admin">Dashboard</a>
          <a href="/admin/tenants">Comércios</a>
          <a href="/admin/users">Usuários</a>
          <a href="/admin/appointments">Agendamentos</a>
          <a href="/admin/push">Notificações Push</a>
          <a href="/admin/settings">Configurações</a>
        </nav>
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
}