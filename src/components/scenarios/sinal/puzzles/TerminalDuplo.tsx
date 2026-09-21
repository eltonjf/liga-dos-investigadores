import { useState, type FormEvent } from "react";
import { Panel } from "../../../ui/Panel";

interface TerminalDuploProps {
  title: string;
  symbolsCode: string;
  portCode: string;
  solved: boolean;
  onSolved: () => void;
}

export function TerminalDuplo({ title, symbolsCode, portCode, solved, onSolved }: TerminalDuploProps) {
  const [symbolsInput, setSymbolsInput] = useState("");
  const [portInput, setPortInput] = useState("");
  const [symbolsOk, setSymbolsOk] = useState(false);
  const [portOk, setPortOk] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState(false);

  if (solved) {
    return (
      <Panel title={title} accent="green">
        <p className="text-center font-bold uppercase tracking-wide text-green-400">
          Sistema Desbloqueado
        </p>
      </Panel>
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextSymbolsOk = symbolsOk || symbolsInput.trim() === symbolsCode;
    const nextPortOk = portOk || portInput.trim() === portCode;
    setSymbolsOk(nextSymbolsOk);
    setPortOk(nextPortOk);

    if (nextSymbolsOk && nextPortOk) {
      onSolved();
      return;
    }

    if (nextPortOk && !nextSymbolsOk) {
      setMessage(`Porta ${portCode} aceita. Erro na senha de símbolos.`);
    } else if (nextSymbolsOk && !nextPortOk) {
      setMessage("Senha de símbolos aceita. Erro na porta de acesso.");
    } else {
      setMessage("Ambos os campos incorretos. Verifique com a equipe.");
    }
    setError(true);
    setTimeout(() => setError(false), 1200);
  }

  return (
    <Panel title={title} accent="green">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="text-xs uppercase tracking-wide text-white/50">Senha dos Símbolos</label>
          <input
            value={symbolsOk ? symbolsCode : symbolsInput}
            onChange={(e) => setSymbolsInput(e.target.value.replace(/\D/g, ""))}
            disabled={symbolsOk}
            placeholder="Digite a senha numérica"
            className={`mt-1 w-full rounded-xl border-2 bg-black p-3 text-center font-mono text-lg tracking-widest transition-colors ${
              symbolsOk
                ? "border-green-500 text-green-400"
                : error
                  ? "animate-shake border-red-500 text-red-400"
                  : "border-slate-700 text-green-400"
            }`}
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wide text-white/50">Porta de Acesso</label>
          <input
            value={portOk ? portCode : portInput}
            onChange={(e) => setPortInput(e.target.value.replace(/\D/g, ""))}
            disabled={portOk}
            placeholder="Digite a porta"
            className={`mt-1 w-full rounded-xl border-2 bg-black p-3 text-center font-mono text-lg tracking-widest transition-colors ${
              portOk
                ? "border-green-500 text-green-400"
                : error
                  ? "animate-shake border-red-500 text-red-400"
                  : "border-slate-700 text-green-400"
            }`}
          />
        </div>
        <button
          type="submit"
          className="rounded-xl border-2 border-green-400 py-3 font-mono uppercase tracking-wide text-green-400 shadow-neon-green hover:bg-green-400/10"
        >
          Enviar
        </button>
      </form>
      {message && (
        <p className={`mt-3 text-center text-xs font-bold uppercase ${error ? "text-red-400" : "text-green-400"}`}>
          {message}
        </p>
      )}
    </Panel>
  );
}
