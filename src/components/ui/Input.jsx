export default function Input({ value, onChange, placeholder, type = 'text', className = '', onKeyDown }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      className={`input ${className}`}
    />
  )
}