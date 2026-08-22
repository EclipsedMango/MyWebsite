<script setup>
import { useRoute } from "vue-router";
import CodeEditor from "@/components/editor/CodeEditor.vue";
import CodeLine from "@/components/editor/CodeLine.vue";

const route = useRoute();
</script>

<template>
  <CodeEditor :path="['src', 'pages', 'NotFound.vue']" status="1 problem">
    <CodeLine><span class="t-com">/*</span></CodeLine>
    <CodeLine><span class="t-com"> * 404 — cannot resolve file '<span class="t-warn">{{ route.path }}</span>'</span></CodeLine>
    <CodeLine><span class="t-com"> */</span></CodeLine>
    <CodeLine></CodeLine>
    <CodeLine>
      <span class="t-kw">static_assert</span><span class="t-p">(</span><span class="t-kw">false</span><span class="t-p">,</span>
      <span class="t-str">"page not found"</span><span class="t-p">);</span>
    </CodeLine>
    <CodeLine></CodeLine>
    <CodeLine>
      <span class="t-com">// Try the file tree on the left, or go <RouterLink to="/" class="code-link">home</RouterLink>.</span>
    </CodeLine>
  </CodeEditor>
</template>
