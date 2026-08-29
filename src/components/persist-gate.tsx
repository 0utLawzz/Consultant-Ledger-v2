import { useEffect } from "react";
import { useLedger } from "@/lib/store";

/** Rehydrate local edits after first paint so SSR matches the printed book. */
export function PersistGate() {
  useEffect(() => {
    void useLedger.persist.rehydrate();
  }, []);
  return null;
}
