"use client";

import { Button } from "@/components/ui/button";

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: "all", label: "All" },
  { id: "raleigh", label: "Raleigh" },
  { id: "durham", label: "Durham" },
  { id: "cary", label: "Cary" },
  { id: "wake-forest", label: "Wake Forest" },
  { id: "under-budget", label: "Under Budget" },
  { id: "has-tour", label: "Has Virtual Tour" },
  { id: "has-special", label: "Move-in Special" },
];

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.id)}
          className={
            activeFilter === filter.id
              ? "bg-neutral-100 text-neutral-900 hover:bg-white"
              : "border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
          }
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
