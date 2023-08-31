import React, { useEffect } from "react";
import { Box } from "@mui/material";
import CustomAvatar from "../CustomAvatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { onUserSelect } from "../../redux/appReducer/actions";
import { useDispatch } from "react-redux";
import DropdownMenu from "../DropdownMenu";
import ProfileDetail from "../Sidebar/ProfileDetail";
import { removeContact, deleteMessages } from "../../api/Axios";
import { leaveContactSocket } from "../../api/Socket";
import { useTheme } from "@mui/material/styles";

import Popover from "@mui/material/Popover";
const actions = [
  { label: "User Profile", slug: "profile" },
  { label: "Delete Messages", slug: "delete-messages" },
  { label: "Remove Contact", slug: "remove-contact" },
];

const ContentHeader = ({ user }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [favouriteColor, setFavouriteColor] = React.useState(
    theme.palette.primary.main
  );
  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;
  const divRef = React.useRef();

  useEffect(() => {
    setFavouriteColor(
      user.favourite === "true"
        ? theme.palette.primary.main
        : theme.palette.common.main
    );
  }, [user, theme]);

  const toggleButton = (event) => {
    event.preventDefault();
    //dispatch(setFavourite(user.favourite));
  };
  const onOptionItemClick = (item) => {
    switch (item.slug) {
      case "profile":
        setAnchorEl(divRef.current);
        break;
      case "delete-messages":
        dispatch(deleteMessages(user.email, onUserSelect));
        break;
      case "remove-contact":
        dispatch(removeContact(user.email, onUserSelect));
        break;
      default:
        break;
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleButtonClose = () => {
    dispatch(onUserSelect(null));
    dispatch(leaveContactSocket());
  };

  const statusColor = !user.chat_status
    ? theme.palette.text.secondary
    : user.chat_status.toLowerCase() === "online"
    ? theme.palette.success.main
    : user.chat_status.toLowerCase() === "busy"
    ? theme.palette.warning.main
    : user.chat_status.toLowerCase() === "offline"
    ? theme.palette.text.secondary
    : theme.palette.error.main;

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.chatHeader,
        padding: "11px 20px 10px 20px",
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: "flex",
        alignItems: "center",
      }}
      ref={divRef}
    >
      <IconButton
        sx={{
          marginRight: theme.spacing(1),
        }}
        onClick={handleButtonClose}
      >
        <KeyboardBackspaceIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          p={{
            xs: 4,
            md: 6,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CustomAvatar src={user.profile_picture} onClick={handleClick} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: theme.spacing(1),
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  lineHeight: "1.2",
                  color: theme.palette.text.primary,
                }}
              >
                {user.first_name + " " + user.last_name}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  color: theme.palette.text.primary,
                }}
              >
                {user.bio ? user.bio.substring(0, 30) + "..." : ""}
              </Typography>
            </Box>
          </Box>
          <ProfileDetail
            currentUser={false}
            user={user}
            userStatus={user.chat_status}
            setUserStatus={() => {}}
            statusColor={statusColor}
          />
        </Box>
      </Popover>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <CustomAvatar
          color="random"
          src={user.profile_picture}
          alt={user.first_name}
        />
        <Box
          sx={{
            paddingLeft: theme.spacing(2),
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                color: theme.palette.text.primary,
              }}
            >
              {user.first_name}
            </Typography>
            <Button
              sx={{
                marginLeft: theme.spacing(2),
              }}
              onClick={toggleButton}
            >
              {favouriteColor ? (
                <FavoriteIcon
                  sx={{
                    fontSize: 28,
                    color: favouriteColor,
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{
                    fontSize: 28,
                    color: theme.palette.primary.main,
                  }}
                />
              )}
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: theme.spacing(2.5),
                height: theme.spacing(2.5),
                backgroundColor: statusColor,
                borderRadius: "50%",
                marginRight: theme.spacing(2),
                marginLeft: theme.spacing(-4),
                zIndex: 999,
              }}
            />
            <Typography
              sx={{
                fontSize: 15,
                color: theme.palette.text.primary,
              }}
            >
              {user.chat_status ? user.chat_status : "  "}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          marginLeft: "auto",
        }}
      >
        <DropdownMenu
          TriggerComponent={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          items={actions}
          onItemClick={onOptionItemClick}
        />
      </Box>
    </Box>
  );
};

export default ContentHeader;
