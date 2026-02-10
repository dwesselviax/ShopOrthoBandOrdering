import { Twitter, Youtube, Facebook } from 'lucide-react'

const FOOTER_SECTIONS = [
  {
    title: 'Customer Support',
    links: ['Contact Us', 'Help & FAQs'],
  },
  {
    title: 'Your Account',
    links: [
      'Manage Payments',
      'Order History',
      'Order Favorites',
      'Account Details',
      'Terms & Conditions',
    ],
  },
  {
    title: 'About Us',
    links: ['Solventum Oral Care', 'About Solventum', 'Solventum Worldwide'],
  },
]

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-sol-gray bg-sol-light-gray font-solve">
      {/* Main footer */}
      <div className="mx-auto grid max-w-7xl grid-cols-4 gap-8 px-6 py-10">
        {FOOTER_SECTIONS.map((section) => (
          <div key={section.title}>
            <h3 className="mb-3 text-xs font-bold tracking-widest text-sol-dark-green uppercase">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-sol-text-gray transition-colors hover:text-sol-hyperlink-teal"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="mb-3 text-xs font-bold tracking-widest text-sol-dark-green uppercase">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <a href="#" className="text-sol-dark-green transition-colors hover:text-sol-hyperlink-teal" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-sol-dark-green transition-colors hover:text-sol-hyperlink-teal" aria-label="YouTube">
              <Youtube size={20} />
            </a>
            <a href="#" className="text-sol-dark-green transition-colors hover:text-sol-hyperlink-teal" aria-label="Facebook">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-sol-gray bg-sol-dark-green">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <span className="text-sm font-medium text-white">
            Solventum <span className="font-light text-white/70">Oral Care</span>
          </span>
          <div className="flex items-center gap-4 text-sm text-white/70">
            <a href="#" className="transition-colors hover:text-white">Legal</a>
            <span>|</span>
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
            <span>|</span>
            <a href="#" className="transition-colors hover:text-white">Consent</a>
            <span className="ml-4">&copy; Solventum 2026. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
