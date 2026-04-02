import { createContext, useContext, useState } from "react"
import { transactions as initialData } from "../data/mockData"

const AppContext = createContext()

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(initialData)
  const [role, setRole] = useState("viewer")
  const [filter, setFilter] = useState({
    type: "all",
    category: "all",
    search: ""
  })
  const [theme, setTheme] = useState("dark")

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark")
  }

  return (
    <AppContext.Provider value={{
      transactions, setTransactions,
      role, setRole,
      filter, setFilter,
      theme, toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}