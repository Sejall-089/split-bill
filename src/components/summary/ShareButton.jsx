import { useState } from 'react'
import { useBillStore } from '../../store/useBillStore'
import { encodeState } from '../../utils/urlEncoder'

export default function ShareButton() {
  const [copied, setCopied] = useState(false)
  const { people, items, assignments, taxPercent } = useBillStore()

  function handleShare() {
    const encoded = encodeState({ people, items, assignments, taxPercent })
    const url = `${window.location.origin}?bill=${encoded}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button onClick={handleShare} className="btn btn-ghost btn-full">
      {copied ? '✅ Link copied!' : '🔗 Share this bill'}
    </button>
  )
}