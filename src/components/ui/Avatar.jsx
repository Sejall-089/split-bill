const COLORS = ['#7C6FE0','#E07C9F','#E0A87C','#7CC4E0','#90C97A','#B87CE0']

export default function Avatar({ name, index = 0, size = 'md' }) {
  const initials = name?.slice(0, 2).toUpperCase() || '??'
  const sizes = { sm: 'avatar-sm', md: 'avatar-md', lg: 'avatar-lg' }
  return (
    <div className={`avatar ${sizes[size]}`} style={{ background: COLORS[index % COLORS.length] }}>
      {initials}
    </div>
  )
}