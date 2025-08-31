import React from "react";

export default function SectionHeader({ kicker, title, subtitle }) {
  return (
    <div className="text-center mb-8">
      <p className="text-sm uppercase text-cyan-400 font-medium">{kicker}</p>
      <h2 className="text-2xl font-bold mt-2">{title}</h2>
      <p className="text-slate-300 mt-1">{subtitle}</p>
    </div>
  );
}