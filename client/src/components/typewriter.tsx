import { useEffect, useState } from "react";

const phrases = [
  "Blog posts, crafted instantly with GenAI",
  "Social media captions, generated in seconds",
  "Emails, written professionally with AI",
  "Product descriptions, optimized for conversion",
  "Marketing copy, tailored to your brand",
];

export default function TypewriterComponent() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const currentPhrase = phrases[currentPhraseIndex];

        if (isDeleting) {
          setCurrentText(currentPhrase.substring(0, currentText.length - 1));
        } else {
          setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        }

        // If we've completed typing the current phrase
        if (!isDeleting && currentText === currentPhrase) {
          // Wait a bit before starting to delete
          setTimeout(() => setIsDeleting(true), 1500);
        }
        // If we've deleted the entire phrase
        else if (isDeleting && currentText === "") {
          setIsDeleting(false);
          // Move to the next phrase
          setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, currentPhraseIndex, isDeleting]);

  return (
    <span className="inline-block min-h-[28px]">
      {currentText}
      <span className="ml-1 inline-block h-4 w-0.5 animate-blink bg-indigo dark:bg-indigo-400"></span>
    </span>
  );
}
