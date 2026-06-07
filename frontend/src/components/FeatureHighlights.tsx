import { HeartHandshake, ShieldCheck, Sparkles, Truck } from 'lucide-react';

const data = [
  {
    icon: <ShieldCheck size={28} />,
    title: 'Bank-grade checkout',
    text: '3DS, Apple Pay, and instant confirmation across every device.',
    bg: 'var(--color-primary-fixed)',
    color: 'var(--color-primary)',
  },
  {
    icon: <Truck size={28} />,
    title: 'Precision fulfillment',
    text: 'Live carrier sync and proactive SMS/email tracking for every parcel.',
    bg: 'var(--color-tertiary-container)',
    color: 'var(--color-tertiary)',
  },
  {
    icon: <HeartHandshake size={28} />,
    title: 'Concierge support',
    text: 'Humans on standby 24/7 for styling, returns, and rapid resolutions.',
    bg: 'var(--color-secondary-container)',
    color: 'var(--color-on-secondary-container)',
  },
  {
    icon: <Sparkles size={28} />,
    title: 'Curated drops',
    text: 'Products hand-picked every week so every arrival feels intentional.',
    bg: 'var(--color-surface-container-high)',
    color: 'var(--color-on-surface)',
  },
];

const FeatureHighlights = () => (
  <section className="grid gap-md" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
    {data.map((card) => (
      <article 
        key={card.title} 
        className="card card-interactive p-6 flex flex-col gap-sm items-start bg-surface" 
        style={{ border: '1px solid var(--color-outline-variant)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(232,70,10,0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
        }}
      >
        <div 
          className="flex items-center justify-center rounded-full mb-2"
          style={{ backgroundColor: card.bg, color: card.color, width: '56px', height: '56px' }}
        >
          {card.icon}
        </div>
        <h3 className="text-body font-bold text-primary m-0" style={{ fontSize: '1.125rem' }}>{card.title}</h3>
        <p className="text-muted m-0" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>{card.text}</p>
      </article>
    ))}
  </section>
);

export default FeatureHighlights;
