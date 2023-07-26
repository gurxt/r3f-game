// vec3 red = vec3(1.0, 0.0, 0.0);
// vec3 blue = vec3(0.0, 0.0, 1.0);
// vec3 white = vec3(1.0, 1.0, 1.0);
// vec3 black = vec3(0.0, 0.0, 0.0);
// vec3 yellow = vec3(1.0, 1.0, 0.0);
uniform float uTime;

varying vec2 vUv;
varying vec4 vColor;
varying vec3 vNormal;
varying vec3 vPosition;

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

void main() {
  vec3 modelColor = vColor.xyz;

  vec3 red = vec3(1.0, 0.0, 0.0);
  vec3 blue = vec3(0.0, 0.0, 1.0);
  vec3 yellow = vec3(1.0, 1.0, 0.0);

  float value1 = vColor.w;
  float line1 = smoothstep(0.03, 0.04, abs(vPosition.y - mix(-2.5, 0.0, value1)));

  modelColor = mix(yellow, modelColor, line1);

  if (vPosition.y > 0.0) {
    float t = remap(vPosition.x, -2.5, 2.5, 0.0, 1.0);
    t = pow(t, 2.0);
    modelColor = mix(red, blue, t);

    float value2 = t;
    float line2 = smoothstep(0.03, 0.04, abs(vPosition.y - mix(0.0, 2.5, value2)));
    modelColor = mix(yellow, modelColor, line2);
  }

  float middleLine = smoothstep(0.05, 0.06, abs(vPosition.y));
  modelColor = mix(vec3(0.0), modelColor, middleLine);

  gl_FragColor = vec4(modelColor, 1.0);

  // float t1 = sin(vUv.x * 100.0);
  // float t2 = sin(vUv.y * 100.0);

  // color = vec3(smoothstep(0.0, 0.5, t1 * t2));

  // vec3 color = vec3(0.0);
  // vec3 red = vec3(1.0, 0.0, 0.0);
  // vec3 blue = vec3(0.0, 0.0, 1.0);

  // float t = sin(uTime);
  // t = remap(t, -1.0, 1.0, 0.0, 1.0);

  // color = mix(red, blue, t);

  // gl_FragColor = vec4(color, 1.0);

  // vec3 color = vec3(0.75);

  // vec2 center = vUv - 0.5;
  // vec2 cell = fract(vUv * 10.0);
  // cell = abs(cell - 0.5);

  // // grid
  // float distToCell = 1.0 - 2.0 * max(cell.x, cell.y);
  // float cellLine = smoothstep(0.0, 0.05, distToCell);
  // float xAxis = smoothstep(0.0, 0.002, abs(vUv.y - 0.5));
  // float yAxis = smoothstep(0.0, 0.002, abs(vUv.x - 0.5));

  // // lines
  // vec2 pos = center * 10.0;
  // float value1 = pos.x;
  // float value2 = mod(pos.x, 1.0);
  // float functionLine1 = smoothstep(0.0, 0.075, abs(pos.y - value1));
  // float functionLine2 = smoothstep(0.0, 0.075, abs(pos.y - value2));

  // color = mix(black, color, cellLine);
  // color = mix(blue, color, xAxis);
  // color = mix(blue, color, yAxis);
  // color = mix(yellow, color, functionLine1);
  // color = mix(red, color, functionLine2);

  // gl_FragColor = vec4(color, 1.0);
}