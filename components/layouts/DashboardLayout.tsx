// File: components/layouts/DashboardLayout.tsx

import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
