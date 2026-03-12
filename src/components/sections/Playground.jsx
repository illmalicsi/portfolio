import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import EditorLib from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
import { FiSliders } from 'react-icons/fi'
import { HiOutlineCube } from 'react-icons/hi2'
import SectionHeading from '../layout/SectionHeading'

// CJS interop — lib exports `exports.default = Editor`
const Editor = EditorLib.default ?? EditorLib

// ── helpers ──────────────────────────────────────────────────────────────────

function parseCSSVars(code) {
  const vars = {}
  const re = /--([a-zA-Z-]+)\s*:\s*([^;]+?)\s*;/g
  let m
  while ((m = re.exec(code)) !== null) vars[m[1]] = m[2].trim()
  return vars
}

function liveCode(shape, color, wireframe, speed) {
  return `// Three.js — controls update this live
const geometry = new THREE.${shape}()
const material = new THREE.MeshStandardMaterial({
  color: '${color}',
  wireframe: ${wireframe},
  metalness: 0.5,
  roughness: 0.2,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

function tick(dt) {
  mesh.rotation.y += ${speed.toFixed(2)} * dt
  mesh.rotation.x += ${(speed * 0.4).toFixed(2)} * dt
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick()`
}

const INITIAL_CSS = `/* Live Theme — edit any value */
:root {
  --accent:  #06b6d4;
  --bg:      #0f172a;
  --text:    #f1f5f9;
  --radius:  12px;
}`

const SHAPES = [
  'BoxGeometry',
  'SphereGeometry',
  'TorusGeometry',
  'TorusKnotGeometry',
  'ConeGeometry',
  'CylinderGeometry',
  'TetrahedronGeometry',
  'OctahedronGeometry',
  'IcosahedronGeometry',
  'DodecahedronGeometry',
]

// ── Three.js mesh ─────────────────────────────────────────────────────────────

function SceneMesh({ shape, color, wireframe, speed }) {
  const ref = useRef()
  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * speed
    ref.current.rotation.x += dt * speed * 0.4
  })
  return (
    <mesh ref={ref}>
      {shape === 'BoxGeometry'       && <boxGeometry       args={[1.6, 1.6, 1.6]} />}
      {shape === 'SphereGeometry'    && <sphereGeometry    args={[1.2, 48, 48]} />}
      {shape === 'TorusGeometry'     && <torusGeometry     args={[1.0, 0.38, 24, 100]} />}
      {shape === 'TorusKnotGeometry' && <torusKnotGeometry args={[0.9, 0.28, 128, 16]} />}
      {shape === 'ConeGeometry'      && <coneGeometry      args={[1.1, 2.2, 48]} />}
      {shape === 'CylinderGeometry'  && <cylinderGeometry  args={[0.9, 0.9, 2.1, 48]} />}
      {shape === 'TetrahedronGeometry' && <tetrahedronGeometry args={[1.35, 0]} />}
      {shape === 'OctahedronGeometry' && <octahedronGeometry args={[1.25, 0]} />}
      {shape === 'IcosahedronGeometry' && <icosahedronGeometry args={[1.15, 0]} />}
      {shape === 'DodecahedronGeometry' && <dodecahedronGeometry args={[1.2, 0]} />}
      <meshStandardMaterial color={color} wireframe={wireframe} metalness={0.5} roughness={0.2} />
    </mesh>
  )
}

// ── reusable window chrome ────────────────────────────────────────────────────

function WindowBar({ filename, live = false }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/3 shrink-0">
      <span className="w-3 h-3 rounded-full bg-red-400/70" />
      <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
      <span className="w-3 h-3 rounded-full bg-green-400/70" />
      <span className="ml-2 text-xs text-slate-500 font-mono">{filename}</span>
      {live && (
        <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
          live
        </span>
      )}
    </div>
  )
}

// ── main component ────────────────────────────────────────────────────────────

