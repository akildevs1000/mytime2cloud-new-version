import React from 'react';
import { LayoutDashboard, Palmtree, Timer, CreditCard } from 'lucide-react';

const LiveInsightSidebar = () => {
    const scheduleData = [
        { day: 'Mon', type: 'full', dutySlots: [37.5, 58.3] },
        { day: 'Tue', type: 'full', dutySlots: [37.5, 58.3] },
        { day: 'Wed', type: 'full', dutySlots: [37.5, 58.3] },
        { day: 'Thu', type: 'full', dutySlots: [37.5, 58.3] },
        { day: 'Fri', type: 'full', dutySlots: [37.5, 58.3] },
        { day: 'Sat', type: 'half', dutySlots: [37.5] },
        { day: 'Sun', type: 'off', dutySlots: [] },
    ];

    return (
        <>
            {/* Header */}
            <h3 className="text-lg font-bold text-gray-600 dark:text-slate-300   flex items-center gap-2 sticky top-0 bg-transparent pb-2">
                <LayoutDashboard className="w-5 h-5 text-emerald-400" />
                Live Insight
            </h3>

            {/* Insight Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
                {/* Weekly Off Card */}
                <div className="bg-white/5 border dark:border-white/10 rounded-xl p-4 flex flex-col justify-between h-28 relative overflow-hidden group hover:bg-white/10 transition-all">
                    <Palmtree className="absolute -top-2 -right-2 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity text-gray-600 dark:text-slate-300" />
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Weekly Off</span>
                    <div>
                        <span className="text-2xl font-bold text-gray-600 dark:text-slate-300">Sunday</span>
                        <p className="text-xs text-emerald-400 mt-1">Saturday (Half)</p>
                    </div>
                </div>

                {/* Grace Period Card */}
                <div className="bg-white/5 border dark:border-white/10 rounded-xl p-4 flex flex-col justify-between h-28 relative overflow-hidden group hover:bg-white/10 transition-all">
                    <Timer className="absolute -top-2 -right-2 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity text-gray-600 dark:text-slate-300" />
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Grace Period</span>
                    <div>
                        <span className="text-2xl font-bold text-gray-600 dark:text-slate-300">15 <span className="text-sm font-normal text-slate-400">mins</span></span>
                        <p className="text-xs text-orange-400 mt-1">Late mark enabled</p>
                    </div>
                </div>

                {/* Overtime Card */}
                <div className="bg-white/5 border dark:border-white/10 rounded-xl p-4 flex flex-col justify-between h-28 col-span-2 relative overflow-hidden group hover:bg-white/10 transition-all">
                    <CreditCard className="absolute -top-2 -right-2 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity text-gray-600 dark:text-slate-300" />
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overtime Threshold</span>
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
                    </div>
                    <div className="flex gap-8 mt-2">
                        <div>
                            <span className="text-2xl font-bold text-gray-600 dark:text-slate-300">Pre</span>
                            <p className="text-xs text-slate-400">Before 09:00</p>
                        </div>
                        <div className="w-px bg-white/10 h-full" />
                        <div>
                            <span className="text-2xl font-bold text-gray-600 dark:text-slate-300">Post</span>
                            <p className="text-xs text-slate-400">After 18:00</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Schedule Preview Section */}
            <div className="flex flex-col gap-4 mt-2">
                <div className="flex justify-between items-end">
                    <h4 className="text-sm font-bold text-gray-600 dark:text-slate-300">Weekly Schedule Preview</h4>
                    <span className="text-[10px] text-slate-500">24H Timeline</span>
                </div>

                <div className="space-y-3 dark:bg-black/20 p-4 rounded-xl border dark:border-white/5">
                    {/* Timeline Labels */}
                    <div className="flex text-[10px] text-slate-500 justify-between pl-10 pr-2 pb-2 border-b border-white/5">
                        <span>00:00</span>
                        <span>06:00</span>
                        <span>12:00</span>
                        <span>18:00</span>
                        <span>23:59</span>
                    </div>

                    {/* Schedule Bars */}
                    {scheduleData.map((item) => (
                        <div key={item.day} className={`flex items-center gap-3 group ${item.type === 'off' ? 'opacity-40' : ''}`}>
                            <span className={`text-xs font-medium w-7 ${item.type === 'half' ? 'text-blue-400' : 'text-gray-600 dark:text-slate-300'}`}>
                                {item.day}
                            </span>
                            <div className="flex-1 h-2.5 bg-obsidian dark:bg-slate-800 rounded-full overflow-hidden relative border border-border">
                                {item.dutySlots.map((leftPos, idx) => (
                                    <div
                                        key={idx}
                                        className={`absolute h-full w-[16.6%] shadow-lg ${item.type === 'half'
                                            ? 'bg-blue-500 shadow-blue-500/40'
                                            : 'bg-emerald-500 shadow-emerald-500/40'
                                            }`}
                                        style={{ left: `${leftPos}%` }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 mt-2">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.6)]"></span>
                        Duty
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.6)]"></span>
                        Half Day
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-800 border border-slate-600"></span>
                        Off
                    </div>
                </div>
            </div>
        </>
    );
};

export default LiveInsightSidebar;