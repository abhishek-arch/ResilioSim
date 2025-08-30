import React from "react";

export default function ChatBot({ chat, msg, setMsg, handleSend }) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 flex flex-col h-64">
      <div className="flex-1 overflow-y-auto mb-2">
        {chat.map((c, idx) => (
          <div key={idx} className={`${c.role === 'user' ? 'text-right' : 'text-left'} mb-1`}>
            {c.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="flex-1 rounded p-2 bg-slate-900 border border-slate-700"
          placeholder="Type a message"
        />
        <button type="submit" className="bg-cyan-500 px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
}