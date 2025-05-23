import React, { useState } from "react";
import Form from "./components/Form";
import Preview from "./components/Preview";
import MarkdownDisplay from "./components/MarkdownDisplay";

const App = () => {
  const [markdown, setMarkdown] = useState<string | undefined>();
  const [toggle, setToggle] = useState(false); // false = Preview, true = Markdown

  return (
    <div className="w-full overflow-hidden space-y-8">
      <div className="flex justify-between items-center">
        <div className="text-3xl font-bold">GitFolio</div>

        {/* Toggle Buttons */}
        <div className="flex">
          <button
            onClick={() => setToggle(false)}
            className={`px-3 py-2 rounded-l-radius transition cursor-pointer ${
              !toggle
                ? "bg-foreground text-background"
                : "bg-muted text-foreground"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setToggle(true)}
            className={`px-3 py-2 rounded-r-radius transition cursor-pointer ${
              toggle
                ? "bg-foreground text-background"
                : "bg-muted text-foreground"
            }`}
          >
            Markdown
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <Form setMarkdown={setMarkdown} />
        {toggle ? (
          <MarkdownDisplay markdown={markdown} />
        ) : (
          <Preview markdown={markdown} />
        )}
      </div>
    </div>
  );
};

export default App;
