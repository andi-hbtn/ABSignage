"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { LanguageSelector } from "@/components/LanguageSelector"
import type { Locale } from "@/lib/i18n-config"
import {
  FileText,
  ShieldCheck,
  Tv,
  UploadCloud,
  CreditCard,
  Lock,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Scale,
  ArrowLeft,
  ExternalLink,
  HardDrive,
} from "lucide-react"

type TermsLang = "en" | "sq" | "it" | "de"

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.andibevapi.digitalsignageplayer&hl=en"

interface TermsCopy {
  backHome: string
  badge: string
  title: string
  updated: string
  noticeLabel: string
  noticeText: string
  s1Title: string
  s1P1: string
  s1P2: string
  s2Title: string
  s2Intro: string
  s2Bullets: { title: string; text: string }[]
  s3Title: string
  s3Intro: string
  s3Bullets: { title: string; text: string }[]
  s4Title: string
  s4Intro: string
  s4Bullets: { title: string; text: string }[]
  s5Title: string
  s5Intro: string
  s5Bullets: { title: string; text: string }[]
  s6Title: string
  s6P1: string
  s6P2: string
  s7Title: string
  s7P1: string
  s7P2: string
  s8Title: string
  s8P1: string
  s8P2: string
  privacyBtn: string
  deletionBtn: string
  googlePlayBtn: string
}

