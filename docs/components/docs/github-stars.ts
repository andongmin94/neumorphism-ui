const githubStarsUrl = "https://api.github.com/repos/andongmin94/neumorphism-ui";
const cacheKey = "neumorphism-ui-github-stars";
const cacheDuration = 60 * 60 * 1000;

type StarsCache = { count: number; fetchedAt: number };
let cachedStars: StarsCache | undefined;
let starsRequest: Promise<number | null> | undefined;

function isStarCount(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

export function getGitHubStars(): Promise<number | null> {
  if (typeof window === "undefined") return Promise.resolve(null);

  try {
    const stored = JSON.parse(window.localStorage.getItem(cacheKey) ?? "null");
    if (
      isStarCount(stored?.count) &&
      typeof stored.fetchedAt === "number" && Number.isFinite(stored.fetchedAt) &&
      stored.fetchedAt >= 0 && stored.fetchedAt <= Date.now() &&
      (!cachedStars || stored.fetchedAt > cachedStars.fetchedAt)
    ) cachedStars = { count: stored.count, fetchedAt: stored.fetchedAt };
  } catch {
    // Storage may be unavailable; the in-memory cache still works.
  }

  const age = cachedStars ? Date.now() - cachedStars.fetchedAt : -1;
  if (cachedStars && age >= 0 && age < cacheDuration) return Promise.resolve(cachedStars.count);

  starsRequest ??= fetch(githubStarsUrl, {
    headers: { Accept: "application/vnd.github+json" },
    signal: AbortSignal.timeout(8000),
  })
    .then(async response => {
      if (!response.ok) throw new Error("Star count unavailable");
      const data = await response.json();
      if (!isStarCount(data?.stargazers_count)) throw new Error("Invalid star count");
      cachedStars = { count: data.stargazers_count, fetchedAt: Date.now() };
      try {
        window.localStorage.setItem(cacheKey, JSON.stringify(cachedStars));
      } catch {
        // Keep the successful response in memory when storage is unavailable.
      }
      return cachedStars.count;
    })
    .catch(() => cachedStars?.count ?? null)
    .finally(() => { starsRequest = undefined; });

  return starsRequest;
}
