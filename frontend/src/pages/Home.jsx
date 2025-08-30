import React, { useState } from "react";
import {
  AlertTriangle, ArrowRight, Bot, CheckCircle2, Compass, Database, GitBranch, Globe,
  GraduationCap, MapPin, Mic, Radar, Shield, Siren, Sparkles, Triangle, Users, Video, Waves
} from "lucide-react";


import SiteHeader from "../components/SiteHeader";
import HeroCard from "../components/HeroCard";
import Card from "../components/Card";
import Divider from "../components/Divider";
import SectionHeader from "../components/SectionHeader";
import AlertsFeed from "../components/AlertsFeed";
import EmergencyRequestCard from "../components/EmergencyRequestCard";
import ChatBot from "../components/ChatBot";


export default function SafeSimSite() {
  const [chat, setChat] = useState([
    { role: "bot", text: "Hello! I can guide you during floods, fires, and earthquakes. Ask me anything." },
  ]);
  const [msg, setMsg] = useState("");

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!msg.trim()) return;
    const q = msg.trim();
    setChat((c) => [...c, { role: "user", text: q }]);
    setMsg("");
    const botReply = inferBotReply(q);
    setTimeout(() => setChat((c) => [...c, { role: "bot", text: botReply }]), 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-12 md:pt-28 md:pb-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                <Siren className="h-3.5 w-3.5" /> BitNBuild • Team Apex
              </span>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
                RESILIOSIM: Disaster <span className="text-cyan-300">Preparedness</span>,<br className="hidden sm:block" />
                <span className="text-indigo-300">Simulation</span> & Response
              </h1>
              <p className="mt-4 max-w-xl text-slate-300/90">
                Immersive AR/VR drills, AI guidance, and IoT-powered early warnings to turn panic into preparedness for schools, colleges and communities.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#demo" className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-4 py-2.5 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 hover:translate-y-[1px] transition">
                  Try Live Demo <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#features" className="inline-flex items-center gap-2 rounded-2xl border border-slate-700/80 bg-slate-800/40 px-4 py-2.5 font-semibold hover:bg-slate-800/70">
                  Explore Features
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2"><Shield className="h-4 w-4 text-cyan-300"/> Preparedness</span>
                <span className="inline-flex items-center gap-2"><Radar className="h-4 w-4 text-indigo-300"/> Early Warning</span>
                <span className="inline-flex items-center gap-2"><Bot className="h-4 w-4 text-fuchsia-300"/> AI Guidance</span>
              </div>
            </div>
            <HeroCard />
          </div>
        </div>
      </section>

      <Divider />

      <section id="problem" className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-2">
          <Card title="The Problem" icon={<AlertTriangle className="h-5 w-5" />} accent="from-rose-500/20 to-rose-500/5">
            <ul className="space-y-3 text-slate-300/90">
              <li className="flex gap-2"><Triangle className="mt-1 h-4 w-4 text-rose-400"/> Unpredictable disasters (floods, earthquakes, cyclones, fires, pandemics).</li>
              <li className="flex gap-2"><Triangle className="mt-1 h-4 w-4 text-rose-400"/> Theory-heavy, drill-light education; limited community practice.</li>
              <li className="flex gap-2"><Triangle className="mt-1 h-4 w-4 text-rose-400"/> Slow, uncoordinated response and fragmented information.</li>
            </ul>
          </Card>

          <Card title="Our Solution" icon={<Sparkles className="h-5 w-5" />} accent="from-cyan-500/20 to-cyan-500/5">
            <ul className="space-y-3 text-slate-300/90">
              <li className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 text-cyan-400"/> AR/VR drills for flood/quake/fire scenarios.</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 text-cyan-400"/> AI chatbot + voice instructions during crises.</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 text-cyan-400"/> IoT-backed alerts; personalized plans & survival kits.</li>
            </ul>
          </Card>
        </div>
      </section>

      

      <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <SectionHeader kicker="Hands-on" title="Live Demo Widgets" subtitle="Click around to experience SafeSim." />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <AlertsFeed />
          <EmergencyRequestCard />
          <ChatBot chat={chat} msg={msg} setMsg={setMsg} handleSend={handleSend} />
        </div>
      </section>

      <Divider />

      
      <Divider />
      
    </div>
  );
}

function inferBotReply(q) {
  q = q.toLowerCase();
  if (q.includes("pack") || q.includes("kit")) return "Flood kit: water, ready-to-eat food, torch + batteries, power bank, first-aid, necessary meds, copies of IDs, cash, whistle, raincoat, dry clothes.";
  if (q.includes("earthquake") || q.includes("quake")) return "During earthquake: Duck under sturdy table, Cover head/neck, Hold until shaking stops. Stay away from windows.";
  if (q.includes("fire")) return "Fire safety: Crawl low under smoke, use stairs not lifts, stop-drop-roll if clothes catch fire.";
  if (q.includes("flood") || q.includes("water")) return "Move to higher ground, avoid walking/driving through flood water, switch off power at main if safe.";
  if (q.includes("cyclone") || q.includes("storm")) return "Secure windows/doors, keep radio/phone charged, stay indoors away from glass; evacuate if advised.";
  return "Stay safe! Ask about flood kits, earthquake drills, fire safety, or evacuation routes.";
}