const TERMS_CONTENT: Record<TermsLang, TermsCopy> = {
  en: {
    backHome: "Back to Home",
    badge: "Google Play Developer Policy Compliant · B2B SaaS Terms",
    title: "Terms of Service for ABSignage",
    updated: "Last Updated: 2026 · Version 2.4.0",
    noticeLabel: "Official Application & Platform Agreement:",
    noticeText:
      "These Terms of Service (\"Terms\") govern your access to and use of the ABSignage Android TV Player application (Google Play Package ID: com.andibevapi.digitalsignageplayer), the ABSignage Cloud Management Console, and associated cloud APIs operated by ABSignage.",
    s1Title: "1. Acceptance of Terms & B2B Scope",
    s1P1:
      "By downloading, installing, or launching the ABSignage Player application from Google Play, pairing a television display, or registering an account on the ABSignage Cloud Console, you (\"Customer\", \"Organization\", or \"User\") agree to be bound by these Terms of Service.",
    s1P2:
      "ABSignage is a Business-to-Business (B2B) cloud digital signage platform built for commercial environments—including restaurants, cafes, retail stores, supermarkets, pharmacies, clinics, hotels, fitness centers, and corporate offices—running on Android TV, Google TV, and Android TV Boxes or HDMI Sticks.",
    s2Title: "2. License Grant & Google Play Distribution",
    s2Intro:
      "Subject to your compliance with these Terms and your active subscription tier, ABSignage grants your organization a limited, non-exclusive, non-transferable, revocable license to install and run the ABSignage Player app on your commercial displays and access the web dashboard.",
    s2Bullets: [
      {
        title: "Permitted Commercial Use: ",
        text: "You may pair and manage TV screens up to the screen limit of your selected plan (Start, Business 5, Business 10, Pro 20, Chain 50, or Enterprise).",
      },
      {
        title: "Technical Restrictions: ",
        text: "You may not reverse-engineer, decompile, disassemble, modify, or redistribute the ABSignage Player APK, nor attempt to bypass the 6-digit pairing authentication or cloud rate limits.",
      },
      {
        title: "Google Play Compliance: ",
        text: "Installation and automatic updates distributed via Google Play Store are subject to Google Play's Terms of Service alongside this agreement.",
      },
    ],
    s3Title: "3. Device Pairing, Offline Cache & Telemetry",
    s3Intro:
      "To deliver uninterrupted commercial broadcasting without black screens, the ABSignage Player app performs specific local and cloud operations on your paired TV hardware:",
    s3Bullets: [
      {
        title: "6-Digit Pairing Code Activation: ",
        text: "Upon launch, the TV app generates a unique 6-digit pairing code to link the physical display with your organization's cloud dashboard.",
      },
      {
        title: "100% Offline Playback Cache: ",
        text: "You authorize the application to download and cache your scheduled 4K videos, images, and multi-zone layouts in the device's local storage so playback continues seamlessly even during multi-day internet outages.",
      },
      {
        title: "Heartbeat & Proof-of-Play Telemetry: ",
        text: "The player transmits periodic technical heartbeats (online/offline status, active playlist state, FPS, and free storage capacity) to your dashboard for real-time monitoring and diagnostics.",
      },
    ],
    s4Title: "4. Customer Media, Intellectual Property & Acceptable Use",
    s4Intro:
      "ABSignage provides tools for uploading images and 4K videos, building Fullscreen, Dual Split (50/50), and Triple Split (33%) multi-zone layouts, and scheduling day-parting campaigns.",
    s4Bullets: [
      {
        title: "Ownership of Your Content: ",
        text: "You retain 100% ownership and intellectual property rights over all logos, menus, photos, price lists, and promotional videos uploaded to your ABSignage Media Library.",
      },
      {
        title: "Content Rights & Licensing Responsibility: ",
        text: "You represent and warrant that you own or hold valid commercial licenses for all media uploaded and publicly displayed on your paired screens.",
      },
      {
        title: "Prohibited Content: ",
        text: "You must not upload or broadcast unlawful, defamatory, copyright-infringing, sexually explicit, hateful, deceptive, or malicious content, nor use the platform in violation of applicable advertising or public display laws.",
      },
    ],
    s5Title: "5. 14-Day Free Trial, Subscription Plans & Billing",
    s5Intro:
      "ABSignage offers transparent, scalable pricing based on the number of managed TV screens, available on Monthly or Annual billing cycles (with 2 months free on annual plans):",
    s5Bullets: [
      {
        title: "14-Day Free Trial: ",
        text: "New organizations may test the platform for 14 days free of charge with no credit card required. If you choose not to subscribe after the trial, screen broadcasting simply pauses without automatic charges.",
      },
      {
        title: "Tiered Screen Packages: ",
        text: "Plans scale from Start (1 TV), Business 5 (up to 5 TVs), Business 10 (up to 10 TVs), Pro 20 (up to 20 TVs), and Chain 50 (up to 50 TVs) up to Enterprise (Unlimited TVs with 99.99% SLA uptime).",
      },
      {
        title: "Upgrades & Cancellation: ",
        text: "You may upgrade your screen capacity or cancel your subscription at any time. Cancellation stops future billing cycles while allowing access through the end of your current paid period.",
      },
    ],
    s6Title: "6. Service Availability, Hardware & Updates",
    s6P1:
      "ABSignage utilizes redundant cloud infrastructure and AES-256 encryption to maintain high availability (up to 99.99% SLA for Enterprise fleets), reinforced by local device caching so local screens continue running even if external networks fail.",
    s6P2:
      "Customers are responsible for maintaining their physical TV displays, Android TV Boxes/Sticks, power supply, and local mounting safety. We may release automatic software updates via Google Play to improve playback performance, security, and multi-zone capabilities.",
    s7Title: "7. Data Privacy, GDPR & Account Deletion Rights",
    s7P1:
      "Your privacy and data security are governed by our Privacy Policy in strict compliance with the Google Play User Data Policy and European Union GDPR. We never sell customer data or display third-party ads on your screens.",
    s7P2:
      "You may unpair devices, remove media assets, or submit a permanent Account & Data Deletion request at any time. Upon verification, all account records, playlists, uploaded media, and device telemetry are permanently purged within 30 days.",
    s8Title: "8. Limitation of Liability & Termination",
    s8P1:
      "To the maximum extent permitted by applicable law, ABSignage shall not be liable for indirect, incidental, consequential, or hardware-related damages arising from local power failures, third-party television hardware defects, or unauthorized screen content uploaded by users.",
    s8P2:
      "We reserve the right to suspend or terminate accounts that materially breach these Terms, abuse cloud infrastructure, or broadcast illegal content. For legal inquiries or enterprise agreements, please contact our team through the official ABSignage platform.",
    privacyBtn: "View Privacy Policy",
    deletionBtn: "Account & Data Deletion Form",
    googlePlayBtn: "ABSignage Player on Google Play",
  },
  sq: {
    backHome: "Kthehu në Ballinë",
    badge: "Në Përputhje me Rregullat e Google Play · Kushtet B2B SaaS",
    title: "Kushtet e Shërbimit (Terms of Service) për ABSignage",
    updated: "Përditësuar: 2026 · Versioni 2.4.0",
    noticeLabel: "Marrëveshja Zyrtare e Aplikacionit & Platformës:",
    noticeText:
      "Këto Kushte Shërbimi (\"Kushtet\") rregullojnë aksesin dhe përdorimin e aplikacionit ABSignage Android TV Player (ID e Paketës në Google Play: com.andibevapi.digitalsignageplayer), Panelit të Menaxhimit në Cloud të ABSignage dhe API-ve përkatëse të operuara nga ABSignage.",
    s1Title: "1. Pranimi i Kushteve & Qëllimi B2B",
    s1P1:
      "Duke shkarkuar, instaluar ose hapur aplikacionin ABSignage Player nga Google Play, duke lidhur një ekran televiziv me kod çiftimi ose duke hapur një llogari në Panelin Cloud të ABSignage, ju (\"Klienti\", \"Biznesi\" ose \"Përdoruesi\") pranoni të respektoni këto Kushte Shërbimi.",
    s1P2:
      "ABSignage është një platformë B2B (Business-to-Business) në cloud për menaxhimin e ekraneve dixhitale komerciale—duke përfshirë restorante, kafene, dyqane me pakicë, supermarkete, farmaci, klinika, hotele, palestra dhe zyra—që funksionon në Android TV, Google TV dhe Android TV Box ose HDMI Stick.",
    s2Title: "2. Licenca e Përdorimit & Shpërndarja në Google Play",
    s2Intro:
      "Në përputhje me këto Kushte dhe paketën tuaj aktive të abonimit, ABSignage i jep biznesit tuaj një licencë të kufizuar, jo-ekskluzive, të patransferueshme dhe të revokueshme për të instaluar aplikacionin ABSignage Player në ekranet tuaja dhe për të përdorur panelin e menaxhimit.",
    s2Bullets: [
      {
        title: "Përdorimi i Lejuar Komercial: ",
        text: "Ju mund të lidhni dhe menaxhoni ekrane televizive deri në limitin e paketës së zgjedhur (Start, Business 5, Business 10, Pro 20, Chain 50 ose Enterprise).",
      },
      {
        title: "Kufizimet Teknike: ",
        text: "Ndalohet dekompilimi, modifikimi, kopjimi i kodit burimor ose rishpërndarja e paautorizuar e APK-së së ABSignage Player, si dhe çdo tentativë për të anashkaluar kodin 6-shifror të sigurisë.",
      },
      {
        title: "Përputhshmëria me Google Play: ",
        text: "Instalimi dhe përditësimet automatike përmes Google Play Store i nënshtrohen gjithashtu Kushteve të Shërbimit të Google Play.",
      },
    ],
    s3Title: "3. Lidhja e Pajisjeve, Memoria Offline & Telemetria",
    s3Intro:
      "Për të garantuar transmetim komercial pa ndërprerje dhe pa ekrane të zeza, aplikacioni ABSignage Player kryen këto procese teknike në pajisjen tuaj televizive:",
    s3Bullets: [
      {
        title: "Aktivizimi me Kod 6-Shifror: ",
        text: "Gjatë hapjes në TV, aplikacioni gjeneron një kod unik 6-shifror që shërben për të çiftuar ekranin fizik me llogarinë e biznesit tuaj në cloud.",
      },
      {
        title: "100% Riprodhim Offline (Cache Lokale): ",
        text: "Ju autorizoni aplikacionin të shkarkojë dhe ruajë lokalisht në memorien e pajisjes videot 4K, fotot dhe strukturat me shumë zona, në mënyrë që transmetimi të vazhdojë pa ndërprerje edhe nëse shkëputet interneti.",
      },
      {
        title: "Statusi Periodik (Heartbeat) & Proof-of-Play: ",
        text: "Pajisja dërgon sinjale periodike teknike (statusi online/offline, playlist-a aktive, shpejtësia FPS dhe hapësira e lirë) për diagnostikim në kohë reale.",
      },
    ],
    s4Title: "4. Përmbajtja e Ngarkuar, Pronësia Intelektuale & Përdorimi i Lejuar",
    s4Intro:
      "ABSignage ju mundëson ngarkimin e imazheve dhe videove 4K, ndarjen e ekranit në Fullscreen, Dual Split (50/50) e Triple Split (33%), dhe planifikimin sipas fashave orare (Day-Parting).",
    s4Bullets: [
      {
        title: "Pronësia mbi Mediat Tuaja: ",
        text: "Ju ruani 100% të drejtat e pronësisë intelektuale mbi të gjitha logot, menytë, fotot, çmimet dhe videot promocionale që ngarkoni në Media Library.",
      },
      {
        title: "Përgjegjësia Ligjore për Përmbajtjen: ",
        text: "Ju garantoni se zotëroni të drejtat e autorit ose licencat e nevojshme komerciale për çdo material vizual apo audio që shfaqni publikisht në ekranet e biznesit tuaj.",
      },
      {
        title: "Përmbajtja e Ndaluar: ",
        text: "Ndalohet rreptësisht ngarkimi ose transmetimi i materialeve të paligjshme, mashtruese, që shkelin të drejtat e autorit, me përmbajtje të papërshtatshme ose skedarë keqdashës.",
      },
    ],
    s5Title: "5. Prova 14-Ditore Falas, Paketat e Abonimit & Faturimi",
    s5Intro:
      "ABSignage ofron paketa të qarta sipas numrit të ekraneve televizive, me faturim Mujor ose Vjetor (me 2 muaj falas në faturimin vjetor):",
    s5Bullets: [
      {
        title: "Prova 14-Ditore Falas: ",
        text: "Bizneset e reja mund ta testojnë platformën për 14 ditë falas pa kartë krediti. Nëse nuk vazhdoni me abonim pas provës, transmetimi ndalon pa asnjë pagesë automatike.",
      },
      {
        title: "Paketat sipas Numrit të Ekraneve: ",
        text: "Planet fillojnë nga Start (1 TV), Business 5 (deri 5 TV), Business 10 (deri 10 TV), Pro 20 (deri 20 TV), Chain 50 (deri 50 TV) deri te Enterprise (TV pa limit me 99.99% SLA uptime).",
      },
      {
        title: "Ndryshimi i Paketës & Anulimi: ",
        text: "Mund të kaloni në paketë më të lartë ose të anuloni abonimin në çdo kohë. Anulimi ndalon faturimet e ardhshme, ndërsa shërbimi mbetet aktiv deri në fund të periudhës së paguar.",
      },
    ],
    s6Title: "6. Disponueshmëria e Shërbimit, Pajisjet & Përditësimet",
    s6P1:
      "ABSignage përdor infrastrukturë cloud të sigurt me enkriptim AES-256 për disponueshmëri maksimale, të kombinuar me ruajtjen lokale (Offline Cache) që mbron ekranet tuaja nga çdo rënie e rrjetit.",
    s6P2:
      "Klienti mban përgjegjësi për mirëmbajtjen fizike të televizorëve, pajisjeve Android TV Box/Stick dhe energjisë elektrike në pikën e shitjes. Ne mund të publikojmë përditësime automatike përmes Google Play për të përmirësuar sigurinë dhe performancën.",
    s7Title: "7. Privatësia e të Dhënave, GDPR & Fshirja e Llogarisë",
    s7P1:
      "Mbrojtja e të dhënave tuaja rregullohet nga Politika jonë e Privatësisë në përputhje të plotë me Rregullat e të Dhënave të Përdoruesve të Google Play dhe GDPR-në Evropiane. Ne nuk shesim kurrë të dhëna dhe nuk shfaqim reklama të palëve të treta në ekranet tuaja.",
    s7P2:
      "Ju keni të drejtë të shkëputni pajisjet, të fshini mediat ose të kërkoni fshirjen e përhershme të llogarisë dhe të dhënave në çdo kohë. Të gjitha mediat, playlist-at dhe telemetria fshihen përgjithmonë brenda 30 ditëve.",
    s8Title: "8. Kufizimi i Përgjegjësisë & Përfundimi i Marrëveshjes",
    s8P1:
      "Në masën maksimale të lejuar nga ligji, ABSignage nuk mban përgjegjësi për dëme të tërthorta, defekte fizike të televizorëve të palëve të treta, ndërprerje të energjisë elektrike apo përmbajtje të paautorizuar të ngarkuar nga përdoruesit.",
    s8P2:
      "Ne rezervojmë të drejtën të pezullojmë ose mbyllim llogaritë që shkelin këto Kushte ose transmetojnë përmbajtje të paligjshme. Për çdo pyetje ligjore apo kontrata Enterprise, mund të na kontaktoni drejtpërdrejt përmes platformës zyrtare ABSignage.",
    privacyBtn: "Politika e Privatësisë",
    deletionBtn: "Formulari i Fshirjes së të Dhënave",
    googlePlayBtn: "ABSignage Player në Google Play",
  },
  it: {
    backHome: "Torna alla Home",
    badge: "Conforme alle Norme Google Play · Termini B2B SaaS",
    title: "Termini di Servizio per ABSignage",
    updated: "Ultimo Aggiornamento: 2026 · Versione 2.4.0",
    noticeLabel: "Accordo Ufficiale Applicazione e Piattaforma:",
    noticeText:
      "I presenti Termini di Servizio (\"Termini\") regolano l'accesso e l'utilizzo dell'applicazione ABSignage Android TV Player (ID pacchetto Google Play: com.andibevapi.digitalsignageplayer), della Console Cloud ABSignage e delle relative API.",
    s1Title: "1. Accettazione dei Termini e Ambito B2B",
    s1P1:
      "Scaricando, installando o avviando l'app ABSignage Player da Google Play, abbinando uno schermo TV o registrando un account sulla Console Cloud ABSignage, l'utente (\"Cliente\" o \"Azienda\") accetta integralmente i presenti Termini.",
    s1P2:
      "ABSignage è una piattaforma cloud B2B di digital signage progettata per attività commerciali (ristoranti, bar, negozi, supermercati, farmacie, cliniche, hotel e uffici) compatibile con Android TV, Google TV e TV Box Android.",
    s2Title: "2. Licenza d'Uso e Distribuzione su Google Play",
    s2Intro:
      "Nel rispetto dei presenti Termini e del piano di abbonamento attivo, ABSignage concede una licenza limitata, non esclusiva, non trasferibile e revocabile per installare l'app ABSignage Player sui propri display commerciali e utilizzare il pannello web.",
    s2Bullets: [
      {
        title: "Uso Commerciale Consentito: ",
        text: "È possibile collegare e gestire schermi TV entro il limite previsto dal piano scelto (Start, Business 5, Business 10, Pro 20, Chain 50 o Enterprise).",
      },
      {
        title: "Restrizioni Tecniche: ",
        text: "È vietato decompilare, modificare o ridistribuire l'APK di ABSignage Player, nonché tentare di aggirare il codice di abbinamento a 6 cifre.",
      },
      {
        title: "Conformità Google Play: ",
        text: "L'installazione e gli aggiornamenti distribuiti tramite Google Play Store sono soggetti anche ai Termini di Servizio di Google Play.",
      },
    ],
    s3Title: "3. Abbinamento Dispositivi, Cache Offline e Telemetria",
    s3Intro:
      "Per garantire una riproduzione continua senza schermate nere, l'app ABSignage Player esegue le seguenti operazioni tecniche sui televisori abbinati:",
    s3Bullets: [
      {
        title: "Codice di Abbinamento a 6 Cifre: ",
        text: "All'avvio, l'app TV genera un codice univoco a 6 cifre per associare lo schermo alla dashboard aziendale.",
      },
      {
        title: "Riproduzione Offline al 100% (Cache Locale): ",
        text: "L'utente autorizza l'app a salvare localmente video 4K, immagini e playlist nella memoria del dispositivo affinché la riproduzione prosegua anche senza connessione Internet.",
      },
      {
        title: "Telemetria Heartbeat e Proof-of-Play: ",
        text: "Il player invia segnali tecnici periodici (stato online, FPS e memoria disponibile) per il monitoraggio in tempo reale.",
      },
    ],
    s4Title: "4. Contenuti Multimediali, Proprietà Intellettuale e Uso Consentito",
    s4Intro:
      "ABSignage consente di caricare immagini e video 4K, creare layout a Schermo Intero, Doppia Divisione (50/50) e Tripla Divisione (33%) e programmare campagne per fasce orarie.",
    s4Bullets: [
      {
        title: "Proprietà dei Contenuti: ",
        text: "Il Cliente mantiene il 100% dei diritti di proprietà intellettuale su tutti i file multimediali, loghi, menu e video caricati.",
      },
      {
        title: "Responsabilità sui Diritti d'Autore: ",
        text: "Il Cliente garantisce di possedere i diritti e le licenze commerciali per tutti i contenuti trasmessi sui propri schermi pubblici.",
      },
      {
        title: "Contenuti Vietati: ",
        text: "È severamente vietato caricare o trasmettere contenuti illegali, diffamatori, lesivi del copyright, espliciti, ingannevoli o dannosi.",
      },
    ],
    s5Title: "5. Prova Gratuita di 14 Giorni, Abbonamenti e Fatturazione",
    s5Intro:
      "ABSignage offre piani trasparenti basati sul numero di schermi gestiti, con fatturazione Mensile o Annuale (2 mesi gratis sui piani annuali):",
    s5Bullets: [
      {
        title: "Prova Gratuita di 14 Giorni: ",
        text: "Le nuove aziende possono testare la piattaforma gratuitamente per 14 giorni senza carta di credito.",
      },
      {
        title: "Piani Scalabili: ",
        text: "I pacchetti includono Start (1 TV), Business 5 (fino a 5 TV), Business 10 (fino a 10 TV), Pro 20 (fino a 20 TV), Chain 50 (fino a 50 TV) ed Enterprise (TV illimitati).",
      },
      {
        title: "Upgrade e Disdetta: ",
        text: "È possibile modificare o disdire l'abbonamento in qualsiasi momento senza costi nascosti.",
      },
    ],
    s6Title: "6. Disponibilità del Servizio, Hardware e Aggiornamenti",
    s6P1:
      "ABSignage utilizza infrastrutture cloud protette con crittografia AES-256 e archiviazione locale per garantire la massima continuità operativa.",
    s6P2:
      "Il Cliente è responsabile della manutenzione fisica dei propri televisori e dispositivi Android TV. Gli aggiornamenti dell'app possono essere distribuiti automaticamente tramite Google Play.",
    s7Title: "7. Privacy dei Dati, GDPR e Cancellazione dell'Account",
    s7P1:
      "Il trattamento dei dati è regolato dalla nostra Informativa sulla Privacy in conformità con il GDPR europeo e le Norme sui Dati Utente di Google Play.",
    s7P2:
      "È possibile richiedere in qualsiasi momento la cancellazione definitiva dell'account e di tutti i dati associati, che verranno eliminati entro 30 giorni.",
    s8Title: "8. Limitazione di Responsabilità e Risoluzione",
    s8P1:
      "Nei limiti consentiti dalla legge, ABSignage non è responsabile per danni indiretti, guasti hardware di terze parti o interruzioni elettriche locali.",
    s8P2:
      "Ci riserviamo il diritto di sospendere gli account che violano i presenti Termini o trasmettono contenuti illeciti.",
    privacyBtn: "Informativa sulla Privacy",
    deletionBtn: "Modulo Cancellazione Dati",
    googlePlayBtn: "ABSignage Player su Google Play",
  },
  de: {
    backHome: "Zurück zur Startseite",
    badge: "Google Play Richtlinienkonform · B2B SaaS Bedingungen",
    title: "Nutzungsbedingungen für ABSignage",
    updated: "Zuletzt aktualisiert: 2026 · Version 2.4.0",
    noticeLabel: "Offizielle Anwendungs- & Plattformvereinbarung:",
    noticeText:
      "Diese Nutzungsbedingungen (\"Bedingungen\") regeln Ihren Zugriff auf und die Nutzung der ABSignage Android TV Player App (Google Play Paket-ID: com.andibevapi.digitalsignageplayer), des ABSignage Cloud-Dashboards und der zugehörigen Cloud-APIs.",
    s1Title: "1. Geltungsbereich & B2B-Ausrichtung",
    s1P1:
      "Durch das Herunterladen, Installieren oder Starten der ABSignage Player App aus Google Play, das Koppeln eines Bildschirms oder die Registrierung eines Kontos stimmen Sie (\"Kunde\" oder \"Unternehmen\") diesen Nutzungsbedingungen zu.",
    s1P2:
      "ABSignage ist eine Cloud-basierte B2B-Digital-Signage-Plattform für gewerbliche Displays in Restaurants, Cafés, Einzelhandelsgeschäften, Supermärkten, Apotheken, Kliniken, Hotels, Fitnessstudios und Büros auf Android TV, Google TV und Android TV-Boxen.",
    s2Title: "2. Lizenzgewährung & Google Play Vertrieb",
    s2Intro:
      "Vorbehaltlich der Einhaltung dieser Bedingungen und Ihres aktiven Tarifs gewährt ABSignage Ihrem Unternehmen eine beschränkte, nicht-exklusive, nicht übertragbare und widerrufliche Lizenz zur Nutzung der ABSignage Player App und des Web-Dashboards.",
    s2Bullets: [
      {
        title: "Zulässige gewerbliche Nutzung: ",
        text: "Sie dürfen TV-Bildschirme bis zum Limit Ihres gewählten Pakets (Start, Business 5, Business 10, Pro 20, Chain 50 oder Enterprise) koppeln und verwalten.",
      },
      {
        title: "Technische Einschränkungen: ",
        text: "Das Dekompilieren, Modifizieren oder unbefugte Weiterverbreiten der ABSignage Player APK sowie das Umgehen des 6-stelligen Kopplungscodes sind untersagt.",
      },
      {
        title: "Google Play Konformität: ",
        text: "Für den Download und automatische Updates über den Google Play Store gelten ergänzend die Nutzungsbedingungen von Google Play.",
      },
    ],
    s3Title: "3. Gerätekopplung, Offline-Cache & Telemetrie",
    s3Intro:
      "Um eine unterbrechungsfreie Wiedergabe ohne Schwarzbild zu gewährleisten, führt die ABSignage Player App folgende technische Prozesse auf Ihren gekoppelten Geräten aus:",
    s3Bullets: [
      {
        title: "6-stelliger Kopplungscode: ",
        text: "Beim Start generiert die TV-App einen eindeutigen 6-stelligen Code, um das Display sicher mit Ihrem Cloud-Konto zu verbinden.",
      },
      {
        title: "100% Offline-Wiedergabe (Lokaler Cache): ",
        text: "Sie berechtigen die App, geplante 4K-Videos, Bilder und Multi-Zonen-Layouts lokal im Gerätespeicher abzulegen, sodass die Wiedergabe auch bei Internetausfall nahtlos weiterläuft.",
      },
      {
        title: "Heartbeat- & Proof-of-Play-Telemetrie: ",
        text: "Der Player sendet regelmäßige Statussignale (Online-Status, FPS, freier Speicherplatz) zur Echtzeit-Überwachung an Ihr Dashboard.",
      },
    ],
    s4Title: "4. Kundeninhalte, Geistiges Eigentum & Zulässige Nutzung",
    s4Intro:
      "ABSignage ermöglicht das Hochladen von Bildern und 4K-Videos, das Erstellen von Vollbild-, Dual-Split- (50/50) und Triple-Split-Layouts (33%) sowie die zeitgesteuerte Planung (Day-Parting).",
    s4Bullets: [
      {
        title: "Eigentum an Ihren Medien: ",
        text: "Sie behalten zu 100% alle Eigentums- und Urheberrechte an sämtlichen hochgeladenen Logos, Menüs, Fotos und Werbevideos.",
      },
      {
        title: "Verantwortung für Urheberrechte: ",
        text: "Sie sichern zu, dass Sie über alle erforderlichen gewerblichen Rechte und Lizenzen für die auf Ihren Bildschirmen öffentlich gezeigten Inhalte verfügen.",
      },
      {
        title: "Verbotene Inhalte: ",
        text: "Es ist strengstens untersagt, rechtswidrige, urheberrechtsverletzende, irreführende, anstößige oder schädliche Inhalte hochzuladen oder auszustrahlen.",
      },
    ],
    s5Title: "5. 14-tägige Testphase, Abonnement-Pakete & Abrechnung",
    s5Intro:
      "ABSignage bietet transparente Tarife basierend auf der Bildschirmanzahl mit monatlicher oder jährlicher Abrechnung (2 Monate gratis bei jährlicher Zahlung):",
    s5Bullets: [
      {
        title: "14 Tage kostenlos testen: ",
        text: "Neue Unternehmen können die Plattform 14 Tage lang kostenlos und ohne Kreditkarte unverbindlich testen.",
      },
      {
        title: "Skalierbare Bildschirm-Pakete: ",
        text: "Die Tarife reichen von Start (1 TV), Business 5 (bis 5 TVs), Business 10 (bis 10 TVs), Pro 20 (bis 20 TVs) und Chain 50 (bis 50 TVs) bis zu Enterprise (Unbegrenzte TVs).",
      },
      {
        title: "Upgrades & Kündigung: ",
        text: "Sie können Ihr Paket jederzeit erweitern oder zum Ende des laufenden Abrechnungszeitraums kündigen.",
      },
    ],
    s6Title: "6. Verfügbarkeit, Hardware & Software-Updates",
    s6P1:
      "ABSignage nutzt eine AES-256-verschlüsselte Cloud-Infrastruktur in Kombination mit lokalem Geräte-Caching für maximale Ausfallsicherheit.",
    s6P2:
      "Der Kunde ist für die physische Wartung seiner TV-Geräte und Android-Boxen verantwortlich. App-Updates können automatisch über Google Play bereitgestellt werden.",
    s7Title: "7. Datenschutz, DSGVO & Kontolöschung",
    s7P1:
      "Der Schutz Ihrer Daten richtet sich nach unserer Datenschutzerklärung in voller Übereinstimmung mit der EU-DSGVO und der Google Play Nutzerdaten-Richtlinie.",
    s7P2:
      "Sie können jederzeit die vollständige Löschung Ihres Kontos und aller zugehörigen Daten beantragen. Alle Medien, Playlists und Telemetriedaten werden innerhalb von 30 Tagen endgültig gelöscht.",
    s8Title: "8. Haftungsbeschränkung & Kündigung",
    s8P1:
      "Soweit gesetzlich zulässig, haftet ABSignage nicht für indirekte Schäden, lokale Stromausfälle, Hardwaredefekte von Drittanbietern oder vom Nutzer hochgeladene Inhalte.",
    s8P2:
      "Wir behalten uns das Recht vor, Konten bei schwerwiegenden Verstößen gegen diese Bedingungen oder bei Ausstrahlung rechtswidriger Inhalte zu sperren.",
    privacyBtn: "Datenschutzerklärung",
    deletionBtn: "Formular zur Datenlöschung",
    googlePlayBtn: "ABSignage Player bei Google Play",
  },
}

