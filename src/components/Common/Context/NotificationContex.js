import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [severity, setSeverity] = useState("");

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification,
        notificationText,
        setNotificationText,
        severity,
        setSeverity,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
