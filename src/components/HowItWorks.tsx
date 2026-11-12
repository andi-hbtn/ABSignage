"use client"

import React, { useState, useRef, useCallback, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import type { Dictionary } from "@/lib/get-dictionary"
import type { Locale } from "@/lib/i18n-config"
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Tv,
  KeyRound,
  CheckCircle2,
  UploadCloud,
  LayoutGrid,
  SlidersHorizontal,
  Megaphone,
  Sparkles,
  Video,
  Volume2,
  VolumeX,
  Maximize2,
  Download,
  ExternalLink,
} from "lucide-react"

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.andibevapi.digitalsignageplayer&hl=en"

interface HowItWorksProps {
  dict?: Dictionary["howItWorks"]
  locale?: Locale
  onOpenDemo?: () => void
}

const VIDEO_TOTAL_DURATION = 106

export function HowItWorks({ dict, locale = "sq" }: HowItWorksProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const [reducedMotion] = useState<boolean>(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }
    return false
  })
  const [activeScene, setActiveScene] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(true)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(VIDEO_TOTAL_DURATION)
  const [playbackRate, setPlaybackRate] = useState<number>(1)

  const isSq = locale === "sq"
  const isIt = locale === "it"
  const isDe = locale === "de"

  const scenes = useMemo(
    () => [
      {
        number: "01",
        id: "pairing-code",
        startTime: 0,
        endTime: 12,
        platform: "ANDROID TV PLAYER",
        icon: Tv,
        shortTitle: isSq ? "Kodi në TV" : isIt ? "Codice TV" : isDe ? "Kopplungscode" : "Pairing Code",
        title: isSq
          ? "Skena 1 — Gjenerimi i kodit të çiftimit në Android TV"
          : isIt
          ? "Scena 1 — Generazione del codice su Android TV"
          : isDe
          ? "Szene 1 — Kopplungscode auf Android TV generieren"
          : "Scene 1 — Pairing Code Generation on Android TV",
        desc: isSq
          ? "Aplikacioni ABSignage hapet në televizor dhe gjeneron automatikisht një kod unik prej 6 shifrash (739-204), duke pritur lidhjen me platformën."
          : "The ABSignage Android TV app launches and automatically generates a unique 6-digit pairing code (739-204), waiting for the platform connection."
      },
      {
        number: "02",
        id: "enter-code",
        startTime: 12,
        endTime: 24,
        platform: "ABSIGNAGE CLOUD CONSOLE",
        icon: KeyRound,
        shortTitle: isSq ? "Lidhja e TV" : isIt ? "Abbinamento" : isDe ? "Gerätekopplung" : "Device Pairing",
        title: isSq
          ? "Skena 2 — Futja e kodit në platformën ABSignage"
          : isIt
          ? "Scena 2 — Inserimento del codice sulla piattaforma web"
          : isDe
          ? "Szene 2 — Code auf der Web-Plattform eingeben"
          : "Scene 2 — Enter Pairing Code into ABSignage Platform",
        desc: isSq
          ? "Përdoruesi hap konsolën web të ABSignage, shkon te pajisjet dhe fut me lehtësi të njëjtin kod 6-shifror (739-204) të shfaqur në televizor."
          : "The user opens the ABSignage web console, navigates to Devices, and enters the exact same 6-digit code (739-204) shown on the TV."
      },
      {
        number: "03",
        id: "activation",
        startTime: 24,
        endTime: 36,
        platform: "ACTIVATION & SYNC",
        icon: CheckCircle2,
        shortTitle: isSq ? "Aktivizimi" : isIt ? "Attivazione" : isDe ? "Aktivierung" : "TV Activation",
        title: isSq
          ? "Skena 3 — Çiftimi i suksesshëm dhe aktivizimi i televizorit"
          : isIt
          ? "Scena 3 — Abbinamento riuscito e attivazione dello schermo"
          : isDe
          ? "Szene 3 — Erfolgreiche Kopplung und TV-Aktivierung"
          : "Scene 3 — Successful Pairing & TV Activation",
        desc: isSq
          ? "Platforma verifikon kodin menjëherë. Televizori regjistrohet me statusin Online & Aktiv, gati për të marrë përmbajtje dhe fushata."
          : "The platform confirms pairing instantly. The TV registers as Online & Active, ready to receive playlists and campaigns."
      },
      {
        number: "04",
        id: "media-upload",
        startTime: 36,
        endTime: 50,
        platform: "MEDIA LIBRARY",
        icon: UploadCloud,
        shortTitle: isSq ? "Ngarkimi i Mediave" : isIt ? "Libreria Media" : isDe ? "Medien-Upload" : "Media Library",
        title: isSq
          ? "Skena 4 — Ngarkimi i mediave komerciale për çdo industri"
          : isIt
          ? "Scena 4 — Caricamento contenuti multimediali per ogni settore"
          : isDe
          ? "Szene 4 — Medien für verschiedene Branchen hochladen"
          : "Scene 4 — Upload Commercial Images & Videos",
        desc: isSq
          ? "Ngarkoni me lehtësi foto dhe video 4K për ushqime, pije, produkte bukurie e parfume, veshje mode dhe promovime me pakicë nga një vend i vetëm."
          : "Upload professional 4K images and videos across food, beverages, cosmetics, fashion collections, and retail promotions in one centralized hub."
      },
      {
        number: "05",
        id: "playlist-formats",
        startTime: 50,
        endTime: 66,
        platform: "PLAYLIST BUILDER",
        icon: LayoutGrid,
        shortTitle: isSq ? "Formatet e Playlistave" : isIt ? "Formati Playlist" : isDe ? "Playlist-Formate" : "Playlist Formats",
        title: isSq
          ? "Skena 5 — Zgjedhja e formateve: Full-screen, Horizontal dhe Totem Vertikal"
          : isIt
          ? "Scena 5 — Creazione formati: Full-screen, Orizzontale e Totem Verticale"
          : isDe
          ? "Szene 5 — Playlist-Formate: Vollbild, Horizontal und Vertikales Totem"
          : "Scene 5 — Create Different Playlist Formats",
        desc: isSq
          ? "Krijoni playlista sipas nevojave: Ekran i plotë (1 zonë 100%), Horizontal me 3 zona të sinkronizuara, ose Totem Vertikal (9:16) për modë dhe dyqane."
          : "Choose the perfect layout: Full-screen (100% display), Horizontal Multi-Zone (3 synchronized zones), or Vertical Totem (9:16) for retail pillars."
      },
      {
        number: "06",
        id: "organize-media",
        startTime: 66,
        endTime: 78,
        platform: "CONTENT CURATION",
        icon: SlidersHorizontal,
        shortTitle: isSq ? "Përzgjedhja e Mediave" : isIt ? "Organizzazione" : isDe ? "Inhalte Anordnen" : "Organize Media",
        title: isSq
          ? "Skena 6 — Përzgjedhja dhe organizimi i mediave në zona me pamje live"
          : isIt
          ? "Scena 6 — Selezione e organizzazione dei contenuti con anteprima TV"
          : isDe
          ? "Szene 6 — Medien zuweisen und mit Live-Vorschau organisieren"
          : "Scene 6 — Select & Organize Media Inside Playlists",
        desc: isSq
          ? "Zgjidhni materialet nga Media Library, vendosni kohëzgjatjen (10s, 15s) dhe efektet e tranzicionit me preview live në kohë reale."
          : "Assign media from the library to zones, set display durations (10s, 15s) and smooth transitions with interactive real-time TV preview."
      },
      {
        number: "07",
        id: "campaign-publish",
        startTime: 78,
        endTime: 90,
        platform: "CAMPAIGN ENGINE",
        icon: Megaphone,
        shortTitle: isSq ? "Krijimi i Fushatës" : isIt ? "Campagna" : isDe ? "Kampagnen-Setup" : "Campaign & Publish",
        title: isSq
          ? "Skena 7 — Krijimi i fushatës dhe publikimi i menjëhershëm në re"
          : isIt
          ? "Scena 7 — Configurazione campagna e pubblicazione istantanea via cloud"
          : isDe
          ? "Szene 7 — Kampagnen-Konfiguration und sofortige Veröffentlichung"
          : "Scene 7 — Create & Configure Campaign (Campaign → Playlist → TV)",
        desc: isSq
          ? "Lidhni playlistën me televizorin e regjistruar: FUSHATË ──▶ PLAYLISTË ──▶ TELEVIZOR. Klikoni Publiko dhe përmbajtja shpërndahet në çast."
          : "Connect the workflow: CAMPAIGN ──▶ PLAYLIST ──▶ TV DEVICE. Hit Publish and the cloud network pushes the update to your screen instantly."
      },
      {
        number: "08",
        id: "live-payoff",
        startTime: 90,
        endTime: 106,
        platform: "LIVE COMMERCIAL DISPLAY",
        icon: Sparkles,
        shortTitle: isSq ? "Shfaqja Live në TV" : isIt ? "Schermo Live" : isDe ? "Live-Ergebnis" : "Live TV Result",
        title: isSq
          ? "Skena 8 — Fushata luhet live në Android TV në mjedise reale biznesi"
          : isIt
          ? "Scena 8 — Campagna attiva su Android TV in ambienti commerciali reali"
          : isDe
          ? "Szene 8 — Kampagne läuft live auf Android TV in realen Geschäften"
          : "Scene 8 — Campaign Playing on Android TV across Multiple Environments",
        desc: isSq
          ? "Televizori fillon menjëherë luajtjen e fushatës së publikuar në restorante, bare, dyqane kozmetike dhe butikë mode. Një platformë për çdo biznes."
          : "The TV plays the published campaign across restaurants, bars, cosmetics stores, and fashion boutiques. One platform for every business."
      },
    ],
    [isSq, isIt, isDe]
  )

  // Sync active scene based on video time
  const handleVideoTimeUpdate = () => {
    const vid = videoRef.current
    if (!vid) return
    const t = vid.currentTime
    setCurrentTime(t)

    const sceneIdx = scenes.findIndex((s) => t >= s.startTime && t < s.endTime)
    if (sceneIdx !== -1 && sceneIdx !== activeScene) {
      setActiveScene(sceneIdx)
    }
  }

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || VIDEO_TOTAL_DURATION)
    }
  }

  // Seek video directly to a specific scene
  const seekToScene = useCallback(
    (idx: number, e?: React.MouseEvent) => {
      if (e) e.stopPropagation()
      const targetScene = scenes[idx]
      if (!targetScene) return

      setActiveScene(idx)
      const vid = videoRef.current
      if (vid) {
        vid.currentTime = targetScene.startTime
        if (vid.paused) {
          vid.muted = isMuted
          const p = vid.play()
          if (p !== undefined) {
            p.then(() => setIsPlaying(true)).catch(() => {
              vid.muted = true
              setIsMuted(true)
              vid.play().then(() => setIsPlaying(true)).catch(() => undefined)
            })
          }
        }
      } else {
        setCurrentTime(targetScene.startTime)
      }
    },
    [scenes, isMuted]
  )

  const handlePrevScene = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation()
      const nextIdx = (activeScene - 1 + scenes.length) % scenes.length
      seekToScene(nextIdx, e)
    },
    [activeScene, scenes.length, seekToScene]
  )

  const handleNextScene = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation()
      const nextIdx = (activeScene + 1) % scenes.length
      seekToScene(nextIdx, e)
    },
    [activeScene, scenes.length, seekToScene]
  )

  const handleRestart = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation()
      seekToScene(0, e)
      const vid = videoRef.current
      if (vid) {
        vid.currentTime = 0
        vid.muted = isMuted
        const p = vid.play()
        if (p !== undefined) {
          p.then(() => setIsPlaying(true)).catch(() => undefined)
        }
      }
    },
    [seekToScene, isMuted]
  )

  const handleTogglePlay = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation()
      const vid = videoRef.current
      if (!vid) return

      if (vid.paused || vid.ended) {
        if (vid.ended) vid.currentTime = 0
        vid.muted = isMuted
        const p = vid.play()
        if (p !== undefined) {
          p.then(() => setIsPlaying(true)).catch(() => {
            vid.muted = true
            setIsMuted(true)
            vid.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
          })
        }
      } else {
        vid.pause()
        setIsPlaying(false)
      }
    },
    [isMuted]
  )

  const handleToggleMute = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const vid = videoRef.current
    if (!vid) return
    const nextMuted = !vid.muted
    vid.muted = nextMuted
    setIsMuted(nextMuted)
  }, [])

  const handleCycleSpeed = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const nextRate = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1
    setPlaybackRate(nextRate)
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate
    }
  }

  const handleFullscreen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const el = videoRef.current
    if (el && el.requestFullscreen) {
      el.requestFullscreen().catch(() => undefined)
    }
  }

  const handleSeekBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const newTime = ratio * duration
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
      if (videoRef.current.paused) {
        videoRef.current.muted = isMuted
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => undefined)
      }
    }
    setCurrentTime(newTime)
  }

  const currentScene = scenes[activeScene] || scenes[0]
  const sceneSpan = Math.max(1, currentScene.endTime - currentScene.startTime)
  const currentSceneProgress = Math.max(
    0,
    Math.min(100, ((currentTime - currentScene.startTime) / sceneSpan) * 100)
  )
  const totalWalkthroughPercent = Math.min(100, Math.round((currentTime / duration) * 100))

  const formatTime = (sec: number) => {
    const s = Math.max(0, Math.floor(sec))
    const mins = Math.floor(s / 60)
    const rem = s % 60
    return `${String(mins).padStart(2, "0")}:${String(rem).padStart(2, "0")}`
  }

  return (
    <section
      id="how-it-works"
      aria-label="ABSignage Product Demonstration Video"
      className="py-24 relative overflow-hidden bg-slate-950 border-t border-white/[0.06]"
    >
      {/* Subtle Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[480px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[560px] h-[400px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none -z-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* =============================================================== */}
        {/* SECTION HEADER                                                  */}
        {/* =============================================================== */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(0,229,255,0.15)]">
            <Video className="w-3.5 h-3.5 text-cyan-400" />
            <span>{dict?.badge ?? "HOW IT WORKS"}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {dict?.title ?? "One Platform. Every Business. Every Screen."}
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            {dict?.subtitle ??
              "From restaurants and cafes to retail stores, fashion brands, and beauty businesses, ABSignage makes it easy to manage your digital screens. Connect your TVs, upload your content, create playlists, and publish campaigns — all from one powerful platform."}
          </p>
        </div>

        {/* =============================================================== */}
        {/* 8-SCENE CHAPTER SELECTOR                                        */}
        {/* =============================================================== */}
        <div
          role="tablist"
          aria-label="Video demonstration chapters"
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-6"
        >
          {scenes.map((scene, idx) => {
            const Icon = scene.icon
            const isCurrent = activeScene === idx
            const isCompleted = idx < activeScene

            return (
              <button
                key={scene.id}
                role="tab"
                type="button"
                aria-selected={isCurrent}
                onClick={(e) => seekToScene(idx, e)}
                className={`group text-left p-2.5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                  isCurrent
                    ? "bg-slate-900/95 border-cyan-400 ring-2 ring-cyan-400/20 shadow-[0_0_25px_rgba(0,229,255,0.25)]"
                    : isCompleted
                    ? "bg-slate-900/70 border-cyan-500/30 hover:border-cyan-400/50"
                    : "bg-slate-900/40 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/70"
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span
                    className={`font-mono text-[11px] font-black px-2 py-0.5 rounded-md border ${
                      isCurrent
                        ? "bg-cyan-500 text-slate-950 border-cyan-400"
                        : isCompleted
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : "bg-slate-800/90 text-slate-400 border-slate-700"
                    }`}
                  >
                    {scene.number}
                  </span>

                  <div
                    className={`p-1 rounded-lg transition-colors ${
                      isCurrent
                        ? "bg-cyan-500/20 text-cyan-300"
                        : isCompleted
                        ? "text-emerald-400"
                        : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-[11px] sm:text-xs font-bold text-white leading-snug truncate">
                  {scene.shortTitle}
                </div>

                <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-150 rounded-full ${
                      isCurrent
                        ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                        : isCompleted
                        ? "bg-emerald-400/80 w-full"
                        : "w-0"
                    }`}
                    style={{
                      width: isCurrent
                        ? `${currentSceneProgress}%`
                        : isCompleted
                        ? "100%"
                        : "0%",
                    }}
                  />
                </div>
              </button>
            )
          })}
        </div>

        {/* =============================================================== */}
        {/* CENTER VIDEO DEMONSTRATION PLAYER                               */}
        {/* =============================================================== */}
        <div className="relative rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 border border-cyan-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.8)]">
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>{currentScene.platform}</span>
              </span>
              <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={handlePrevScene}
                aria-label={dict?.prevScene ?? "Previous scene"}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                title={dict?.prevScene ?? "Previous Scene"}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleTogglePlay}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isPlaying
                    ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                    : "bg-slate-900 text-cyan-300 border-cyan-500/40 hover:bg-slate-800"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>{dict?.playing ?? (isSq ? "Video po luhet" : "Playing Video")}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{dict?.playVideo ?? (isSq ? "Luaj Videon" : "Watch How It Works")}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleNextScene}
                aria-label={dict?.nextScene ?? "Next scene"}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                title={dict?.nextScene ?? "Next Scene"}
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleToggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                title={isMuted ? "Unmute Sound" : "Mute Sound"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-amber-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                )}
              </button>

              <button
                type="button"
                onClick={handleCycleSpeed}
                aria-label="Playback speed"
                className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-mono text-xs font-bold transition-colors cursor-pointer"
                title="Change playback speed"
              >
                {playbackRate}x
              </button>

              <button
                type="button"
                onClick={handleRestart}
                aria-label={dict?.restart ?? "Restart demo"}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                title={dict?.restart ?? "Restart Walkthrough"}
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleFullscreen}
                aria-label="Fullscreen"
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                title="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Scene Banner */}
          <div className="mb-3 px-3.5 py-3 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default" className="text-[10px] font-mono uppercase bg-cyan-500 text-slate-950 font-bold">
                  SCENE {currentScene.number} / 08
                </Badge>
                <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  {currentScene.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                {currentScene.desc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800/80 shrink-0">
              <span className="text-[11px] text-slate-400">
                {dict?.downloadAppText ??
                  (isSq
                    ? "Instaloni falas aplikacionin zyrtar ABSignage Player në Android TV ose Google TV:"
                    : "Install the official ABSignage Player app for free on Android TV or Google TV:")}
              </span>
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 text-slate-950 font-extrabold text-xs hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)]"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>
                  {dict?.downloadApp ??
                    (isSq
                      ? "Shkarko në Google Play"
                      : isIt
                      ? "Scarica su Google Play"
                      : isDe
                      ? "Bei Google Play herunterladen"
                      : "Download on Google Play")}
                </span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* 16:9 Full HD Video Viewport */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-cyan-500/35 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
              <video
                ref={videoRef}
                src="/videos/ab-signage-product-demo.mp4"
                poster="/images/ab-signage-product-demo-poster.webp"
                className="w-full h-full object-cover bg-slate-950 block cursor-pointer"
                autoPlay={!reducedMotion}
                muted={isMuted}
                loop
                playsInline
                preload="metadata"
                onClick={handleTogglePlay}
                onTimeUpdate={handleVideoTimeUpdate}
                onLoadedMetadata={handleVideoLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src="/videos/ab-signage-product-demo.mp4" type="video/mp4" />
                <source src="/videos/ab-signage-product-demo.webm" type="video/webm" />
              </video>

              {/* Big Center Play Overlay Button when Paused */}
              {!isPlaying && (
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    handleTogglePlay(e)
                  }}
                  className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer z-20 group/overlay transition-all"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-[0_0_50px_rgba(0,229,255,0.7)] group-hover/overlay:scale-110 transition-transform">
                    <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-current ml-1.5" />
                  </div>
                </div>
              )}
            </div>

            {/* Scrubber Timeline Bar with Chapter Markers */}
            <div className="bg-slate-950/95 border-t border-white/10 px-4 py-3 relative z-30">
              <div
                onClick={handleSeekBarClick}
                className="relative h-2.5 w-full bg-slate-800 rounded-full cursor-pointer overflow-hidden mb-2"
              >
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 rounded-full transition-all duration-100"
                  style={{ width: `${totalWalkthroughPercent}%` }}
                />
                {scenes.map((s, idx) =>
                  idx > 0 ? (
                    <div
                      key={s.id}
                      className="absolute top-0 bottom-0 w-0.5 bg-slate-950/90"
                      style={{ left: `${(s.startTime / VIDEO_TOTAL_DURATION) * 100}%` }}
                    />
                  ) : null
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-300 font-bold">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                  <span>·</span>
                  <span className="text-white font-semibold">{currentScene.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
