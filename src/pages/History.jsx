import { useEffect, useState } from 'react'
import BillSummary from '../components/BillSummary'
import BillTable from '../components/BillTable'
import { deleteBill, getBills } from '../services/billingService'

function History({ navigate }) {
  const [bills, setBills] = useState([])
  const [selectedBill, setSelectedBill] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const loadBills = async () => {
    try {
      setBills(await getBills())
      setError('')
    } catch (requestError) {
      setError(requestError.code === 'server_unavailable' ? 'Unable to connect to the server. Please try again.' : 'Unable to load bill history.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const requestId = setTimeout(() => loadBills(), 0)
    return () => clearTimeout(requestId)
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteBill(id)
      setBills((currentBills) => currentBills.filter((bill) => bill.id !== id))
      if (selectedBill?.id === id) setSelectedBill(null)
    } catch (requestError) {
      setError(requestError.code === 'server_unavailable' ? 'Unable to connect to the server. Please try again.' : 'Unable to delete this bill.')
    }
  }

  return <section className="mx-auto max-w-6xl px-5 py-12 sm:py-16 lg:px-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Saved bills</p><h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Bill History</h1><p className="mt-3 text-base leading-7 text-gray-500">Review bills created through SmartBill.</p></div><button type="button" onClick={() => navigate('/billing')} className="w-fit rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-700">Create Bill</button></div>{error && <p role="alert" className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}{isLoading ? <p className="mt-10 text-sm text-gray-500">Loading bills...</p> : <div className="mt-10"><BillTable bills={bills} onView={setSelectedBill} onDelete={handleDelete} /></div>}{selectedBill && <div className="mt-8 max-w-md"><BillSummary result={{ ...selectedBill, membership: selectedBill.membership_label || selectedBill.membership, final_amount: selectedBill.final_amount }} /></div>}</section>
}

export default History
