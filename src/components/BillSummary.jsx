const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(amount)

function BillSummary({ result }) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
      <div className="flex items-start justify-between border-b border-gray-100 pb-5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Summary</p>
          <h2 className="mt-1 text-xl font-semibold text-gray-900">Bill Summary</h2>
        </div>
        <span className="rounded bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">INR</span>
      </div>
      <dl className="space-y-4 py-6 text-sm">
        <div className="flex justify-between gap-4"><dt className="text-gray-500">Subtotal</dt><dd className="font-medium text-gray-900">{formatCurrency(result.subtotal)}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-gray-500">Membership</dt><dd className="font-medium text-gray-900">{result.membership}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-gray-500">Discount</dt><dd className="font-medium text-emerald-700">- {formatCurrency(result.discount)}</dd></div>
      </dl>
      <div className="flex items-end justify-between border-t border-gray-200 pt-5">
        <div><p className="text-sm font-semibold text-gray-900">Amount to Pay</p><p className="mt-1 text-xs text-gray-500">After membership discount</p></div>
        <p className="text-2xl font-bold tracking-tight text-gray-900">{formatCurrency(result.final_amount)}</p>
      </div>
    </section>
  )
}

export default BillSummary
