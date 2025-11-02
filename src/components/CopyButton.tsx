"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <Button
        onClick={handleCopy}
        variant="outline"
        size="sm"
        className="gap-1 font-mono text-xs sm:gap-2"
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{label || text}</span>
          </>
        )}
      </Button>
    </motion.div>
  );
}

