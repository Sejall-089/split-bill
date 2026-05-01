import Avatar from '../ui/Avatar'
import { useBillStore } from '../../store/useBillStore'

export default function BillItem({ item }) {
  const people = useBillStore(s => s.people)
  const assignments = useBillStore(s => s.assignments)
  const toggleAssignment = useBillStore(s => s.toggleAssignment)
  const removeItem = useBillStore(s => s.removeItem)
  const assignedTo = assignments[item.id] || []

  return (
    <div className="bill-item">
      <div className="bill-item-top">
        <div>
          <p className="item-name">{item.name}</p>
          <p className="item-price">₹{item.price.toFixed(2)}</p>
        </div>
        <button className="remove-btn" onClick={() => removeItem(item.id)}>×</button>
      </div>
      {people.length > 0 && (
        <div className="assign-chips">
          {people.map((person, i) => {
            const isAssigned = assignedTo.includes(person.id)
            return (
              <button key={person.id} className={`chip ${isAssigned ? 'active' : ''}`} onClick={() => toggleAssignment(item.id, person.id)}>
                <Avatar name={person.name} index={i} size="sm" />
                {person.name}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}