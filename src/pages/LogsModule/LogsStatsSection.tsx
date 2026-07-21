<<<<<<< HEAD
export default function LogsStatsSection() {
  const stats = [
    { label: "Asset", value: 2 },
    { label: "Incident", value: 2 },
    { label: "Maintenance", value: 1 },
    { label: "Lost & Found", value: 1 },
    { label: "User", value: 1 },
    { label: "System", value: 1 },
  ];

  return (
    <div className="grid grid-cols-6 gap-3">
      {stats.map((item) => (
        <div
          key={item.label}
          className="
            bg-white
            border
            border-[#E5E7EB]
            rounded-xl
            shadow-sm
            p-4
          "
        >
          <p className="text-[11px] text-[#64748B]">
            {item.label}
          </p>

          <p className="mt-1 text-[28px] font-semibold text-[#0F172A]">
            {item.value}
          </p>
=======
import React, { type ReactNode } from 'react';

export interface StatData {
  label: string;
  count: number;
  icon: ReactNode;
  color: string;
  bg: string;
}

interface Props {
  stats: StatData[];
}

export const LogsStatsSection: React.FC<Props> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white p-6 rounded-2xl flex items-center gap-4 border border-gray-100 shadow-sm min-w-50">
          <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center shrink-0`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 leading-none">{stat.count}</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-wider whitespace-nowrap">
              {stat.label}
            </p>
          </div>
>>>>>>> 3b4f0450ecf1bd65bea1da84344f89734a1eaeca
        </div>
      ))}
    </div>
  );
<<<<<<< HEAD
}
=======
};
>>>>>>> 3b4f0450ecf1bd65bea1da84344f89734a1eaeca
