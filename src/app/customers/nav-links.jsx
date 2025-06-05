'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { HomeIcon, UsersIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Customers', href: '/customers', icon: UsersIcon },
  { name: 'Invoices', href: '/invoices', icon: DocumentTextIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md',
              {
                'bg-gray-100 text-blue-600': isActive,
                'text-gray-700 hover:bg-gray-50': !isActive,
              }
            )}
          >
            <link.icon className="h-5 w-5" />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}
