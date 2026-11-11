<script setup>
import SimplePage from "@/components/SimplePage.vue";
import GithubIcon from "@/components/Icons/GithubIcon.vue";
import LinkedinIcon from "@/components/Icons/LinkedinIcon.vue";
</script>

<template>
  <SimplePage>
    <h1 class="simple-heading hero-title">Hallo<span class="simple-cursor">_</span></h1>

    <div class="banner">
      <section class="simple-panel cube-tile">
        <svg class="cube" viewBox="0 0 100 100" fill="none" stroke="url(#cubeGradient)" stroke-width="6" stroke-linejoin="round">
          <defs>
            <linearGradient id="cubeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#5fc2ff" />
              <stop offset="100%" stop-color="#7bfecc" />
            </linearGradient>
          </defs>
          <path d="M50 8 L88 24 L88 72 L50 92 L12 72 L12 24 Z" />
          <path d="M12 24 L50 42 L88 24 M50 42 L50 92" />
        </svg>
      </section>

      <section class="simple-panel banner-copy">
        <p>Welcome to my website. Have a look around and see if you can find some easter eggs.</p>
        <p class="simple-muted">You can navigate the website through the list on the left.</p>
      </section>
    </div>

    <p class="prompt"><span class="simple-muted">~/projects $</span> ls</p>

    <div class="cards">
      <section class="simple-panel card intro">
        <span class="card-label gradient-text">whoami</span>
        <p>I'm a graphics programmer.</p>
        <p>
          If you want to learn more about me, head over to
          <RouterLink to="/about-me" class="simple-link">AboutMe.vue</RouterLink>.
        </p>
        <p>
          To see my projects open <RouterLink to="/projects" class="simple-link">Projects.vue</RouterLink>,
          or to contact me open <RouterLink to="/contact" class="simple-link">Contact.vue</RouterLink>.
        </p>
      </section>

      <a class="simple-panel card" href="https://github.com/EclipsedMango/MangoEngine" target="_blank" rel="noopener">
        <span class="card-label gradient-text">Featured Project</span>
        <div class="card-preview">
          <span class="preview-text">MangoEngine/</span>
        </div>
        <p>C++ / OpenGL engine. work in progress.</p>
      </a>

      <div class="simple-panel card placeholder">
        <span class="card-label simple-muted">coming_soon/</span>
        <div class="card-preview"></div>
        <p>Not coming soon...</p>
      </div>
    </div>

    <div class="links">
      <a href="https://github.com/EclipsedMango" target="_blank" rel="noopener">
        <GithubIcon class="link-icon"></GithubIcon> github
      </a>
      <a href="https://www.linkedin.com/in/michael-iordanou-79126237a/" target="_blank" rel="noopener">
        <LinkedinIcon class="link-icon"></LinkedinIcon> linkedin
      </a>
    </div>
  </SimplePage>
</template>

<style scoped>
.hero-title {
  font-size: clamp(56px, 9vw, 96px);
  font-weight: 400;
  line-height: 1;
}

.banner {
  display: flex;
  gap: 20px;
}

.cube-tile {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  padding: 22px 26px;
}

.cube {
  width: 108px;
  height: 108px;
  animation: bob 4s ease-in-out infinite;
}

@keyframes bob {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(-4deg); }
}

@media (prefers-reduced-motion: reduce) {
  .cube { animation: none; }
}

.banner-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
  padding: 22px 28px;
  font-size: 18px;
  line-height: 1.6;
}

.prompt {
  font-size: 16px;
  margin-bottom: -8px;
}

.cards {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr);
  gap: 22px;
}

@container (max-width: 820px) {
  .cards {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  .intro {
    grid-column: 1 / -1;
  }
}

@container (max-width: 520px) {
  .cards {
    grid-template-columns: minmax(0, 1fr);
  }
}

.card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
  color: var(--simple-fg-bright);
  text-decoration: none;
  transition: transform 0.15s ease;
}

a.card {
  position: relative;
}

a.card::before {
  content: "";

  position: absolute;
  inset: -3px;
  padding: 3px;

  border-radius: 6px;
  background: var(--simple-accent-gradient);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
}

a.card:hover {
  transform: translateY(-3px);
}

a.card:hover::before {
  opacity: 1;
}

.card.intro p {
  color: var(--simple-fg);
  font-size: 15px;
  line-height: 1.6;
}

.card.intro p:first-of-type {
  color: var(--simple-fg-bright);
  font-size: 17px;
}

.card-label {
  font-size: 17px;
}

.card-preview {
  display: grid;
  place-items: center;
  aspect-ratio: 4 / 3;
  border-radius: 4px;
  background: var(--simple-panel-inner);
}

.preview-text {
  color: var(--simple-fg-muted);
  font-size: 15px;
}

.card p {
  font-size: 15px;
  color: var(--simple-fg-muted);
}

.card.placeholder p {
  color: var(--simple-fg-faint);
}

.placeholder .card-preview {
  background: var(--simple-panel-empty);
}

.links {
  display: flex;
  gap: 28px;
}

.links a {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--simple-fg);
  text-decoration: none;
  font-size: 16px;
}

.links a:hover {
  text-decoration: underline;
  text-underline-offset: 5px;
}

.link-icon {
  width: 20px;
  height: 20px;
}

@media screen and (max-width: 700px) {
  .cube-tile {
    display: none;
  }
}
</style>
