import { useApp } from "../context/AppContext"

function Navbar() {
  const { role, setRole, theme, toggleTheme } = useApp()

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">₹</span>
        <span className="brand-name">FinTrack</span>
      </div>

      <div className="navbar-right">

        {/* ── Theme Toggle ── */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>

        <div className="role-switcher">
          <label htmlFor="role-select">Role:</label>
          <select
            id="role-select"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="viewer">👁 Viewer</option>
            <option value="admin">🛠 Admin</option>
          </select>
        </div>

        <div className={`role-badge ${role}`}>
          {role === "admin" ? "Admin Mode" : "Viewer Mode"}
        </div>

      </div>
    </nav>
  )
}

export default Navbar