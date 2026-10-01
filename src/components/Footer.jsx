function Footer({ navigate }) {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-7 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <p className="font-semibold text-gray-900">SmartBill</p>
          <p className="mt-1">Simple billing for everyday business.</p>
        </div>
        <div className="flex gap-5">
          <button type="button" onClick={() => navigate('/')} className="hover:text-gray-900">Home</button>
          <button type="button" onClick={() => navigate('/billing')} className="hover:text-gray-900">Billing</button>
          <button type="button" onClick={() => navigate('/history')} className="hover:text-gray-900">History</button>
          <button type="button" onClick={() => navigate('/about')} className="hover:text-gray-900">About</button>
        </div>
        <p>© 2026 SmartBill. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
