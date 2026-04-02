import { useState } from "react"
import { useApp } from "./context/AppContext"
import Navbar from "./components/Navbar"
import SummaryCards from "./components/SummaryCards"
import BalanceTrendChart from "./components/BalanceTrendChart"
import SpendingPieChart from "./components/SpendingPieChart"
import TransactionsTable from "./components/TransactionsTable"
import InsightsSection from "./components/InsightsSection"
import AddTransactionModal from "./components/AddTransactionModal"

function App() {
  const { role, theme } = useApp()
  const [showModal, setShowModal] = useState(false)

  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <main className="main-content">

        <h2 className="section-title">Overview</h2>
        <SummaryCards />

        <h2 className="section-title">Trends</h2>
        <div className="charts-grid">
          <BalanceTrendChart />
          <SpendingPieChart />
        </div>

        <h2 className="section-title">Insights</h2>
        <InsightsSection />

        <div className="section-header">
          <h2 className="section-title" style={{ margin: 0 }}>Transactions</h2>
          {role === "admin" && (
            <button className="add-btn" onClick={() => setShowModal(true)}>
              + Add Transaction
            </button>
          )}
        </div>

        <TransactionsTable />

      </main>

      {showModal && (
        <AddTransactionModal onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default App