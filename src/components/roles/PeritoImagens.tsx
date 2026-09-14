import { useState } from "react";
import { Panel } from "../ui/Panel";

export function PeritoImagens() {
  const [zoom, setZoom] = useState(1);

  return (
    <Panel title="Sala de Troféus — Foto da Cena" accent="cyan">
      <div className="overflow-hidden rounded-lg border border-ink-700 bg-ink-950">
        <div
          className="flex aspect-video items-center justify-center transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        >
          <svg viewBox="0 0 320 180" className="h-full w-full">
            <rect width="320" height="180" fill="#0d111b" />
            <rect x="20" y="20" width="280" height="140" fill="#141a29" stroke="#22f2ff" strokeWidth="1" />
            <rect x="120" y="60" width="80" height="60" fill="#1a2030" stroke="#ffb020" strokeWidth="2" />
            <text x="160" y="95" textAnchor="middle" fontSize="10" fill="#ffb020" fontFamily="monospace">
              PRATELEIRA
            </text>
            <g transform="translate(230,40)">
              <rect width="40" height="40" fill="#000" />
              {[0, 1, 2, 3, 4].map((r) =>
                [0, 1, 2, 3, 4].map((c) =>
                  (r + c) % 2 === 0 ? (
                    <rect key={`${r}-${c}`} x={c * 8} y={r * 8} width="8" height="8" fill="#22f2ff" />
                  ) : null,
                ),
              )}
            </g>
            <text x="20" y="15" fontSize="8" fill="#666" fontFamily="monospace">
              CAM-03 · 21:47
            </text>
          </svg>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-3">
        <button
          onClick={() => setZoom((z) => Math.max(1, z - 0.5))}
          className="rounded border border-neon-cyan px-3 py-1 font-mono text-neon-cyan hover:bg-neon-cyan/10"
        >
          −
        </button>
        <span className="font-mono text-sm text-white/70">Zoom {zoom.toFixed(1)}x</span>
        <button
          onClick={() => setZoom((z) => Math.min(3, z + 0.5))}
          className="rounded border border-neon-cyan px-3 py-1 font-mono text-neon-cyan hover:bg-neon-cyan/10"
        >
          +
        </button>
      </div>
      <p className="mt-3 text-xs text-white/60">
        Use o zoom para examinar o QR Code no canto da imagem e compartilhe o que encontrar com a equipe.
      </p>
    </Panel>
  );
}