export default function LocalizedTermsOfServicePage() {
  const params = useParams()
  const locale = ((params?.locale as Locale) || "en") as TermsLang
  const validLocale: TermsLang =
    locale === "sq" || locale === "it" || locale === "de" ? locale : "en"

  const [overrideLang, setOverrideLang] = useState<{
    forLocale: TermsLang
    lang: TermsLang
  } | null>(null)

  const lang: TermsLang =
    overrideLang?.forLocale === validLocale ? overrideLang.lang : validLocale

  const setLang = (nextLang: TermsLang) => {
    setOverrideLang({ forLocale: validLocale, lang: nextLang })
  }

  const t = TERMS_CONTENT[lang]

  const langOptions: { code: TermsLang; label: string }[] = [
    { code: "en", label: "English" },
    { code: "sq", label: "Shqip" },
    { code: "it", label: "Italiano" },
    { code: "de", label: "Deutsch" },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/20 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          <Link href={`/${validLocale}`} className="flex items-center gap-3 group">
            <div className="relative h-11 w-44 sm:h-12 sm:w-52 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/AB_Signage_Logo_Transparency.png"
                alt="ABSignage Logo"
                fill
                sizes="(max-width: 640px) 176px, 208px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSelector currentLocale={validLocale} />

            <Link
              href={`/${validLocale}`}
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.backHome}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="mb-12 border-b border-slate-800 pb-8">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <Badge variant="default">{t.badge}</Badge>
              <div className="flex items-center gap-1.5 flex-wrap">
                {langOptions.map((opt) => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => setLang(opt.code)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                      lang === opt.code
                        ? "bg-cyan-500 text-slate-950"
                        : "bg-slate-900 text-slate-400 hover:text-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {t.title}
            </h1>
            <p className="text-sm text-slate-400 mt-3 font-mono">{t.updated}</p>
            <div className="mt-4 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200 leading-relaxed">
              <strong>{t.noticeLabel}</strong> {t.noticeText}
            </div>
          </div>

          {/* Terms Body */}
          <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
            {/* 1. Acceptance & Scope */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <FileText className="w-5 h-5" />
                <h2>{t.s1Title}</h2>
              </div>
              <p>{t.s1P1}</p>
              <p>{t.s1P2}</p>
            </section>

            {/* 2. License Grant & Google Play */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <Tv className="w-5 h-5" />
                <h2>{t.s2Title}</h2>
              </div>
              <p>{t.s2Intro}</p>
              <ul className="space-y-3 text-xs sm:text-sm">
                {t.s2Bullets.map((item) => (
                  <li key={item.title} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{item.title}</strong>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 3. Device Pairing, Offline Cache & Telemetry */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <HardDrive className="w-5 h-5" />
                <h2>{t.s3Title}</h2>
              </div>
              <p>{t.s3Intro}</p>
              <ul className="space-y-3 text-xs sm:text-sm">
                {t.s3Bullets.map((item) => (
                  <li key={item.title} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{item.title}</strong>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 4. Customer Media & Acceptable Use */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <UploadCloud className="w-5 h-5" />
                <h2>{t.s4Title}</h2>
              </div>
              <p>{t.s4Intro}</p>
              <ul className="space-y-3 text-xs sm:text-sm">
                {t.s4Bullets.map((item) => (
                  <li key={item.title} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{item.title}</strong>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 5. Free Trial, Subscription Plans & Billing */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <CreditCard className="w-5 h-5" />
                <h2>{t.s5Title}</h2>
              </div>
              <p>{t.s5Intro}</p>
              <ul className="space-y-3 text-xs sm:text-sm">
                {t.s5Bullets.map((item) => (
                  <li key={item.title} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{item.title}</strong>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 6. Service Availability, Hardware & Updates */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <ShieldCheck className="w-5 h-5" />
                <h2>{t.s6Title}</h2>
              </div>
              <p>{t.s6P1}</p>
              <p>{t.s6P2}</p>
            </section>

            {/* 7. Data Privacy, GDPR & Account Deletion */}
            <section className="rounded-2xl border border-cyan-500/30 bg-slate-900/70 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <Lock className="w-5 h-5" />
                <h2>{t.s7Title}</h2>
              </div>
              <p>{t.s7P1}</p>
              <p>{t.s7P2}</p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={`/${validLocale}/privacy`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 transition-all"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t.privacyBtn}</span>
                </Link>

                <Link
                  href={`/${validLocale}/data-deletion`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold hover:bg-rose-500/30 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.deletionBtn}</span>
                </Link>

                <a
                  href={GOOGLE_PLAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold hover:bg-slate-700 hover:text-white transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.googlePlayBtn}</span>
                </a>
              </div>
            </section>

            {/* 8. Limitation of Liability & Termination */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <Scale className="w-5 h-5" />
                <h2>{t.s8Title}</h2>
              </div>
              <p>{t.s8P1}</p>
              <div className="p-4 rounded-xl bg-amber-950/25 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{t.s8P2}</span>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
