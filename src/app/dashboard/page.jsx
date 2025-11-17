import RevenueChart from '../ui/dashboard/revenue-chart';
import LatestInvoices from '../ui/dashboard/latest-invoices';
import { fetchCardData } from '../lib/data';

// Import the Card component directly
function Card({ title, value, type }) {
  const iconMap = {
    collected: '💰',
    customers: '👥',
    pending: '⏰',
    invoices: '📄',
  };

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <span className="text-2xl">{iconMap[type]}</span>
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
        {value}
      </p>
    </div>
  );
}

export default async function Page() {
  const cardData = await fetchCardData();

  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={cardData.totalPaidInvoices} type="collected" />
        <Card title="Pending" value={cardData.totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={cardData.numberOfInvoices} type="invoices" />
        <Card title="Total Customers" value={cardData.numberOfCustomers} type="customers" />
      </div>
      
      <div className="mt-6 grid gap-6">
        <RevenueChart />
        <LatestInvoices />
      </div>
    </main>
  );
}