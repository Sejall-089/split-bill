import { useMemo } from 'react'
import { useBillStore } from '../../store/useBillStore'
import { calculateTotals, getSubtotal, getUnassignedItems } from '../../utils/splitCalculator'
import Avatar from '../ui/Avatar'
import ShareButton from './ShareButton'

export default function SummaryPanel() {
  const people = useBillStore(s => s.people)
  const items = useBillStore(s => s.items)
  const assignments = useBillStore(s => s.assignments)
  const taxPercent = useBillStore(s => s.taxPercent)
  const reset = useBillStore(s => s.reset)

  const totals = useMemo(
    () => calculateTotals(people, items, assignments, taxPercent),
    [people, items, assignments, taxPercent]
  )

  const subtotal = getSubtotal(items)
  const tax = (subtotal * taxPercent) / 100
  const grandTotal = subtotal + tax
  const unassigned = getUnassignedItems(items, assignments)

  return (
    <div className="panel">
      <div className="summary-header">
        <p className="panel-title" style={{ margin: 0 }}>💰 Summary</p>
        <button className="reset-btn" onClick={reset}>Reset all</button>
      </div>

      {unassigned.length > 0 && (
        <div className="warning-box">
          ⚠️ {unassigned.length} item(s) not assigned: {unassigned.map(i => i.name).join(', ')}
        </div>
      )}

      {people.length === 0 ? (
        <p className="empty">Add people and items to see the split</p>
      ) : (
        <div className="summary-rows">
          {people.map((person, i) => (
            <div key={person.id} className="summary-row">
              <div className="summary-row-left">
                <Avatar name={person.name} index={i} />
                <span className="summary-person-name">{person.name}</span>
              </div>
              <span className="summary-amount">₹{(totals[person.id] || 0).toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="totals">
        <div className="total-row"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
        <div className="total-row"><span>Tax ({taxPercent}%)</span><span>₹{tax.toFixed(2)}</span></div>
        <div className="total-row grand"><span>Total</span><span>₹{grandTotal.toFixed(2)}</span></div>
      </div>

      <ShareButton />
    </div>
  )
}