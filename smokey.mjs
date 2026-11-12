var Le={Spectrum:null,Sunset:["#ff4ecd","#ff8a4e","#ffd24e"],Ocean:["#4ea8ff","#4effd2","#7c4dff"],Mono:["#ffffff"],Aurora:["#3affa3","#38d9ff","#8f7bff"],Ember:["#ff5722","#ff9100","#ffc400"],Lagoon:["#00c2a8","#00a3ff","#0057d9"],Candy:["#ff8fd0","#ffa9f0","#c79bff"],Toxic:["#b6ff00","#4dff88","#00ffc8"],Royal:["#5b2bff","#8f4dff","#c44dff"],Sakura:["#ffc2dd","#ff8fb1","#ff6f91"],Mint:["#9cffd6","#5ef2c0","#2fd6a5"],Copper:["#ff9a5a","#e2703a","#b34700"],Ultraviolet:["#7b2cff","#b429ff","#ff29f0"],Ice:["#c9f0ff","#8ad4ff","#4fb3ff"],Magma:["#ff2d2d","#ff6a00","#ffb300"],Forest:["#2f9e44","#69db7c","#a9e34b"],Dusk:["#3b3b98","#7158e2","#cd84f1"],Cyber:["#00fff0","#ff00e0","#fffb00"],Pastel:["#ffd6e0","#c7ceea","#b5ead7"]},we={Calm:{curl:3,splatForce:4200,splatRadius:.45,densityDissipation:4.6,velocityDissipation:2.6,pressureIteration:16,colorUpdateSpeed:6},Flow:{curl:10,splatForce:6e3,splatRadius:.5,densityDissipation:3.5,velocityDissipation:2,pressureIteration:20,colorUpdateSpeed:10},Swirl:{curl:24,splatForce:7200,splatRadius:.55,densityDissipation:3,velocityDissipation:1.6,pressureIteration:24,colorUpdateSpeed:12},Storm:{curl:40,splatForce:9500,splatRadius:.65,densityDissipation:2.2,velocityDissipation:1.2,pressureIteration:28,colorUpdateSpeed:16},Wisp:{curl:6,splatForce:3200,splatRadius:.32,densityDissipation:6.5,velocityDissipation:3.4,pressureIteration:12,colorUpdateSpeed:8}},at=()=>{let v={};for(let[a,S]of Object.entries(Le))for(let[u,W]of Object.entries(we)){let H=`${a} ${u}`;v[H]={...W,palette:S?[...S]:null,colorIntensity:S===null?.15:.18}}return v},re=at(),st=Object.keys(re),ut=Object.keys(Le),ct=Object.keys(we),lt=v=>re[v];var ft={simResolution:128,dyeResolution:1440,captureResolution:512,densityDissipation:3.5,velocityDissipation:2,pressure:.1,pressureIteration:20,curl:10,splatRadius:.5,splatForce:6e3,shading:!0,colorUpdateSpeed:10,paused:!1,backColor:{r:0,g:0,b:0},transparent:!0,id:"smokey-fluid-canvas",position:"fixed",zIndex:-9999,pointerEvents:!1,maxDpr:2,pauseOnHidden:!0,respectReducedMotion:!0,palette:null,colorIntensity:.15},Pe=v=>{var a;return v?typeof v!="string"?v:(a=document.querySelector(v))!=null?a:document.getElementById(v):null},dt=v=>{let a=v.trim().replace(/^#/,"");return a.length===3&&(a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]),/^[0-9a-f]{6}$/i.test(a)?{r:parseInt(a.slice(0,2),16)/255,g:parseInt(a.slice(2,4),16)/255,b:parseInt(a.slice(4,6),16)/255}:null},mt=v=>{var u;if(v>=0||typeof document=="undefined"||typeof process!="undefined"&&((u=process.env)==null?void 0:u.NODE_ENV)==="production")return;let a=window.getComputedStyle(document.body).backgroundColor;a&&a!=="transparent"&&!/rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)/.test(a)&&console.warn("[smokey-fluid-cursor] <body> has an opaque background ("+a+") and the canvas sits at z-index "+v+`, so the effect will be painted over and stay invisible.
Move the background to <html>, or give the canvas a zIndex above your background.`)},vt=()=>typeof window!="undefined"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,ne={dispose:()=>{},pause:()=>{},resume:()=>{},isPaused:()=>!0,setConfig:()=>{},splat:()=>{},canvas:null},gt=(v={})=>{var Fe,Se,De;let a={...ft,...v};if(typeof document=="undefined")return ne;let S=!1,u=(Fe=Pe(a.canvas))!=null?Fe:document.getElementById(a.id);if(!u){let e=(Se=Pe(a.container))!=null?Se:document.body;if(!e)return ne;u=document.createElement("canvas"),u.id=a.id,e.appendChild(u),S=!0}a.className&&u.classList.add(...a.className.split(/\s+/));let W=a.position==="fixed"||a.position==="absolute";Object.assign(u.style,{position:a.position,...W?{top:"0",left:"0",width:"100%",height:"100%"}:{},display:"block",pointerEvents:a.pointerEvents?"auto":"none",zIndex:String(a.zIndex)}),mt(a.zIndex),U();class H{constructor(){this.id=-1;this.texcoordX=0;this.texcoordY=0;this.prevTexcoordX=0;this.prevTexcoordY=0;this.deltaX=0;this.deltaY=0;this.down=!1;this.moved=!1;this.color=[30,0,300]}}let D=[];D.push(new H);let t,E;try{({gl:t,ext:E}=_e(u))}catch(e){typeof console!="undefined"&&console.warn("[smokey-fluid-cursor] WebGL is unavailable; the cursor effect is disabled.",e);let r=u,n=S;return{...ne,dispose:()=>{n&&r.remove()},setConfig:o=>{o.zIndex!==void 0&&(r.style.zIndex=String(o.zIndex)),o.pointerEvents!==void 0&&(r.style.pointerEvents=o.pointerEvents?"auto":"none")},get canvas(){return r}}}E.supportLinearFiltering||(a.dyeResolution=512,a.shading=!1);function _e(e){let r={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},n=e.getContext("webgl2",r),o=!!n;if(o||(n=e.getContext("webgl",r)||e.getContext("experimental-webgl",r)),!n)throw new Error("WebGL not supported");let i=null,c,s;if(o){let f=n;f.getExtension("EXT_color_buffer_float"),c=!!f.getExtension("OES_texture_float_linear"),s=f.HALF_FLOAT}else{let f=n;if(i=f.getExtension("OES_texture_half_float"),c=!!f.getExtension("OES_texture_half_float_linear"),!i)throw new Error("OES_texture_half_float not supported on WebGL1");s=i.HALF_FLOAT_OES}n.clearColor(0,0,0,1);let d=null,m=null,F=null;if(o){let f=n;d=L(f,f.RGBA16F,f.RGBA,s),m=L(f,f.RG16F,f.RG,s),F=L(f,f.R16F,f.RED,s)}else{let f=n;d=L(f,f.RGBA,f.RGBA,s),m=L(f,f.RGBA,f.RGBA,s),F=L(f,f.RGBA,f.RGBA,s)}return{gl:n,ext:{formatRGBA:d,formatRG:m,formatR:F,halfFloatTexType:s,supportLinearFiltering:c,isWebGL2:o}}}function L(e,r,n,o){if(!Be(e,r,n,o)){if(e.RGBA16F!==void 0){let i=e;switch(r){case i.R16F:return L(i,i.RG16F,i.RG,o);case i.RG16F:return L(i,i.RGBA16F,i.RGBA,o);default:return null}}return null}return{internalFormat:r,format:n}}function Be(e,r,n,o){let i=e.createTexture();if(!i)return!1;e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,r,4,4,0,n,o,null);let c=e.createFramebuffer();if(!c)return!1;e.bindFramebuffer(e.FRAMEBUFFER,c),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0);let s=e.checkFramebufferStatus(e.FRAMEBUFFER);return e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(c),e.deleteTexture(i),s===e.FRAMEBUFFER_COMPLETE}class Ae{constructor(r,n){this.vertexShader=r,this.fragmentShaderSource=n,this.programs={},this.activeProgram=null,this.uniforms={}}setKeywords(r){let n=0;for(let i=0;i<r.length;i++)n+=ot(r[i]);let o=this.programs[n];if(!o){let i=b(t,t.FRAGMENT_SHADER,ae(this.fragmentShaderSource,r));o=oe(t,this.vertexShader,i),this.programs[n]=o}o!==this.activeProgram&&(this.uniforms=ie(t,o),this.activeProgram=o)}bind(){this.activeProgram&&t.useProgram(this.activeProgram)}}class T{constructor(r,n){this.program=oe(t,r,n),this.uniforms=ie(t,this.program)}bind(){this.program&&t.useProgram(this.program)}}function oe(e,r,n){let o=e.createProgram();return e.attachShader(o,r),e.attachShader(o,n),e.bindAttribLocation(o,0,"aPosition"),e.linkProgram(o),e.getProgramParameter(o,e.LINK_STATUS)||console.trace(e.getProgramInfoLog(o)),o}function ie(e,r){let n={},o=e.getProgramParameter(r,e.ACTIVE_UNIFORMS);for(let i=0;i<o;i++){let c=e.getActiveUniform(r,i);if(!c)continue;let s=c.name,d=e.getUniformLocation(r,s);d&&(n[s]=d)}return n}function b(e,r,n){let o=e.createShader(r);return e.shaderSource(o,n),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS)||console.trace(e.getShaderInfoLog(o)),o}function ae(e,r){if(!r||r.length===0)return e;let n="";return r.forEach(o=>{n+="#define "+o+`
`}),n+e}let y=b(t,t.VERTEX_SHADER,`precision highp float;
attribute vec2 aPosition;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform vec2 texelSize;
void main () {
vUv = aPosition * 0.5 + 0.5;
vL = vUv - vec2(texelSize.x, 0.0);
vR = vUv + vec2(texelSize.x, 0.0);
vT = vUv + vec2(0.0, texelSize.y);
vB = vUv - vec2(0.0, texelSize.y);
gl_Position = vec4(aPosition, 0.0, 1.0);
}`),Ce=b(t,t.FRAGMENT_SHADER,`precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
uniform sampler2D uTexture;
void main () {
gl_FragColor = texture2D(uTexture, vUv);
}`),Ue=b(t,t.FRAGMENT_SHADER,`precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
uniform sampler2D uTexture;
uniform float value;
void main () {
gl_FragColor = value * texture2D(uTexture, vUv);
}`),Ge=`precision highp float;
precision highp sampler2D;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uTexture;
uniform vec2 texelSize;
void main () {
vec3 c = texture2D(uTexture, vUv).rgb;
#ifdef shading
vec3 lc = texture2D(uTexture, vL).rgb;
vec3 rc = texture2D(uTexture, vR).rgb;
vec3 tc = texture2D(uTexture, vT).rgb;
vec3 bc = texture2D(uTexture, vB).rgb;
float dx = length(rc) - length(lc);
float dy = length(tc) - length(bc);
vec3 n = normalize(vec3(dx, dy, length(texelSize)));
vec3 l = vec3(0.0, 0.0, 1.0);
float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
c *= diffuse;
#endif
float a = max(c.r, max(c.g, c.b));
gl_FragColor = vec4(c, a);
}`,Me=b(t,t.FRAGMENT_SHADER,`precision highp float;
precision highp sampler2D;
varying vec2 vUv;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
void main () {
vec2 p = vUv - point.xy;
p.x *= aspectRatio;
vec3 splat = exp(-dot(p, p) / radius) * color;
vec3 base = texture2D(uTarget, vUv).xyz;
gl_FragColor = vec4(base + splat, 1.0);
}`),ze=b(t,t.FRAGMENT_SHADER,ae(`precision highp float;
precision highp sampler2D;
varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform vec2 dyeTexelSize;
uniform float dt;
uniform float dissipation;
vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
vec2 st = uv / tsize - 0.5;
vec2 iuv = floor(st);
vec2 fuv = fract(st);
vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
}
void main () {
#ifdef MANUAL_FILTERING
vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
vec4 result = bilerp(uSource, coord, dyeTexelSize);
#else
vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
vec4 result = texture2D(uSource, coord);
#endif
float decay = 1.0 + dissipation * dt;
gl_FragColor = result / decay;
}`,E.supportLinearFiltering?null:["MANUAL_FILTERING"])),Ie=b(t,t.FRAGMENT_SHADER,`precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;
void main () {
float L = texture2D(uVelocity, vL).x;
float R = texture2D(uVelocity, vR).x;
float T = texture2D(uVelocity, vT).y;
float B = texture2D(uVelocity, vB).y;
vec2 C = texture2D(uVelocity, vUv).xy;
if (vL.x < 0.0) { L = -C.x; }
if (vR.x > 1.0) { R = -C.x; }
if (vT.y > 1.0) { T = -C.y; }
if (vB.y < 0.0) { B = -C.y; }
float div = 0.5 * (R - L + T - B);
gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}`),Ne=b(t,t.FRAGMENT_SHADER,`precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;
void main () {
float L = texture2D(uVelocity, vL).y;
float R = texture2D(uVelocity, vR).y;
float T = texture2D(uVelocity, vT).x;
float B = texture2D(uVelocity, vB).x;
float vorticity = R - L - T + B;
gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}`),Oe=b(t,t.FRAGMENT_SHADER,`precision highp float;
precision highp sampler2D;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;
void main () {
float L = texture2D(uCurl, vL).x;
float R = texture2D(uCurl, vR).x;
float T = texture2D(uCurl, vT).x;
float B = texture2D(uCurl, vB).x;
float C = texture2D(uCurl, vUv).x;
vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
force /= length(force) + 0.0001;
force *= curl * C;
force.y *= -1.0;
vec2 velocity = texture2D(uVelocity, vUv).xy;
velocity += force * dt;
velocity = min(max(velocity, -1000.0), 1000.0);
gl_FragColor = vec4(velocity, 0.0, 1.0);
}`),Xe=b(t,t.FRAGMENT_SHADER,`precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main () {
float L = texture2D(uPressure, vL).x;
float R = texture2D(uPressure, vR).x;
float T = texture2D(uPressure, vT).x;
float B = texture2D(uPressure, vB).x;
float C = texture2D(uPressure, vUv).x;
float divergence = texture2D(uDivergence, vUv).x;
float pressure = (L + R + B + T - divergence) * 0.25;
gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}`),Ye=b(t,t.FRAGMENT_SHADER,`precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main () {
float L = texture2D(uPressure, vL).x;
float R = texture2D(uPressure, vR).x;
float T = texture2D(uPressure, vT).x;
float B = texture2D(uPressure, vB).x;
vec2 velocity = texture2D(uVelocity, vUv).xy;
velocity.xy -= vec2(R - L, T - B);
gl_FragColor = vec4(velocity, 0.0, 1.0);
}`),g=(()=>{let e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW);let r=t.createBuffer();return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,r),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),(n,o=!1)=>{n==null?(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)):(t.viewport(0,0,n.width,n.height),t.bindFramebuffer(t.FRAMEBUFFER,n.fbo)),o&&(t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)}})(),p,l,k,V,w,se=new T(y,Ce),j=new T(y,Ue),P=new T(y,Me),R=new T(y,ze),q=new T(y,Ie),K=new T(y,Ne),_=new T(y,Oe),G=new T(y,Xe),M=new T(y,Ye),z=new Ae(y,Ge);function $(){let e=Re(a.simResolution),r=Re(a.dyeResolution),n=E.halfFloatTexType,o=E.formatRGBA,i=E.formatRG,c=E.formatR,s=E.supportLinearFiltering?t.LINEAR:t.NEAREST;t.disable(t.BLEND),p==null?p=J(r.width,r.height,o.internalFormat,o.format,n,s):p=ue(p,r.width,r.height,o.internalFormat,o.format,n,s),l==null?l=J(e.width,e.height,i.internalFormat,i.format,n,s):l=ue(l,e.width,e.height,i.internalFormat,i.format,n,s),k=B(e.width,e.height,c.internalFormat,c.format,n,t.NEAREST),V=B(e.width,e.height,c.internalFormat,c.format,n,t.NEAREST),w=J(e.width,e.height,c.internalFormat,c.format,n,t.NEAREST)}function B(e,r,n,o,i,c){t.activeTexture(t.TEXTURE0);let s=t.createTexture();t.bindTexture(t.TEXTURE_2D,s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,n,e,r,0,o,i,null);let d=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,d),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,s,0),t.viewport(0,0,e,r),t.clear(t.COLOR_BUFFER_BIT);let m=1/e,F=1/r;return{texture:s,fbo:d,width:e,height:r,texelSizeX:m,texelSizeY:F,attach(f){return t.activeTexture(t.TEXTURE0+f),t.bindTexture(t.TEXTURE_2D,s),f}}}function J(e,r,n,o,i,c){let s=B(e,r,n,o,i,c),d=B(e,r,n,o,i,c);return{width:e,height:r,texelSizeX:s.texelSizeX,texelSizeY:s.texelSizeY,get read(){return s},set read(m){s=m},get write(){return d},set write(m){d=m},swap(){let m=s;s=d,d=m}}}function We(e,r,n,o,i,c,s){let d=B(r,n,o,i,c,s);return se.bind(),t.uniform1i(se.uniforms.uTexture,e.attach(0)),g(d),d}function ue(e,r,n,o,i,c,s){return e.width===r&&e.height===n||(e.read=We(e.read,r,n,o,i,c,s),e.write=B(r,n,o,i,c,s),e.width=r,e.height=n,e.texelSizeX=1/r,e.texelSizeY=1/n),e}function He(){let e=[];a.shading&&e.push("shading"),z.setKeywords(e)}He(),$();let Z=Date.now(),I=0,Q=0;function ce(){let e=ke();U()&&$(),Ve(e),je(),a.paused||qe(e),le(null),Q=requestAnimationFrame(ce)}function ke(){let e=Date.now(),r=(e-Z)/1e3;return r=Math.min(r,.016666),Z=e,r}function U(){let e=x(u.clientWidth),r=x(u.clientHeight);return u.width!==e||u.height!==r?(u.width=e,u.height=r,!0):!1}function Ve(e){I+=e*a.colorUpdateSpeed,I>=1&&(I=nt(I,0,1),D.forEach(r=>{r.color=be(N())}))}function je(){D.forEach(e=>{e.moved&&(e.moved=!1,$e(e))})}function qe(e){t.disable(t.BLEND),K.bind(),t.uniform2f(K.uniforms.texelSize,l.texelSizeX,l.texelSizeY),t.uniform1i(K.uniforms.uVelocity,l.read.attach(0)),g(V),_.bind(),t.uniform2f(_.uniforms.texelSize,l.texelSizeX,l.texelSizeY),t.uniform1i(_.uniforms.uVelocity,l.read.attach(0)),t.uniform1i(_.uniforms.uCurl,V.attach(1)),t.uniform1f(_.uniforms.curl,a.curl),t.uniform1f(_.uniforms.dt,e),g(l.write),l.swap(),q.bind(),t.uniform2f(q.uniforms.texelSize,l.texelSizeX,l.texelSizeY),t.uniform1i(q.uniforms.uVelocity,l.read.attach(0)),g(k),j.bind(),t.uniform1i(j.uniforms.uTexture,w.read.attach(0)),t.uniform1f(j.uniforms.value,a.pressure),g(w.write),w.swap(),G.bind(),t.uniform2f(G.uniforms.texelSize,l.texelSizeX,l.texelSizeY),t.uniform1i(G.uniforms.uDivergence,k.attach(0));for(let n=0;n<a.pressureIteration;n++)t.uniform1i(G.uniforms.uPressure,w.read.attach(1)),g(w.write),w.swap();M.bind(),t.uniform2f(M.uniforms.texelSize,l.texelSizeX,l.texelSizeY),t.uniform1i(M.uniforms.uPressure,w.read.attach(0)),t.uniform1i(M.uniforms.uVelocity,l.read.attach(1)),g(l.write),l.swap(),R.bind(),t.uniform2f(R.uniforms.texelSize,l.texelSizeX,l.texelSizeY),E.supportLinearFiltering||t.uniform2f(R.uniforms.dyeTexelSize,l.texelSizeX,l.texelSizeY);let r=l.read.attach(0);t.uniform1i(R.uniforms.uVelocity,r),t.uniform1i(R.uniforms.uSource,r),t.uniform1f(R.uniforms.dt,e),t.uniform1f(R.uniforms.dissipation,a.velocityDissipation),g(l.write),l.swap(),E.supportLinearFiltering||t.uniform2f(R.uniforms.dyeTexelSize,p.texelSizeX,p.texelSizeY),t.uniform1i(R.uniforms.uVelocity,l.read.attach(0)),t.uniform1i(R.uniforms.uSource,p.read.attach(1)),t.uniform1f(R.uniforms.dissipation,a.densityDissipation),g(p.write),p.swap()}function le(e){t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.enable(t.BLEND),Ke(e)}function Ke(e){let r=e==null?t.drawingBufferWidth:e.width,n=e==null?t.drawingBufferHeight:e.height;z.bind(),a.shading&&t.uniform2f(z.uniforms.texelSize,1/r,1/n),t.uniform1i(z.uniforms.uTexture,p.read.attach(0)),g(e)}function $e(e){let r=e.deltaX*a.splatForce,n=e.deltaY*a.splatForce,o=tt(e.color);ee(e.texcoordX,e.texcoordY,r,n,o)}function fe(e){let r=N();r.r*=10,r.g*=10,r.b*=10;let n=10*(Math.random()-.5),o=30*(Math.random()-.5);ee(e.texcoordX,e.texcoordY,n,o,r)}function ee(e,r,n,o,i){P.bind(),t.uniform1i(P.uniforms.uTarget,l.read.attach(0)),t.uniform1f(P.uniforms.aspectRatio,u.width/u.height),t.uniform2f(P.uniforms.point,e,r),t.uniform3f(P.uniforms.color,n,o,0),t.uniform1f(P.uniforms.radius,Je(a.splatRadius/100)),g(l.write),l.swap(),t.uniform1i(P.uniforms.uTarget,p.read.attach(0)),t.uniform3f(P.uniforms.color,i.r,i.g,i.b),g(p.write),p.swap()}function Je(e){let r=u.width/u.height;return r>1&&(e*=r),e}let de=e=>{let r=D[0],n=u.getBoundingClientRect(),o=x(e.clientX-n.left),i=x(e.clientY-n.top);ge(r,-1,o,i),fe(r)},me=e=>{let r=D[0],n=u.getBoundingClientRect(),o=x(e.clientX-n.left),i=x(e.clientY-n.top),c=r.color;xe(r,o,i,c)},ve=e=>{let r=e.targetTouches,n=u.getBoundingClientRect(),o=D[0];for(let i=0;i<r.length;i++){let c=x(r[i].clientX-n.left),s=x(r[i].clientY-n.top);ge(o,r[i].identifier,c,s),fe(o)}},pe=e=>{e.preventDefault();let r=e.targetTouches,n=u.getBoundingClientRect(),o=D[0];for(let i=0;i<r.length;i++){let c=x(r[i].clientX-n.left),s=x(r[i].clientY-n.top);xe(o,c,s,o.color)}},he=e=>{let r=e.changedTouches,n=D[0];for(let o=0;o<r.length;o++)Ze(n)};window.addEventListener("mousedown",de),window.addEventListener("mousemove",me),window.addEventListener("touchstart",ve),window.addEventListener("touchmove",pe,{passive:!1}),window.addEventListener("touchend",he);function ge(e,r,n,o){e.id=r,e.down=!0,e.moved=!1,e.texcoordX=n/u.width,e.texcoordY=1-o/u.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=be(N())}function xe(e,r,n,o){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=r/u.width,e.texcoordY=1-n/u.height,e.deltaX=Qe(e.texcoordX-e.prevTexcoordX),e.deltaY=et(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.color=o}function Ze(e){e.down=!1}function Qe(e){let r=u.width/u.height;return r<1&&(e*=r),e}function et(e){let r=u.width/u.height;return r>1&&(e/=r),e}function N(){let e=a.colorIntensity,r=a.palette;if(r&&r.length>0){let o=r[Math.floor(Math.random()*r.length)],i=dt(o);if(i)return{r:i.r*e,g:i.g*e,b:i.b*e}}let n=rt(Math.random(),1,1);return n.r*=e,n.g*=e,n.b*=e,n}function be(e){return[e.r,e.g,e.b]}function tt(e){return{r:e[0],g:e[1],b:e[2]}}function rt(e,r,n){let o=0,i=0,c=0,s=Math.floor(e*6),d=e*6-s,m=n*(1-r),F=n*(1-d*r),f=n*(1-(1-d)*r);switch(s%6){case 0:o=n,i=f,c=m;break;case 1:o=F,i=n,c=m;break;case 2:o=m,i=n,c=f;break;case 3:o=m,i=F,c=n;break;case 4:o=f,i=m,c=n;break;case 5:o=n,i=m,c=F;break}return{r:o,g:i,b:c}}function nt(e,r,n){let o=n-r;return o===0?r:(e-r)%o+r}function Re(e){let r=t.drawingBufferWidth/t.drawingBufferHeight;r<1&&(r=1/r);let n=Math.round(e),o=Math.round(e*r);return t.drawingBufferWidth>t.drawingBufferHeight?{width:o,height:n}:{width:n,height:o}}function x(e){let r=Math.min(window.devicePixelRatio||1,Math.max(1,a.maxDpr));return Math.floor(e*r)}function ot(e){if(e.length===0)return 0;let r=0;for(let n=0;n<e.length;n++)r=(r<<5)-r+e.charCodeAt(n),r|=0;return r}function it(){var e,r;te||(te=!0,Y(),window.removeEventListener("mousedown",de),window.removeEventListener("mousemove",me),window.removeEventListener("touchstart",ve),window.removeEventListener("touchmove",pe),window.removeEventListener("touchend",he),window.removeEventListener("resize",ye),document.removeEventListener("visibilitychange",Ee),(e=h==null?void 0:h.removeEventListener)==null||e.call(h,"change",Te),A==null||A.disconnect(),S&&(u==null||u.remove()),(r=t.getExtension("WEBGL_lose_context"))==null||r.loseContext())}let te=!1,O=!1;function X(){O||te||(O=!0,Z=Date.now(),Q=requestAnimationFrame(ce))}function Y(){O=!1,cancelAnimationFrame(Q)}let Ee=()=>{a.pauseOnHidden&&(document.hidden?Y():C||X())},ye=()=>U(),A=typeof ResizeObserver!="undefined"?new ResizeObserver(()=>U()):null;A==null||A.observe(u);let h=typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)"):null,Te=()=>{a.respectReducedMotion&&(h!=null&&h.matches?Y():C||X())},C=!1;return window.addEventListener("resize",ye),document.addEventListener("visibilitychange",Ee),(De=h==null?void 0:h.addEventListener)==null||De.call(h,"change",Te),a.respectReducedMotion&&vt()?(C=!0,le(null)):X(),{dispose:it,pause(){C=!0,Y()},resume(){C=!1,X()},isPaused:()=>C||!O,setConfig(e){let r=e.simResolution!==void 0&&e.simResolution!==a.simResolution||e.dyeResolution!==void 0&&e.dyeResolution!==a.dyeResolution;Object.assign(a,e),e.maxDpr!==void 0&&U(),r&&$(),e.zIndex!==void 0&&(u.style.zIndex=String(e.zIndex)),e.pointerEvents!==void 0&&(u.style.pointerEvents=e.pointerEvents?"auto":"none")},splat(e,r,n){let o=u.getBoundingClientRect(),i=x(e),c=x(r),s=n!=null?n:N();ee(i,u.height-c,0,0,s)},get canvas(){return u}}};export{ct as characterNames,lt as getPreset,gt as initFluid,ut as paletteNames,st as presetNames,re as presets};
