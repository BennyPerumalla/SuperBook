import { useState, useEffect } from "react";
import { cn } from "../lib/utils";

interface Definition {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  example?: string;
}

interface DictionaryTooltipProps {
  word: string;
  position: { x: number; y: number };
  onClose: () => void;
}

export const DictionaryTooltip = ({ word, position, onClose }: DictionaryTooltipProps) => {
  const [definition, setDefinition] = useState<Definition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDefinition = async () => {
    try {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000); // timeout after 5s

      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.toLowerCase())}`,
        { signal: controller.signal }
      );

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error("Word not found");
      }

      const data = await response.json();
      const entry = data[0];
      const meaning = entry.meanings?.[0];
      const def = meaning?.definitions?.[0];

      setDefinition({
        word: entry.word,
        phonetic: entry.phonetic || entry.phonetics?.[0]?.text || "",
        partOfSpeech: meaning?.partOfSpeech || "",
        definition: def?.definition || "No definition available",
        example: def?.example || undefined,
      });
    } catch (err: any) {
      if (err.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else if (err instanceof TypeError) {
        setError("Network error. Please check your connection.");
      } else if (typeof err.message === "string") {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDefinition();
  }, [word]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest(".dictionary-tooltip")) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    const timer = setTimeout(onClose, 5000);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      className={cn(
        "dictionary-tooltip fixed z-50 max-w-80 min-w-50 p-3 rounded-xl",
        "bg-tooltip text-tooltip-foreground border border-tooltip-border",
        "shadow-tooltip animate-in fade-in-0 zoom-in-95 duration-200"
      )}
      style={{
        left: `${Math.min(position.x, window.innerWidth - 320)}px`,
        top: `${Math.max(position.y - 10, 10)}px`,
      }}
    >
      {loading && (
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 border-2 border-highlight border-t-transparent rounded-full animate-spin" />
          <span>Looking up "{word}"...</span>
        </div>
      )}

      {error && (
        <div className="text-destructive text-sm space-y-2">
          <div>{error}</div>
          <button
            onClick={() => fetchDefinition()}
            className="text-sm bg-highlight text-white px-2 py-1 rounded-md"
          >
            Retry
          </button>
        </div>
      )}

      {definition && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-base text-highlight capitalize">
              {definition.word}
            </span>
            {definition.phonetic && (
              <span className="text-xs text-highlight/80 italic">
                {definition.phonetic}
              </span>
            )}
            {definition.partOfSpeech && (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-md">
                {definition.partOfSpeech}
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed text-tooltip-foreground/90">
            {definition.definition}
          </p>

          {definition.example && (
            <div className="text-xs italic text-tooltip-foreground/70 border-l-2 border-highlight pl-2 mt-2">
              "{definition.example}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};