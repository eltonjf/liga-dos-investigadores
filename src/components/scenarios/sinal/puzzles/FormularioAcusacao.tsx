import { useState } from "react";
import {
  AUDIO_EVIDENCE_OPTIONS,
  CORRECT_ACCUSATION,
  LOCATIONS,
  SUSPECTS,
} from "../../../../data/scenarios/cenario-sinal";
import { patchGameState } from "../../../../hooks/useGameState";
import { Panel } from "../../../ui/Panel";

interface FormularioAcusacaoProps {
  sessionId: string;
  solved: boolean;
}

export function FormularioAcusacao({ sessionId, solved }: FormularioAcusacaoProps) {
  const [suspect, setSuspect] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [evidence, setEvidence] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  if (solved) {
    return (
      <Panel title="Formulário de Acusação Final" accent="yellow">
        <p className="text-center font-bold uppercase tracking-wide text-green-400">
          Acusação confirmada — caso encerrado ✓
        </p>
      </Panel>
    );
  }

  async function handleSubmit() {
    if (!suspect || !location || !evidence) {
      setError("Preencha os 3 campos antes de enviar.");
      return;
    }
    const correct =
      suspect === CORRECT_ACCUSATION.suspect &&
      location === CORRECT_ACCUSATION.location &&
      evidence === CORRECT_ACCUSATION.evidence;

    if (!correct) {
      setError("Acusação incorreta. Revise os depoimentos e as evidências de áudio.");
      return;
    }

    setError(null);
    setSending(true);
    await patchGameState(sessionId, {
      accusation_suspect: suspect,
      accusation_location: location,
      accusation_evidence: evidence,
    });
    setSending(false);
  }

  return (
    <Panel title="Formulário de Acusação Final" accent="yellow">
      <div className="flex flex-col gap-4">
        <FieldGroup
          label="Suspeito"
          options={SUSPECTS.map((s) => ({ value: s.id, label: s.name }))}
          value={suspect}
          onChange={setSuspect}
        />
        <FieldGroup
          label="Localização Real"
          options={LOCATIONS.map((l) => ({ value: l, label: l }))}
          value={location}
          onChange={setLocation}
        />
        <FieldGroup
          label="Evidência do Áudio"
          options={AUDIO_EVIDENCE_OPTIONS.map((a) => ({ value: a, label: a }))}
          value={evidence}
          onChange={setEvidence}
        />
      </div>

      {error && <p className="mt-3 text-center text-xs font-bold uppercase text-red-400">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={sending}
        className="mt-4 w-full rounded-xl border-2 border-yellow-400 py-2 font-mono uppercase tracking-wide text-yellow-400 shadow-neon-yellow hover:bg-yellow-400/10 disabled:opacity-40"
      >
        Confirmar acusação
      </button>
    </Panel>
  );
}

function FieldGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-white/50">{label}</p>
      <div className="mt-2 flex flex-col gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 transition ${
              value === opt.value ? "border-yellow-400 bg-yellow-400/10 shadow-neon-yellow" : "border-slate-700"
            }`}
          >
            <input
              type="radio"
              name={label}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="accent-yellow-400"
            />
            <span className="font-mono text-sm text-white">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
