import { Clock } from "lucide-react";

interface ReadingTimeProps {
  readingTime: string;
}

export default function ReadingTime({ readingTime }: ReadingTimeProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{
        background: "rgba(6,182,212,0.1)",
        color: "#06B6D4",
        border: "1px solid rgba(6,182,212,0.2)",
      }}
    >
      <Clock className="h-3 w-3" />
      {readingTime}
    </span>
  );
}
