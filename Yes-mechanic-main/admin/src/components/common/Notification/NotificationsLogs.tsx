import { useState } from "react";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

type Notification = {
  id: number;
  name: string;
  type: string;
  description: string;
  enabled: boolean;
};

const baseNotifications: Notification[] = [
  {
    id: 1,
    name: "Customer invited",
    type: "Account",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    enabled: true,
  },
  {
    id: 2,
    name: "Request Created",
    type: "Request",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    enabled: true,
  },
  {
    id: 3,
    name: "Public comment added",
    type: "Request",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    enabled: true,
  },
];

const repeatedNotifications: Notification[] = [];
const totalCount = 8;

for (let i = 0; i < totalCount; i++) {
  const base = baseNotifications[i % baseNotifications.length];
  repeatedNotifications.push({ ...base, id: i + 1 });
}

const NotificationsLogs = () => {
  const [notifications, setNotifications] = useState<Notification[]>(
    repeatedNotifications
  );

  const toggleEnabled = (id: number) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <div className="p-5 mx-auto bg-white rounded-[20px] overflow-y-auto hide-scrollbar">
      <h1 className="text-2xl font-semibold pb-3 border-b text-[#800000]">Notification</h1>
      <div className="flex justify-between items-start w-full ">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-gray-600 pt-3">
            Notifications logs
          </h2>
          <p className="text-gray-500 text-base py-[10px] whitespace-nowrap overflow-hidden text-ellipsis">
            These are the Notifications your service sends to customers. You can
            change their recipients and content, or disable them.
          </p>
        </div>
        <button className="text-[#800000] rounded-3xl text-base hover:underline self-center pr-10">
          Mark all as read
        </button>
      </div>

      <table className="w-full table-auto border-collapse my-4">
        <thead className="border-b ">
          <tr>
            <th className="px-2 pb-5 text-base font-semibold text-[#800000] text-left">
              Name
            </th>
            <th className="px-2 pb-5 text-base font-semibold text-[#800000] text-left">
              Type
            </th>
            <th className="px-2 pb-5 text-base font-semibold text-[#800000] text-left">
              Description
            </th>
            <th className="px-2 pb-5 text-base font-semibold text-[#800000] text-left">
              Enable
            </th>
            <th className="px-2 pb-5 text-base font-semibold text-[#800000] text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((item) => (
            <tr key={item.id}>
              <td className="px-3 pt-5 text-base text-gray-600 truncate">
                {item.name}
              </td>
              <td className="px-3 pt-5 text-base text-gray-600 truncate">
                {item.type}
              </td>
              <td className="px-3 pt-5 text-base text-gray-600 max-w-xs break-words">
                {item.description}
              </td>
              <td className="px-3 pt-5 text-base truncate">
                <button
                  onClick={() => toggleEnabled(item.id)}
                  className="hover:opacity-80 rounded-3xl"
                >
                  {item.enabled ? (
                    <MdToggleOn className="text-[#800000] text-5xl" /> // Bigger icon
                  ) : (
                    <MdToggleOff className="text-gray-400 text-5xl" />
                  )}
                </button>
              </td>
              <td className="px-3 pt-5 text-base text-[#800000] cursor-pointer truncate">
                Edit
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationsLogs;
