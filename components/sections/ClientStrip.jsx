const clients = [
  'Airbnb','Shopify','HubSpot','Salesforce','Mailchimp','Stripe','Slack','Zendesk',
]

export default function ClientStrip() {
  return (
    <section style={{ background:'#f9fafb', borderTop:'1px solid #e5e7eb', borderBottom:'1px solid #e5e7eb', padding:'32px 0' }}>
      <div className="container">
        <p style={{ textAlign:'center', fontSize:'12px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#9ca3af', marginBottom:'24px' }}>
          Trusted by 1,200+ businesses worldwide
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', alignItems:'center', gap:'40px' }}>
          {clients.map((name) => (
            <div key={name} style={{
              fontSize:'15px', fontWeight:700, color:'#9ca3af', letterSpacing:'-0.02em',
              filter:'grayscale(1)', opacity:0.5, transition:'opacity 0.2s',
            }}>
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
