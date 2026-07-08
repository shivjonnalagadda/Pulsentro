import type { HeartRateReading } from "@/lib/heart-rate";

export type RecoverySession = {
  id: string;
  startedAt: string;
  endedAt: string;
  samples: HeartRateReading[];
  summary: {
    peakBpm: number;
    endBpm: number;
    recoveryDelta: number;
    durationSeconds: number;
    recoveryRatePerMinute: number;
  };
  note: string;
};

const STORAGE_KEY = "pulsentro-sessions";

export function getStoredSessions(): RecoverySession[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RecoverySession[]) : [];
  } catch {
    return [];
  }
}

export function saveStoredSessions(sessions: RecoverySession[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}
