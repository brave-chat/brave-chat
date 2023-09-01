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

  const getBadgeStatusColor = () => {
    if (data.chat_status === "online") {
      return "#8dcd03";
    }
    if (data.chat_status === "busy") {
      return "#ff8c00";
    }
    return "#c1c1c1";
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
        <Badge
          sx={{
            root: {
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              border: "solid 1px #fff",
              position: "absolute",
              right: "4px",
              top: "6px",
              zIndex: 1,
              backgroundColor: getBadgeStatusColor(),
            },
          }}
          variant="dot"
        >
          <CustomAvatar src={data.profile_picture} alt={data.first_name} />
        </Badge>
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
