<script setup>
import { computed, onMounted, ref } from "vue";
import {
  commits,
  repo,
  loading,
  error,
  fetchGitData,
  relativeTime,
  formatDate,
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_BRANCH,
} from "@/gitdata.js";
import GitBranchIcon from "@/components/Icons/GitBranchIcon.vue";
import RefreshIcon from "@/components/Icons/RefreshIcon.vue";
import GithubIcon from "@/components/Icons/GithubIcon.vue";

const filter = ref("");
const selectedSha = ref(null);

const filteredCommits = computed(() => {
  const query = filter.value.trim().toLowerCase();

  if (!query) {
    return commits.value;
  }

  return commits.value.filter((commit) =>
    commit.subject.toLowerCase().includes(query) ||
    commit.author.toLowerCase().includes(query) ||
    commit.shortSha.includes(query)
  );
});

const selectedCommit = computed(() => commits.value.find((commit) => commit.sha === selectedSha.value) ?? null);

onMounted(() => fetchGitData());

function selectCommit(sha) {
  selectedSha.value = selectedSha.value === sha ? null : sha;
}
</script>

<template>
  <div class="vcs">
    <div class="vcs-toolbar">
      <span class="branch-chip" :title="`${GITHUB_OWNER}/${GITHUB_REPO}`">
        <GitBranchIcon></GitBranchIcon>
        <span>{{ GITHUB_BRANCH }}</span>
      </span>
      <input
        v-model="filter"
        class="vcs-filter"
        type="search"
        spellcheck="false"
        placeholder="Filter commits"
        aria-label="Filter commits"
      />
      <button
        class="header-button"
        type="button"
        title="Refresh"
        :disabled="loading"
        @click="fetchGitData({ force: true })"
      >
        <RefreshIcon :class="{ spinning: loading }"></RefreshIcon>
      </button>
    </div>

    <div class="vcs-log">
      <p v-if="error" class="vcs-message vcs-error">{{ error }}</p>
      <p v-else-if="loading && !commits.length" class="vcs-message">Loading commit history...</p>
      <p v-else-if="!filteredCommits.length" class="vcs-message">No commits match "{{ filter }}".</p>

      <button
        v-for="(commit, index) in filteredCommits"
        :key="commit.sha"
        class="commit-row"
        :class="{ selected: commit.sha === selectedSha }"
        type="button"
        @click="selectCommit(commit.sha)"
      >
        <span class="commit-graph">
          <span class="graph-line" :class="{ first: index === 0, last: index === filteredCommits.length - 1 }"></span>
          <span class="graph-dot" :class="{ head: index === 0 && !filter }"></span>
        </span>
        <span class="commit-text">
          <span class="commit-subject">{{ commit.subject }}</span>
          <span class="commit-meta">
            <img v-if="commit.avatar" class="commit-avatar" :src="commit.avatar" alt="" loading="lazy" />
            <span class="commit-author">{{ commit.author }}</span>
            <span class="commit-dot">&middot;</span>
            <span>{{ relativeTime(commit.date) }}</span>
            <span class="commit-sha">{{ commit.shortSha }}</span>
          </span>
        </span>
      </button>
    </div>

    <div v-if="selectedCommit" class="commit-details">
      <div class="details-title">
        <span class="commit-sha">{{ selectedCommit.shortSha }}</span>
        <a class="details-link" :href="selectedCommit.url" target="_blank" rel="noopener noreferrer" title="Open on GitHub">
          <GithubIcon></GithubIcon>
        </a>
      </div>
      <p class="details-message">{{ selectedCommit.subject }}</p>
      <p v-if="selectedCommit.body" class="details-body">{{ selectedCommit.body }}</p>
      <p class="details-line">
        <span class="details-label">author</span>{{ selectedCommit.author }}
      </p>
      <p class="details-line">
        <span class="details-label">date</span>{{ formatDate(selectedCommit.date) }}
      </p>
    </div>

    <div v-if="repo" class="vcs-status">
      <span title="Stars">&#9733; {{ repo.stars }}</span>
      <span title="Forks">&#8624; {{ repo.forks }}</span>
      <span title="Open issues">&#9888; {{ repo.issues }}</span>
      <span class="status-pushed" title="Last push">{{ relativeTime(repo.pushedAt) }}</span>
    </div>
  </div>
</template>

<style scoped>
.vcs {
  display: flex;
  flex-direction: column;

  flex: 1;
  min-height: 0;
}

.vcs-toolbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  padding: 8px 10px;

  border-bottom: 1px solid var(--ide-border);
}

