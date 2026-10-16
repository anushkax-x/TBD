"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Button } from "@/components/ui/button";
import { useChat } from "@/components/chat/chat-provider";
import { EASE_OUT } from "@/components/motion/easing";

export function MobileStickyCta() {
  const { openChat } = useChat();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 480));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-3 bottom-3 z-40 rounded-full border border-hairline bg-surface/80 p-1.5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl md:hidden"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <Button className="w-full" arrow onClick={() => openChat("mobile_sticky")}>
            Check Your Idea With Our AI
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
