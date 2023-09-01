import React from "react";
import { Box, InputBase, Typography, IconButton, Badge } from "@mui/material";
import CustomAvatar from "../../CustomAvatar";
import SearchIcon from "@mui/icons-material/Search";
import Popover from "@mui/material/Popover";
import ProfileDetail from "../ProfileDetail";
import { uploadProfilePicture } from "../../../api/Axios";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { onUpdateTheme } from "../../../redux/appReducer/actions";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { selectedTheme } from "../../../redux/appReducer/selectors";
import { useTheme } from "@mui/material/styles";

const SidebarHeader = ({ user, searchText, setSearchText }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userStatus, setUserStatus] = React.useState(user.chat_status);
  const themeMode = useSelector(selectedTheme);
  const theme = useTheme();
  const dispatch = useDispatch();

  const onToggleTheme = (event) => {
    event.preventDefault();
    dispatch(onUpdateTheme(themeMode === "light" ? "dark" : "light"));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: (file) => {
      dispatch(uploadProfilePicture(file));
    },
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = () => {
    if (!userStatus) {
      return theme.palette.grey[400];
    }
    switch (userStatus.toLowerCase()) {
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "10px",
          marginBottom: "12px",
          justifyContent: "space-between",
        }}
      >
        <Box
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            marginleft: "0px",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <CustomAvatar src={user.profile_picture} />
          <Box
            sx={{
              width: "16px",
              height: "16px",
              backgroundColor: getStatusColor(),
              borderRadius: "50%",
              border: "solid 1px #fff",
              position: "absolute",
              right: "0px",
              bottom: "0px",
              zIndex: 1,
            }}
          />
        </Box>
        <Box
          sx={{
            transition: "all 0.3s ease",
            opacity: 1,
            visibility: "visible",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.text.primary,
              marginBottom: "0px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              whiteSpace: "nowrap",
            }}
            component="h3"
            variant="h6"
          >
            {user.first_name}
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              color: theme.palette.text.secondary,
              letterSpacing: "0.4px",
            }}
            component="span"
          >
            {user.bio ? user.bio : ""}
          </Typography>
        </Box>
        <IconButton
          onClick={onToggleTheme}
          sx={{
            top: theme.spacing(0.2),
          }}
        >
          {theme.palette.mode === "light" ? (
            <Brightness7Icon
              sx={{
                fontSize: "28px",
                fontWeight: "bold",
                color: theme.palette.text.primary,
              }}
            />
          ) : (
            <Brightness4Icon
              sx={{
                fontSize: "28px",
                fontWeight: "bold",
                color: theme.palette.text.primary,
              }}
            />
          )}
        </IconButton>
      </Box>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <InputBase
          placeholder="Search here..."
          inputProps={{ "aria-label": "search" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{
            width: "100%",
            padding: "5px 15px 5px 35px",
            height: "36px",
            borderRadius: "4px",
            border: `1px solid ${theme.palette.divider}`,
            color: theme.palette.text.primary,
            fontSize: "12px",
            backgroundColor: theme.palette.background.paper,
            transition: "all 0.3s ease",
            "&:focus": {
              borderColor: theme.palette.text.primary,
            },
          }}
        />
        <SearchIcon
          sx={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            color: theme.palette.text.primary,
            fontSize: "20px",
            padding: "10px 0",
          }}
        />
      </Box>
      <Popover
        id="user-popover"
        open={Boolean(anchorEl)}
        sx={{
          ".MuiPaper-root": {
            border: "3px solid blue",
            borderRadius: "20px",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
          ".MuiPaper-root .MuiBox-root ul li": {
            color: theme.palette.text.primary,
          },
          ".MuiPaper-root .MuiBox-root ul li p": {
            color: theme.palette.text.primary,
          },
          ".MuiPaper-root .MuiBox-root p": {
            color: theme.palette.text.primary,
          },
        }}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box p={{ xs: 4, md: 6 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <input {...getInputProps()} />
            <IconButton sx={{ marginBottom: "2px" }} {...getRootProps()}>
              <CustomAvatar
                src={user.profile_picture ? user.profile_picture : ""}
              />
            </IconButton>
            <Box
              sx={{
                transition: "all 0.3s ease",
                opacity: 1,
                visibility: "visible",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.text.primary,
                  marginBottom: "0px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                }}
                component="h3"
                variant="h6"
              >
                {user.first_name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "11px",
                  color: theme.palette.text.primary,
                  letterSpacing: "0.4px",
                }}
                component="span"
              >
                {user.bio ? user.bio.substring(0, 30) + "..." : ""}
              </Typography>
            </Box>
          </Box>
          <ProfileDetail
            currentUser="true"
            user={user}
            userStatus={userStatus}
            setUserStatus={setUserStatus}
            statusColor={getStatusColor()}
          />
        </Box>
      </Popover>
    </Box>
  );
};

export default SidebarHeader;
