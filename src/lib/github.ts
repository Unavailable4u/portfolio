export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionData {
  total: number;
  days: ContributionDay[];
}

interface ApiResponse {
  total?: Record<string, number>;
  contributions?: ContributionDay[];
}

/** Public, unauthenticated contribution calendar for the last 12 months. */
export async function fetchContributions(user: string, signal: AbortSignal): Promise<ContributionData> {
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, { signal });
  if (!res.ok) throw new Error(`Contribution API returned ${res.status}`);
  const json = (await res.json()) as ApiResponse;
  const days = json.contributions ?? [];
  if (days.length === 0) throw new Error("No contribution data");
  const total = days.reduce((sum, d) => sum + d.count, 0);
  return { total, days };
}
