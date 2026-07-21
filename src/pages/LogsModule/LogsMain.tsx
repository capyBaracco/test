<<<<<<< HEAD
import React, { useMemo, useState } from "react";
import { SidebarNavigationSection } from "../../components/SidebarNavigationSection";
import { useAuth } from "../../Hooks/useAuth";

import LogsHeaderSection from "./LogsHeaderSection";
import LogsFilterSection from "./LogsFilterSection";
import LogsStatsSection from "./LogsStatsSection";
import LogsTableSection from "./LogsTableSection";

export interface LogItem {
  timestamp: string;
  user: string;
  type: string;
  action: string;
  details: string;
}

export default function LogsMain() {
  const { role } = useAuth();

  const userRole =
    (role ?? "custodian") as React.ComponentProps<
      typeof SidebarNavigationSection
    >["userRole"];

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");

  const logs: LogItem[] = [
    {
      timestamp: "2024-05-17 14:32:15",
      user: "Sarah Admin",
      type: "Asset",
      action: "Asset Created",
      details:
        "Created new asset: Olympic Barbell #46 in Powerlifting Area",
    },
    {
      timestamp: "2024-05-17 14:15:42",
      user: "John Custodian",
      type: "Maintenance",
      action: "Maintenance Completed",
      details:
        "Completed maintenance verification for Mezzanine zone with photo evidence",
    },
    {
      timestamp: "2024-05-17 13:48:21",
      user: "Maria Staff",
      type: "Incident",
      action: "Incident Reported",
      details:
        "Reported new incident: Cable fraying on Cable Machine B (INC-002)",
    },
    {
      timestamp: "2024-05-17 12:22:33",
      user: "John Custodian",
      type: "Lost & Found",
      action: "Item Added",
      details:
        "Added lost item: Black Water Bottle found in Mezzanine",
    },
    {
      timestamp: "2024-05-17 11:05:18",
      user: "Sarah Admin",
      type: "User",
      action: "User Created",
      details:
        "Created new custodian account: Mike Rodriguez",
    },
  ];

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        log.user.toLowerCase().includes(search.toLowerCase()) ||
        log.type.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        log.details.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        selectedType === "All" ||
        log.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [logs, search, selectedType]);

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      <SidebarNavigationSection userRole={userRole} />

      <main className="ml-[240px] p-6">
        <div className="space-y-4">
          <LogsHeaderSection />

          <LogsFilterSection
            search={search}
            setSearch={setSearch}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <LogsStatsSection />

          <LogsTableSection logs={filteredLogs} />
        </div>
      </main>
    </div>
  );
}
=======
import React, { useState, useEffect } from 'react';
import type { StatData } from './LogsStatsSection'; 
import { LogsFilterSection }from './LogsFilterSection';
import { LogsListSection } from './LogsListSection';
import type { LogEntry } from './LogsListSection'; 
import { LogsStatsSection } from './LogsStatsSection';
import {
  InventoryIcon,
  TaskIcon,
  IncidentIcon,
  LostFoundIcon,
} from './LogsIcons';
import { useAuth } from '../../hooks/useAuth';
import { SidebarNavigationSection } from '../../components/SidebarNavigationSection';
import { useAuditLogs } from '../../hooks/useLogs';
import type { AuditLogs } from '../../types/auditLogs';
import { getDateThreshold } from '../../utils/dateHelper';

const moduleToFilterType = (moduleName: string) => {
  switch (moduleName) {
    case 'Inventory':
    case 'Asset':    
    case 'Consumable': 
      return 'Inventory';
    case 'Task':
      return 'Tasks';
    case 'Incident Report':
      return 'Incidents';
    case 'Lost And Found':
      return 'Lost & Found';
    default:
      return 'All Logs';
  }
};

const actionToFriendlyLabel = (action: string) => {
  // Convert Schema ENUMs (CREATE, UPDATE) to readable text
  switch (action) {
    case 'CREATE': return 'Created';
    case 'UPDATE': return 'Updated';
    case 'ARCHIVE': return 'Archived';
    case 'DELETE': return 'Deleted';
    case 'COMPLETE': return 'Completed';
    case 'CLAIM': return 'Claimed';
    default: return action; // Fallback to raw string
  }
};

const moduleToEntryIcon = (moduleName: string) => {
  switch (moduleName) {
    case 'Inventory':
    case 'Asset':
    case 'Consumable': 
      return <InventoryIcon />;
    case 'Task': 
      return <TaskIcon />;
    case 'Incident Report': 
      return <IncidentIcon />;
    case 'Lost And Found': 
      return <LostFoundIcon />;
    default: 
      return <InventoryIcon />; // Default fallback
  }
};

