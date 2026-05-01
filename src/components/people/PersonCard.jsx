import Avatar from '../ui/Avatar'
import { useBillStore } from '../../store/useBillStore'

export default function PersonCard({ person, index }) {
  const items = useBillStore(s => s.items)
  const assignments = useBillStore(s => s.assignments)
  const toggleAssignment = useBillStore(s => s.toggleAssignment)

  const myItems = items.filter(item => (assignments[item.id] || []).includes(person.id))
  const myTotal = myItems.reduce((sum, item) => {
    const splitCount = (assignments[item.id] || []).length
    return sum + item.price / splitCount
  }, 0)

  return (
    <div className="person-card">
      <div className="person-card-header">
        <Avatar name={person.name} index={index} size="lg" />
        <div className="person-card-info">
          <p className="person-card-name">{person.name}</p>
          <p className="person-card-count">{myItems.length} item{myItems.length !== 1 ? 's' : ''}</p>
        </div>
        <span className="person-card-total">₹{myTotal.toFixed(2)}</span>
      </div>
      {myItems.length === 0 ? (
        <p className="empty" style={{ padding: '8px 0' }}>No items assigned</p>
      ) : (
        <div className="assigned-items">
          {myItems.map(item => {
            const splitCount = (assignments[item.id] || []).length
            return (
              <div key={item.id} className="assigned-item-row">
                <span>{item.name}</span>
                <div className="assigned-item-right">
                  {splitCount > 1 && <span className="split-badge">÷{splitCount}</span>}
                  <span className="assigned-item-price">₹{(item.price / splitCount).toFixed(2)}</span>
                  <button className="remove-btn" onClick={() => toggleAssignment(item.id, person.id)}>×</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}