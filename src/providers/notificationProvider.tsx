import { toast } from "react-toastify";
import { NotificationProvider, OpenNotificationParams } from "@refinedev/core";

export const notificationProvider: NotificationProvider = {
  open: ({ key, message, type, description }: OpenNotificationParams) => {
    // TypeOptions -> 'info' | 'success' | 'warning' | 'error' | 'default';
    // OpenNotificationParams ->  type: "success" | "error" | "progress";
    // below code does matching between type of OpenNotificationParams and type of toast

    const keyType = type === "progress" ? "warning" : type;

    toast(
      <div>
        {message}
        {/* {description && <div className="text-sm ">{description}</div>} */}
      </div>,
      {
        toastId: key ?? keyType,
        type: keyType,
      }
    );
  },
  close: (key) => toast.dismiss(key),
};
