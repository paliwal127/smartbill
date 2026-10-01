function FeatureCard({ number, title, description }) {
  return (
    <article className="border-t-2 border-emerald-700 pt-5">
      <span className="text-sm font-semibold text-emerald-700">0{number}</span>
      <h3 className="mt-3 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>
    </article>
  )
}

export default FeatureCard
