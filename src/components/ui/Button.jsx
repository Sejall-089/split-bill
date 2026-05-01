export default function Button({ children, onClick, variant = 'primary', className = '', disabled = false }) {
  const variants = { primary: 'btn-primary', danger: 'btn-danger', ghost: 'btn-ghost' }
  return (
    <button onClick={onClick} disabled={disabled} className={`btn ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}