"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function TutorsClientFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = React.useState(searchParams.get("q") || "");
  const [categoryId, setCategoryId] = React.useState(searchParams.get("categoryId") || "");
  const [subject, setSubject] = React.useState(searchParams.get("subject") || "");
  const [minRating, setMinRating] = React.useState(searchParams.get("minRating") || "");
  const [minPrice, setMinPrice] = React.useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = React.useState(searchParams.get("maxPrice") || "");
  const [sortBy, setSortBy] = React.useState(searchParams.get("sortBy") || "latest");
  const [sortOrder, setSortOrder] = React.useState(searchParams.get("sortOrder") || "desc");

  const updateUrl = (next: Record<string, string>) => {
    const sp = new URLSearchParams(searchParams.toString());

    Object.entries(next).forEach(([key, val]) => {
      if (!val) sp.delete(key);
      else sp.set(key, val);
    });

    sp.set("page", "1");
    router.push(`/tutor?${sp.toString()}`);
  };

  const applyFilters = () => {
    updateUrl({
      q: q.trim(),
      categoryId,
      subject,
      minRating,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
    });
  };

  const reset = () => router.push("/tutors");

  React.useEffect(() => {
    const t = setTimeout(() => {
      updateUrl({ q: q.trim() });
    }, 400);

    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="rounded-md border p-4 space-y-3">
      <input
        className="h-10 w-full rounded-md border px-3"
        placeholder="Search tutors..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          className="h-10 w-full rounded-md border px-3"
          placeholder="Category ID"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />
        <input
          className="h-10 w-full rounded-md border px-3"
          placeholder="Subject (e.g. React)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          className="h-10 w-full rounded-md border px-3"
          placeholder="Min Rating (e.g. 4)"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
        />

        <input
          className="h-10 w-full rounded-md border px-3"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          className="h-10 w-full rounded-md border px-3"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <select
          className="h-10 w-full rounded-md border px-3"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>

        <select
          className="h-10 w-full rounded-md border px-3"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">DESC</option>
          <option value="asc">ASC</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button className="h-10 px-4 rounded-md border" onClick={applyFilters}>
          Apply
        </button>
        <button className="h-10 px-4 rounded-md border" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
