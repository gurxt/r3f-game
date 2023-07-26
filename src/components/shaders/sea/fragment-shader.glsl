uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uTime;

varying vec2 vUv;
varying float vElevation;

void main() {
  float mixed = sin(vElevation + 0.02) * 5.0;
  vec3 color = mix(uDepthColor, uSurfaceColor, vElevation);

  gl_FragColor = vec4(color, 1.0);
}