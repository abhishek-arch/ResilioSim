import React from "react";

export default function Feature({ icon, title, desc }) {
  return (
    <div className="rounded-xl border border-slate-700 p-5 hover:bg-slate-800/50 transition">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className="text-slate-300 text-sm">{desc}</p>
    </div>
  );
}