import { useApp } from "../context/AppContext"

function InsightsSection() {
  const { transactions } = useApp()

  const expenses = transactions.filter(t => t.type === "expense")
  const income   = transactions.filter(t => t.type === "income")

  // ── 1. Highest spending category ──
  const categoryTotals = {}
  expenses.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount
  })
  const topCategory = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])[0]

  // ── 2. Monthly breakdown ──
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun",
                      "Jul","Aug","Sep","Oct","Nov","Dec"]

  const monthlyExpenses = {}
  expenses.forEach(t => {
    const month = monthNames[new Date(t.date).getMonth()]
    monthlyExpenses[month] = (monthlyExpenses[month] || 0) + t.amount
  })
  const sortedMonths = Object.entries(monthlyExpenses)
    .sort((a, b) => b[1] - a[1])
  const highestMonth  = sortedMonths[0]
  const lowestMonth   = sortedMonths[sortedMonths.length - 1]

  // ── 3. Savings rate ──
  const totalIncome   = income.reduce((s, t) => s + t.amount, 0)
  const totalExpenses = expenses.reduce((s, t) => s + t.amount, 0)
  const savingsRate   = totalIncome > 0
    ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)
    : 0

  // ── 4. Average monthly spending ──
  const monthCount     = Object.keys(monthlyExpenses).length
  const avgMonthly     = monthCount > 0
    ? Math.round(totalExpenses / monthCount)
    : 0

  const fmt = (num) => "₹" + num.toLocaleString("en-IN")

  const insights = [
    {
      icon: "🔥",
      label: "Top Spending Category",
      value: topCategory ? topCategory[0] : "—",
      sub: topCategory ? `Total: ${fmt(topCategory[1])}` : "No data",
      color: "#f43f5e"
    },
    {
      icon: "📅",
      label: "Highest Spending Month",
      value: highestMonth ? highestMonth[0] : "—",
      sub: highestMonth ? `Spent ${fmt(highestMonth[1])}` : "No data",
      color: "#f59e0b"
    },
    {
      icon: "😌",
      label: "Lowest Spending Month",
      value: lowestMonth ? lowestMonth[0] : "—",
      sub: lowestMonth ? `Spent ${fmt(lowestMonth[1])}` : "No data",
      color: "#22c55e"
    },
    {
      icon: "💰",
      label: "Savings Rate",
      value: `${savingsRate}%`,
      sub: savingsRate >= 20
        ? "Great savings habit!"
        : "Try to save more",
      color: savingsRate >= 20 ? "#22c55e" : "#f59e0b"
    },
    {
      icon: "📊",
      label: "Avg Monthly Spending",
      value: fmt(avgMonthly),
      sub: `Across ${monthCount} months`,
      color: "#38bdf8"
    },
    {
      icon: "🧾",
      label: "Total Transactions",
      value: transactions.length,
      sub: `${income.length} income · ${expenses.length} expenses`,
      color: "#6c63ff"
    }
  ]

  return (
    <div className="insights-grid">
      {insights.map((item, i) => (
        <div className="insight-card" key={i}
          style={{ borderTop: `3px solid ${item.color}` }}>
          <div className="insight-icon">{item.icon}</div>
          <div className="insight-label">{item.label}</div>
          <div className="insight-value" style={{ color: item.color }}>
            {item.value}
          </div>
          <div className="insight-sub">{item.sub}</div>
        </div>
      ))}
    </div>
  )
}

export default InsightsSection