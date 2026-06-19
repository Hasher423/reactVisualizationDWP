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
    <div className="w-full h-screen bg-[#f2efe9] text-neutral-900 font-mono tracking-tight p-4 md:p-6 lg:p-8 space-y-8">
      <div className="border-b-2 border-zinc-950 pb-4">
        <h1 className="text-xl md:text-2xl font-black uppercase tracking-wider text-zinc-900">OVERVIEW_DASHBOARD</h1>
        <p className="text-xs md:text-sm font-semibold text-zinc-500 mt-1">TRACK STUDENT RECORDS, ACADEMIC PERFORMANCE, AND BATCH GROWTH METRICS.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white border-2 border-zinc-950 p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Total Enrolled</span>
            <Users className="h-4 w-4 text-zinc-900" />
          </div>
          <div className="text-3xl font-black text-zinc-900 my-2">36</div>
          <p className="text-[10px] font-bold uppercase text-zinc-400">+12% from last semester</p>
        </div>

        <div className="bg-white border-2 border-zinc-950 p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Average GPA</span>
            <GraduationCap className="h-4 w-4 text-zinc-900" />
          </div>
          <div className="text-3xl font-black text-zinc-900 my-2">3.51</div>
          <p className="inline-block px-1.5 py-[1px] text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
            ↑ Exceptional standing
          </p>
        </div>

        <div className="bg-white border-2 border-zinc-950 p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Active Batches</span>
            <Calendar className="h-4 w-4 text-zinc-900" />
          </div>
          <div className="text-3xl font-black text-zinc-900 my-2">12 Months</div>
          <p className="text-[10px] font-bold uppercase text-zinc-400">Year-round intake active</p>
        </div>

        <div className="bg-white border-2 border-zinc-950 p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Retention Rate</span>
            <TrendingUp className="h-4 w-4 text-zinc-900" />
          </div>
          <div className="text-3xl font-black text-zinc-900 my-2">98.4%</div>
          <p className="text-[10px] font-bold uppercase text-zinc-400">Institutional record high</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;