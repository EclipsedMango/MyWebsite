<script>
import GlslCanvas from "glslCanvas";

export default {
  name: "ShaderCanvas",
  mounted() {
    const canvas = this.$refs.glslCanvas;

    const sandbox = new GlslCanvas(canvas);

    const gl = canvas.getContext('webgl', { alpha: true });
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const fragShader = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;

      float hash21 (vec2 p) {
        p = fract(p*vec2(123.45, 362.34));
        p += dot(p, p+55.23);
        return fract(p.x*p.y);
      }

      float Star(vec2 uv, float flare) {
        float d = length(uv);
        float m = 0.05 / d;

        float rays = max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0));
        m += rays * flare;
        float rot = 3.14159 / 4.0;
        uv *= mat2(vec2(cos(rot), -sin(rot)), vec2(sin(rot), cos(rot)));
        rays = max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0));
        m += rays * 0.3 * flare;

        m *= smoothstep(1.0, 0.2, d);
        return m;
      }

      vec3 StarLayer(vec2 uv) {
        vec3 col = vec3(0.0);

        vec2 gv = fract(uv)-0.5;
        vec2 id = floor(uv);

        for(int y = -1; y <= 1; y++) {
          for(int x = -1; x <= 1; x++) {
            vec2 offs = vec2(x, y);
            float n = hash21(id + offs); // Random value between 0 and 1;

            float size = fract(n * 356.51);
            float star = Star(gv - offs - vec2(n, fract(n*34.0)) + 0.5, smoothstep(0.7, 1.0, size) * 0.4);

            vec3 colour = sin(vec3(.2, .3, .9) * fract(n * 5452.52) * 123.0) * 0.5 + 0.5;
            colour = colour * vec3(0.2, 0.8, 0.8+size);

            col += star * size * colour;
          }
        }

        return col;
      }

      void main() {
        vec2 uv = ((gl_FragCoord.xy - 0.5*u_resolution.xy) / u_resolution.y);
        uv.x += 0.48;

        float rot = u_time * 0.01;
        uv *= mat2(vec2(cos(rot), -sin(rot)), vec2(sin(rot), cos(rot)));
        vec3 col = vec3(0);

        const float numLayers = 8.0;

        for (float i = 0.0; i < 1.0; i += 1.0 / numLayers) {
          float depth = fract(i * (u_time * 0.05));
          float scale = mix(20.0, 0.5, depth);
          float fade = depth * smoothstep(1.0, 0.9, depth);
          col += StarLayer(uv * scale + i * 523.1) * fade;
        }

        // Calculate horizontal fade (1.0 on the left, 0.0 on the right)
        float fade = 1.0 - smoothstep(0.0, 1.0, gl_FragCoord.x / u_resolution.x);

        // Apply fade to alpha
        gl_FragColor = vec4(col, fade);
      }
    `;

    sandbox.load(fragShader);
  },
};
</script>

<template>
  <canvas ref="glslCanvas" class="shader"></canvas>
</template>

<style scoped>
</style>