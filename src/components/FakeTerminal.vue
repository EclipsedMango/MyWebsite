<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue';
import {useRouter} from "vue-router";
import DOMPurify from 'dompurify';
import XIcon from "@/components/Icons/XIcon.vue";
import {
  terminalOpen,
  terminalMounted,
  closeTerminal,
  setTerminalHeight,
  terminalHeight,
  terminalResizing,
} from "@/terminaldata.js";
import { TOOL_STRIP_WIDTH } from "@/navbardata.js";
import { askViewerMode, setViewerMode, viewerMode, VIEWER_MODES } from "@/viewerdata.js";

const history = ref(['Welcome to the Terminal. Type <span class="text-success">help</span> to get started.']);
const command = ref('');
const commandHistory = ref([]);
const historyIndex = ref(-1);
const isBusy = ref(false);
const isInputVisible = ref(true);
const awaitingRedirectConfirm = ref(false);
const router = useRouter();

const inputRef = ref(null);
const scrollAnchorRef = ref(null);

const PROMPT_HTML = 'visitor<span class="text-muted">@website</span> ~/cool/website<span class="text-muted">></span>';
const PROMPT_WRAPPED = `<span class="text-success">${PROMPT_HTML}</span>`;

const uptimeSeconds = ref(0);
let uptimeInterval = null;

onMounted(() => {
  terminalMounted.value = true;
  window.addEventListener("resize", clampToViewport);

  uptimeInterval = setInterval(() => {
    uptimeSeconds.value++;
  }, 1000);

  if (window.innerWidth > 768) {
    focusInput();
  }
});

onUnmounted(() => {
  terminalMounted.value = false;
  clearInterval(uptimeInterval);
  window.removeEventListener("resize", clampToViewport);
});

// Reopening should put the caret straight back in the prompt.
watch(terminalOpen, (open) => {
  if (open && window.innerWidth > 768) {
    nextTick(focusInput);
  }
});

