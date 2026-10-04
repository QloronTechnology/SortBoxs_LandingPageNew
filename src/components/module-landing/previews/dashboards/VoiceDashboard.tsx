"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips, SectionLabel } from "./parts";

const transcript = [
  { speaker: "Anita", text: "Thanks for joining. Let's start with the pipeline." },
  { speaker: "Rohan", text: "Northwind is ready to close. They need the final quote by Thursday." },
  { speaker: "Anita", text: "Great, I'll send it today and loop in finance." },
  { speaker: "Rohan", text: "One risk: Meridian has gone quiet for nine days." },
];
const actions = ["Send Northwind quote · Anita · Thu", "Check in with Meridian · Rohan"];
const samples = [
  "Your order has shipped and will arrive tomorrow morning.",
  "Hello, this is a reminder about your appointment on Friday.",
  "Good morning. Here is your daily briefing for the team.",
];
const voices = [
  { key: "aria", label: "Aria" },
  { key: "dev", label: "Dev" },
  { key: "maya", label: "Maya" },
];
const speeds = [
  { key: "0.8", label: "0.8×" },
  { key: "1", label: "1×" },
  { key: "1.25", label: "1.25×" },
];

function Wave({ active }: { active: boolean }) {
  return (
    <div className="flex h-8 items-center justify-center gap-[3px]" aria-hidden>
      {Array.from({ length: 28 }, (_, index) => (
        <span
          key={index}
          className={cn("h-full w-[3px] rounded-full", active ? "wave-bar bg-brand-purple" : "scale-y-[0.25] bg-brand-purple/30")}
          style={{ "--d": `${(index * 53) % 600}ms` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export function VoiceDashboard() {
  const [tab, setTab] = useState<"transcribe" | "speak">("transcribe");
  const [playing, setPlaying] = useState(false);
  const [line, setLine] = useState(0);
  const [sample, setSample] = useState(0);
  const [voice, setVoice] = useState("aria");
  const [speed, setSpeed] = useState("1");
  const [speaking, setSpeaking] = useState(false);
  const [word, setWord] = useState(0);
  const words = samples[sample].split(" ");

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      if (line >= transcript.length) setPlaying(false);
      else setLine((current) => current + 1);
    }, 1300);
    return () => clearTimeout(timer);
  }, [playing, line]);

  useEffect(() => {
    if (!speaking) return;
    const timer = setTimeout(() => {
      if (word >= words.length) setSpeaking(false);
      else setWord((current) => current + 1);
    }, 330 / Number(speed));
    return () => clearTimeout(timer);
  }, [speaking, word, words.length, speed]);

  const finished = line >= transcript.length;
  const insight =
    tab === "transcribe"
      ? finished
        ? "2 action items found in this meeting. Assign them to the people named?"
        : playing
          ? "Transcribing live, with a label and a timestamp for each speaker."
          : "Press Play to hear the meeting being transcribed."
      : speaking
        ? `Speaking in ${voices.find((item) => item.key === voice)?.label}'s voice at ${speed}× speed.`
        : "Choose a sentence, a voice and a speed, then press Play.";

  return (
    <PreviewFrame title="Voice Studio" period={tab === "transcribe" ? "Speech to text" : "Text to speech"} insight={insight} badge="62 meetings transcribed">
      <div className="mt-4 flex items-center justify-between gap-2">
        <Chips
          label="Mode"
          options={[
            { key: "transcribe", label: "Transcribe" },
            { key: "speak", label: "Speak" },
          ]}
          value={tab}
          onChange={(next) => {
            setTab(next);
            setPlaying(false);
            setSpeaking(false);
          }}
        />
        {tab === "transcribe" ? (
          <span className="text-[11px] font-semibold text-brand-muted tabular-nums">00:{String(Math.min(line, transcript.length) * 9).padStart(2, "0")} / 00:36</span>
        ) : (
          <span className="text-[11px] font-semibold text-brand-muted">{words.length} words</span>
        )}
      </div>

      <div className="mt-3 rounded-xl bg-brand-surface p-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={(tab === "transcribe" ? playing : speaking) ? "Pause" : "Play"}
            onClick={() => {
              if (tab === "transcribe") {
                if (finished) setLine(0);
                setPlaying((current) => !current);
              } else {
                if (word >= words.length) setWord(0);
                setSpeaking((current) => !current);
              }
            }}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60"
          >
            {(tab === "transcribe" ? playing : speaking) ? <Pause className="size-4 fill-current" aria-hidden /> : <Play className="size-4 fill-current" aria-hidden />}
          </button>
          <div className="min-w-0 flex-1">
            <Wave active={tab === "transcribe" ? playing : speaking} />
            <span className="mt-1 block h-1 rounded-full bg-white">
              <span
                className="block h-full rounded-full bg-brand-purple transition-all duration-500"
                style={{ width: `${tab === "transcribe" ? (Math.min(line, transcript.length) / transcript.length) * 100 : (Math.min(word, words.length) / words.length) * 100}%` }}
              />
            </span>
          </div>
        </div>
      </div>

      {tab === "transcribe" ? (
        <div className="mt-3">
          <SectionLabel>Transcript</SectionLabel>
          <ul className="mt-2 flex min-h-[132px] flex-col gap-1.5" aria-live="polite">
            {transcript.slice(0, Math.min(line + (playing ? 1 : 0), transcript.length)).map((item, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => {
                    setLine(index + 1);
                    setPlaying(false);
                  }}
                  className={cn(
                    "demo-rise flex w-full items-start gap-2 rounded-xl px-3 py-1.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                    index === line ? "bg-brand-purple-light ring-1 ring-brand-purple/30" : "bg-brand-surface"
                  )}
                >
                  <span className={cn("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white", index % 2 ? "bg-sky-500" : "bg-brand-purple")}>{item.speaker[0]}</span>
                  <span className="text-[11px] leading-snug text-brand-text">
                    <span className="font-bold">{item.speaker}: </span>
                    {item.text}
                  </span>
                </button>
              </li>
            ))}
            {line === 0 && !playing && <li className="rounded-xl bg-brand-surface px-3 py-4 text-center text-[11px] text-brand-muted">Press Play to start the transcript.</li>}
          </ul>
          {finished && (
            <ul className="demo-rise mt-2 flex flex-wrap gap-1.5">
              {actions.map((action) => (
                <li key={action} className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-800">
                  ✓ {action}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="mt-3">
          <div className="flex flex-wrap gap-1.5">
            {samples.map((item, index) => (
              <button
                key={item}
                type="button"
                aria-pressed={index === sample}
                onClick={() => {
                  setSample(index);
                  setSpeaking(false);
                  setWord(0);
                }}
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] font-semibold outline-none ring-1 focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                  index === sample ? "bg-brand-purple text-white ring-brand-purple" : "bg-white text-brand-muted ring-brand-border"
                )}
              >
                {["Order update", "Reminder", "Briefing"][index]}
              </button>
            ))}
          </div>
          <p className="mt-2 min-h-[52px] rounded-xl bg-white p-3 text-[13px] leading-relaxed ring-1 ring-brand-border">
            {words.map((item, index) => (
              <span key={index} className={cn("transition-colors", index < word ? "font-semibold text-brand-purple" : "text-brand-muted")}>
                {item}{" "}
              </span>
            ))}
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <Chips label="Voice" options={voices} value={voice} onChange={setVoice} />
            <Chips label="Speed" options={speeds} value={speed} onChange={setSpeed} />
          </div>
        </div>
      )}
    </PreviewFrame>
  );
}
