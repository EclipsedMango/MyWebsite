<script setup lang="ts">

import CubeIconGradient from "@/components/Icons/CubeIconGradient.vue";
import GithubIcon from "@/components/Icons/GithubIcon.vue";
import LinkedinIcon from "@/components/Icons/LinkedinIcon.vue";
</script>

<template>
  <div class="main-container">
    <div class="container-first">
      <div class="box-style icon-box">
        <div class="icon-grad-box">
          <div class="icon-container">
            <CubeIconGradient style="scale: 4.5;"></CubeIconGradient>
          </div>
        </div>
      </div>
      <div class="box-style intro-box">
        <h1 class="heading-text">Hallo!</h1>
        <div class="intro-box-inner">
          <p class="intro-box-text">I'm Michael Iordanou, a driven game programmer fascinated by systems engineering and the power of GPUs.</p>
          <p class="intro-box-text">I'm currently a student at <a href="https://aie.edu.au/" target="_blank" class="fancy-link" style="color: #54adb9">AIE Melbourne</a> pursuing a course in Game Programming</p>
        </div>
      </div>
    </div>
    <div class="container-first">
      <div class="box-style links-box">
        <h1 class="heading-text links-text">Links:</h1>
        <div class="links-icons-box">
          <a href="https://github.com/EclipsedMango" target="_blank">
            <div class="links-icons">
              <GithubIcon class="icon"></GithubIcon>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/michael-iordanou-79126237a/" target="_blank">
            <div class="links-icons">
              <LinkedinIcon class="icon"></LinkedinIcon>
            </div>
          </a>
        </div>
      </div>
      <div class="container-second">
        <div class="box-style test-box-second">
          <h1 class="heading-text">
            Skills:
          </h1>
        </div>
        <div class="box-style test-box-third">
          <h1 class="heading-text">
            Interests:
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main-container {
    display: flex;
    flex-direction: column;

    padding-top: 10vh;

    gap: 1.0rem
  }

  .container-first {
    display: flex;
    flex-direction: row;

    gap: 1.0rem;
  }

  .container-second {
    display: flex;
    flex-direction: column;

    gap: 1.0rem;
  }

  .icon-container {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    width: 140px;
    height: 140px;
  }

  .box-style {
    border: 5px solid #1d2224;
    border-radius: 10px;

    background: #1d2224;

    box-shadow: 5px 5px 25px #121414;
    transition: transform 0.2s ease;
  }

  .box-style:hover {
    transform: scale(1.03);
    transition: transform 0.2s ease;
  }

  .heading-text {
    font-family: Roboto Mono, monospace;
    font-weight: bold;

    background: linear-gradient(#4bbbbe, #33538f);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .icon-box {
    width: 250px;
    height: 250px;

    display: flex;
    flex-direction: column;

    gap: 0.5rem;

    justify-content: center;
    align-items: center;
  }

  .icon-grad-box {
    display: flex;
    flex-direction: column;

    width: 250px;
    height: 250px;

    background: radial-gradient(circle 225px, rgba(77, 255, 255, 0.1), transparent 50%);

    justify-content: center;
    align-items: center;
  }

  .intro-box {
    width: 600px;
    height: 250px;

    display: flex;
    flex-direction: column;

    padding-left: 20px;
    padding-top: 10px;
  }

  .intro-box-inner {
    display: flex;
    flex-direction: column;

    gap: 1.0rem;
  }

  .intro-box-text {
    font-size: 18px;
  }

  .links-box {
    display: flex;
    flex-direction: column;

    width: 250px;
    height: 516px;

    gap: 1.0rem;
  }

  .links-text {
    padding-left: 20px;
    padding-top: 10px;
  }

  .links-icons-box {
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    height: 350px;

    gap: 3.0rem;
  }

  .links-icons {
    display: flex;

    align-items: center;
    justify-content: center;

    border: 2px solid #989898;
    border-radius: 10px;

    background: #24282a;

    box-shadow: 5px 5px 25px #121414;

    height: 125px;
    width: 125px;

    transition: transform 0.2s ease;
  }

  .icon {
    fill: #989898;
    scale: 6.0;

    transition: transform 0.2s ease;
  }

  .links-icons:hover {
    transform: scale(1.05);
    border: 3px solid white;
    transition: transform 0.2s ease;
  }

  .links-icons:hover .icon {
    fill: white;
    transition: transform 0.2s ease;
  }

  .test-box-second {
    width: 600px;
    height: 250px;
  }

  .test-box-third {
    width: 600px;
    height: 250px;
  }

</style>