"use client";

import AbsenceTypeChart from '@/components/Charts/Absent';
import ChartAttendance from '@/components/Charts/Attendance';
import Attendance from '@/components/Dashboard/Attendance';
import Cards from '@/components/Dashboard/Cards';
import LiveLogs from '@/components/Dashboard/LiveLogs';


export default function Home() {

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="text-4xl font-extrabold text-gray-800 mb-5">
        Attendance Overview
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Cards />
      </div>

      <h2 className="text-2xl font-bold text-gray-700 mb-5">Monthly Trends</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

        {/* Chart 1: Daily Punctuality Trend (Line Chart) */}
        <div className="bg-white p-6 rounded-xl shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Punctuality Over 7 Days</h3>
          <ChartAttendance />
        </div>

        {/* Chart 2: Absence Type Breakdown (Pie/Donut Chart) */}
        <div className="bg-white p-6 rounded-xl shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Absence Type Breakdown (MTD)</h3>
          <AbsenceTypeChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Attendance />
        <LiveLogs />
      </div>

    </div>
  );
}