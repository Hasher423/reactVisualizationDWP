import React, { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import data from '../Data.json';

const columns = [
    {
        accessorKey: "id",
        header: "Student ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "gpa",
        header: "GPA",
    },
    {
        accessorKey: "month",
        header: "Date",
    },
];

const Students = () => {
    const { searchMonth } = useOutletContext();

    const [selectedHeader, setSelectedHeader] = useState("id");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = useMemo(() => {
        return data.filter(student => {
            // 1. Filter by global context (Admission Month) if it exists
            if (searchMonth && !student.month.toLowerCase().includes(searchMonth.toLowerCase())) {
                return false;
            }

            // 2. Filter by the selected dropdown header and input query
            if (searchQuery.trim() !== "") {
                console.log(searchQuery);

                const targetValue = String(student[selectedHeader] || "").toLowerCase();
                return targetValue.includes(searchQuery.toLowerCase());
            }

            return true;
        });
    }, [searchMonth, selectedHeader, searchQuery]);

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        // Change your top-level div to this:
        <div className="w-full bg-[#beb197] min-h-screen text-neutral-900 font-mono tracking-tight p-4 md:p-6 lg:p-8">
            {/* Simple Dropdown Select & Search Input Container */}
            <div className="max-w-xl flex items-center bg-white border-2 border-zinc-950 overflow-hidden transition-all focus-within:translate-x-[-2px] focus-within:translate-y-[-2px] focus-within:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] mb-6">

                {/* Dropdown styling - Highly technical, flat corners */}
                <div className="w-[40%] relative border-r-2 border-zinc-950 bg-zinc-100">
                    <select
                        name="headers"
                        id="headers"
                        value={selectedHeader}
                        onChange={(e) => setSelectedHeader(e.target.value)}
                        className="w-full appearance-none bg-transparent px-4 py-2 text-xs lg:text-sm font-bold uppercase tracking-wider text-zinc-900 outline-none cursor-pointer pr-8"
                    >
                        <option value="id" className="bg-white text-zinc-900 font-semibold">ID No.</option>
                        <option value="name" className="bg-white text-zinc-900 font-semibold">Student Name</option>
                        <option value="gpa" className="bg-white text-zinc-900 font-semibold">GPA Metric</option>
                        <option value="month" className="bg-white text-zinc-900 font-semibold">Date</option>
                    </select>
                    {/* Custom geometric arrow indicator */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-950 font-bold text-xs">
                        ▼
                    </div>
                </div>

                {/* Input area styled with 1px precise touch feeling */}
                <input
                    className="w-[60%] px-4 py-2 text-sm text-zinc-900 font-semibold bg-white outline-none placeholder-zinc-400"
                    type="text"
                    placeholder={`Filter by: [ ${columns.find(c => c.accessorKey === selectedHeader)?.header.toUpperCase()} ]`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Table Block with Hard Shadow Offset */}
            <div className="w-full max-h-[calc(100vh-120px)] overflow-x-auto overflow-y-auto border-2 border-zinc-950 bg-white shadow-[8px_8px_0px_0px_rgba(24,24,27,1)]">
                <table className="w-full min-w-[900px] border-collapse text-left text-sm text-zinc-900">

                    {/* Sticky Editorial Header */}
                    <thead className="sticky top-0 z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="bg-zinc-900 border-b-2 border-zinc-950">
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-6 py-3 text-xs font-black uppercase tracking-widest text-zinc-100 bg-zinc-900"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    {/* Brutalist Data Grid Rows */}
                    <tbody className="divide-y-2 divide-zinc-950 ">
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="bg-[#cac9c6] hover:bg-zinc-100/70 transition-colors  group"
                                >
                                    {row.getVisibleCells().map((cell) => {

                                        const isCurrentFilterColumn = cell.column.id === selectedHeader;

                                        return (
                                            <td
                                                key={cell.id}
                                                className="px-6 py-2 whitespace-nowrap font-medium border-r border-zinc-200 last:border-r-0 "
                                            >
                                                <span className={`
                                            inline-block px-2 py-[1px] font-mono text-xs lg:text-sm tracking-tight transition-all
                                            ${isCurrentFilterColumn && searchQuery
                                                        ? "bg-emerald-300 text-zinc-950 font-bold border border-zinc-950 shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                                                        : "text-zinc-900 font-extrabold"
                                                    }
                                        `}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </span>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-16 text-center text-xs lg:text-sm font-bold uppercase tracking-wider text-zinc-400 bg-zinc-50"
                                >
                            // ZERO_RECORDS_FOUND_MATCHING_CRITERIA
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Students;