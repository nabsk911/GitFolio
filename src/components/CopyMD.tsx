import { Check, Copy } from "lucide-react";
import { useState } from "react";

const CopyMD = ({ markdown }: { markdown: string | undefined }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (markdown) {
      navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <div>
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
  );
};

export default CopyMD;
