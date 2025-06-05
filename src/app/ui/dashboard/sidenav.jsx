'use client';

import Link from 'next/link';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Customers', href: '/customers' },
  { name: 'Invoices', href: '/invoices' },
];

export default function SideNav() {
  return (
    <nav className="p-4 bg-gray-100 h-full">
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="text-blue-600 hover:underline">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
