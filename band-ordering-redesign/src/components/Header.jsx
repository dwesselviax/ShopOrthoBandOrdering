import { useState } from 'react'
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  ChevronDown,
  Globe,
  LogOut,
  HelpCircle,
} from 'lucide-react'

const NAV_ITEMS = [
  {
    label: 'Your Products',
    children: [
      { label: 'Order Favorites', href: '#' },
      { label: 'Saved Carts', href: '#' },
      { label: 'Order Bands', href: '#', active: true },
      { label: 'Order History', href: '#' },
      { label: 'Quick Order', href: '#' },
    ],
  },
  { label: 'Shop Catalog', children: [] },
  { label: 'Order History', href: '#' },
  { label: 'Manage Payments', href: '#' },
]

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null)

  function handleToggle(idx) {
    setOpenMenu(openMenu === idx ? null : idx)
  }

  return (
    <header className="font-solve border-b border-sol-gray">
      {/* Top utility bar */}
      <div className="bg-sol-dark-green text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-6 px-6 py-2 text-sm">
          <button className="flex items-center gap-1.5 text-white/90 transition-colors hover:text-white">
            <Globe size={14} />
            EN
            <ChevronDown size={12} />
          </button>
          <a href="#" className="text-white/90 transition-colors hover:text-white">
            Customer Support
          </a>
          <button className="flex items-center gap-1.5 text-white/90 transition-colors hover:text-white">
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>

      {/* Main header bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <SolventumLogo />
        </a>

        {/* Search */}
        <div className="relative mx-8 max-w-lg flex-1">
          <Search
            size={18}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-sol-dark-gray"
          />
          <input
            type="text"
            placeholder="Search Catalog"
            className="w-full rounded-md border border-sol-gray bg-sol-light-gray py-2.5 pr-4 pl-10 font-solve text-sm text-sol-text-gray placeholder:text-sol-dark-gray focus:border-sol-hyperlink-teal focus:ring-1 focus:ring-sol-hyperlink-teal focus:outline-none"
          />
        </div>

        {/* Utility icons */}
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2 text-sol-dark-green transition-colors hover:text-sol-hyperlink-teal">
            <User size={20} />
            <span className="text-sm font-medium">Your Account</span>
            <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 text-sol-dark-green transition-colors hover:text-sol-hyperlink-teal">
            <Heart size={20} />
            <span className="text-sm font-medium">Favorites</span>
          </button>
          <button className="flex items-center gap-2 text-sol-dark-green transition-colors hover:text-sol-hyperlink-teal">
            <ShoppingCart size={20} />
            <span className="text-sm font-medium">Cart | 25 items</span>
          </button>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="border-t border-sol-gray">
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-6">
          {NAV_ITEMS.map((item, idx) => (
            <div key={item.label} className="relative">
              {item.children ? (
                <>
                  <button
                    onClick={() => handleToggle(idx)}
                    className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-sol-dark-green transition-colors hover:text-sol-hyperlink-teal"
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${openMenu === idx ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openMenu === idx && item.children.length > 0 && (
                    <div className="absolute top-full left-0 z-50 min-w-[200px] rounded-b-md border border-sol-gray bg-white shadow-lg">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            child.active
                              ? 'bg-sol-light-teal font-bold text-sol-dark-green'
                              : 'text-sol-text-gray hover:bg-sol-light-gray'
                          }`}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  className="block px-4 py-3 text-sm font-medium text-sol-dark-green transition-colors hover:text-sol-hyperlink-teal"
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </div>
        {/* Brand accent bar */}
        <div className="h-1 bg-gradient-to-r from-sol-brand-green via-sol-medium-teal to-sol-teal" />
      </nav>
    </header>
  )
}

function SolventumLogo() {
  return (
    <svg width="180" height="32" viewBox="0 0 180 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text
        x="0"
        y="24"
        fontFamily="'Solve Pro', Inter, system-ui, sans-serif"
        fontWeight="800"
        fontSize="24"
        fill="#01332b"
        letterSpacing="-0.5"
      >
        Solventum
      </text>
      <text
        x="0"
        y="31"
        fontFamily="'Solve Pro', Inter, system-ui, sans-serif"
        fontWeight="400"
        fontSize="7"
        fill="#3c3e3f"
        letterSpacing="1.5"
      >
        ORAL CARE
      </text>
    </svg>
  )
}
