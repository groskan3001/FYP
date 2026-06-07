import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'Checkout was effortless and delivery tracking updated in real time. Shopping on NEXUS is a completely different experience.',
    author: 'Sierra M.',
  },
  {
    quote: 'The catalog is huge but well-organized. Found exactly what I needed in under two minutes. Highly recommend.',
    author: 'Imani K.',
  },
  {
    quote: 'Support resolved my exchange in under ten minutes. I now default to NEXUS for every online purchase.',
    author: 'Daniel L.',
  },
];

const Testimonials = () => (
  <section className="testimonials">
    {testimonials.map((item) => (
      <blockquote key={item.author}>
        <div>
          {[...Array(5)].map((_, index) => (
            <Star key={index.toString()} size={16} fill="#facc15" color="#facc15" />
          ))}
        </div>
        <p>&ldquo;{item.quote}&rdquo;</p>
        <span>{item.author}</span>
      </blockquote>
    ))}
  </section>
);

export default Testimonials;
