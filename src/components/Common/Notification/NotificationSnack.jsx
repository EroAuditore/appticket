import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { NotificationContext } from "./../Context/NotificationContex";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NotificationSnack = () => {
  const { notification, notificationText, setNotification, severity } =
    useContext(NotificationContext);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={notification}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {notificationText}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default NotificationSnack;
