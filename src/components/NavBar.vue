<script>
import CloseIcon from "@/components/Icons/CloseIcon.vue";
import MenuIcon from "@/components/Icons/MenuIcon.vue";
import AboutMeIcon from "@/components/Icons/AboutMeIcon.vue";
import ContactIcon from "@/components/Icons/ContactIcon.vue";
import {ref, computed} from 'vue';
import ProjectsIcon from "@/components/Icons/ProjectsIcon.vue";
import ServicesIcon from "@/components/Icons/ServicesIcon.vue";
import {navBarCollapsed, SIDEBAR_WIDTH, SIDEBAR_WIDTH_COLLAPSED} from "@/navbardata.js";

export default {
  components: {ServicesIcon, ProjectsIcon, ContactIcon, AboutMeIcon, MenuIcon, CloseIcon},
  setup() {
    const toggleSideBar = () => (navBarCollapsed.value = !navBarCollapsed.value);

    const sideBarWidth = computed(() => `${navBarCollapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`);
    return {navBarCollapsed, toggleSideBar, sideBarWidth};
  }
};
</script>

<template>
  <div class="sidenav" id="sidenav" :style="{ width: sideBarWidth }">
    <i @click="toggleSideBar" class="close-nav-icon" :class="{'open-nav-icon': navBarCollapsed}"><CloseIcon></CloseIcon></i>
    <RouterLink to="/" class="sidenav-img" :class="{'sidenav-img-collapsed': navBarCollapsed}"><img src="/cube.png" alt="Cube Icon" class="img"></RouterLink>
    <hr class="line-break" :class="{'line-break-collapsed': navBarCollapsed}">
    <transition name="fade">
      <div v-if="navBarCollapsed">
        <div class="inner-nav-icons">
          <RouterLink to="about-me" class="inner-nav-icon"><AboutMeIcon></AboutMeIcon></RouterLink>
          <RouterLink to="projects" class="inner-nav-icon"><ProjectsIcon></ProjectsIcon></RouterLink>
          <RouterLink to="services" class="inner-nav-icon"><ServicesIcon></ServicesIcon></RouterLink>
          <RouterLink to="contact" class="inner-nav-icon"><ContactIcon></ContactIcon></RouterLink>
        </div>
      </div>
      <div v-else>
        <div class="inner-nav">
          <RouterLink to="about-me" class="inner-nav-word">About Me</RouterLink>
          <RouterLink to="projects" class="inner-nav-word">Projects</RouterLink>
          <RouterLink to="services" class="inner-nav-word">Services</RouterLink>
          <RouterLink to="contact" class="inner-nav-word">Contact</RouterLink>
        </div>
      </div>
    </transition>
  </div>

  <div :style="{ paddingLeft: sideBarWidth }" style="transition: padding 0.3s ease;"></div>
</template>

<style scoped>
.fade-enter-active {
  transition: opacity 2.0s;
}
.fade-leave-active {
  transition: opacity 0.05s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.sidenav {
  background-color: #111;

  border-right: #0c0c0c;
  border-right-style: solid;

  float: left;
  position: fixed;
  height: 100%;

  top: 0;
  left: 0;
  bottom: 0;

  padding-top: 20px;
  padding-left: 2px;
  padding-right: 6px;

  transition: 0.25s ease;
  display: flex;
  flex-direction: column;

  z-index: 1030;
}

.inner-nav {
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding-left: 6px;

  color: #818181;
  opacity: 100;
}

.inner-nav-word {
  transition: all 0.2s ease;
  padding-left: 6px;
  padding-bottom: 10px;
  padding-top: 10px;

  margin-bottom: 15px;

  text-decoration: none;
  font-size: 24px;

  color: #818181;
  opacity: 100;
}

.inner-nav-word:hover {
  transition: all 0.2s ease;
  font-size: 26px;
  color: #f1f1f1;
}

.inner-nav-icons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
  color: #818181;
}

.inner-nav-icon {
  transition: all 0.1s ease;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 5px;
  align-self: center;
  scale: 1.1;
}

.inner-nav-icon:hover {
  transition: all 0.1s ease;
  scale: 1.4;
}

.sidenav-img {
  transition: all ease 0.2s;
  display: flex;
  justify-content: center;
  scale: 0.9;
  margin-top: 16px;
  margin-right: 28px;
  margin-left: 28px;
}

.sidenav-img:hover {
  transition: all ease 0.2s;
  scale: 1.0;
}

.sidenav-img-collapsed {
  transition: all ease 0.2s;
  display: flex;
  justify-content: center;
  scale: 0.5;
  margin: 0 -10px -15px;
}

.sidenav-img-collapsed:hover {
  transition: all ease 0.2s;
  scale: 0.7;
}

.close-nav-icon {
  scale: 1.5;
  display: flex;
  margin-left: 80px;
  justify-content: center;
  transition: all ease 0.2s;
}

.close-nav-icon:hover {
  transition: all ease 0.2s;
  scale: 2.0;
}

.open-nav-icon {
  transform: rotate(180deg);
  scale: 1.5;

  display: flex;
  justify-content: center;

  margin-right: 20px;
  margin-left: 20px;
}

.line-break {
  transition: all 0.2s ease;
  background-color: #282828;
  border: #282828;
  border-radius: 4px;

  width: 124px;
  align-self: center;
  padding-bottom: 4px;

  margin-bottom: 12px;
  margin-top: 6px;
}

.line-break-collapsed {
  transition: all 0.2s ease;
  background-color: #282828;
  border: #282828;
  border-radius: 4px;

  width: 60px;
  align-self: center;
  padding-bottom: 4px;
}
</style>