<script setup>
import SimplePage from "@/components/SimplePage.vue";
import CubeIcon from "@/components/Icons/CubeIcon.vue";
import GithubIcon from "@/components/Icons/GithubIcon.vue";
import LinkedinIcon from "@/components/Icons/LinkedinIcon.vue";
</script>

<template>
  <SimplePage
    title="Hallo!"
    lead="Welcome, this is my website. Have a look around and see if you can find some easter eggs."
  >
    <section class="simple-card">
      <h2 class="simple-heading">About this site</h2>
      <p>
        Everything about me lives in this one project. Use the list on the left to move between pages,
        or the tabs along the top to hop back to something you already opened.
      </p>
    </section>

    <section class="simple-card">
      <h2 class="simple-heading">Featured project</h2>
      <div class="project">
        <CubeIcon class="project-icon"></CubeIcon>
        <div class="project-copy">
          <h3 class="project-title">Mango Engine</h3>
          <p>
            A cool custom engine project heavily leaning into graphics. It is built on OpenGL and C++,
            and is still a work in progress.
          </p>
          <p>
            <a
              href="https://github.com/EclipsedMango/MangoEngine"
              target="_blank"
              rel="noopener"
              class="simple-link"
            >github.com/EclipsedMango/MangoEngine</a>
          </p>
        </div>
      </div>
    </section>

    <section class="simple-card">
      <h2 class="simple-heading">Links</h2>
      <div class="links">
        <a href="https://github.com/EclipsedMango" target="_blank" rel="noopener" class="link-button">
          <GithubIcon class="link-icon"></GithubIcon>
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/michael-iordanou-79126237a/"
          target="_blank"
          rel="noopener"
          class="link-button"
        >
          <LinkedinIcon class="link-icon"></LinkedinIcon>
          LinkedIn
        </a>
      </div>
    </section>
  </SimplePage>
</template>

<style scoped>
.project {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 18px;
}

.project-icon {
  flex: 0 0 64px;
  width: 64px;
  height: 64px;
}

.project-copy {
  display: flex;
  flex-direction: column;
  gap: 10px;

  min-width: 0;
}

.project-title {
  color: var(--simple-fg-bright);
  font-size: 19px;
}

.links {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 14px;
}

.link-button {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  padding: 10px 18px;

  border: 1px solid var(--simple-card-border);
  border-radius: 8px;
  background-color: #24282a;
  color: var(--simple-fg-bright);
  font-size: 16px;
  text-decoration: none;

  transition: border-color 0.15s ease, transform 0.15s ease;
}

.link-button:hover {
  border-color: var(--simple-accent);
  transform: scale(1.03);
}

.link-button:focus-visible {
  outline: 1px solid var(--ide-accent);
  outline-offset: 2px;
}

.link-icon {
  width: 20px;
  height: 20px;
}

@media screen and (max-width: 700px) {
  .project {
    flex-direction: column;
  }
}
</style>
