import Markdown from "react-markdown";
import QueryError from "@/components/QueryError";
import Spinner from "@/components/Spinner";
import useAppMarkdownQuery from "@/hooks/useAppMarkdownQuery";
import { cn } from "@/lib/utils";

export default function AppMarkdown({ app }) {
  const { isPending, isError, data } = useAppMarkdownQuery(app.name);

  return isPending ? (
    <Spinner />
  ) : isError ? (
    <QueryError />
  ) : (
    <div className={cn("p-8", "rounded-2xl", "border border-purple-500")}>
      <div
        className={cn(
          "prose prose-stone",
          "dark:prose-invert",
          "prose-a:text-purple-400 prose-a:hover:text-purple-500"
        )}
      >
        <Markdown
          components={{
            a: ({ node, ...props }) => (
              <a {...props} target="_blank" rel="noopener noreferrer" />
            ),
          }}
        >
          {data}
        </Markdown>
      </div>
    </div>
  );
}
