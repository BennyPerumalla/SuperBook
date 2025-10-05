import { useState } from "react";
import { DictionaryTooltip } from "./DictionaryTooltip";

export const DictionaryDemo = () => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const handleWordClick = (word: string, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
    setSelectedWord(word);
  };

  const closeTooltip = () => {
    setSelectedWord(null);
  };

  const demoText = `The dictionary extension provides instant word definitions when you select text on any webpage. Simply click on any highlighted word below to see how it works:`;

  const highlightWords = [
    "dictionary",
    "extension",
    "instant",
    "definitions",
    "webpage",
    "highlighted",
  ];

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='bg-card rounded-lg p-8 shadow-card border'>
        <h2 className='text-2xl font-semibold mb-6 text-center'>
          Try the Dictionary Demo
        </h2>

        <div className='prose prose-lg max-w-none'>
          <p className='text-lg leading-relaxed mb-8'>
            {demoText.split(" ").map((word, index) => {
              const cleanWord = word.replace(/[.,;:!?]/g, "");
              const punctuation = word.replace(/[^.,;:!?]/g, "");

              if (highlightWords.includes(cleanWord.toLowerCase())) {
                return (
                  <span key={index}>
                    <span
                      className='superbook-highlight px-1 py-0.5 cursor-pointer hover:bg-highlight/20 transition-colors rounded'
                      onClick={(e) => handleWordClick(cleanWord, e)}>
                      {cleanWord}
                    </span>
                    {punctuation}{" "}
                  </span>
                );
              }
              return word + " ";
            })}
          </p>

          <div className='bg-muted rounded-lg p-6 mt-8'>
            <h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
              <span>📚</span> Sample Text for Testing
            </h3>
            <p className='text-base leading-relaxed'>
              {[
                "magnificent",
                "serendipity",
                "ubiquitous",
                "ephemeral",
                "eloquent",
                "perseverance",
                "pristine",
                "mellifluous",
                "enigmatic",
                "sophisticated",
              ].map((word, index) => (
                <span key={index}>
                  <span
                    className='superbook-highlight px-1 py-0.5 cursor-pointer hover:bg-highlight/20 transition-colors rounded font-medium'
                    onClick={(e) => handleWordClick(word, e)}>
                    {word}
                  </span>
                  {index < 9 ? ", " : "."}
                </span>
              ))}
            </p>
            <p className='text-sm text-muted-foreground mt-3'>
              Click on any word above to see its definition in a tooltip.
            </p>
          </div>
        </div>

        <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='text-center p-4'>
            <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3'>
              <span className='text-primary-foreground text-xl'>⚡</span>
            </div>
            <h3 className='font-semibold mb-2'>Instant Definitions</h3>
            <p className='text-sm text-muted-foreground'>
              Get word definitions instantly without leaving the page
            </p>
          </div>

          <div className='text-center p-4'>
            <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3'>
              <span className='text-primary-foreground text-xl'>🎯</span>
            </div>
            <h3 className='font-semibold mb-2'>Smart Selection</h3>
            <p className='text-sm text-muted-foreground'>
              Works with text selection and double-click interactions
            </p>
          </div>

          <div className='text-center p-4'>
            <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3'>
              <span className='text-primary-foreground text-xl'>🌐</span>
            </div>
            <h3 className='font-semibold mb-2'>Universal</h3>
            <p className='text-sm text-muted-foreground'>
              Works on any website with the browser extension
            </p>
          </div>
        </div>
      </div>

      {selectedWord && (
        <DictionaryTooltip
          word={selectedWord}
          position={tooltipPosition}
          onClose={closeTooltip}
        />
      )}
    </div>
  );
};
