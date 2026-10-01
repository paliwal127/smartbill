import FeatureCard from '../components/FeatureCard'

function Home({ navigate }) {
  return (
    <>
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Simple Billing Calculator</p>
            <h1 className="mt-5 max-w-xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Create accurate bills in seconds.</h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-gray-500">Calculate your bill, apply membership discounts and see the final amount instantly.</p>
            <div className="mt-8 flex flex-wrap gap-3"><button type="button" onClick={() => navigate('/billing')} className="rounded-md bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-700">Create a Bill</button><button type="button" onClick={() => navigate('/history')} className="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">View History</button></div>
          </div>
          <div className="border-l-4 border-emerald-700 bg-stone-50 px-7 py-8 sm:px-10"><p className="text-sm font-semibold text-gray-500">Today’s quick check</p><p className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Simple in. Clear out.</p><p className="mt-4 text-sm leading-6 text-gray-500">A focused calculator for the everyday moments when you need a reliable total, without extra setup.</p></div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8"><div className="grid gap-10 md:grid-cols-3"><FeatureCard number="1" title="Easy Billing" description="Enter the item price and quantity to calculate the subtotal." /><FeatureCard number="2" title="Membership Discounts" description="Apply the customer's membership level automatically." /><FeatureCard number="3" title="Clear Bill Summary" description="See subtotal, discount and final amount clearly." /></div></section>
      <section id="how-it-works" className="border-y border-gray-200 bg-white"><div className="mx-auto max-w-6xl px-5 py-16 lg:px-8"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">How it works</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">Four simple steps to a finished bill.</h2><ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{['Enter item details', 'Select membership', 'Calculate the bill', 'View final amount'].map((step, index) => <li key={step} className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">{index + 1}</span><span className="pt-1 text-sm font-medium text-gray-700">{step}</span></li>)}</ol></div></section>
    </>
  )
}

export default Home
