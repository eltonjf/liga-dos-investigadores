import { CIPHER_ALPHABET, CIPHER_MESSAGE } from "../../data/scenarios/cenario-trofeu";
import { Panel } from "../ui/Panel";

export function Criptografo() {
  return (
    <Panel title="Dicionário de Símbolos" accent="orange">
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
        {CIPHER_ALPHABET.map(({ symbol, letter }) => (
          <div
            key={symbol}
            className="flex flex-col items-center gap-1 rounded-xl border border-slate-700 bg-slate-950 py-3"
          >
            <span className="text-xl text-orange-400">{symbol}</span>
            <span className="font-mono text-xs text-white/60">{letter}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950 p-4">
        <p className="text-xs uppercase tracking-widest text-white/50">Mensagem interceptada</p>
        <p className="mt-2 text-center text-3xl tracking-[0.3em] text-orange-400">{CIPHER_MESSAGE}</p>
        <p className="mt-3 text-xs text-white/60">
          Traduza cada símbolo usando o dicionário acima e diga em voz alta a palavra secreta para o
          Hacker de Sistemas digitar no terminal.
        </p>
      </div>
    </Panel>
  );
}
