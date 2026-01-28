"use client";

import { useState, useMemo } from "react";
import { apartments, Apartment } from "@/lib/apartments";
import { ApartmentCard } from "@/components/ApartmentCard";
import { FilterBar } from "@/components/FilterBar";
import { SummaryStats } from "@/components/SummaryStats";
import { Home } from "lucide-react";

export default function HomePage() {
  const [filter, setFilter] = useState("all");

  const filteredApartments = useMemo(() => {
    switch (filter) {
      case "raleigh":
        return apartments.filter(a => a.city === "Raleigh");
      case "durham":
        return apartments.filter(a => a.city === "Durham");
      case "cary":
        return apartments.filter(a => a.city === "Cary");
      case "wake-forest":
        return apartments.filter(a => a.city === "Wake Forest");
      case "under-budget":
        return apartments.filter(a => !a.price.overBudget);
      case "has-tour":
        return apartments.filter(a => a.tourUrl);
      case "has-special":
        return apartments.filter(a => a.moveInSpecial);
      default:
        return apartments;
    }
  }, [filter]);

  return (
    <main className="min-h-screen bg-neutral-950">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700">
              <Home className="h-6 w-6 text-neutral-100" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-400">
                Luxury Apartment Finder
              </h1>
              <p className="text-sm text-neutral-500">
                Top 10 One-Bedroom Apartments • Raleigh • Durham • Cary
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <SummaryStats apartments={apartments} />

        {/* Filter Bar */}
        <FilterBar activeFilter={filter} onFilterChange={setFilter} />

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-neutral-500">
            Showing <span className="text-neutral-300 font-medium">{filteredApartments.length}</span> apartments
            {filter !== "all" && <span className="text-neutral-600"> • Filtered by {filter.replace("-", " ")}</span>}
          </p>
        </div>

        {/* Apartment Cards */}
        <div className="grid gap-6">
          {filteredApartments.map((apartment) => (
            <ApartmentCard key={apartment.rank} apartment={apartment} />
          ))}
        </div>

        {/* Empty State */}
        {filteredApartments.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-neutral-300 mb-2">No apartments found</h3>
            <p className="text-neutral-500">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-neutral-600 text-sm">
          <p>Luxury Apartment Finder • Built for Raleigh/Durham/Cary Area</p>
          <p className="mt-2">Budget: $1,500/mo • Move-in: Feb 5-28, 2026</p>
        </div>
      </footer>
    </main>
  );
}
