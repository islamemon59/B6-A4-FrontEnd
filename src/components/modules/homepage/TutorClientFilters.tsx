"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CategoryOption = {
  id: string;
  name: string;
};

export default function TutorsClientFilters({
  categories,
}: {
  categories: CategoryOption[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = React.useState(searchParams.get("q") || "");
  const [categoryId, setCategoryId] = React.useState(
    searchParams.get("categoryId") || "all",
  );
  const [subject, setSubject] = React.useState(searchParams.get("subject") || "");
  const [minRating, setMinRating] = React.useState(
    searchParams.get("minRating") || "all",
  );
  const [sortBy, setSortBy] = React.useState(searchParams.get("sortBy") || "latest");
  const [sortOrder, setSortOrder] = React.useState(
    searchParams.get("sortOrder") || "desc",
  );
  const [priceRange, setPriceRange] = React.useState(
    searchParams.get("priceRange") || "all",
  );

  const updateUrl = React.useCallback(
    (next: Record<string, string>) => {
      const sp = new URLSearchParams(searchParams.toString());

      Object.entries(next).forEach(([key, val]) => {
        if (!val || val === "all") sp.delete(key);
        else sp.set(key, val);
      });

      sp.set("page", "1");
      router.push(`/tutor?${sp.toString()}`);
    },
    [router, searchParams],
  );

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      updateUrl({ q: q.trim() });
    }, 450);

    return () => window.clearTimeout(timer);
  }, [q, updateUrl]);

  function applyFilters() {
    const priceMap: Record<string, { minPrice?: string; maxPrice?: string }> = {
      all: {},
      budget: { maxPrice: "1500" },
      mid: { minPrice: "1501", maxPrice: "2200" },
      premium: { minPrice: "2201" },
    };

    const selectedPrice = priceMap[priceRange] || {};

    updateUrl({
      q: q.trim(),
      categoryId,
      subject: subject.trim(),
      minRating,
      sortBy,
      sortOrder,
      priceRange,
      minPrice: selectedPrice.minPrice || "",
      maxPrice: selectedPrice.maxPrice || "",
    });
  }

  function resetFilters() {
    setQ("");
    setCategoryId("all");
    setSubject("");
    setMinRating("all");
    setSortBy("latest");
    setSortOrder("desc");
    setPriceRange("all");
    router.push("/tutor");
  }

  return (
    <div className="rounded-[2rem] border border-border/70 bg-card/80 p-5 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <SlidersHorizontal className="size-4" />
          Search, filter, and sort tutors
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-12 rounded-full pl-11"
            placeholder="Search by headline, topic, or skill"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger className="h-11 w-full rounded-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            className="h-11 rounded-full"
            placeholder="Subject focus"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <Select value={minRating} onValueChange={setMinRating}>
            <SelectTrigger className="h-11 w-full rounded-full">
              <SelectValue placeholder="Minimum rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any rating</SelectItem>
              <SelectItem value="4">4.0+</SelectItem>
              <SelectItem value="4.5">4.5+</SelectItem>
              <SelectItem value="5">5.0</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="h-11 w-full rounded-full">
              <SelectValue placeholder="Budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All budgets</SelectItem>
              <SelectItem value="budget">Up to 1500 BDT</SelectItem>
              <SelectItem value="mid">1501 - 2200 BDT</SelectItem>
              <SelectItem value="premium">2201+ BDT</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-11 w-full rounded-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="h-11 w-full rounded-full">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Descending</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="rounded-full px-6" onClick={applyFilters}>
            Apply filters
          </Button>
          <Button variant="outline" className="rounded-full px-6" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
