export default function Faq({ items, title = 'Common questions' }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-navy-950 sm:text-3xl">{title}</h2>
      <dl className="mt-6 divide-y divide-navy-100 border-y border-navy-100">
        {items.map((item) => (
          <div key={item.q} className="py-5">
            <dt className="text-[17px] font-semibold text-navy-950">{item.q}</dt>
            <dd className="mt-2 text-[16px] leading-[1.7] text-navy-900/75">{item.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
