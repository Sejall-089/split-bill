import { useState } from 'react'
import { useBillStore } from '../../store/useBillStore'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Avatar from '../ui/Avatar'

export default function PeoplePanel() {
  const [name, setName] = useState('')
  const people = useBillStore(s => s.people)
  const addPerson = useBillStore(s => s.addPerson)
  const removePerson = useBillStore(s => s.removePerson)

  function handleAdd() {
    if (!name.trim()) return
    addPerson(name.trim())
    setName('')
  }

  return (
    <div className="panel">
      <p className="panel-title">👥 People</p>
      <div className="input-row">
        <Input value={name} onChange={setName} placeholder="Enter name..." onKeyDown={e => e.key === 'Enter' && handleAdd()} />
        <Button onClick={handleAdd} disabled={!name.trim()}>Add</Button>
      </div>
      {people.length === 0 ? (
        <p className="empty">No people yet. Add someone!</p>
      ) : (
        <ul className="people-list">
          {people.map((person, i) => (
            <li key={person.id} className="person-row">
              <div className="person-row-left">
                <Avatar name={person.name} index={i} />
                <span className="person-name">{person.name}</span>
              </div>
              <button className="remove-btn" onClick={() => removePerson(person.id)}>×</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}