varying vec2 vUv;
//varying float vElevation;

void main() {
  vec3 mud = vec3(0.607 * 0.5, 0.467 * 0.5, 0.325 * 0.5);
  vec3 dirt = vec3(0.607, 0.467, 0.325);
  vec3 mixed = mix(mud, dirt, 0.5);

  gl_FragColor = vec4(mixed, 1.0);
}