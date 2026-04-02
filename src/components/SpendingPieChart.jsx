import { useApp } from "../context/AppContext"
import {
  PieChart, Pie, Cell, Tooltip,
  Legend, ResponsiveContainer
} from "recharts"

const COLORS = ["#6c63ff", "#22c55e", "#f43f5e", "#f59e0b", "#38bdf8", "#e879f9"]

function SpendingPieChart() {
  const { transactions } = useApp()

  // Only expenses, grouped by category
  const categoryMap = {}

  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      if (!categoryMap[t.category]) {
        categoryMap[t.category] = 0
      }
      categoryMap[t.category] += t.amount
    })

  const chartData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value
  }))

  if (chartData.length === 0) {
    return (
      <div className="chart-card">
        <h3 className="chart-title">Spending Breakdown</h3>
        <p className="empty-state">No expense data available.</p>
      </div>
    )
  }

  return (
    <div className="chart-card">
      <h3 className="chart-title">Spending Breakdown</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#1a1d27", border: "1px solid #2d3148", borderRadius: "8px" }}
            formatter={v => ["₹" + v.toLocaleString("en-IN")]}
          />
          <Legend
            formatter={(value) => (
              <span style={{ color: "#94a3b8", fontSize: "13px" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SpendingPieChart