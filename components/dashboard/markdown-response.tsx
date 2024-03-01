"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownResponseProps {
  content: string;
}

const MarkdownResponse: React.FC<MarkdownResponseProps> = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }: {
          node: any;
          inline: boolean;
          className: string;
          children: React.ReactNode;
          props: any; // Adjust the type as needed
        }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter styles={dark} wrapLongLines language={match[1]} PreTag="div" {...props}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          )
        }
      }}
      className="text-sm overflow-hidden leading-7"
    >
      {content || ""}
    </ReactMarkdown>
  )
}

export default MarkdownResponse;
