import { useState } from "react"
import { useApp } from "../context/AppContext"
import { categories } from "../data/mockData"

function AddTransactionModal({ onClose }) {
  const { setTransactions } = useApp()

  const [form, setForm] = useState({
    date: "",
    description: "",
    category: "Food",
    type: "expense",
    amount: ""
  })

  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = () => {
    // ── Validation ──
    if (!form.date || !form.description || !form.amount) {
      setError("Please fill in all fields.")
      return
    }
    if (isNaN(form.amount) || Number(form.amount) <= 0) {
      setError("Amount must be a positive number.")
      return
    }

    const newTransaction = {
      id: Date.now(),
      date: form.date,
      description: form.description,
      category: form.category,
      type: form.type,
      amount: Number(form.amount)
    }

    setTransactions(prev => [newTransaction, ...prev])
    onClose()
  }

  return (
    <>
      {/* ── Backdrop ── */}
      <div className="modal-backdrop" onClick={onClose} />

      {/* ── Modal Box ── */}
      <div className="modal">
        <div className="modal-header">
          <h3>Add Transaction</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {error && <div className="modal-error">{error}</div>}

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g. Grocery shopping"
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="form-input"
              >
                {categories
                  .filter(c => c !== "Income")
                  .map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))
                }
              </select>
            </div>

            <div className="form-group">
              <label>Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="form-input"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="e.g. 1500"
              className="form-input"
              min="1"
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-submit" onClick={handleSubmit}>
            Add Transaction
          </button>
        </div>
      </div>
    </>
  )
}

export default AddTransactionModal