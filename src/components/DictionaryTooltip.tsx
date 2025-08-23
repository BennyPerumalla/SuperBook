import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDefinition = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.toLowerCase())}`
        );
        
        if (!response.ok) {
          throw new Error('Word not found');
        }
        
        const data = await response.json();
        const entry = data[0];
        const meaning = entry.meanings?.[0];
        const def = meaning?.definitions?.[0];
        
        setDefinition({
          word: entry.word,
          phonetic: entry.phonetic || entry.phonetics?.[0]?.text || '',
          partOfSpeech: meaning?.partOfSpeech || '',
          definition: def?.definition || 'No definition available',
          example: def?.example || undefined
        });
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDefinition();
  }, [word]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('.dictionary-tooltip')) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    const timer = setTimeout(onClose, 5000);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
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
        top: `${Math.max(position.y - 10, 10)}px`
      }}
    >
      {loading && (
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 border-2 border-highlight border-t-transparent rounded-full animate-spin" />
          <span>Looking up "{word}"...</span>
        </div>
      )}

      {error && (
        <div className="text-destructive text-sm">
          No definition found for "{word}"
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