import { useState } from 'react'
import { useBillStore } from '../../store/useBillStore'
import Button from '../ui/Button'
import Input from '../ui/Input'
import BillItem from './BillItem'

export default function BillPanel() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const items = useBillStore(s => s.items)
  const addItem = useBillStore(s => s.addItem)
  const taxPercent = useBillStore(s => s.taxPercent)
  const setTax = useBillStore(s => s.setTax)

  function handleAdd() {
    if (!name.trim() || !price || isNaN(price)) return
    addItem(name.trim(), price)
    setName('')
    setPrice('')
  }

  return (
    <div className="panel">
      <p className="panel-title">🧾 Bill Items</p>
      <div className="input-row">
        <Input value={name} onChange={setName} placeholder="Item name..." onKeyDown={e => e.key === 'Enter' && handleAdd()} />
        <Input value={price} onChange={setPrice} placeholder="₹ Price" type="number" className="input-sm" onKeyDown={e => e.key === 'Enter' && handleAdd()} />
        <Button onClick={handleAdd} disabled={!name.trim() || !price}>Add</Button>
      </div>
      <div className="tax-row">
        <span className="tax-label">Tax / GST %</span>
        <Input value={taxPercent} onChange={val => setTax(Number(val))} type="number" className="input-sm" placeholder="0" />
      </div>
      {items.length === 0 ? (
        <p className="empty">No items yet. Add from your bill!</p>
      ) : (
        <div className="items-list">
          {items.map(item => <BillItem key={item.id} item={item} />)}
        </div>
      )}
    </div>
  )
}