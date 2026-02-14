import React from 'react';
import { LayoutDashboard, Palmtree, Timer, CreditCard } from 'lucide-react';
import { hhmmToMinutes } from '@/lib/utils';

const LiveInsightSidebar = ({ shift }) => {
    const week_offs = shift?.weekoff_days || [];
    const halfday_rules = shift?.halfday_rules;

    // Helper to convert "HH:mm" to percentage of a 24h day
    const getPercent = (timeStr) => {
        if (!timeStr) return 0;
        const mins = hhmmToMinutes(timeStr);
        return (mins / 1440) * 100;
    };

    const startPercent = getPercent(shift?.on_duty_time);
    const endPercent = getPercent(shift?.off_duty_time);
    const durationPercent = endPercent - startPercent;

    const scheduleData = [
        { short_key: "M", day: 'Mon' },
        { short_key: "T", day: 'Tue' },
        { short_key: "W", day: 'Wed' },
        { short_key: "Th", day: 'Thu' },
        { short_key: "F", day: 'Fri' },
        { short_key: "S", day: 'Sat' },
        { short_key: "Su", day: 'Sun' },
    ];

    return (
        <>
            {/* Header */}
            <h3 className="text-lg font-bold text-gray-600 dark:text-slate-300 flex items-center gap-2 sticky top-0 bg-transparent pb-2">
                <LayoutDashboard className="w-5 h-5 text-emerald-400" />
                Live Insight
            </h3>

            {/* Insight Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 border dark:border-white/10 rounded-xl p-4 flex flex-col justify-between h-28 relative overflow-hidden group hover:bg-white/10 transition-all">
                    <Palmtree className="absolute -top-2 -right-2 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity text-gray-600 dark:text-slate-300" />
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Weekly Off</span>
                    <div>
                        <span className="text-2xl font-bold text-gray-600 dark:text-slate-300">{shift?.weekoff_rules?.type}</span>
                    </div>
                </div>

                <div className="bg-white/5 border dark:border-white/10 rounded-xl p-4 flex flex-col justify-between h-28 relative overflow-hidden group hover:bg-white/10 transition-all">
                    <Timer className="absolute -top-2 -right-2 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity text-gray-600 dark:text-slate-300" />
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Grace Period</span>
                    <div>
                        <span className="text-2xl font-bold text-gray-600 dark:text-slate-300">
                            {hhmmToMinutes(shift.late_time)} <span className="text-sm font-normal text-slate-400">mins</span>
                        </span>
                        {hhmmToMinutes(shift.late_time) > 0 && <p className="text-xs text-orange-400 mt-1">Late mark enabled</p>}
                    </div>
                </div>

                <div className="bg-white/5 border dark:border-white/10 rounded-xl p-4 flex flex-col justify-between h-28 col-span-2 relative overflow-hidden group hover:bg-white/10 transition-all">
                    <CreditCard className="absolute -top-2 -right-2 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity text-gray-600 dark:text-slate-300" />
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overtime Threshold</span>
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
                    </div>
                    <div className="flex gap-8 mt-2">
                        <div>
                            <span className="text-2xl font-bold text-gray-600 dark:text-slate-300">Pre</span>
                            <p className="text-xs text-slate-400">Before {shift.on_duty_time}</p>
                        </div>
                        <div className="w-px bg-white/10 h-full" />
                        <div>
                            <span className="text-2xl font-bold text-gray-600 dark:text-slate-300">Post</span>
                            <p className="text-xs text-slate-400">After {shift.off_duty_time}</p>
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
                    <div className="flex text-[10px] text-slate-500 justify-between pl-10 pr-2 pb-2 border-b border-white/5">
                        <span>00:00</span>
                        <span>06:00</span>
                        <span>12:00</span>
                        <span>18:00</span>
                        <span>24:00</span>
                    </div>

                    {scheduleData.map((item) => {
                        const isOff = week_offs.includes(item.short_key);
                        const isHalfDay = item.short_key === halfday_rules?.day;
                        
                        // Calculate width for half day (usually 50% of the normal duty duration)
                        const barWidth = isHalfDay ? durationPercent / 2 : durationPercent;

                        return (
                            <div key={item.day} className={`flex items-center gap-3 group ${isOff ? 'opacity-40' : ''}`}>
                                <span className={`text-xs font-medium w-7 ${isHalfDay ? 'text-blue-400' : 'text-gray-600 dark:text-slate-300'}`}>
                                    {item.day}
                                </span>
                                <div className="flex-1 h-2.5 bg-obsidian dark:bg-slate-800 rounded-full overflow-hidden relative border border-border">
                                    {!isOff && (
                                        <div
                                            className={`absolute h-full shadow-lg transition-all duration-500 ${
                                                isHalfDay 
                                                ? 'bg-blue-500 shadow-blue-500/40' 
                                                : 'bg-emerald-500 shadow-emerald-500/40'
                                            }`}
                                            style={{ 
                                                left: `${startPercent}%`, 
                                                width: `${barWidth}%` 
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
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