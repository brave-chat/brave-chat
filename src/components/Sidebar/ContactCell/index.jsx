import React from "react";
import { Badge, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import CustomAvatar from "../../CustomAvatar";
import Typography from "@mui/material/Typography";
import { onUserSelect } from "../../../redux/appReducer/actions";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../redux/appReducer/selectors";

const ContactCell = ({ data, currentUser }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const userSelected = useSelector(selectedUser);

  const getBadgeStatusClass = () => {
    if (!data.chat_status) {
      return theme.palette.grey[400];
    }
    switch (data.chat_status.toLowerCase()) {
      case "online":
        return "#8DCD03";
      case "busy":
        return "#FF8C00";
      case "don't disturb":
        return "#E00930";
      default:
        return theme.palette.grey[400];
    }
  };
  const updateChatSelectedUser = () => {
    dispatch(onUserSelect(data));
  };

  return (
    <Box
      sx={{
        padding: "16px",
        borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: theme.palette.background.main,
        ":hover, &.active": {
          backgroundColor: theme.palette.action.hover,
        },
        ...(userSelected &&
          userSelected.email === data.email && {
            backgroundColor: theme.palette.action.hover,
          }),
      }}
      onClick={updateChatSelectedUser}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            width: "16px",
            height: "16px",
            backgroundColor: getBadgeStatusClass(),
            borderRadius: "50%",
            border: "solid 1px #fff",
            position: "absolute",
            right: "0px",
            bottom: "0px",
            zIndex: 1,
          }}
        />
        <CustomAvatar src={data.profile_picture} alt={data.first_name} />
      </Box>
      <Box sx={{ width: "calc(100% - 40px)", paddingLeft: "16px" }}>
        <Box display="flex" alignItems="center">
          <Typography
            component="div"
            variant="subtitle2"
            sx={{
              position: "relative",
              fontSize: "22px",
              color: theme.palette.text.primary,
              "&:hover, &.active": {
                color: theme.palette.text.primary,
              },
            }}
          >
            {data.first_name}
          </Typography>
        </Box>
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "12px",
            color: theme.palette.text.primary,
            paddingRight: "10px",
            width: "calc(100% - 24px)",
          }}
        >
          {data.bio}
        </Typography>
      </Box>
    </Box>
  );
};

export default ContactCell;
