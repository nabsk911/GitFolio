import CopyMD from "./CopyMD";

const MarkdownDisplay = ({ markdown }: { markdown: string | undefined }) => {
  return (
    <div className="w-full md:w-1/2 h-auto md:h-[85vh] border border-border rounded-radius  overflow-scroll">
      <div className="sticky flex justify-between items-center border-b-2 border-border top-0  left-0 pt-2 px-4 bg-background font-semibold text-lg">
        <p>Markdown</p>
        <CopyMD markdown={markdown} />
      </div>
      <div className="px-4 pb-4 ">
        <pre className="font-mono text-sm pt-4">{markdown}</pre>
      </div>
    </div>
  );
};

export default MarkdownDisplay;
