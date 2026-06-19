import React from 'react';
import { createColumnHelper, getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table';
import { Users, GraduationCap, Calendar, TrendingUp } from 'lucide-react';
import data from '../Data.json'


const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('id', {
    header: "ID",
  }),
  columnHelper.accessor('name', {
    header: "Student Name",
  }),
  columnHelper.accessor('gpa', {
    header: "GPA",
  }),
  columnHelper.accessor('month', {
    header: "Enrollment Month",
  }),
];

const Dashboard = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="space-y-8 p-1">
      {/* Upper Section: Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Overview Dashboard</h1>
        <p className="text-sm text-zinc-500">Track student records, academic performance, and batch growth metrics.</p>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <span className="text-sm font-medium text-zinc-500">Total Enrolled</span>
            <Users className="h-4 w-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-900">36</div>
          <p className="text-xs text-zinc-400">+12% from last semester</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <span className="text-sm font-medium text-zinc-500">Average GPA</span>
            <GraduationCap className="h-4 w-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-900">3.51</div>
          <p className="text-xs text-green-600 font-medium">↑ Exceptional standing</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <span className="text-sm font-medium text-zinc-500">Active Batches</span>
            <Calendar className="h-4 w-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-900">12 Months</div>
          <p className="text-xs text-zinc-400">Year-round intake active</p>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <span className="text-sm font-medium text-zinc-500">Retention Rate</span>
            <TrendingUp className="h-4 w-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-900">98.4%</div>
          <p className="text-xs text-zinc-400">Institutional record high</p>
        </div>
      </div>

      
    </div>
  );
};

export default Dashboard;