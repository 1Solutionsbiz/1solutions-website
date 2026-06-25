export default function AuroraText({ children, as: Tag = 'span', className = '', style = {} }) {
  return (
    <Tag className={`aurora-text ${className}`} style={style}>
      {children}
    </Tag>
  )
}
