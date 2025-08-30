import React, { useState } from "react";
import { 
  AlertTriangle, ArrowRight, Bot, CheckCircle2, Compass, Flame, GitBranch, Globe, GraduationCap, HeartPulse, MapPin, Megaphone, Radar, Shield, Siren, Sparkles, Triangle, Users, Video, Waves, Wind 
} from "lucide-react";

export default function SafeSimSite() {
  const [activeTab, setActiveTab] = useState("citizen");
  const [chat, setChat] = useState([{ role: "bot", text: "Hello! I can guide you during floods, fires, and earthquakes. Ask me anything." }]);
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

      {/* Hero */}
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
                SafeSim: Disaster <span className="text-cyan-300">Preparedness</span>,<br />
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

      {/* Problem & Solution */}
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

      <Divider id="features" />

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <SectionHeader kicker="Capabilities" title="Key Features" subtitle="Preparedness + Simulation + Response in one place." />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Feature icon={<GraduationCap className="h-5 w-5"/>} title="AR/VR Training Drills" desc="Immersive modules that teach what to do before, during & after disasters." />
          <Feature icon={<Bot className="h-5 w-5"/>} title="AI Guidance" desc="Multilingual chatbot & voice tips tailored to your location and risk." />
          <Feature icon={<Radar className="h-5 w-5"/>} title="IoT Early Warnings" desc="Integrates flood/seismic/gas sensors; triggers smart workflows." />
          <Feature icon={<Compass className="h-5 w-5"/>} title="Safe Route Maps" desc="Find shelters & hospitals with real-time crowding info." />
          <Feature icon={<Users className="h-5 w-5"/>} title="Volunteer Coordination" desc="Match needs to helpers; track requests & fulfillment." />
          <Feature icon={<Video className="h-5 w-5"/>} title="Gamified Learning" desc="Points, badges, levels for drills completed—great for schools." />
        </div>
      </section>

      <Divider id="demo" />

      {/* Demo Widgets */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <SectionHeader kicker="Hands-on" title="Live Demo Widgets" subtitle="Click around to experience SafeSim." />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <AlertsFeed />
          <EmergencyActionsCard />
          <EmergencyRequestCard />
          <ChatBotPanel chat={chat} msg={msg} setMsg={setMsg} handleSend={handleSend} />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

/* ===================== COMPONENTS ===================== */

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href="#" className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-500 text-slate-950">SS</span>
          <span className="text-slate-100">SafeSim</span>
        </a>
        <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
          <a href="#problem" className="hover:text-white">Problem</a>
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#demo" className="hover:text-white">Demo</a>
        </nav>
        <a href="#demo" className="hidden rounded-xl bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 md:inline">Launch Demo</a>
      </div>
    </header>
  );
}

function HeroCard() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5 shadow-xl shadow-black/10">
      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-sm text-slate-300"><MapPin className="h-4 w-4 text-cyan-300"/> Kanpur, India</span>
          <span className="text-xs text-slate-500">Demo Simulation</span>
        </div>
        <div className="mt-3 aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-tr from-slate-900 to-slate-800 p-4">
          <div className="grid h-full w-full grid-cols-8 grid-rows-5 gap-1">
            {Array.from({length:40}).map((_,i)=> <div key={i} className="rounded-sm bg-slate-800/70" />)}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <span className="rounded-lg border border-slate-800 bg-slate-900/60 px-2 py-1 inline-flex items-center gap-1"><Radar className="h-3.5 w-3.5 text-cyan-300"/> Flood Risk: Medium</span>
          <span className="rounded-lg border border-slate-800 bg-slate-900/60 px-2 py-1 inline-flex items-center gap-1"><Globe className="h-3.5 w-3.5 text-indigo-300"/> Weather: Heavy Rain</span>
          <span className="rounded-lg border border-slate-800 bg-slate-900/60 px-2 py-1 inline-flex items-center gap-1"><Users className="h-3.5 w-3.5 text-emerald-300"/> Shelters: 5 Nearby</span>
        </div>
      </div>
    </div>
  );
}

function Card({ title, icon, children, accent }) {
  return (
    <div className={`rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl shadow-black/10 bg-gradient-to-br ${accent ?? "from-transparent to-transparent"}`}>
      <div className="flex items-center gap-2 text-slate-100">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-800/80">{icon}</span>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-800/80">{icon}</span>
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className="mt-2 text-sm text-slate-300/90">{desc}</p>
    </div>
  );
}

function SectionHeader({ kicker, title, subtitle }) {
  return (
    <div className="flex flex-col items-start">
      {kicker && <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{kicker}</span>}
      <h2 className="mt-1 text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-1 max-w-2xl text-slate-300/90">{subtitle}</p>}
    </div>
  );
}

function Divider({ id }) {
  return (
    <div id={id} className="mx-auto my-2 h-px max-w-7xl bg-gradient-to-r from-transparent via-slate-800 to-transparent"/>
  );
}

