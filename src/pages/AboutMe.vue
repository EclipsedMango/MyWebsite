<script setup>
import CodeEditor from "@/components/editor/CodeEditor.vue";
import CodeLine from "@/components/editor/CodeLine.vue";
import CodeFold from "@/components/editor/CodeFold.vue";
</script>

<template>
  <CodeEditor :path="['src', 'pages', 'AboutMe.vue']">
    <CodeLine><span class="t-mac">#include</span> <span class="t-str">&lt;michael/about_me.h&gt;</span></CodeLine>
    <CodeLine></CodeLine>

    <CodeFold>
      <template #head>
        <span class="t-kw">void </span><span class="t-fn">AboutMe</span><span class="t-p">()</span> <span class="t-p">{</span>
      </template>

      <CodeLine :indent="1"><span class="t-todo">// TODO: write the about me page.</span></CodeLine>
      <CodeLine :indent="1">
        <span class="t-kw">throw </span><span class="t-type">NotImplemented</span><span class="t-p">(</span><span class="t-str">"This site is WIP, so this page has not been made yet!"</span><span class="t-p">);</span>
      </CodeLine>
    </CodeFold>

    <CodeLine></CodeLine>
    <CodeLine>
      <span class="t-com">// Head back <RouterLink to="/" class="code-link">home</RouterLink> in the meantime.</span>
    </CodeLine>
  </CodeEditor>
</template>