const moduleToEntryBg = (moduleName: string) => {
  switch (moduleName) {
    case 'Inventory': return 'bg-blue-50';
    case 'Task': return 'bg-[#e6f9f0]';
    case 'Incident Report': return 'bg-red-50';
    case 'Lost And Found': return 'bg-purple-50';
    default: return 'bg-blue-50';
  }
};


export const LogsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All Logs');
  const [dateRange, setDateRange] = useState('Last 7 Days'); // for dates
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const { logs: rawLogs, isLoading, error } = useAuditLogs();
  const [stats, setStats] = useState<StatData[]>([
    { label: 'Inventory Logs', count: 0, icon: <InventoryIcon />, bg: 'bg-blue-50', color: ''},
    { label: 'Task Logs', count: 0, icon: <TaskIcon />, bg: 'bg-[#e6f9f0]', color: '' },
    { label: 'Incident Logs', count: 0, icon: <IncidentIcon />, bg: 'bg-red-50', color: '' },
    { label: 'Lost & Found Logs', count: 0, icon: <LostFoundIcon />, bg: 'bg-purple-50', color: '' },
  ]);

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isLoading && rawLogs) {
    const formattedLogs: LogEntry[] = rawLogs.map((log: any) => ({
        id: log._id,
        type: moduleToFilterType(log.module),
        title: `${actionToFriendlyLabel(log.action)} ${log.module}`,
        description: log.details || 'No additional details',
        performedBy: log.performedBy || null,
        rawDate: log.createdAt, 
        timestamp: new Date(log.createdAt).toLocaleString('en-PH', { 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        icon: moduleToEntryIcon(log.module),
        bg: moduleToEntryBg(log.module),   
  }));

    setLogs(formattedLogs);

    // Calculate Stats
    const counts = (rawLogs as AuditLogs[]).reduce<Record<string, number>>((acc, log) => {
      acc[log.module] = (acc[log.module] ?? 0) + 1;
      return acc;
  }, {});

    setStats([
      { 
        label: 'Inventory Logs', 
        count: (counts.Inventory ?? 0) + (counts.Asset ?? 0) + (counts.Consumable ?? 0), 
        icon: <InventoryIcon />, 
        bg: 'bg-blue-50', 
        color: '' 
      },
      { label: 'Task Logs', count: counts.Task ?? 0, icon: <TaskIcon />, bg: 'bg-[#e6f9f0]', color: '' },
      { label: 'Incident Logs', count: counts.IncidentReport ?? 0, icon: <IncidentIcon />, bg: 'bg-red-50', color: '' },
      { label: 'Lost & Found Logs', count: counts.LostAndFound ?? 0, icon: <LostFoundIcon />, bg: 'bg-purple-50', color: '' },
    ]);

    setLoading(false); // Stop showing the loading spinner
  }
}, [rawLogs, isLoading]);

  const { role } = useAuth()
  const userRole = (role ?? 'custodian') as React.ComponentProps<typeof SidebarNavigationSection>["userRole"]

// filter logs by date range
const isYesterday = dateRange === 'Yesterday';

const threshold = getDateThreshold(
  dateRange,
  customStart ? new Date(customStart) : null
);
const endDate = customEnd ? new Date(customEnd) : null;

const dateFilteredLogs = logs.filter(log => {
  const logDate = new Date(log.rawDate);

  const matchesStart = threshold ? logDate >= threshold : true;

  const matchesEnd = isYesterday
    ? logDate < new Date(new Date().setHours(0, 0, 0, 0))
    : endDate
      ? logDate <= new Date(new Date(customEnd).setHours(23, 59, 59, 999))
      : true;

  return matchesStart && matchesEnd;
});

  return (
    <div className="flex h-screen bg-[#f4f5f6] overflow-hidden">
      <div className="w-64 shrink-0">
        <SidebarNavigationSection userRole={userRole}/>
      </div>
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-start mb-8 w-full">
          <div>
            <h1 className="[font-family:'Poppins',Helvetica] text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight">Activity Logs</h1>
            <p className="[font-family:'Poppins',Helvetica] text-gray-500 text-sm mt-0.5">View all system activities and changes</p>
          </div>
        </header>
        <LogsStatsSection stats={stats} />
        <div className="mt-8 mb-6">
          <LogsFilterSection 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter}
            dateRange={dateRange}
            setDateRange={setDateRange}
            customStart={customStart}
            setCustomStart={setCustomStart}
            customEnd={customEnd}
            setCustomEnd={setCustomEnd}
          />
        </div>
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading activities...</div>
        ) : (
          <div className="space-y-4"> 
            <LogsListSection 
              logs={dateFilteredLogs} 
              activeFilter={activeFilter}
              dateRange={dateRange}
              customStart={customStart}
              customEnd={customEnd}
            />
          </div>
        )}
      </main>
    </div>
  );
};
>>>>>>> 3b4f0450ecf1bd65bea1da84344f89734a1eaeca
