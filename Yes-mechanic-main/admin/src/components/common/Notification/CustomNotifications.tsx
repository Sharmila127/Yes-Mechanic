import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { getAllNotification } from "./services";
import { useSocket } from "../../../context/adminSocket";
import { FONTS } from "../../../constants/uiConstants";

interface Notification {
  _id: string;
  uuid: string;
  title: string;
  message: string;
  type:
    | "info"
    | "success"
    | "warning"
    | "error"
    | "promotion"
    | "system"
    | "chat"
    | "order"
    | "payment";
  priority: "low" | "medium" | "high" | "urgent";
  recipient_type: "user" | "admin" | "partner" | "all";
  recipient_id?: string;
  sender_id?: string;
  delivery_status?: {
    in_app?: {
      sent: boolean;
      delivered: boolean;
      read: boolean;
      sent_at?: string;
      delivered_at?: string;
      read_at?: string;
    };
  };
  metadata?: any;
  scheduled_at?: string;
  expires_at?: string;
  action_url?: string;
  action_type: "redirect" | "modal" | "api_call" | "none";
  is_read: boolean;
  is_sent: boolean;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

const NotificationPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const socket = useSocket();

  useEffect(() => {
    const fetchUserNotifications = async () => {
      try {
        const res: any = await getAllNotification("");
        const data: Notification[] = Array.isArray(res?.data?.data)
          ? res.data.data
          : [];
        setNotifications(data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchUserNotifications();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("new_notification", (newNotif: Notification) => {
      setNotifications((prev) => [newNotif, ...prev]);
    });
    socket.emit("join_room");
    // return () => {
    //   socket.off("new_notification");
    // };
  }, [socket]);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif._id === id ? { ...notif, is_read: true } : notif
      )
    );
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notif.is_read;
    if (filter === "read") return notif.is_read;
    return true;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full h-full mt-5 bg-white rounded-2xl p-6 shadow">
      <div className="flex justify-between gap-4 mb-6">
        <div className="flex gap-4">
          {["all", "read", "unread"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as "all" | "read" | "unread")}
              className={`w-24 h-10 rounded-3xl font-bold px-4 py-2 ${
                filter === type
                  ? "bg-[#9b111e] !text-white"
                  : "border-2 border-[#9b111e] text-[#9b111e]"
              }`}
              style={{ ...FONTS.cardSubHeader }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={() =>
            setNotifications((prev) =>
              prev.map((n) => ({ ...n, is_read: true }))
            )
          }
          className="text-sm text-[#9b111e] rounded-3xl hover:underline"
          style={{ ...FONTS.paragraph }}
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {filteredNotifications.map((notif) => {
          const isUnread = !notif.is_read;
          return (
            <div
              key={notif._id}
              className={`flex items-start justify-between p-4 rounded-xl border transition ${
                notif.type === "error"
                  ? "bg-red-50 border-red-300"
                  : isUnread
                  ? "bg-orange-100 border-yellow-300"
                  : "border-gray-200"
              }`}
            >
              <div
                className="flex items-start gap-3 cursor-pointer"
                onClick={() => handleMarkAsRead(notif._id)}
              >
                <span
                  className={`text-lg mt-1 ${
                    notif.type === "error" ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {notif.type === "error" ? (
                    "⚠️"
                  ) : (
                    <FaBell className="text-[#9b111e]" />
                  )}
                </span>
                <div>
                  <h4
                    className={`font-medium ${
                      notif.type === "error"
                        ? "text-red-600"
                        : isUnread
                        ? "text-black"
                        : "text-red-600"
                    }`}
                    style={{ ...FONTS.cardSubHeader }}
                  >
                    {notif.title}
                  </h4>
                  <p
                    className={` ${
                      notif.type === "error"
                        ? "!text-red-500"
                        : isUnread
                        ? "!text-red-800"
                        : "!text-red-800"
                    }`}
                    style={{...FONTS.subParagraph}}
                  >
                    {notif.message}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2 text-right">
                <div className="flex items-center gap-2">
                  {isUnread && (
                    <span className="bg-green-100 !text-green-700 !text-sm px-2 py-1 rounded"
                    style={{...FONTS.description}}
                    >
                      New
                    </span>
                  )}
                  <p className="text-2xs !text-red-00 whitespace-nowrap"
                  style={{...FONTS.subParagraph}}
                  >
                    {formatDate(notif.created_at)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationPanel;
