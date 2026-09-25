import {
  MAP_IMAGE_SRC,
  SCHOOL_GRID_COLUMNS,
  SCHOOL_GRID_ROWS,
  SCHOOL_LANDMARKS,
} from "../../../../data/scenarios/cenario-sinal";
import { Panel } from "../../../ui/Panel";

export function MapaEscola() {
  return (
    <Panel title="Mapa da Escola" accent="green">
      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
        <img src={MAP_IMAGE_SRC} alt="Planta da escola" className="w-full opacity-70" />
      </div>

      <div className="mt-3 overflow-x-auto">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `2rem repeat(${SCHOOL_GRID_COLUMNS.length}, minmax(3.5rem, 1fr))` }}
        >
          <div />
          {SCHOOL_GRID_COLUMNS.map((col) => (
            <div key={col} className="text-center font-mono text-xs text-green-400">
              {col}
            </div>
          ))}
          {SCHOOL_GRID_ROWS.map((row) => (
            <div key={row} className="contents">
              <div className="flex items-center justify-center font-mono text-xs text-green-400">{row}</div>
              {SCHOOL_GRID_COLUMNS.map((col) => {
                const landmark = SCHOOL_LANDMARKS.find((l) => l.col === col && l.row === row);
                return (
                  <div
                    key={`${col}${row}`}
                    className={`flex aspect-square items-center justify-center rounded-md border text-center text-[9px] leading-tight ${
                      landmark
                        ? "border-green-400 bg-slate-900 text-green-300 shadow-neon-green"
                        : "border-slate-800 bg-slate-900/40 text-slate-700"
                    }`}
                  >
                    {landmark ? landmark.label : `${col}${row}`}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-3 text-xs text-white/60">
        Use a mensagem recuperada pelo Especialista para achar a interseção coluna+linha e passe a
        coordenada ao Hacker de Sistemas.
      </p>
    </Panel>
  );
}
