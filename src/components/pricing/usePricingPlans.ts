"use client";

import { useEffect, useSyncExternalStore } from "react";
import { getPlansState, getServerPlansState, loadPlans, subscribePlans } from "@/lib/plansApi";

/** The subscription plans from the backend (loading → ready | error). Starts the fetch on first use. */
export function usePricingPlans() {
  const state = useSyncExternalStore(subscribePlans, getPlansState, getServerPlansState);
  useEffect(() => loadPlans(), []);
  return state;
}
