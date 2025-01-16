import { toast } from "react-toastify";
import { NotificationProvider, OpenNotificationParams } from "@refinedev/core";

export const notificationProvider: NotificationProvider = {
  open: ({ key, message, type, description }: OpenNotificationParams) => {
    console.log("notification provider open", key, message, type, description);
    if (key !== undefined) {
      // TypeOptions -> 'info' | 'success' | 'warning' | 'error' | 'default';
      // OpenNotificationParams ->  type: "success" | "error" | "progress";
      // below code does matching between type of OpenNotificationParams and type of toast

      const keyType = type === "progress" ? "info" : type;

      toast(message, {
        toastId: key,
        type: keyType,
      });
    }
  },
  close: (key) => toast.dismiss(key),
};
