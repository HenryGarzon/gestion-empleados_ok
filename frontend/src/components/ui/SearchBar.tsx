"use client";

import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearchChange, placeholder = "Buscar..." }: SearchBarProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearchChange(query);
    }, 300);
    return () => clearTimeout(debounce);
  }, [query, onSearchChange]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 pl-10 rounded-md border border-border bg-surface text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
      />
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}