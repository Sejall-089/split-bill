import { useBillStore } from '../../store/useBillStore'
import PersonCard from '../people/PersonCard'

export default function AssignPanel() {
  const people = useBillStore(s => s.people)
  if (people.length === 0) return null
  return (
    <div>
      <p className="section-title">📋 Per Person</p>
      <div className="assign-grid">
        {people.map((person, i) => <PersonCard key={person.id} person={person} index={i} />)}
      </div>
    </div>
  )
}