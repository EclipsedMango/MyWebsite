<script>
let totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
}

function pad(val) {
  const valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

export default {
  data() {
    return {
      command: '',
      commandHistory: [],
      historyIndex: -1,
      history: ['Welcome to the Terminal. Type <span style="color: #02a11c">help</span> to get started.'],
      awaitingRedirectConfirm: false,
      busy: false,
    };
  },
  methods: {
    prevCommand() {
      if (this.commandHistory.length <= 0) {return;}
      if (this.historyIndex > this.commandHistory.length - 2) {return;}

      this.historyIndex++;
      this.command = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
    },
    nextCommand() {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.command = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
        return;
      }

      this.historyIndex = -1;
      this.command = '';
    },
    handleCommand() {
      if (this.busy) {return;}

      let cmd = this.command.trim();
      if (!cmd) {
        this.command = '';
        return;
      }

      const promptHtml = `<span style="color: #02a11c">visitor<span style="color: #EBEBEBA3">@website</span> ~/cool/website<span style="color: #EBEBEBA3;">> </span></span>`;
      this.history.push(promptHtml + `<span class="command" style="color: #006cb9">${cmd}</span>`);

      if (this.awaitingRedirectConfirm) {
        this.handleRedirectConfirmation(cmd);
      } else {
        this.respondTo(cmd);
      }

      this.commandHistory.push(this.command);
      this.historyIndex = -1;
      this.command = '';
      this.$nextTick(this.scrollToBottom);
    },
    handleRedirectConfirmation(answer) {
      const yes = ['y','Y','yes','Yes'];
      if (yes.includes(answer)) {
        this.history.push('Redirecting to GitHub…');
        window.open('https://github.com/EclipsedMango', '_blank', 'noopener');
        this.awaitingRedirectConfirm = false;
        return;
      }

      this.history.push('Redirect canceled.');
      this.awaitingRedirectConfirm = false;
    },
    respondTo(cmd) {
      const responses = {
        help: [`Available commands: about, github, ls, self-destruct, curl, uptime, and clear.`],
        about: [`Hallo! I’m Michael, a developer who loves making games and shaders.`],
        ls: [
            `<a href="/about-me" target="_blank" style="color: #03a9af; text-decoration: underline">about-me</a>  ` +
            `<a href="/projects" target="_blank" style="color: #03a9af; text-decoration: underline">projects</a>  ` +
            `<a href="/services" target="_blank" style="color: #03a9af; text-decoration: underline">services</a>  ` +
            `<a href="/contact" target="_blank" style="color: #03a9af; text-decoration: underline">contact</a>`
        ],
        clear: []
      };

      switch (cmd) {
        case 'clear':
          this.history = [];
          this.history.push(`Welcome to Michael’s Terminal. Type help to get started.`)
          return;
        case 'github':
          this.history.push(`<span style="color: #cca002">WARNING</span>: You are about to be redirected to GitHub. Continue? (Y/n)`);
          this.awaitingRedirectConfirm = true;
          return;
        case 'self-destruct':
          this.busy = true;
          this.$refs.input.hidden = true;
          this.$refs.prompt.hidden = true;
          this.history.push(`Initiating self destruct sequence.`);
          setTimeout(() => {this.history.push(`3..`); this.$nextTick(this.scrollToBottom);}, 1000);
          setTimeout(() => {this.history.push(`2..`); this.$nextTick(this.scrollToBottom);}, 2000);
          setTimeout(() => {this.history.push(`1..`); this.$nextTick(this.scrollToBottom);}, 3000);
          setTimeout(() => {
            this.history.push(`haha, Just kidding.`);
            this.$nextTick(this.scrollToBottom);
            this.busy = false;
            this.$refs.input.hidden = false;
            this.$refs.prompt.hidden = false;
          }, 4000);
          return;
        case 'uptime':
          this.history.push('This console has been running for: ' +
              pad(parseInt(totalSeconds/60/60%60)) + ":" + pad(parseInt(totalSeconds/60%60)) + ":" + pad(totalSeconds%60));
          return;
        default: break;
      }

      if (cmd.startsWith("sudo")) {
        this.history.push(`visitor is not in the sudoers file. This incident will be reported.`);
        return;
      }

      if (cmd.startsWith("curl")) {
        let url = cmd.split(" ")[1];
        fetch(url).then((response) => {
          response.text().then((text) => {
            if (!text.startsWith("https://")) {this.history.push("invalid url."); return;}
            this.history.push(text)
          })
        }).catch(e => {
          this.history.push("request failed.")
        });
        this.$nextTick(this.scrollToBottom);
        return;
      }

      if (responses[cmd]) {
        this.history.push(...responses[cmd]);
        this.$nextTick(this.scrollToBottom);
        return;
      }

      this.history.push(`<span style="color: #ad1414">Error</span>: Unknown Command. Type <span style="color: #02a11c">help</span> to see a list of commands.`);
      this.$nextTick(this.scrollToBottom);
    },
    scrollToBottom() {
      this.$refs.scrollAnchor.scrollIntoView({ behavior: 'smooth' });
    },
    focusInput() {
      this.$refs.input.focus();
      this.$nextTick(this.scrollToBottom);
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
        <div v-for="(line, index) in history" :key="index" class="line" v-html="line"></div>
      </div>
      <div class="input-line">
        <span ref="prompt" class="prompt">visitor<span style="color: #EBEBEBA3">@website</span> ~/cool/website<span style="color: #EBEBEBA3;">></span></span>
        <input ref="input" v-model="command" class="terminal-input" spellcheck="false" autocomplete="off"
               @keyup.enter="handleCommand" @keydown.up.prevent="prevCommand" @keydown.down.prevent="nextCommand"
        />
      </div>
      <div ref="scrollAnchor"></div>
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
  padding: 1rem 1rem 4%;
  height: 350px;
  width: 100vw;
  cursor: text;
  overflow-y: auto;
}

.output {
  white-space: pre-wrap;
  line-height: 1.8;
}

.input-line {
  display: flex;
}

.prompt {
  width: 340px;
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