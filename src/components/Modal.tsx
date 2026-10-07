import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { FiX } from "react-icons/fi";
import { useModal } from "../hooks/useModal";

interface ModalProps {
  label: string;
  onClose: () => void;
  children: ReactNode;
  size?: "md" | "lg" | "xl";
}

const sizes = { md: "max-w-2xl", lg: "max-w-4xl", xl: "max-w-6xl" };

/** Accessible overlay dialog. Mount it only while open and wrap it in AnimatePresence. */
function Modal({ label, onClose, children, size = "lg" }: ModalProps) {
  const panelRef = useModal(true, onClose);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={`relative w-full ${sizes[size]} max-h-[92vh] overflow-y-auto scrollbar-thin bg-bg-elevated border border-line sm:rounded-lg rounded-t-lg shadow-2xl shadow-black/60 outline-none`}
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="sticky top-3 float-right mr-3 mt-3 z-10 p-2 rounded-full bg-bg/80 backdrop-blur border border-line text-text-dim hover:text-text hover:border-text-dim transition-colors"
        >
          <FiX size={18} />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

export default Modal;
