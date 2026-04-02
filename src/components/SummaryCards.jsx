import { useApp } from "../context/AppContext"

function SummaryCards() {
  const { transactions } = useApp()

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  const fmt = (num) => "₹" + num.toLocaleString("en-IN")

  return (
    <div className="summary-cards">
      <div className="card card-balance">
        <div className="card-label">Total Balance</div>
        <div className="card-value">{fmt(balance)}</div>
        <div className="card-sub">Updated today</div>
      </div>

      <div className="card card-income">
        <div className="card-label">Total Income</div>
        <div className="card-value">{fmt(totalIncome)}</div>
        <div className="card-sub">All time</div>
      </div>

      <div className="card card-expense">
        <div className="card-label">Total Expenses</div>
        <div className="card-value">{fmt(totalExpenses)}</div>
        <div className="card-sub">All time</div>
      </div>
    </div>
  )
}

export default SummaryCards