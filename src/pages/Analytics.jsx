import React, { useEffect, useRef, useState } from 'react';
import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import data from '../Data.json';
import { useOutletContext } from 'react-router-dom';

const Analytics = () => {
    const [timeframe, setTimeframe] = useState('full-year');

    const context = useOutletContext() || {};
    const isCollapsed = context.isCollapsed || false;

    const barChartRef = useRef(null);
    const lineChartRef = useRef(null);

    useEffect(() => {
        if (barChartRef.current) barChartRef.current.getEchartsInstance().resize();
        if (lineChartRef.current) lineChartRef.current.getEchartsInstance().resize();
    }, [isCollapsed]);

    const enrollmentChartData = useMemo(() => {
        const counter = {};
        const gpaSum = {};

        const filteredData = data.filter(student => {
            if (timeframe === 'full-year') return true;
            
            if (timeframe === 'half-year') {
                const firstHalfMonths = ['January', 'February', 'March', 'April', 'May', 'June'];
                return firstHalfMonths.includes(student.month);
            }
            
            return student.month.toLowerCase() === timeframe.toLowerCase();
        });

        filteredData.forEach(student => {
            const monthName = student.month;

            if (counter[monthName] === undefined) {
                counter[monthName] = 1;
            } else {
                counter[monthName] += 1;
            }

            if (gpaSum[monthName] === undefined) {
                gpaSum[monthName] = { total: student.gpa, count: 1 };
            } else {
                gpaSum[monthName].total += student.gpa;
                gpaSum[monthName].count += 1;
            }
        });

        const monthsArray = Object.keys(counter);

        return {
            dynamicMonths: monthsArray,
            dynamicCounts: Object.values(counter),
            avgGpa: monthsArray.map(month => (
                Number((gpaSum[month].total / gpaSum[month].count).toFixed(2))
            ))
        };

    }, [timeframe]); // Recalculate values whenever timeframe updates

    const option = {
        backgroundColor: '#ffffff',
        tooltip: {
            trigger: 'axis',
            textStyle: { fontFamily: 'monospace', fontSize: 12 },
            backgroundColor: '#18181b',
            borderColor: '#18181b',
            textStyle: { color: '#ffffff' }
        },
        xAxis: {
            type: 'category',
            data: enrollmentChartData.dynamicMonths,
            axisLine: { lineStyle: { color: '#18181b', width: 2 } },
            axisLabel: { textStyle: { fontFamily: 'monospace', fontWeight: 'bold' } }
        },
        yAxis: {
            type: 'value',
            splitLine: { lineStyle: { color: '#e4e4e7', type: 'dashed' } },
            axisLabel: { textStyle: { fontFamily: 'monospace' } }
        },
        series: [
            {
                name: 'New Enrollments',
                data: enrollmentChartData.dynamicCounts,
                type: 'bar',
                itemStyle: {
                    color: '#18181b',
                    borderColor: '#18181b',
                    borderWidth: 1
                },
                emphasis: {
                    itemStyle: { color: '#34d399' }
                }
            }
        ]
    };

    const lineChartOption = {
        backgroundColor: '#ffffff',
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#18181b',
            borderColor: '#18181b',
            textStyle: { color: '#ffffff', fontFamily: 'monospace', fontSize: 12 }
        },
        xAxis: {
            type: 'category',
            data: enrollmentChartData.dynamicMonths,
            axisLine: { lineStyle: { color: '#18181b', width: 2 } },
            axisLabel: { textStyle: { fontFamily: 'monospace', fontWeight: 'bold' } }
        },
        yAxis: {
            type: 'value',
            splitLine: { lineStyle: { color: '#e4e4e7', type: 'dashed' } },
            axisLabel: { textStyle: { fontFamily: 'monospace' } }
        },
        series: [
            {
                name: 'Average GPA',
                data: enrollmentChartData.avgGpa,
                type: 'line',
                smooth: false, 
                symbol: 'square',
                symbolSize: 8,
                lineStyle: { color: '#18181b', width: 3 },
                itemStyle: { color: '#f59e0b', borderColor: '#18181b', borderWidth: 2 }
            }
        ]
    };

    return (
        <div className="mx-auto max-w-5xl w-full p-4 md:p-6 lg:p-8 font-mono tracking-tight text-zinc-900">
            
            {/* Styled Selector Component Frame */}
            <div className="max-w-xs flex items-center bg-white border-2 border-zinc-950 overflow-hidden transition-all focus-within:translate-x-[-2px] focus-within:translate-y-[-2px] focus-within:shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] mb-8 relative">
                <select
                    name="timeframe"
                    id="timeframe"
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full appearance-none bg-transparent px-4 py-2.5 text-xs lg:text-sm font-bold uppercase tracking-wider text-zinc-900 outline-none cursor-pointer pr-10"
                >
                    <option value="full-year" className="bg-white text-zinc-900 font-semibold">Full Year [JAN - DEC]</option>
                    <option value="half-year" className="bg-white text-zinc-900 font-semibold">Half Year [6 Months]</option>
                    <option value="january" className="bg-white text-zinc-900 font-semibold">January</option>
                    <option value="february" className="bg-white text-zinc-900 font-semibold">February</option>
                    <option value="march" className="bg-white text-zinc-900 font-semibold">March</option>
                    <option value="april" className="bg-white text-zinc-900 font-semibold">April</option>
                    <option value="may" className="bg-white text-zinc-900 font-semibold">May</option>
                    <option value="june" className="bg-white text-zinc-900 font-semibold">June</option>
                    <option value="july" className="bg-white text-zinc-900 font-semibold">July</option>
                    <option value="august" className="bg-white text-zinc-900 font-semibold">August</option>
                    <option value="september" className="bg-white text-zinc-900 font-semibold">September</option>
                    <option value="october" className="bg-white text-zinc-900 font-semibold">October</option>
                    <option value="november" className="bg-white text-zinc-900 font-semibold">November</option>
                    <option value="december" className="bg-white text-zinc-900 font-semibold">December</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-950 font-bold text-xs">
                    ▼
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="bg-white border-2 border-zinc-950 p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
                    <div className="mb-6 border-b border-zinc-200 pb-2">
                        <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900">Monthly Enrollment</h3>
                        <p className="text-xs font-semibold text-zinc-500 mt-1">A simple count of students who joined each batch.</p>
                    </div>
                    <div className="h-72 w-full border border-zinc-100 bg-zinc-50/50 p-2">
                        <ReactECharts
                            ref={barChartRef}
                            option={option}
                            style={{ height: '100%', width: '100%' }}
                        />
                    </div>
                </div>

                <div className="bg-white border-2 border-zinc-950 p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
                    <div className="mb-6 border-b border-zinc-200 pb-2">
                        <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900">Academic Standing Trends</h3>
                        <p className="text-xs font-semibold text-zinc-500 mt-1">The dynamic performance average of class GPAs grouped by intake cycle.</p>
                    </div>
                    <div className="h-72 w-full border border-zinc-100 bg-zinc-50/50 p-2">
                        <ReactECharts
                            ref={lineChartRef}
                            option={lineChartOption}
                            style={{ height: '100%', width: '100%' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;