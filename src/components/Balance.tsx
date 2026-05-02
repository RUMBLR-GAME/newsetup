import React from "react";

type BalanceProps = {
  children: string;
  /** Number of trailing words to keep together. Default 2. */
  protect?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

/**
 * Prevents text orphans (a single word on the last line of a paragraph or
 * heading) by replacing the space before the last N words with a non-breaking
 * space. Renders as a span by default.
 *
 * Use for any user-visible heading or paragraph that wraps. The default
 * `protect={2}` joins the last two words; bump higher for short final
 * phrases ("right now", "by design") that should never split.
 *
 * Example:
 *   <h1>
 *     <Balance>Free, instant payments built on Solana, settled in Australian dollars.</Balance>
 *   </h1>
 *
 * Result: "Australian dollars" will always sit together on one line.
 */
export default function Balance({
  children,
  protect = 2,
  className,
  as: Tag = "span",
}: BalanceProps) {
  const text = children.trim();
  const words = text.split(/\s+/);
  if (words.length <= protect) {
    return <Tag className={className}>{text}</Tag>;
  }
  const head = words.slice(0, words.length - protect).join(" ");
  const tail = words.slice(words.length - protect).join("\u00A0");
  return (
    <Tag className={className}>
      {head}
      {"\u00A0"}
      {tail}
    </Tag>
  );
}
