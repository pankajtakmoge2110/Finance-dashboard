import { useApp } from "../context/AppContext"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts"

function BalanceTrendChart() {
  const { transactions } = useApp()

  // Group by month and calculate net balance per month
  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const monthlyData = {}

  transactions.forEach(t => {
    const date = new Date(t.date)
    const month = monthOrder[date.getMonth()]

    if (!monthlyData[month]) {
      monthlyData[month] = { month, income: 0, expenses: 0 }
    }

    if (t.type === "income") {
      monthlyData[month].income += t.amount
    } else {
      monthlyData[month].expenses += t.amount
    }
  })

 const chartData = monthOrder
  .filter(m => monthlyData[m])
  .map(m => ({
    month: m,
    balance: monthlyData[m].income - monthlyData[m].expenses
  }))

  return (
    <div className="chart-card">
      <h3 className="chart-title">Monthly Balance Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3148" />
          <XAxis dataKey="month" stroke="#64748b" tick={{ fill: "#94a3b8" }} />
          <YAxis stroke="#64748b" tick={{ fill: "#94a3b8" }}
            tickFormatter={v => "₹" + (v / 1000) + "k"} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1a1d27", border: "1px solid #2d3148", borderRadius: "8px" }}
            labelStyle={{ color: "#e2e8f0" }}
            formatter={v => ["₹" + v.toLocaleString("en-IN"), "Balance"]}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#6c63ff"
            strokeWidth={3}
            dot={{ fill: "#6c63ff", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BalanceTrendChart