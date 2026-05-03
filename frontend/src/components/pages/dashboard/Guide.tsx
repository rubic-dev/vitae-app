/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JSX } from "react";
import guide from "../../../content/guideContent.json";

const Heading = ({ level, id, children }: any) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag id={id} className="group relative scroll-mt-20 font-bold">
      <a
        href={`#${id}`}
        className="absolute -left-6 opacity-0 group-hover:opacity-100 transition"
      >
        #
      </a>
      {children}
    </Tag>
  );
};

const RenderContent = ({ block }: any) => {
  switch (block.type) {
    case "text":
      return <p className="text-sm">{block.value}</p>;

    case "list":
      return (
        <ul className="list-disc pl-6 space-y-1">
          {block.items.map((item: any, i: number) => (
            <li key={i}>
              {typeof item === "string" ? (
                item
              ) : (
                <>
                  <strong>{item.title}</strong> — {item.text}
                </>
              )}
            </li>
          ))}
        </ul>
      );

    case "ordered-list":
      return (
        <ol className="list-decimal pl-6 space-y-1">
          {block.items.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );

    default:
      return null;
  }
};

const RenderSection = ({ section, level = 2 }: any) => {
  return (
    <div className="space-y-4">
      {section.title && (
        <Heading level={level} id={section.id}>
          {section.title}
        </Heading>
      )}

      {section.content?.map((block: any, i: number) => (
        <RenderContent key={i} block={block} />
      ))}

      {section.children?.map((child: any, i: number) => (
        <RenderSection key={i} section={child} level={level + 1} />
      ))}
    </div>
  );
};

export default function GuidePage() {
  return (
    <div className="max-w-3xl mx-auto pt-10 pb-20 space-y-8">
      <h1 className="text-3xl font-bold">{guide.title}</h1>

      {guide.sections.map((section: any, i: number) => (
        <RenderSection key={i} section={section} />
      ))}
    </div>
  );
}