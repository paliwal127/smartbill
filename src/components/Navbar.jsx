function Navbar({ currentPath, navigate }) {
  const links = [
    { label: 'Home', path: '/' },
    { label: 'Billing', path: '/billing' },
    { label: 'History', path: '/history' },
    { label: 'About', path: '/about' },
  ]

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
        <button type="button" onClick={() => navigate('/')} className="text-lg font-bold tracking-tight text-gray-900">
          SmartBill
        </button>
        <nav className="flex items-center gap-3 sm:gap-7" aria-label="Main navigation">
          {links.map((link) => (
            <button key={link.path} type="button" onClick={() => navigate(link.path)} className={`text-xs font-medium sm:text-sm ${currentPath === link.path ? 'text-emerald-700' : 'text-gray-500 hover:text-gray-900'}`}>
              {link.label}
            </button>
          ))}
        </nav>
        <button type="button" onClick={() => navigate('/billing')} className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700">
          Create Bill
        </button>
      </div>
    </header>
  )
}

export default Navbar
