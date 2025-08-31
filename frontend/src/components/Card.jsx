import React from "react";

export default function Card({ title, icon, children, accent }) {
  return (
    <div className={`rounded-xl border p-6 bg-gradient-to-br ${accent}`}>
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
      {children}
    </div>
  );
}