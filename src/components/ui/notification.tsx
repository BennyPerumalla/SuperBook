import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";

interface NotificationProps {
  message: string;
  type?: "info" | "success" | "error" | "warning";
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export const Notification = ({ 
  message, 
  type = "info", 
  duration = 3000, 
  onClose,
  className 
}: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 200); // Wait for fade out animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800";
      case "error":
        return "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800";
      case "warning":
        return "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800";
      case "info":
      default:
        return "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
      default:
        return "ℹ️";
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 min-w-80 max-w-md p-4 rounded-lg border shadow-lg",
        "transition-all duration-200 ease-out",
        isVisible ? "animate-slide-in opacity-100" : "opacity-0 translate-x-full",
        getTypeStyles(),
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span className="text-lg">{getIcon()}</span>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onClose(), 200);
            }}
            className="text-current opacity-50 hover:opacity-100 transition-opacity"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};



export default Notification;