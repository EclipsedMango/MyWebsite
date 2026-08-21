import { ref } from "vue";

export const GITHUB_OWNER = "EclipsedMango";
export const GITHUB_REPO = "MyWebsite";
export const GITHUB_BRANCH = "main";

const API_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;
const CACHE_KEY = "vcs-cache";
const CACHE_TTL = 5 * 60 * 1000;

export const commits = ref([]);
export const repo = ref(null);
export const loading = ref(false);
export const error = ref(null);

let inFlight = null;

function normaliseCommit(raw) {
  const [subject, ...rest] = raw.commit.message.split("\n");

  return {
    sha: raw.sha,
    shortSha: raw.sha.slice(0, 7),
    subject,
    body: rest.join("\n").trim(),
    author: raw.commit.author?.name ?? "unknown",
    email: raw.commit.author?.email ?? "",
    date: raw.commit.author?.date ?? null,
    avatar: raw.author?.avatar_url ?? null,
    url: raw.html_url,
  };
}

function readCache() {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY));
    return cached && Date.now() - cached.time < CACHE_TTL ? cached : null;
  } catch {
    return null;
  }
}

function writeCache() {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({
      time: Date.now(),
      commits: commits.value,
      repo: repo.value,
    }));
  } catch {
  }
}

async function getJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.status === 403 ? "GitHub rate limit reached." : `HTTP ${response.status}`);
  }

  return response.json();
}

export function fetchGitData({ force = false } = {}) {
  if (inFlight) {
    return inFlight;
  }

  if (!force) {
    const cached = readCache();

    if (cached) {
      commits.value = cached.commits;
      repo.value = cached.repo;
      return Promise.resolve();
    }

    if (commits.value.length) {
      return Promise.resolve();
    }
  }

  loading.value = true;
  error.value = null;

  inFlight = Promise.all([
    getJson(`${API_BASE}/commits?sha=${GITHUB_BRANCH}&per_page=30`),
    getJson(API_BASE).catch(() => null),
  ]).then(([rawCommits, rawRepo]) => {
    commits.value = rawCommits.map(normaliseCommit);
    repo.value = rawRepo && {
      stars: rawRepo.stargazers_count,
      forks: rawRepo.forks_count,
      issues: rawRepo.open_issues_count,
      pushedAt: rawRepo.pushed_at,
      language: rawRepo.language,
    };
    writeCache();
  }).catch((e) => {
    error.value = e.message;
  }).finally(() => {
    loading.value = false;
    inFlight = null;
  });

  return inFlight;
}

const UNITS = [
  ["year", 31536000],
  ["month", 2592000],
  ["week", 604800],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
];

export function relativeTime(iso) {
  if (!iso) {
    return "unknown";
  }

  const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);

  for (const [unit, size] of UNITS) {
    if (seconds >= size) {
      const amount = Math.floor(seconds / size);
      return `${amount} ${unit}${amount === 1 ? "" : "s"} ago`;
    }
  }

  return "just now";
}

export function formatDate(iso) {
  if (!iso) {
    return "unknown";
  }

  return new Date(iso).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
