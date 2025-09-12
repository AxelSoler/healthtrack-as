"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import Notification, {
  NotificationType,
} from "@/components/notifications/Notification";
import { AnimatePresence } from "framer-motion";
import { nanoid } from "nanoid";

interface NotificationState {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

interface NotificationContextType {
  showNotification: (
    message: string,
    type: NotificationType,
    duration?: number
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationState[]>([]);

  const showNotification = useCallback(
    (message: string, type: NotificationType, duration?: number) => {
      const id = nanoid();
      setNotifications((prev) => [...prev, { id, message, type, duration }]);
    },
    []
  );

  const closeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const value = useMemo(() => ({ showNotification }), [showNotification]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="fixed top-5 right-5 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map((n) => (
            <Notification
              key={n.id}
              message={n.message}
              type={n.type}
              duration={n.duration}
              onClose={() => closeNotification(n.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
