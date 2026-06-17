import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom'; // 1. Import the outlet context hook
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
        header: "Admission Month",
    },
];

const Students = () => {

    const { searchMonth } = useOutletContext();

    const filteredData = useMemo(() => {

        if (!searchMonth) return data;

        return data.filter(student => 
            student.month.toLowerCase().includes(searchMonth.toLowerCase())
        );
    }, [searchMonth]); 

    const table = useReactTable({
        data: filteredData, 
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-full overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
            <table className="w-full border-collapse text-left text-sm text-zinc-600">

                {/* Table Header Section */}
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className="border-b border-zinc-200 bg-zinc-50/75 transition-colors">
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-zinc-500"
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                {/* Table Body Section */}
                <tbody className="divide-y divide-zinc-100">
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map(row => (
                            <tr
                                key={row.id}
                                className="group border-b border-zinc-100 bg-white last:border-none hover:bg-zinc-50/60 transition-colors duration-150"
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className="px-6 py-4 text-zinc-700 whitespace-nowrap font-medium"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        /* Clean Fallback empty-state view for missed queries */
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-10 text-center text-sm text-zinc-400 font-normal">
                                No student admissions records found matching "{searchMonth}"
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    );
};

export default Students;