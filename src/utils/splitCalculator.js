// Given assignments and items, calculate what each person owes
export function calculateTotals(people, items, assignments, taxPercent) {
  const totals = {}

  // initialize everyone at 0
  people.forEach(person => {
    totals[person.id] = 0
  })

  // for each item, split its price among assigned people
  items.forEach(item => {
    const assignedTo = assignments[item.id] || []
    if (assignedTo.length === 0) return

    const sharePerPerson = item.price / assignedTo.length
    assignedTo.forEach(personId => {
      totals[personId] = (totals[personId] || 0) + sharePerPerson
    })
  })

  // apply tax proportionally
  if (taxPercent > 0) {
    const subtotal = Object.values(totals).reduce((a, b) => a + b, 0)
    Object.keys(totals).forEach(personId => {
      const share = subtotal > 0 ? totals[personId] / subtotal : 0
      const taxTotal = (subtotal * taxPercent) / 100
      totals[personId] += share * taxTotal
    })
  }

  return totals
}

// Get subtotal of all items
export function getSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0)
}

// Get unassigned items
export function getUnassignedItems(items, assignments) {
  return items.filter(item => {
    const assigned = assignments[item.id] || []
    return assigned.length === 0
  })
}