.branch-chip {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;

  padding: 3px 8px;

  border-radius: 4px;
  background-color: var(--ide-hover);

  font-size: 14px;
  white-space: nowrap;

  color: var(--ide-text-bright);
}

.vcs-filter {
  flex: 1;
  min-width: 0;
  padding: 4px 8px;

  border: 1px solid var(--ide-border);
  border-radius: 4px;
  background-color: var(--ide-bg);

  font-family: inherit;
  font-size: 14px;

  color: var(--ide-text);
  outline: none;
}

.vcs-filter:focus {
  border-color: var(--ide-accent);
}

.header-button {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;

  border: none;
  border-radius: 4px;
  background: none;

  color: var(--ide-icon);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.header-button:hover {
  background-color: var(--ide-hover);
  color: var(--ide-text-bright);
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.vcs-log {
  flex: 1;
  min-height: 0;
  padding: 6px;

  overflow-y: auto;
}

.vcs-log::-webkit-scrollbar {
  width: 10px;
}

.vcs-log::-webkit-scrollbar-thumb {
  background-color: var(--ide-scrollbar);
  border: 2px solid transparent;
  background-clip: content-box;
  border-radius: 5px;
}

.vcs-log::-webkit-scrollbar-thumb:hover {
  background-color: var(--ide-scrollbar-hover);
}

.vcs-log::-webkit-scrollbar-track {
  background: transparent;
}

.vcs-message {
  padding: 10px 12px;

  font-size: 14px;

  color: var(--ide-text-muted);
}

.vcs-error {
  color: #ad1414;
}

.commit-row {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 6px;

  width: 100%;
  padding: 6px 8px 6px 0;

  border: none;
  border-radius: 4px;
  background: none;

  font-family: inherit;
  text-align: left;

  color: var(--ide-text);
  cursor: pointer;
  transition: background-color 0.1s ease;
}

.commit-row:hover {
  background-color: var(--ide-hover);
}

.commit-row.selected {
  background-color: var(--ide-selected);
  color: var(--ide-text-bright);
}

.commit-row:focus-visible {
  outline: 1px solid var(--ide-accent);
  outline-offset: -1px;
}

.commit-graph {
  position: relative;

  flex: 0 0 22px;
}

.graph-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 11px;

  width: 1px;

  background-color: var(--ide-guide);
}

.graph-line.first {
  top: 11px;
}

.graph-line.last {
  bottom: calc(100% - 11px);
}

.graph-dot {
  position: absolute;
  top: 7px;
  left: 7px;

  width: 9px;
  height: 9px;

  border: 2px solid var(--ide-bg);
  border-radius: 50%;
  background-color: var(--ide-accent);
}

.graph-dot.head {
  background-color: #89ca78;
}

.commit-text {
  display: flex;
  flex-direction: column;
  gap: 2px;

  min-width: 0;
}

.commit-subject {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: 15px;
}

.commit-meta {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;

  font-size: 12px;
  white-space: nowrap;

  color: var(--ide-text-muted);
}

.commit-row.selected .commit-meta {
  color: rgba(235, 235, 235, 0.75);
}

.commit-avatar {
  width: 14px;
  height: 14px;

  border-radius: 50%;
}

.commit-author {
  overflow: hidden;
  text-overflow: ellipsis;

  max-width: 140px;
}

.commit-dot {
  color: var(--ide-guide);
}

.commit-sha {
  color: var(--ide-accent);
}

.commit-details {
  flex: 0 0 auto;
  max-height: 210px;
  padding: 10px 12px;

  border-top: 4px solid var(--ide-border);
  background-color: var(--ide-bar);

  overflow-y: auto;
}

.details-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 6px;

  font-size: 13px;
}

.details-link {
  display: flex;

  color: var(--ide-icon);
}

.details-link:hover {
  color: var(--ide-text-bright);
}

.details-message {
  font-size: 15px;

  color: var(--ide-text-bright);
}

.details-body {
  margin-top: 4px;

  font-size: 13px;
  white-space: pre-wrap;

  color: var(--ide-text);
}

.details-line {
  margin-top: 6px;

  font-size: 13px;

  color: var(--ide-text);
}

.details-label {
  display: inline-block;

  width: 70px;

  color: var(--ide-text-muted);
}

.vcs-status {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;

  flex: 0 0 auto;
  padding: 6px 12px;

  border-top: 1px solid var(--ide-border);

  font-size: 13px;

  color: var(--ide-text-muted);
}

.status-pushed {
  margin-left: auto;
}
</style>