export default function Playground() {
  const [tab, setTab] = useState('theme')

  // Theme tab
  const [css, setCss] = useState(INITIAL_CSS)
  const vars    = parseCSSVars(css)
  const accent  = vars['accent']  || '#06b6d4'
  const bg      = vars['bg']      || '#0f172a'
  const textCol = vars['text']    || '#f1f5f9'
  const radius  = vars['radius']  || '12px'

  // 3D tab
  const [shape,     setShape]     = useState('BoxGeometry')
  const [meshColor, setMeshColor] = useState('#06b6d4')
  const [wireframe, setWireframe] = useState(false)
  const [speed,     setSpeed]     = useState(1.0)

  return (
    <section id="playground" className="px-4 py-24 md:px-8 md:py-32 relative overflow-hidden">
      {/* bg blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-violet-600/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-cyan-600/8 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl relative z-10">
        <SectionHeading
          eyebrow="Live Playground"
          title="Code that runs right here"
          description="Edit the theme code and watch the preview update instantly, or manipulate a 3D scene with live Three.js output — all in your browser, no setup needed."
        />

        {/* Tab switcher */}
        <div className="mt-12 flex gap-1 p-1 bg-white/5 rounded-xl w-fit border border-white/10">
          {[
            { id: 'theme', label: '🎨  Theme Switcher' },
            { id: '3d',    label: '🧊  3D Scene'        },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                tab === t.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── Theme tab ─────────────────────────────────── */}
          {tab === 'theme' && (
            <Motion.div
              key="theme"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="mt-6 grid md:grid-cols-2 gap-4 items-stretch"
            >
              {/* Editor panel */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/80 overflow-hidden flex flex-col min-h-72">
                <WindowBar filename="theme.css" live />
                <div className="flex-1 overflow-auto">
                  <Editor
                    value={css}
                    onValueChange={setCss}
                    highlight={(code) => highlight(code, languages.css, 'css')}
                    padding={20}
                    style={{
                      fontFamily: '"Fira Code", "Fira Mono", "Cascadia Code", monospace',
                      fontSize: 13,
                      lineHeight: 1.75,
                      background: 'transparent',
                      color: '#cbd5e1',
                      minHeight: '100%',
                    }}
                  />
                </div>
              </div>

              {/* Preview panel */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/80 overflow-hidden flex flex-col min-h-72">
                <WindowBar filename="preview" live />
                <div
                  className="flex-1 flex items-center justify-center p-8 transition-colors duration-300"
                  style={{ background: bg }}
                >
                  <div
                    className="w-full max-w-xs p-5 shadow-2xl transition-all duration-300"
                    style={{
                      background: bg === '#0f172a' ? '#1e293b' : `${bg}cc`,
                      borderRadius: radius,
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full mb-4 transition-colors duration-300"
                      style={{ background: accent }}
                    />
                    <p
                      className="font-bold text-base mb-0.5 transition-colors duration-300"
                      style={{ color: textCol }}
                    >
                      Ivan Louie Malicsi
                    </p>
                    <p
                      className="text-xs mb-5 opacity-50 transition-colors duration-300"
                      style={{ color: textCol }}
                    >
                      Full Stack Developer
                    </p>
                    <button
                      className="w-full py-2 text-sm font-semibold transition-all duration-300 hover:opacity-80"
                      style={{
                        background: accent,
                        borderRadius: `calc(${radius} / 1.5)`,
                        color: bg,
                      }}
                    >
                      View Portfolio
                    </button>
                  </div>
                </div>
              </div>
            </Motion.div>
          )}

          {/* ── 3D tab ─────────────────────────────────────── */}
          {tab === '3d' && (
            <Motion.div
              key="3d"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="mt-6 grid md:grid-cols-2 gap-4 items-stretch"
            >
              {/* Live code panel */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/80 overflow-hidden flex flex-col min-h-72">
                <WindowBar filename="scene.js" live />
                <pre
                  className="flex-1 overflow-auto p-5 text-slate-300 prism-code"
                  style={{
                    fontFamily: '"Fira Code", "Fira Mono", monospace',
                    fontSize: 12.5,
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: highlight(
                      liveCode(shape, meshColor, wireframe, speed),
                      languages.javascript,
                      'javascript'
                    ),
                  }}
                />
              </div>

              {/* Canvas + controls */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/80 overflow-hidden flex flex-col min-h-72">
                <WindowBar filename="canvas" />
                {/* Three.js canvas */}
                <div className="flex-1 min-h-56">
                  <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
                    <color attach="background" args={['#020617']} />
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[4, 4, 4]} intensity={1.4} />
                    <pointLight position={[-4, -4, -4]} intensity={0.8} color={meshColor} />
                    <SceneMesh
                      shape={shape}
                      color={meshColor}
                      wireframe={wireframe}
                      speed={speed}
                    />
                  </Canvas>
                </div>

                {/* Controls */}
                <div className="px-5 py-4 border-t border-white/8 bg-white/2 space-y-3.5">
                  {/* Shape */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs text-slate-400 w-16 shrink-0">Shape</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {SHAPES.map((s) => (
                        <button
                          key={s}
                          onClick={() => setShape(s)}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                            shape === s
                              ? 'border-cyan-400/60 bg-cyan-400/15 text-cyan-300'
                              : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {s.replace('Geometry', '')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 w-16 shrink-0">Color</span>
                    <input
                      type="color"
                      value={meshColor}
                      onChange={(e) => setMeshColor(e.target.value)}
                      className="w-7 h-7 rounded-md cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-xs font-mono text-slate-400">{meshColor}</span>
                  </div>

                  {/* Speed */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 w-16 shrink-0">Speed</span>
                    <input
                      type="range" min="0" max="3" step="0.1" value={speed}
                      onChange={(e) => setSpeed(Number(e.target.value))}
                      className="flex-1 accent-cyan-400 h-1.5"
                    />
                    <span className="text-xs font-mono text-slate-400 w-6 text-right">
                      {speed.toFixed(1)}
                    </span>
                  </div>

                  {/* Wireframe */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 w-16 shrink-0">Wireframe</span>
                    <button
                      onClick={() => setWireframe((w) => !w)}
                      className={`relative w-9 h-5 shrink-0 rounded-full transition-colors duration-200 ${
                        wireframe ? 'bg-cyan-500' : 'bg-slate-700'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                          wireframe ? 'translate-x-4' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                    <span className="inline-flex w-10 items-center text-xs text-slate-500 font-mono leading-none">
                      {wireframe ? 'true' : 'false'}
                    </span>
                  </div>
                </div>
              </div>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
