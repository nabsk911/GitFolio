import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

const MarkdownDisplay = ({ markdown }: { markdown: string | undefined }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (markdown) {
      navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <div className="w-full md:w-1/2 h-auto md:h-[85vh] border border-border rounded-radius  overflow-scroll">
      <div className="sticky flex justify-between items-center border-b-2 border-border top-0  left-0 pt-2 px-4 bg-background font-semibold text-lg">
        <p>Markdown</p>
        <button
          onClick={handleCopy}
          className="flex items-center cursor-pointer justify-center p-2 rounded-md"
        >
          {copied ? (
            <div className="text-sm bg-foreground text-background  rounded-radius py-2 px-3">
              <Check size={16} className="inline" /> Copied
            </div>
          ) : (
            <div className="text-sm bg-foreground text-background  rounded-radius py-2 px-3">
              <Copy size={16} className="inline" /> Copy
            </div>
          )}
        </button>
      </div>
      <div className="px-4 pb-4 ">
        <pre className="font-mono text-sm pt-4">{markdown}</pre>
      </div>
    </div>
  );
};

export default MarkdownDisplay;
