"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Tv, 
  Activity, 
  Film, 
  CalendarClock, 
  RefreshCw, 
  Play, 
  Pause, 
  AlertTriangle, 
  CheckCircle2, 
  Wifi, 
  WifiOff, 
  Layers, 
  HardDrive, 
  Cpu, 
  ShieldAlert,
  Sliders,
  Plus
} from "lucide-react"

export function LiveSimulator() {
  const [activeTab, setActiveTab] = useState<"fleet" | "composer" | "player">("fleet")
  const [simulatedWarning, setSimulatedWarning] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [selectedDevice, setSelectedDevice] = useState(1)

  const devices = [
    {
      id: 1,
      name: "Tirana City Mall - Main Lobby Wall",
      city: "Tiranë",
      area: "Qendra",
      model: "Sony Bravia 85\" 4K Pro (Android 12)",
      status: simulatedWarning ? "WARNING" : "ACTIVE",
      activation: "ACTIVATED",
      lastSeen: "2 sekonda më parë",
      fps: simulatedWarning ? "44 FPS" : "60 FPS",
      cacheUsed: "1.4 GB / 8.0 GB",
      temp: simulatedWarning ? "52°C (Warning)" : "41°C (Normal)",
      activeCampaign: "Summer Mega Sale 2026",
    },
    {
      id: 2,
      name: "Durrës Terminal A - Boarding Gate 04",
      city: "Durrës",
      area: "Porti",
      model: "Philips Q-Line 55\" Display (Android 11)",
      status: "ACTIVE",
      activation: "ACTIVATED",
      lastSeen: "5 sekonda më parë",
      fps: "60 FPS",
      cacheUsed: "820 MB / 4.0 GB",
      temp: "39°C (Normal)",
      activeCampaign: "Port Departures & Transit Ads",
    },
    {
      id: 3,
      name: "Prishtina Grand Store - Video Column",
      city: "Prishtinë",
      area: "Dardania",
      model: "Vestel Commercial Prime 65\"",
      status: "ACTIVE",
      activation: "ACTIVATED",
      lastSeen: "1 sekondë më parë",
      fps: "59.8 FPS",
      cacheUsed: "2.1 GB / 16.0 GB",
      temp: "43°C (Normal)",
      activeCampaign: "Brand Ambassador Showcase",
    },
    {
      id: 4,
      name: "Shkodër Drive-Thru Menu Outer 02",
      city: "Shkodër",
      area: "Pedonale",
      model: "TCL Outdoor Rugged 55\" (Android 13)",
      status: "ACTIVE",
      activation: "ACTIVATED",
      lastSeen: "8 sekonda më parë",
      fps: "60 FPS",
      cacheUsed: "540 MB / 8.0 GB",
      temp: "38°C (Normal)",
      activeCampaign: "Lunch Specials & Fast Orders",
    },
  ]

  const playlistItems = [
    { id: 1, title: "01_Brand_Intro_4K_HDR.mp4", duration: 15, size: "124 MB", type: "Video" },
    { id: 2, title: "02_Summer_Promo_Dynamic.mp4", duration: 20, size: "185 MB", type: "Video" },
    { id: 3, title: "03_Partner_CoBranding_Square.png", duration: 10, size: "4.2 MB", type: "Image" },
    { id: 4, title: "04_Store_Hours_Ticker_Live.json", duration: 15, size: "12 KB", type: "Dynamic Widget" },
  ]

  const currentDev = devices.find(d => d.id === selectedDevice) || devices[0]

  return (
    <section id="simulator" className="py-24 relative overflow-hidden bg-slate-950/70 border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="default" className="mb-4">
            Përjetim Interaktiv në Shfletues
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            ABSignage Command Center & Player Simulator
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Eksploroni funksionalitetet e fuqishme të platformës: monitorimi në kohë reale i flotës së ekraneve, kompozimi i playlist-ave dhe pamja e riprodhimit në Android TV.
          </p>
        </div>

        {/* Simulator Frame */}
        <div className="rounded-3xl border border-cyan-500/30 bg-slate-950 shadow-[0_20px_60px_-15px_rgba(0,229,255,0.25)] overflow-hidden">
          
          {/* Top Simulator Nav Tabs */}
          <div className="bg-slate-900/90 border-b border-white/[0.08] px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
              <button
                onClick={() => setActiveTab("fleet")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "fleet"
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>NOC & Flota e Ekraneve</span>
              </button>

              <button
                onClick={() => setActiveTab("composer")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "composer"
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Film className="w-4 h-4" />
                <span>Studio Playlist & Timeline</span>
              </button>

              <button
                onClick={() => setActiveTab("player")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "player"
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Tv className="w-4 h-4" />
                <span>Android TV Player (TV Screen)</span>
              </button>
            </div>

            {/* Live Interactive Action Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSimulatedWarning(!simulatedWarning)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all flex items-center gap-1.5 ${
                  simulatedWarning
                    ? "bg-amber-950/60 border-amber-500/50 text-amber-300"
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-cyan-500/40"
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>{simulatedWarning ? "Çaktivizo Simulimin e Defektit" : "Simulo Parashikim Defekti"}</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono">Heartbeat OK</span>
              </div>
            </div>
          </div>

          {/* SIMULATOR TAB 1: FLEET NOC */}
          {activeTab === "fleet" && (
            <div className="p-6 lg:p-8 space-y-6">
              
              {/* Alert Banner if warning simulated */}
              {simulatedWarning && (
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3 text-amber-200 text-sm animate-in fade-in duration-300">
                  <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-amber-300 block">
                      Paralajmërim Inteligjent Zero-Black-Screen (TASK-831 Parandaluar)
                    </strong>
                    <span>
                      Ekrani #01 në Tiranë raportoi temperaturë të rritur (52°C) dhe ngadalësim frame rate (44 FPS). Serveri aktivizoi automatikisht fallback-un e medias lokale pa asnjë ndërprerje në ekran!
                    </span>
                  </div>
                </div>
              )}

              {/* Devices Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {devices.map((device) => {
                  const isWarn = simulatedWarning && device.id === 1
                  const isSel = selectedDevice === device.id
                  return (
                    <div
                      key={device.id}
                      onClick={() => setSelectedDevice(device.id)}
                      className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 relative ${
                        isSel
                          ? "bg-slate-900 border-cyan-400 ring-2 ring-cyan-400/20 shadow-[0_0_25px_rgba(0,229,255,0.15)]"
                          : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          #{device.id}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${isWarn ? "bg-amber-400 animate-ping" : "bg-emerald-400"}`} />
                          <span className={`text-xs font-semibold ${isWarn ? "text-amber-400" : "text-emerald-400"}`}>
                            {isWarn ? "PARALAJMËRIM" : "ONLINE"}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-bold text-white text-base leading-snug line-clamp-1">{device.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">{device.city} · {device.area}</p>

                      <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Hardueri:</span>
                          <span className="font-mono truncate max-w-[140px]">{device.model}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">FPS / Shpejtësi:</span>
                          <span className="font-mono text-cyan-300">{isWarn ? "44 FPS" : device.fps}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Temperatura:</span>
                          <span className={`font-mono ${isWarn ? "text-amber-400 font-bold" : "text-slate-300"}`}>
                            {isWarn ? "52°C (Warning)" : device.temp}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Sinkronizuar:</span>
                          <span className="font-mono">{device.lastSeen}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Selected Device Telemetry Deep Dive */}
              <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/80 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                      Telemetria në Kohë Reale · Pajisja e Zgjedhur
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">{currentDev.name}</h3>
                    <p className="text-xs text-slate-400">{currentDev.model} · Qyteti: {currentDev.city} ({currentDev.area})</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="text-xs" onClick={() => alert("Komanda e rifreskimit u dërgua me sukses drejt pajisjes!")}>
                      <RefreshCw className="w-3.5 h-3.5 mr-1" />
                      Rifresko Cache
                    </Button>
                    <Button size="sm" className="text-xs" onClick={() => setActiveTab("player")}>
                      <Tv className="w-3.5 h-3.5 mr-1" />
                      Shiko Ekrani Live
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                      Ngarkesa CPU
                    </span>
                    <strong className="block text-2xl font-bold text-white mt-2">
                      {simulatedWarning && currentDev.id === 1 ? "84%" : "23%"}
                    </strong>
                    <span className="text-[11px] text-slate-500">4 Cores Cortex-A73</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                      Hapësira e Ruajtjes
                    </span>
                    <strong className="block text-2xl font-bold text-cyan-400 mt-2">
                      {currentDev.cacheUsed}
                    </strong>
                    <span className="text-[11px] text-slate-500">SQLite Offline Sync</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                      Cilësia e Lidhjes
                    </span>
                    <strong className="block text-2xl font-bold text-emerald-400 mt-2">
                      -48 dBm (Ultra)
                    </strong>
                    <span className="text-[11px] text-slate-500">Wi-Fi 6 (802.11ax)</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-blue-400" />
                      Fushata Aktive
                    </span>
                    <strong className="block text-base font-bold text-white mt-2 truncate">
                      {currentDev.activeCampaign}
                    </strong>
                    <span className="text-[11px] text-slate-500">Prioriteti: BASE_LOOP</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* SIMULATOR TAB 2: COMPOSER & TIMELINE */}
          {activeTab === "composer" && (
            <div className="p-6 lg:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                    Studio & Playlist Timeline Composer
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    Playlista: "Prime Retail Mall Loop 2026" (60 sekonda totale)
                  </h3>
                  <p className="text-xs text-slate-400">Orkestruar me tranzicione të buta hardware-accelerated 60fps</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-xs" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="w-3.5 h-3.5 mr-1" /> : <Play className="w-3.5 h-3.5 mr-1" />}
                    {isPlaying ? "Pauzë Preview" : "Luaj Playlistën"}
                  </Button>
                  <Button size="sm" className="text-xs">
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    Shto Media të Re
                  </Button>
                </div>
              </div>

              {/* Timeline Sequence */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-300">Sekuenca e Luajtjes (Drag & Drop Reorderable)</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {playlistItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="font-mono text-cyan-400">Sloti 0{index + 1}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                            {item.duration} sekonda
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-sm break-all">{item.title}</h4>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                        <span>{item.type}</span>
                        <span className="font-mono text-slate-500">{item.size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Timeline Bar */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>00:00s</span>
                  <span className="text-cyan-400 font-mono">Pozicioni aktual: 00:24s</span>
                  <span>01:00s (Loop)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden relative">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full w-[40%] animate-pulse" />
                </div>
              </div>
            </div>
          )}

          {/* SIMULATOR TAB 3: ANDROID TV PLAYER VIEW */}
          {activeTab === "player" && (
            <div className="p-6 lg:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                    Pamja e Ekrani Fizik të TV-së (Android TV Player Standalone)
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    Simulatori i Ekraneve 4K Commercial Displays
                  </h3>
                </div>
                <Badge variant="success">Player v2.4.1 Active</Badge>
              </div>

              {/* Simulated TV Screen Bezels */}
              <div className="mx-auto max-w-4xl p-3 sm:p-5 rounded-3xl bg-neutral-950 border-4 border-neutral-800 shadow-2xl relative">
                
                {/* Physical Bezel Camera/Sensor Dot */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-neutral-700" />
                
                {/* Screen Canvas */}
                <div className="rounded-xl overflow-hidden aspect-[16/9] bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 border border-cyan-500/20 p-6 sm:p-10 flex flex-col justify-between relative shadow-inner">
                  
                  {/* Subtle TV Watermark & Status */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-white font-mono text-[11px]">ABSignage Android TV v2.4</span>
                    </div>

                    <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-cyan-300 font-mono text-[11px]">
                      KODI I PAJISJES: 849-204
                    </div>
                  </div>

                  {/* High Quality Showcase Media inside the TV */}
                  <div className="text-center my-auto py-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold tracking-widest uppercase mb-4">
                      PRODUKT NË EKZIBICION
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                      SUPER OFERTA E FUNDVITIT
                    </h2>
                    <p className="mt-3 text-sm sm:text-lg text-slate-300 max-w-xl mx-auto">
                      Sinkronizim i menjëhershëm me të gjitha pikat e shitjes në Tiranë, Prishtinë dhe Durrës.
                    </p>
                  </div>

                  {/* Bottom Emergency Banner or Safe Ticker */}
                  <div className="bg-cyan-950/70 border border-cyan-500/30 backdrop-blur-md rounded-lg p-2.5 flex items-center justify-between text-xs text-cyan-200">
                    <span className="font-semibold flex items-center gap-2">
                      <Tv className="w-4 h-4 text-cyan-400" />
                      Riprodhimi vazhdon pa ndërprerje edhe nëse shkëputet interneti (Offline Cache Valid)
                    </span>
                    <span className="font-mono text-cyan-400">1080p 60Hz</span>
                  </div>

                </div>

                {/* TV Stand Base */}
                <div className="w-32 h-3 bg-neutral-800 mx-auto rounded-b-xl mt-2" />
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  )
}
