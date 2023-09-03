import React from "react";
import CustomList from "../../CustomList";
import { Box, useTheme } from "@mui/material";
import ChatUserCell from "../ChatUserCell";
import NoRecordFound from "../NoRecordFound";
import PerfectScrollbar from "react-perfect-scrollbar";

const ChatUserList = ({ users, width, currentUser, onUserSelect }) => {
  const theme = useTheme();
  return users && users.length > 0 ? (
    <Box>
      <PerfectScrollbar
        style={{
          overflowY: "auto",
          maxHeight: "100vh",
        }}
      >
        <CustomList
          sx={{
            width: { md: "360px", xs: "100vw", sm: "360px" },
          }}
          data={users}
          renderRow={(data) => {
            return (
              <ChatUserCell
                key={data.id}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  padding: theme.spacing(2),
                  fontWeight: "bold",
                  fontSize: theme.typography.pxToRem(15),
                  textTransform: "uppercase",
                  color: theme.palette.text.primary,
                  letterSpacing: theme.spacing(0.375),
                  borderTop: `2px solid ${theme.palette.grey[500]}`,
                  borderBottom: `2px solid ${theme.palette.grey[500]}`,
                }}
                currentUser={currentUser}
                data={data}
                onUserSelect={onUserSelect}
              />
            );
          }}
        />
      </PerfectScrollbar>
    </Box>
  ) : (
    <NoRecordFound />
  );
};

export default ChatUserList;
