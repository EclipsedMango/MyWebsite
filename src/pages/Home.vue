<script setup>
import CodeEditor from "@/components/editor/CodeEditor.vue";
import CodeLine from "@/components/editor/CodeLine.vue";
import CodeFold from "@/components/editor/CodeFold.vue";
import CodeInlay from "@/components/editor/CodeInlay.vue";
</script>

<template>
  <CodeEditor :path="['src', 'pages', 'Home.vue']">
    <CodeLine><span class="t-mac">#include</span> <span class="t-str">&lt;michael/website.h&gt;</span></CodeLine>
    <CodeLine><span class="t-kw">using namespace</span> <span class="t-var">michael</span><span class="t-p">;</span></CodeLine>
    <CodeLine></CodeLine>
    <CodeLine><span class="t-com">// everything about me lives in this project. poke around the file tree to navigate.</span></CodeLine>
    <CodeLine></CodeLine>

    <CodeFold run>
      <template #head>
        <span class="t-kw">int </span>
        <span class="t-fn">main</span><span class="t-p">(</span>
        <span class="t-kw">int </span><span class="t-param">argc</span><span class="t-p">,</span>
        <span class="t-kw">char </span>*<span class="t-param">argv</span><span class="t-p">[])</span>
        <span class="t-p"> {</span>
      </template>

      <CodeLine :indent="1">
        <span class="t-type">std</span>::<span class="t-fn">cout</span> &lt;&lt;
        <span class="t-str">"Hallo!, I'm <span class="t-hl">Michael</span>, and this is my website. It brings together
          everything about me, from my About Me and Projects to Services and Contact."</span>
        &lt;&lt; <span class="t-type">std</span>::<span class="t-fn">endl</span><span class="t-p">;</span>
      </CodeLine>
      <CodeLine :indent="1"></CodeLine>

      <CodeLine :indent="1">
        <span class="t-type">Visitor</span>
        <span class="t-var"> visitor</span><span class="t-p">;</span>
      </CodeLine>
      <CodeLine :indent="1"></CodeLine>

      <CodeFold :indent="1">
        <template #head>
          <span class="t-kw">if </span><span class="t-p">(</span><span class="t-var">visitor</span><span class="t-p">.</span><span class="t-fn">wantsToSeeMyWork</span><span class="t-p">())</span>
          <span class="t-p">{</span>
        </template>

        <CodeLine :indent="2">
          <span class="t-type">Project</span>* <span class="t-var">featured</span> = <span class="t-kw">new </span><span class="t-type">Project</span><span class="t-p">(</span>
          <span class="t-str">"MangoEngine"</span><span class="t-p">);</span>
        </CodeLine>
        <CodeLine :indent="2">
          <span class="t-var">featured</span>-><a
            href="https://github.com/EclipsedMango/MangoEngine"
            target="_blank"
            rel="noopener"
            class="code-link"
          >open</a><span class="t-p">();</span>
          <span class="t-com"> // cool custom engine in opengl, it still needs some work</span>
        </CodeLine>

        <CodeInlay :indent="2" label="Mango Engine - C++ Custom engine built on OpenGL">
          <div class="project-card">
            <img src="/cube.png" alt="MangoEngine" width="96" height="96" />
            <div class="project-copy">
              <p>
                This is a cool custom engine project heavily leaning into graphics, its built on OpenGL and C++ and is still a work in progress.
              </p>
              <p>
                <a
                  href="https://github.com/EclipsedMango/MangoEngine"
                  target="_blank"
                  rel="noopener"
                  class="code-link"
                >github.com/EclipsedMango/MangoEngine</a>
              </p>
            </div>
          </div>
        </CodeInlay>
      </CodeFold>

      <CodeLine :indent="1"></CodeLine>
      <CodeLine :indent="1">
        <span class="t-type">std</span>::<span class="t-type">vector</span>&lt;<span class="t-type">Link</span>&gt; <span class="t-var">links</span> = <span class="t-p">{ </span>
        <a href="https://github.com/EclipsedMango" target="_blank" rel="noopener" class="code-link">github</a><span class="t-p">,</span>
        <a href="https://www.linkedin.com/in/michael-iordanou-79126237a/" target="_blank" rel="noopener" class="code-link">linkedin</a>
        <span class="t-p"> };</span>
      </CodeLine>
      <CodeLine :indent="1"></CodeLine>
      <CodeLine :indent="1"><span class="t-kw">return </span><span class="t-num">0</span><span class="t-p">;</span></CodeLine>
    </CodeFold>
  </CodeEditor>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 14px;

  max-width: 620px;
}

.project-card img {
  flex: 0 0 96px;

  padding: 10px;
  border: 1px solid var(--ide-border);
  border-radius: 6px;
  background-color: var(--ide-bar);
}

.project-copy {
  min-width: 0;
}
</style>
