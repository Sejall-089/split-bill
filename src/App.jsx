import { useEffect } from 'react'
import { useBillStore } from './store/useBillStore'
import { decodeState } from './utils/urlEncoder'
import PeoplePanel from './components/people/PeoplePanel'
import BillPanel from './components/bill/BillPanel'
import AssignPanel from './components/assign/AssignPanel'
import SummaryPanel from './components/summary/SummaryPanel'

export default function App() {
  const loadState = useBillStore(state => state.loadState)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const encoded = params.get('bill')
    if (encoded) {
      const decoded = decodeState(encoded)
      if (decoded) loadState(decoded)
    }
  }, [])

  return (
    <div>
      <header className="app-header">
        <h1>🧾 Split Bill</h1>
        <p>No drama, just math</p>
      </header>
      <main className="app-main">
        <div className="row-2">
          <PeoplePanel />
          <BillPanel />
        </div>
        <AssignPanel />
        <SummaryPanel />
      </main>
    </div>
  )
}