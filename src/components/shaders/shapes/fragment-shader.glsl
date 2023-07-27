varying vec2 vUv;
uniform vec2 resolution;
uniform float uTime;

vec3 YELLOW = vec3(1.0, 1.0, 0.5);
vec3 BLUE = vec3(0.25, 0.25, 1.0);
vec3 RED  = vec3(1.0, 0.25, 0.25);
vec3 GREEN = vec3(0.25, 1.0, 0.25);
vec3 PURPLE = vec3(1.0, 0.25, 1.0);

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

vec3 BackgroundColor() {
  float distFromCenter = length(abs(vUv - 0.5));
  float vignette = 1.0 - distFromCenter;
  vignette = smoothstep(0.0, 0.7, vignette);
  return vec3(vignette);
}

vec3 DrawGrid(vec3 color, vec3 lineColor, float cellSpacing, float lineWidth) {
  vec2 center = vUv - 0.5;
  vec2 cells = abs(fract(center * 1000.0 / cellSpacing) - 0.5);
  float distToEdge = (0.5 - max(cells.x, cells.y)) * cellSpacing;
  float lines = smoothstep(0.0, lineWidth, distToEdge);

  color = mix(lineColor, color, lines);

  return color;
}

float sdfCircle(vec2 p, float r) {
  return length(p) - r;
}

float sdfLine(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);

  return length(pa - ba * h);
}

float sdfBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

void main() {
  vec2 pixelCoords = (vUv - 0.5) * 1000.0;

  vec3 color = BackgroundColor();
  color = DrawGrid(color, vec3(0.5), 10.0, 1.0);
  color = DrawGrid(color, vec3(0.0), 100.0, 4.0);

  // float d = sdfCircle(pixelCoords, 100.0);
  // color = mix(RED, color, step(0.0, d));
  float d = sdfLine(pixelCoords, vec2(-100, -50), vec2(200.0, -75.0));
  color = mix(RED, color, step(5.0, d));

  gl_FragColor = vec4(color, 1.0);
}