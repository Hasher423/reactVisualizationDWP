import React, { useEffect, useRef } from 'react';
import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import data from '../Data.json'
import { useOutletContext } from 'react-router-dom';

const Analytics = () => {

    const context = useOutletContext() || {};
    const isCollapsed = context.isCollapsed || false;

    const barChartRef = useRef(null);
    const lineChartRef = useRef(null);

    useEffect(() => {
        if (barChartRef.current) barChartRef.current.getEchartsInstance().resize();
        if (lineChartRef.current) lineChartRef.current.getEchartsInstance().resize();
    }, [isCollapsed])


    const enrollmentChartData = useMemo(() => {
        const counter = {}
        const gpaSum = {}

        data.forEach(student => {
            const monthName = student.month;

            if (counter[monthName] == undefined) {
                counter[monthName] = 1
            } else {
                counter[monthName] += 1
            }

            if (gpaSum[monthName] == undefined) {
                gpaSum[monthName] = { total: student.gpa, count: 1 }
            } else {
                gpaSum[monthName].total += student.gpa;
                gpaSum[monthName].count += 1;
            }
        })
        const monthsArray = Object.keys(counter);

        return {
            dynamicMonths: Object.keys(counter),
            dynamicCounts: Object.values(counter),
            avgGpa: monthsArray.map(month => (
                Number((gpaSum[month].total / gpaSum[month].count).toFixed(2))
            ))
        }

    }, [])

    const option = {
        // Shows a data popup box when you hover your cursor over a bar
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: enrollmentChartData.dynamicMonths,
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'New Enrollments',
                data: enrollmentChartData.dynamicCounts,
                type: 'bar',
                itemStyle: {
                    color: '#3b82f6'
                }
            }
        ]
    };

    const lineChartOption = {
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: enrollmentChartData.dynamicMonths,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: 'Average GPA',
                data: enrollmentChartData.avgGpa,
                type: 'line',
                smooth: true,
                itemStyle: {
                    color: '#10b981'
                }
            }
        ]
    };


    return (
        <div className="mx-auto max-w-5xl  sm:p-6">

            <div className="grid gap-8 md:grid-cols-2">

                <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
                    <div className="mb-4">
                        <h3 className="text-base font-semibold text-zinc-900 tracking-tight">Monthly Enrollment</h3>
                        <p className="text-xs text-zinc-500 mt-0.5">A simple count of students who joined each batch.</p>
                    </div>

                    <div className="h-72 w-full">
                        <ReactECharts
                            ref={barChartRef}
                            option={option}
                            style={{ height: '100%', width: '100%' }} />
                    </div>
                </div>

                {/* Chart Block 2: Performance */}
                <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
                    <div className="mb-4">
                        <h3 className="text-base font-semibold text-zinc-900 tracking-tight">Academic Standing Trends</h3>
                        <p className="text-xs text-zinc-500 mt-0.5">The dynamic performance average of class GPAs grouped by intake cycle.</p>
                    </div>
                    {/* Height container with optimal aspect ratio */}
                    <div className="h-72 w-full">
                        <ReactECharts
                            ref={lineChartRef}
                            option={lineChartOption}
                            style={{ height: '100%', width: '100%' }} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Analytics;