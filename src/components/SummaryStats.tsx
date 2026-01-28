"use client";

import { Apartment, BUDGET, MOVE_IN_EARLIEST, MOVE_IN_LATEST } from "@/lib/apartments";
import { Card } from "@/components/ui/card";
import { Building2, Wallet, Video, DollarSign, Calendar, Target } from "lucide-react";

interface SummaryStatsProps {
  apartments: Apartment[];
}

export function SummaryStats({ apartments }: SummaryStatsProps) {
  const underBudget = apartments.filter(a => !a.price.overBudget).length;
  const withTours = apartments.filter(a => a.tourUrl).length;
  const avgPrice = Math.round(apartments.reduce((sum, a) => sum + a.price.min, 0) / apartments.length);
  const withSpecials = apartments.filter(a => a.moveInSpecial).length;

  const stats = [
    { label: "Apartments", value: apartments.length, icon: Building2, color: "text-neutral-100" },
    { label: "Under Budget", value: underBudget, icon: Wallet, color: "text-emerald-400" },
    { label: "Virtual Tours", value: withTours, icon: Video, color: "text-cyan-400" },
    { label: "Avg. Price", value: `$${avgPrice.toLocaleString()}`, icon: DollarSign, color: "text-amber-400" },
    { label: "With Specials", value: withSpecials, icon: Target, color: "text-violet-400" },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card className="bg-neutral-900/30 border-neutral-800 p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Criteria */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800/50 border border-neutral-700">
            <DollarSign className="h-4 w-4 text-emerald-400" />
            <span className="text-neutral-400">Budget:</span>
            <span className="text-neutral-100 font-medium">${BUDGET.toLocaleString()}/mo</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800/50 border border-neutral-700">
            <Calendar className="h-4 w-4 text-violet-400" />
            <span className="text-neutral-400">Move-in:</span>
            <span className="text-neutral-100 font-medium">{formatDate(MOVE_IN_EARLIEST)} - {formatDate(MOVE_IN_LATEST)}, 2026</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800/50 border border-neutral-700">
            <Building2 className="h-4 w-4 text-cyan-400" />
            <span className="text-neutral-400">Type:</span>
            <span className="text-neutral-100 font-medium">1 BR Luxury</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
