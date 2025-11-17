'use client';

import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useFormState, useFormStatus } from 'react-dom';
import { logout } from 'app/lib/actions';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Customers', href: '/customers' },
  { name: 'Invoices', href: '/invoices' },
];

export default function SideNav() {
  return (
    <nav className="p-4 bg-gray-100 h-full flex flex-col">
      <ul className="space-y-2 flex-grow">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="text-blue-600 hover:underline">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <LogoutForm />
    </nav>
  );
}

function LogoutForm() {
  const [errorMessage, dispatch] = useFormState(logout, undefined);
  
  return (
    <form action={dispatch}>
      <LogoutButton />
    </form>
  );
}

function LogoutButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      disabled={pending}
      className="flex h-[48px] w-full items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
    >
      <PowerIcon className="w-6" />
      <div>Sign Out</div>
    </button>
  );
}