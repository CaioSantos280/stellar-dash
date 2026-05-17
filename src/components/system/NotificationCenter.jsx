import { useSystemStore } from "../../state/systemStore";

export default function NotificationCenter() {
  const { notifications } = useSystemStore();

  return (
    <div className="
      fixed top-6 right-6
      flex flex-col gap-2
      z-50
    ">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="
            px-4 py-3
            rounded-xl
            bg-black/60
            border border-white/10
            backdrop-blur-xl
            text-white/80
            text-sm
            animate-pulse
          "
        >
          {n.message}
        </div>
      ))}
    </div>
  );
}