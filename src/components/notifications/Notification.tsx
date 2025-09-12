"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export type NotificationType = "success" | "warning" | "error";

interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
  duration?: number;
}

export default function Notification({
  message,
  type,
  duration = 4000,
  onClose,
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const baseClasses = "p-4 rounded-md text-white";
  const typeClasses = {
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  return (
    <motion.div
      role="alert"
      aria-live="assertive"
      layout
      initial={{ opacity: 0, y: -50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
      className={`${baseClasses} ${typeClasses[type]}`}
    >
      {message}
    </motion.div>
  );
}
