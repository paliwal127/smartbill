import { useState } from 'react'
import BillForm from '../components/BillForm'
import BillSummary from '../components/BillSummary'

const emptyResult = { subtotal: 0, membership: 'Newbie', discount: 0, final_amount: 0 }

function Billing() {
  const [result, setResult] = useState(emptyResult)
  const [error, setError] = useState('')

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:py-16 lg:px-8"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Billing workspace</p><h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create a Bill</h1><p className="mt-3 text-base leading-7 text-gray-500">Enter the item details below to calculate the customer's final amount.</p></div>{error && <p role="alert" className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}<div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start"><BillForm onResult={setResult} onError={setError} /><BillSummary result={result} /></div></section>
  )
}

export default Billing
