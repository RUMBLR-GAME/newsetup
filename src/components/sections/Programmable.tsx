"use client";

import { motion } from "framer-motion";
import FadeIn from "../FadeIn";

const features = [
  {
    title: "Scheduled rent",
    body: "Send Marie $850 on the 1st, automatically.",
  },
  {
    title: "Split bills",
    body: "One tap to split a tab three ways.",
  },
  {
    title: "Conditional sends",
    body: "Pay your contractor when their wallet signs.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function Programmable() {
  return (
    <section className="py-20 md:py-24 px-6 md:px-8 lg:px-20 bg-surface-raised border-y border-white/[0.04]">
      <div className="container-fluid">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
            <div>
              <span className="eyebrow mb-4 inline-flex">
                Programmable money
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight max-w-md">
                Money that does what you tell it.
              </h2>
            </div>
            <p className="text-white/55 max-w-md leading-relaxed text-sm md:text-base">
              Schedule it. Split it. Condition it on something happening. The kind
              of automation banks promise but never quite deliver.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemVariants}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-surface-raised p-6 md:p-8 flex items-start gap-4"
            >
              <span
                aria-hidden
                className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-mint-mid animate-pulse"
              />
              <div>
                <h3 className="text-base font-bold mb-1.5">{f.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{f.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
