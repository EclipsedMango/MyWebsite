<script>
export default {
  data() {
    return {
      command: '',
      history: ['Welcome to Michael’s Terminal. Type <span style="color: #02a11c">help</span> to get started.'],
      awaitingRedirectConfirm: false,
    };
  },
  methods: {
    handleCommand() {
      let trimmed = this.command.trim();
      if (!trimmed) {
        this.command = '';
        return;
      }

      const promptHtml = `<span style="color: #02a11c">visitor<span style="color: #EBEBEBA3">@website</span> ~/cool/website<span style="color: #EBEBEBA3;">> </span></span>`;
      this.history.push(promptHtml + `<span class="command" style="color: #006cb9">${trimmed}</span>`);

      // If we're waiting on the Y/n confirmation:
      if (this.awaitingRedirectConfirm) {
        this.handleRedirectConfirmation(trimmed);
      } else {
        this.respondTo(trimmed);
      }

      this.command = '';
      this.$nextTick(this.scrollToBottom);
    },
    handleRedirectConfirmation(answer) {
      const yes = ['y','Y','yes','Yes'];
      if (yes.includes(answer)) {
        this.history.push('Redirecting to GitHub…');
        window.open('https://github.com/EclipsedMango', '_blank', 'noopener');
      } else {
        this.history.push('Redirect canceled.');
      }
      // Reset the flag
      this.awaitingRedirectConfirm = false;
    },
    respondTo(cmd) {
      const responses = {
        help: [
          `Available commands: about, github, ls, clear.`
        ],
        about: [
          `Hi! I’m Michael, a developer who loves making games and shaders.`
        ],
        ls: [
            `<a href="/about-me" target="_blank" style="color: #03a9af; text-decoration: underline">about-me</a>  ` +
            `<a href="/projects" target="_blank" style="color: #03a9af; text-decoration: underline">projects</a>  ` +
            `<a href="/services" target="_blank" style="color: #03a9af; text-decoration: underline">services</a>  ` +
            `<a href="/contact" target="_blank" style="color: #03a9af; text-decoration: underline">contact</a>`
        ],
        clear: []
      };
      if (cmd === 'clear') {
        this.history = [];
        this.history.push("Welcome to Michael’s Terminal. Type \"help\" to get started.")
        return;
      }
      if (cmd === 'github') {
        this.history.push(`<span style="color: #cca002">WARNING</span>: You are about to be redirected to Github. Continue? (Y/n)`);
        this.awaitingRedirectConfirm = true;
        return;
      }

      if (responses[cmd]) {
        this.history.push(...responses[cmd]);
      } else {
        this.history.push(`<span style="color: #ad1414">Error</span>: Unknown Command. Type <span style="color: #02a11c">help</span> to see a list of commands.`);
      }
    },
    scrollToBottom() {
      const terminal = this.$el.querySelector('.output');
      terminal.scrollTop = terminal.scrollHeight;
    },
    focusInput() {
      this.$refs.input.focus();
    },
  },
};
</script>

<template>
  <div style="padding-top: 25px">
    <div class="terminal-title">
      <span>Terminal</span>
      <div class="terminal-title-line"></div>
      <span style="padding-left: 25px">Local</span>
    </div>
    <div class="terminal" @click="focusInput">
      <div class="output">
        <div
            v-for="(line, index) in history"
            :key="index"
            class="line"
            v-html="line"
        ></div>
      </div>
      <div class="input-line">
        <span class="prompt">visitor<span style="color: #EBEBEBA3">@website</span> ~/cool/website<span style="color: #EBEBEBA3;">></span></span>
        <input
            ref="input"
            v-model="command"
            @keyup.enter="handleCommand"
            class="terminal-input"
            spellcheck="false"
            autocomplete="off"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

.terminal-title {
  display: flex;
  padding: 8px 15px;
  background: #282828;
}

.terminal-title-line {
  border-left: 3px solid rgba(63, 63, 63, 0.64);
  height: 25px;
  left: 13px;
  position: relative;
  margin-left: -2px;
  z-index: 0;
}

.terminal {
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
  padding: 1rem;
  height: 350px;
  width: 100%;
  cursor: text;
  overflow-y: auto;
}

.output {
  white-space: pre-wrap;
  line-height: 1.8;
}

.input-line {
  display: flex;
  align-items: center;
}

.prompt {
  margin-right: 0.5rem;
  width: 370px;
  color: #02a11c;
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