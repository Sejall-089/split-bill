import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useBillStore = create(
  persist(
    (set, get) => ({
      // State
      people: [],
      items: [],
      assignments: {},
      taxPercent: 0,

      // People actions
      addPerson: (name) => set(state => ({
        people: [...state.people, { id: crypto.randomUUID(), name }]
      })),

      removePerson: (id) => set(state => {
        const newAssignments = {}
        Object.keys(state.assignments).forEach(itemId => {
          newAssignments[itemId] = state.assignments[itemId].filter(pId => pId !== id)
        })
        return {
          people: state.people.filter(p => p.id !== id),
          assignments: newAssignments
        }
      }),

      // Item actions
      addItem: (name, price) => set(state => ({
        items: [...state.items, { id: crypto.randomUUID(), name, price: parseFloat(price) }]
      })),

      removeItem: (id) => set(state => {
        const newAssignments = { ...state.assignments }
        delete newAssignments[id]
        return {
          items: state.items.filter(i => i.id !== id),
          assignments: newAssignments
        }
      }),

      // Assignment actions
      toggleAssignment: (itemId, personId) => set(state => {
        const current = state.assignments[itemId] || []
        const alreadyAssigned = current.includes(personId)
        return {
          assignments: {
            ...state.assignments,
            [itemId]: alreadyAssigned
              ? current.filter(id => id !== personId)
              : [...current, personId]
          }
        }
      }),

      // Tax
      setTax: (percent) => set({ taxPercent: percent }),

      // Reset everything
      reset: () => set({ people: [], items: [], assignments: {}, taxPercent: 0 }),

      // Load state from URL
      loadState: (newState) => set(newState),
    }),
    { name: 'split-bill-storage' } // persists to localStorage automatically
  )
)