import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import CopyMD from "./CopyMD";

const Preview = ({ markdown }: { markdown: undefined | string }) => {
  return (
    <div className="w-full md:w-1/2 h-auto md:h-[85vh] border border-border rounded-radius overflow-y-scroll">
      <div className="bg-background flex justify-between items-center sticky top-0 border-b-2 border-border pt-2 px-4 font-semibold text-lg">
        <p className="py-3">Preview</p>
        <CopyMD markdown={markdown} />
      </div>
      <div className="px-4 pb-4">
        <Markdown
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ node, ...props }) => (
              <h1
                className="text-3xl font-bold border-b border-border pb-2 mt-8 mb-4"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="text-2xl font-bold border-b border-border pb-2 mt-8 mb-4"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-xl font-medium pb-1 my-3" {...props} />
            ),
            img: ({ node, ...props }) => (
              <img
                {...props}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
                alt={props.alt || ""}
              />
            ),
            table: ({ node, ...props }) => (
              <table className="w-full my-4" {...props} />
            ),
            td: ({ node, ...props }) => (
              <td className="border border-border p-3 " {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc list-inside my-2" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal list-inside my-2" {...props} />
            ),
            li: ({ node, ...props }) => <li className="my-1" {...props} />,
          }}
        >
          {markdown}
        </Markdown>
      </div>
    </div>
  );
};

export default Preview;
