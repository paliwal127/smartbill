import { useState } from 'react'
import { calculateBill } from '../services/billingService'

const initialValues = { itemPrice: '', quantity: '', membership: '' }

function BillForm({ onResult, onError }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isCalculating, setIsCalculating] = useState(false)

  const updateValue = (event) => setValues({ ...values, [event.target.name]: event.target.value })

  const validate = () => {
    const nextErrors = {}
    if (values.itemPrice === '') nextErrors.itemPrice = 'Please enter the item price.'
    else if (Number(values.itemPrice) <= 0) nextErrors.itemPrice = 'Item price must be greater than 0.'
    if (values.quantity === '') nextErrors.quantity = 'Please enter the quantity.'
    else if (Number(values.quantity) < 1) nextErrors.quantity = 'Quantity must be at least 1.'
    if (!values.membership) nextErrors.membership = 'Please select a membership.'
    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setIsCalculating(true)
    try {
      const result = await calculateBill({ item_price: Number(values.itemPrice), quantity: Number(values.quantity), membership: values.membership })
      onResult(result)
      onError('')
    } catch (error) {
      onError(error.code === 'server_unavailable' ? 'Unable to connect to the server. Please try again.' : 'Unable to calculate the bill. Please check your details.')
    } finally {
      setIsCalculating(false)
    }
  }

  const handleReset = () => {
    setValues(initialValues)
    setErrors({})
    onResult({ subtotal: 0, membership: 'Newbie', discount: 0, final_amount: 0 })
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
      <div className="border-b border-gray-100 pb-5"><p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Details</p><h2 className="mt-1 text-xl font-semibold text-gray-900">Bill Details</h2></div>
      <div className="space-y-5 py-6">
        <label className="block text-sm font-medium text-gray-700">Item Price<div className="relative mt-2"><span className="pointer-events-none absolute left-3 top-2.5 text-gray-400">₹</span><input name="itemPrice" type="number" min="0" step="0.01" value={values.itemPrice} onChange={updateValue} placeholder="0.00" className={`w-full rounded-md border ${errors.itemPrice ? 'border-red-400' : 'border-gray-300'} bg-white py-2.5 pl-8 pr-3 text-gray-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100`} /></div>{errors.itemPrice && <span className="mt-1.5 block text-xs font-normal text-red-600">{errors.itemPrice}</span>}</label>
        <label className="block text-sm font-medium text-gray-700">Quantity<input name="quantity" type="number" min="1" step="1" value={values.quantity} onChange={updateValue} placeholder="1" className={`mt-2 w-full rounded-md border ${errors.quantity ? 'border-red-400' : 'border-gray-300'} bg-white px-3 py-2.5 text-gray-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100`} />{errors.quantity && <span className="mt-1.5 block text-xs font-normal text-red-600">{errors.quantity}</span>}</label>
        <label className="block text-sm font-medium text-gray-700">Membership<select name="membership" value={values.membership} onChange={updateValue} className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"><option value="">Select membership</option><option value="newbie">Newbie</option><option value="silver">Silver</option><option value="gold">Gold</option><option value="platinum">Platinum</option></select>{errors.membership && <span className="mt-1.5 block text-xs font-normal text-red-600">{errors.membership}</span>}</label>
      </div>
      <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row"><button type="submit" disabled={isCalculating} className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 disabled:cursor-wait disabled:opacity-70">{isCalculating ? 'Calculating...' : 'Calculate Bill'}</button><button type="button" onClick={handleReset} className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">Reset</button></div>
    </form>
  )
}

export default BillForm