function AlertsFeed() {
  const mockAlerts = [
    { title: "Flood Watch – Ganga Basin", time: "Now", desc: "Heavy rainfall alert. Avoid low-lying areas. Prepare go-bags." },
    { title: "Aftershock Advisory", time: "8 min ago", desc: "Small tremors likely. Practice Duck-Cover-Hold if shaking." },
    { title: "Heatwave Relief Camp", time: "35 min ago", desc: "Community shelter open at Govt. School, Kakadeo." },
  ];
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
      <WidgetHeader icon={<Siren className="h-4 w-4"/>} title="Live Alerts" subtitle="Mock feed for demo"/>
      <ul className="mt-3 space-y-3 text-sm">
        {mockAlerts.map((a,i)=>(
          <li key={i} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 font-semibold text-slate-200"><Waves className="h-4 w-4 text-cyan-300"/>{a.title}</span>
              <span className="text-xs text-slate-400">{a.time}</span>
            </div>
            <p className="mt-1 text-slate-300/90">{a.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WidgetHeader({ icon, title, subtitle }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-800/80">{icon}</span>
        <div>
          <h4 className="font-semibold leading-tight">{title}</h4>
          {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

function ChatBotPanel({ chat, msg, setMsg, handleSend }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
      <WidgetHeader icon={<Bot className="h-4 w-4"/>} title="AI Guide" subtitle="Ask preparedness questions"/>
      <div className="mt-3 h-64 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900/60 p-3">
        {chat.map((m,i)=> <p key={i} className={"mb-2 "+(m.role==="bot"?"text-cyan-200":"text-slate-200")}>{m.role==="bot"?"🤖 ":"🧑 "}{m.text}</p>)}
      </div>
      <form onSubmit={handleSend} className="mt-3 flex gap-2">
        <input value={msg} onChange={(e)=>setMsg(e.target.value)} placeholder="e.g., What to pack in flood kit?" className="flex-1 rounded-xl border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm outline-none placeholder:text-slate-500"/>
        <button type="submit" className="rounded-xl bg-indigo-500 px-3 py-2 text-sm font-semibold text-slate-950">Send</button>
      </form>
    </div>
  );
}

function EmergencyActionsCard() {
  const [action, setAction] = useState(null);
  const actions = {
    report: { icon: <Megaphone className="h-4 w-4"/>, label: "Report Emergency", message: "Emergency reported. A team will contact you shortly. If possible, move to a safe location." },
    evacuate: { icon: <Wind className="h-4 w-4"/>, label: "Request Evacuation", message: "Evacuation requested. Your location has been shared. Please wait for instructions from the response team." },
    medical: { icon: <HeartPulse className="h-4 w-4"/>, label: "Call Medical Assistance", message: "Medical assistance dispatched to your location. Stay calm and follow guidance." },
  };
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
      <WidgetHeader icon={<Flame className="h-4 w-4"/>} title="Emergency Actions"/>
      <div className="mt-3 flex flex-col gap-2">
        {Object.keys(actions).map((k)=>
          <button key={k} onClick={()=>setAction(k)} className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/70 px-3 py-2 hover:bg-slate-800/90">
            {actions[k].icon} {actions[k].label}
          </button>
        )}
        {action && <p className="mt-2 rounded-xl bg-slate-800/80 p-2 text-sm text-slate-200">{actions[action].message}</p>}
      </div>
    </div>
  );
}

function EmergencyRequestCard() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
      <WidgetHeader icon={<Siren className="h-4 w-4"/>} title="Pending Emergency Requests"/>
      <ul className="mt-3 space-y-2 text-sm">
        <li className="rounded-xl border border-slate-800 bg-slate-900/60 p-2 flex justify-between items-center">
          Flood Alert - Sector 12 <span className="text-xs text-slate-400">Pending</span>
        </li>
        <li className="rounded-xl border border-slate-800 bg-slate-900/60 p-2 flex justify-between items-center">
          Fire Alert - Block B <span className="text-xs text-slate-400">Pending</span>
        </li>
      </ul>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-slate-800 bg-slate-950/50 py-6 text-center text-slate-400">
      SafeSim • Team Apex • Demo Project 2025
    </footer>
  );
}

/* ===================== BOT LOGIC ===================== */
function inferBotReply(q) {
  q = q.toLowerCase();
  if(q.includes("flood") || q.includes("rain")) return "During floods, move to higher ground, avoid water, and keep essentials ready.";
  if(q.includes("earthquake")) return "Drop, cover, hold on! Stay indoors or in open areas away from buildings.";
  if(q.includes("fire")) return "Evacuate immediately, use fire exits, avoid elevators, and stay low to avoid smoke.";
  if(q.includes("kit") || q.includes("pack")) return "Emergency kit: water, food, flashlight, batteries, first aid, important documents, meds.";
  return "Stay calm. Ensure safety, follow alerts, and consult local authorities or the AI guidance module.";
}
