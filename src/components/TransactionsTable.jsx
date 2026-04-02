import { useState } from "react"
import { useApp } from "../context/AppContext"
import { categories } from "../data/mockData"

function TransactionsTable() {
  const { transactions, setTransactions, role, filter, setFilter } = useApp()
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" })

  // ── Filtering ──
  const filtered = transactions
    .filter(t => filter.type === "all" || t.type === filter.type)
    .filter(t => filter.category === "all" || t.category === filter.category)
    .filter(t =>
      t.description.toLowerCase().includes(filter.search.toLowerCase())
    )

  // ── Sorting ──
  const sorted = [...filtered].sort((a, b) => {
    let aVal = a[sortConfig.key]
    let bVal = b[sortConfig.key]

    if (sortConfig.key === "date") {
      aVal = new Date(aVal)
      bVal = new Date(bVal)
    }

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1
    return 0
  })

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
    }))
  }

  const handleDelete = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  const fmt = (num) => "₹" + num.toLocaleString("en-IN")

  const sortIcon = (key) => {
    if (sortConfig.key !== key) return " ↕"
    return sortConfig.direction === "asc" ? " ↑" : " ↓"
  }

  return (
    <div className="transactions-section">

      {/* ── Filters ── */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search transactions..."
          value={filter.search}
          onChange={e => setFilter(prev => ({ ...prev, search: e.target.value }))}
          className="filter-input"
        />

        <select
          value={filter.type}
          onChange={e => setFilter(prev => ({ ...prev, type: e.target.value }))}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={filter.category}
          onChange={e => setFilter(prev => ({ ...prev, category: e.target.value }))}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button
          className="reset-btn"
          onClick={() => setFilter({ type: "all", category: "all", search: "" })}
        >
          Reset
        </button>
      </div>

      {/* ── Table ── */}
      {sorted.length === 0 ? (
        <div className="empty-state">No transactions found.</div>
      ) : (
        <div className="table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("date")}>
                  Date {sortIcon("date")}
                </th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th onClick={() => handleSort("amount")}>
                  Amount {sortIcon("amount")}
                </th>
                {role === "admin" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {sorted.map(t => (
                <tr key={t.id}>
                  <td>{new Date(t.date).toLocaleDateString("en-IN")}</td>
                  <td>{t.description}</td>
                  <td>
                    <span className="category-badge">{t.category}</span>
                  </td>
                  <td>
                    <span className={`type-badge ${t.type}`}>
                      {t.type === "income" ? "▲ Income" : "▼ Expense"}
                    </span>
                  </td>
                  <td className={`amount ${t.type}`}>
                    {t.type === "income" ? "+" : "-"}{fmt(t.amount)}
                  </td>
                  {role === "admin" && (
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(t.id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="table-footer">
        Showing {sorted.length} of {transactions.length} transactions
      </div>
    </div>
  )
}

export default TransactionsTable