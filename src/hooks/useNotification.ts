import { useCallback, useState } from "react";

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number;
}

export const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (
      message: string,
      type: "success" | "error" | "info" | "warning" = "info",
      duration = 3000,
    ) => {
      const id = Math.random().toString(36).substr(2, 9);
      const notification: Notification = { id, message, type, duration };

      setNotifications((prev) => [...prev, notification]);

      if (duration && duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }

      return id;
    },
    [],
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const success = useCallback(
    (message: string, duration?: number) => {
      return addNotification(message, "success", duration);
    },
    [addNotification],
  );

  const error = useCallback(
    (message: string, duration?: number) => {
      return addNotification(message, "error", duration);
    },
    [addNotification],
  );

  const info = useCallback(
    (message: string, duration?: number) => {
      return addNotification(message, "info", duration);
    },
    [addNotification],
  );

  const warning = useCallback(
    (message: string, duration?: number) => {
      return addNotification(message, "warning", duration);
    },
    [addNotification],
  );

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    info,
    warning,
  };
};