const formattedUptime = computed(() => {
  const total = uptimeSeconds.value;
  const hours = String(Math.floor(total / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const seconds = String(total % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
});


const scrollToBottom = () => {
  nextTick(() => {
    scrollAnchorRef.value?.scrollIntoView({ behavior: 'smooth' });
  });
};

const focusInput = () => {
  inputRef.value?.focus();
  scrollToBottom();
};

const pushHistory = (line) => {
  history.value.push(line);
};

const prevCommand = () => {
  if (commandHistory.value.length === 0 || historyIndex.value >= commandHistory.value.length - 1) return;
  historyIndex.value++;
  command.value = commandHistory.value[commandHistory.value.length - 1 - historyIndex.value];
};

const nextCommand = () => {
  if (historyIndex.value <= 0) {
    historyIndex.value = -1;
    command.value = '';
    return;
  }
  historyIndex.value--;
  command.value = commandHistory.value[commandHistory.value.length - 1 - historyIndex.value];
};

const commands = {
  help: {
    description: 'Lists all available commands.',
    execute: () => {
      let helpText = 'Available commands:<br>';

      for (const cmd in commands) {
        if (commands[cmd].description) {
          const paddedCmd = cmd.padEnd(15, ' ');
          helpText += `<span class="command">${paddedCmd}</span> - ${commands[cmd].description}<br>`;
        }
      }

      pushHistory(helpText);
    }
  },
  about: {
    description: 'Displays information about me.',
    execute: () => {
      pushHistory('Hallo! I’m Michael, a developer who loves making games and shaders.');
    }
  },
  ls: {
    description: 'Lists links to other pages.',
    execute: () => {
      pushHistory(
          `<a href="/about-me" target="_blank" class="link">about-me</a>  ` +
          `<a href="/projects" target="_blank" class="link">projects</a>  ` +
          `<a href="/services" target="_blank" class="link">services</a>  ` +
          `<a href="/contact" target="_blank" class="link">contact</a>`
      );
    }
  },
  github: {
    description: 'Redirects to my GitHub profile.',
    execute: () => {
      pushHistory(`<span class="text-warning">WARNING</span>: You are about to be redirected to GitHub. Continue? (y/n)`);
      awaitingRedirectConfirm.value = true;
    }
  },
  uptime: {
    description: 'Shows how long the terminal has been running.',
    execute: () => {
      pushHistory(`This console has been running for: ${formattedUptime.value}`);
    }
  },
  mode: {
    description: 'Shows or changes the site view (ide, simple, ask).',
    execute: (args) => {
      const target = args[0];

      if (!target) {
        pushHistory(`Current view: <span class="text-success">${viewerMode.value ?? 'unset'}</span>. Usage: mode &lt;ide|simple|ask&gt;`);
        return;
      }

      if (target === 'ask') {
        askViewerMode();
        pushHistory('Reopening the welcome prompt.');
        return;
      }

      if (!VIEWER_MODES.includes(target)) {
        pushHistory(`<span class="text-error">Error:</span> Unknown view. Usage: mode &lt;ide|simple|ask&gt;`);
        return;
      }

      setViewerMode(target);
      pushHistory(`View set to <span class="text-success">${target}</span>.`);
    }
  },
  clear: {
    description: 'Clears the terminal history.',
    execute: () => {
      history.value = ['Welcome to the Terminal. Type <span class="text-success">help</span> to get started.'];
    }
  },
  'self-destruct': {
    description: 'Initiates a self-destruct sequence.',
    execute: async () => {
      isBusy.value = true;
      isInputVisible.value = false;
      pushHistory('Initiating self destruct sequence.');

      for (const i of [3, 2, 1]) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        pushHistory(`${i}..`);
        scrollToBottom();
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      pushHistory('haha, Just kidding.');

      isBusy.value = false;
      isInputVisible.value = true;
      await nextTick(focusInput);
    }
  },
  sudo: {
    description: 'Try to run a command with superuser privileges.',
    execute: () => {
      pushHistory('visitor is not in the sudoers file. This incident will be reported.');
    }
  },
  echo: {
    description: 'Displays a STRING of text.',
    execute: () => {
      pushHistory(command.value.split(' ').slice(1).join(' '));
    }
  },
  cd: {
    description: 'Changes the current working directory.',
    execute: async (args) => {
      const targetPath = args[0];

      if (!targetPath) {
        pushHistory('<span class="text-error">Error:</span> Missing argument. Usage: cd &lt;page_name&gt;');
      }

      const availableRoutes = router.getRoutes();
      const normalizedTargetPath = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;

      const destinationRoute = availableRoutes.find(route =>
          route.path === normalizedTargetPath || route.name === targetPath
      );

      if (destinationRoute) {
        pushHistory(`Navigating to ${destinationRoute.path}...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await router.push(destinationRoute.path);
      } else {
        pushHistory(`<span class="text-error">Error:</span> Page not found: "${targetPath}". Type '<span class="text-success">ls</span>' to see available destinations.`);
      }
    }
  },
  rm: {
    description: 'Removes file or directories.',
    execute: async (args) => {
      const flag = args[0];
      const target = args[1];

      if (!flag) {
        pushHistory('<span class="text-error">Error:</span> Missing operand. Usage: rm -rf &lt;page_name&gt;');
        return;
      }

      if (flag === '-rf') {
        if (!target) {
          pushHistory('<span class="text-error">Error:</span> Missing target for -rf. Usage: rm -rf &lt;page_name&gt;');
          return;
        }

        if (target === '/' || target === '*') {
          pushHistory('<span class="text-warning">WARNING:</span> Filesystem integrity compromised. Shutting down...');
          await new Promise(resolve => setTimeout(resolve, 1000));
          await router.push('/tty')
        }

        if (router.currentRoute.value.name === target || router.currentRoute.value.path === `/${target}`) {
          pushHistory(`Removing current page '${target}'... Redirecting to home.`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          await router.push('/');
        } else {
          pushHistory(`Nothing to do. You are not currently on page '${target}'.`);
        }

      } else {
        pushHistory(`<span class="text-error">Error:</span> Unknown flag "${flag}". Did you mean -rf?`);
      }
    }
  },
  curl: {
    description: 'Fetch and display the content of a URL.',
    execute: async (args) => {
      const url = args[0];
      if (!url || !url.startsWith("https://")) {
        pushHistory('<span class="text-error">Error</span>: Invalid or missing URL. Usage: curl https://example.com');
        return;
      }

      try {
        pushHistory(`Fetching content from ${url}...`);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const text = await response.text();
        pushHistory(DOMPurify.sanitize(text));
      } catch (e) {
        pushHistory(`<span class="text-error">Error</span>: Request failed. ${e.message}`);
      }
    }
  }
};

const handleRedirectConfirmation = (answer) => {
  const yes = ['y', 'Y', 'yes', 'Yes'];
  if (yes.includes(answer)) {
    pushHistory('Redirecting to GitHub…');
    window.open('https://github.com/EclipsedMango', '_blank', 'noopener');
  } else {
    pushHistory('Redirect canceled.');
  }
  awaitingRedirectConfirm.value = false;
};

const handleTabComplete = () => {
  const input = command.value.trim();
  if (!input || input.includes(' ')) {
    return;
  }

  const commandList = Object.keys(commands);
  const matches = commandList.filter(cmd => cmd.startsWith(input));

  if (matches.length === 1) {
    command.value = matches[0] + ' ';
  } else if (matches.length > 1) {
    pushHistory(`${PROMPT_WRAPPED} <span class="command">${command.value}</span>`);
    pushHistory(matches.join('  '));
    scrollToBottom();
  }
};

const handleCommand = () => {
  if (isBusy.value) return;

  const input = command.value.trim();
  if (!input) return;

  pushHistory(`${PROMPT_WRAPPED} <span class="command">${input}</span>`);

  commandHistory.value.push(input);
  historyIndex.value = -1;

  if (awaitingRedirectConfirm.value) {
    handleRedirectConfirmation(input);
  } else {
    const [cmd, ...args] = input.split(' ');
    const commandHandler = commands[cmd];

    if (commandHandler) {
      commandHandler.execute(args);
    } else {
      pushHistory(`<span class="text-error">Error</span>: Unknown Command. Type <span class="text-success">help</span> to see a list of commands.`);
    }
  }

  command.value = '';
  scrollToBottom();
};

let resizeStartY = 0;
let resizeStartHeight = 0;

function startResize(event) {
  if (event.button !== 0) {
    return;
  }

  resizeStartY = event.clientY;
  resizeStartHeight = terminalHeight.value;
  terminalResizing.value = true;

  event.currentTarget.setPointerCapture(event.pointerId);
  event.preventDefault();
}

function onResize(event) {
  if (!terminalResizing.value) {
    return;
  }

  setTerminalHeight(resizeStartHeight + (resizeStartY - event.clientY));
}

function stopResize(event) {
  if (!terminalResizing.value) {
    return;
  }

  terminalResizing.value = false;

  if (event.currentTarget.hasPointerCapture(event.pointerId)) {
    event.currentTarget.releasePointerCapture(event.pointerId);
  }
}

function nudgeResize(step) {
  setTerminalHeight(terminalHeight.value + step);
}

function clampToViewport() {
  setTerminalHeight(terminalHeight.value);
}

</script>

<template>
  <div
      class="terminal-container"
      :class="{ 'terminal-container-closed': !terminalOpen, resizing: terminalResizing }"
      :style="{
        height: `${terminalHeight}px`,
        left: `${TOOL_STRIP_WIDTH}px`,
        width: `calc(100vw - ${TOOL_STRIP_WIDTH}px)`,
      }"
  >
    <div
      class="terminal-title"
      @pointerdown="startResize"
      @pointermove="onResize"
      @pointerup="stopResize"
      @pointercancel="stopResize"
    >
      <div
        class="terminal-resize-handle"
        role="separator"
        aria-orientation="horizontal"
        aria-label="Resize terminal"
        tabindex="0"
        title="Drag to resize"
        @pointerdown.stop="startResize"
        @pointermove="onResize"
        @pointerup="stopResize"
        @pointercancel="stopResize"
        @keydown.up.prevent="nudgeResize(20)"
        @keydown.down.prevent="nudgeResize(-20)"
      ></div>
      <span>Terminal</span>
      <div class="terminal-title-line"></div>
      <span style="padding-left: 25px">Local</span>
      <button
        class="close-button"
        type="button"
        title="Close terminal"
        @pointerdown.stop
        @click="closeTerminal"
      >
        <XIcon></XIcon>
      </button>
    </div>
    <div class="terminal" @click="focusInput">
      <div class="output">
        <div v-for="(line, index) in history" :key="index" class="line" v-html="line"></div>
      </div>

      <div v-if="isInputVisible" class="input-line">
        <span class="prompt" v-html="PROMPT_HTML"></span>
        <input
            ref="inputRef"
            v-model="command"
            class="terminal-input"
            spellcheck="false"
            autocomplete="off"
            @keyup.enter="handleCommand"
            @keydown.up.prevent="prevCommand"
            @keydown.down.prevent="nextCommand"
            @keydown.tab.prevent="handleTabComplete"
        />
      </div>

      <div ref="scrollAnchorRef"></div>
    </div>
  </div>
</template>

<style scoped>
:deep(.text-success) {
  color: #02a11c;
}
:deep(.text-muted) {
  color: #EBEBEBA3;
}
:deep(.text-warning) {
  color: #cca002;
}
:deep(.text-error) {
  color: #ad1414;
}
:deep(.command) {
  color: #006cb9;
}
:deep(.link) {
  color: #03a9af;
  text-decoration: underline;
}

.terminal-container {
  transition: transform 0.25s ease;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  bottom: 0;
  position: fixed;
  z-index: 20;
}

.terminal-container-closed {
  transform: translateY(100%);
  pointer-events: none;
}

.terminal-title {
  position: relative;

  display: flex;
  padding: 8px 15px;
  background: #282828;
  border-top: 4px solid var(--ide-border);
  border-bottom: 4px solid var(--ide-border);

  cursor: ns-resize;
  user-select: none;
  touch-action: none;
}

.terminal-resize-handle {
  position: absolute;
  top: -6px;
  left: 0;
  right: 0;

  height: 8px;

  cursor: ns-resize;
  touch-action: none;
}

.terminal-resize-handle::after {
  content: "";

  position: absolute;
  left: 0;
  right: 0;
  top: 3px;

  height: 3px;

  background-color: var(--ide-accent);
  opacity: 0;
  transition: opacity 0.12s ease;
}

.terminal-resize-handle:hover::after,
.terminal-resize-handle:focus-visible::after,
.terminal-container.resizing .terminal-resize-handle::after {
  opacity: 1;
}

.terminal-resize-handle:focus-visible {
  outline: none;
}

.terminal-title-line {
  border-left: 3px solid rgba(63, 63, 63, 0.64);
  height: 25px;
  left: 13px;
  position: relative;
  margin-left: -2px;
  z-index: 0;
}

.close-button {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
  margin-left: auto;

  border: none;
  border-radius: 4px;
  background: none;

  color: var(--ide-icon);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.close-button:hover {
  background-color: var(--ide-hover-light);
  color: var(--ide-text-bright);
}

.terminal {
  transition: background 0.5s ease;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  background: #1e1e1e;
  padding: 1rem;
  cursor: text;
}

.output {
  white-space: pre-wrap;
  line-height: 1.8;
}

.input-line {
  display: flex;
}

.prompt {
  color: #02a11c;
  min-width: fit-content;
  padding-right: 8px; /* Added some spacing */
}

.terminal-input {
  background: transparent;
  border: none;
  color: inherit;
  font-family: inherit;
  font-size: 15px;
  outline: none;
  width: 100%;
}
</style>