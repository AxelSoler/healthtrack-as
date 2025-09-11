"use client";

export type NotificationType = "success" | "warning" | "error";

interface NotificationProps {
  message: string;
  type: NotificationType;
}

export default function Notification({ message, type }: NotificationProps) {
  const baseClasses = "fixed top-5 right-5 p-4 rounded-md text-white";
  const typeClasses = {
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  return <div className={`${baseClasses} ${typeClasses[type]}`}>{message}</div>;
}
