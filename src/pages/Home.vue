<script setup>
fetch("https://api.github.com/repos/EclipsedMango/MyWebsite/commits").then((value) => value.json().then((value) => {
  const commitsElement = document.getElementById("commits")
  for (let i = 0; i < value.length; i++) {
    i !== 0 ? commitsElement.innerHTML = commitsElement.innerHTML + "<br>" + value[i].commit.message + "<br>" :
        commitsElement.innerHTML = commitsElement.innerHTML + value[i].commit.message + "<br>";
  }
}))

import FakeTerminal from "@/components/FakeTerminal.vue";
</script>

<template>
  <div class="home-page">
    <div class="home-container">
      <div class="home-line"></div>
      <div class="home-container-2">
        <h1 class="home-header">
          <span style="font-style: italic; color: #d55fde">public int </span>
          <span style="color: #51abef">main</span>
          <span style="color: #e8b936">()</span> {
        </h1>
        <div class="home-text-box-container">
          <div class="home-text-box-style">
            <span style="color: #e5be70">std</span>::<span style="color: #51abef">cout</span> <<
            <span style="color: #89ca78">
            "Hallo!, I'm <span style="color: #039393">Michael</span>, and this is my website.
            It brings together everything about me, from my About Me and Projects to Services and Contact."</span>
            << <span style="color: #e5be70"> std</span>::<span style="color: #51abef">endl</span>;
          </div>
          <div class="home-text-box-style">
            <RouterLink to="about-me" class="navigation-text"><span style="color: #51abef">AboutMe</span></RouterLink>
            <span style="color: #e8b936">()</span>; <span style="color: #5c636e;">// Takes you to my About me, where you can learn more info.</span><br>

            <RouterLink to="projects" class="navigation-text"><span style="color: #51abef">Projects</span></RouterLink>
            <span style="color: #e8b936">()</span>; <span style="color: #5c636e;">// Takes you to a page with a bunch of my projects.</span><br>

            <RouterLink to="services" class="navigation-text"><span style="color: #51abef">Services</span></RouterLink>
            <span style="color: #e8b936">()</span>; <span style="color: #5c636e;">// Takes you to a page where you can see what I have to offer.</span><br>

            <RouterLink to="contact" class="navigation-text"><span style="color: #51abef">Contact</span></RouterLink>
            <span style="color: #e8b936">()</span>; <span style="color: #5c636e;">// Takes you my Contacts page, where you can contact me.</span>
          </div>
          <div class="home-text-box-style">
            <span style="color: #e8b936">Project</span>* featuredProject = <span style="font-style: italic; color: #d55fde">new </span>
            <span style="color: #e8b936">Project(</span>
            <span style="color: #89ca78">"Ball Game The Game"</span>, <span style="color: #89ca78">"In Raylib"</span><span style="color: #e8b936">)</span>;
            <br>
            featuredProject-><a href="https://github.com/EclipsedMango/BallGameTheGame" style="color: #51abef" class="navigation-text">link</a><span style="color: #e8b936">()</span>;
            <span style="color: #5c636e;">// Check out my latest game! (Still WIP)</span>
            <br>
            <span style="font-style: italic; color: #d55fde">return</span> <span style="color: #d19960">0</span>;
          </div>
        </div>
        <div class="home-header">
          }
        </div>
      </div>
      <div class="home-line-2"></div>
      <div class="commit-history-container">
        <div class="ch-title-box">
          <div>Commit History</div>
          <div class="ch-title-line"></div>
          <div style="padding-left: 25px">Latest Commits</div>
        </div>
        <div class="commit-history-box" id="commits"></div>
      </div>
    </div>
    <FakeTerminal></FakeTerminal>
  </div>
</template>

<style scoped>

.home-page {
  display: flex;
  flex-direction: column;
  width: 100vw;
  overflow: hidden;
}

.home-container {
  display: flex;
  flex-direction: row;
}

.home-container-2 {
  display: flex;
  flex-direction: column;
  margin-left: 60px;
  margin-top: 60px;
}

.home-line {
  border-left: 2px solid rgba(51, 51, 51, 0.64);
  height: 370px;
  position: relative;
  left: 62px;
  top: 132px;
  margin-left: -2px;
  z-index: 0;
}

.home-line-2 {
  border-left: 2px solid rgba(51, 51, 51, 0.64);
  height: 500px;
  position: relative;
  left: 60px;
  top: 50px;
  margin-left: -2px;
  z-index: 0;
}

.home-header {
  font-size: 40px;
}

.home-text-box-container {
  margin-left: 120px;
}

.home-text-box-style {
  max-width: 1100px;
  text-wrap: wrap;
  font-size: 18px;
  background: #101010;
  border: solid #070707;
  //border: solid #1f1f1f;
  padding: 10px 10px;
  margin-bottom: 15px;
}

.navigation-text {
  text-decoration: underline;
  text-underline-offset: 6px;
  color: #51abef;
}

.navigation-text:hover {
  background-color: rgba(74, 158, 218, 0.39);
  outline: rgba(0, 187, 250, 0.39) solid 2px;
}

.commit-history-container {
  margin-left: 120px;
  margin-top: 20px;
  width: 350px;
  max-height: 500px;
}

.ch-title-line {
  border-left: 3px solid rgba(63, 63, 63, 0.64);
  height: 18px;
  left: 13px;
  top: 3px;
  position: relative;
  margin-left: -2px;
  z-index: 0;
}

.ch-title-box {
  display: flex;
  background: #282828;
  padding: 5px 15px;
  justify-content: center;
}

.commit-history-box {
  padding: 10px 15px;
  background: #1e1e1e;
  height: 100%;
  overflow-y: auto;
}

</style>