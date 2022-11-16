import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(false);
  const [notificationText, setNotificationText] = useState(false);

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification,
        notificationText,
        setNotificationText,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
