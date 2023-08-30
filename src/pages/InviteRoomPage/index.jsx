import React from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { inviteUser } from "../../api/Axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContentLoader from "../../components/ContentLoader";
import ParticlesBackground from "../../components/ParticlesBackground";

const styles = {
  centerScreen: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  card: {
    maxWidth: 400,
    width: "90%",
    padding: "20px",
    backgroundColor: "common.black",
    color: "common.white",
    borderRadius: "20px",
    border: `2px solid ${blue[500]}`,
    boxShadow: `0px 4px 8px ${blue[500]}80`,
    zIndex: "999",
  },
};

const InviteRoomPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleJoinClick = () => {
    dispatch(
      inviteUser(
        window.location.href.split("/")[
          window.location.href.split("/").length - 2
        ],
        window.location.href,
        navigate
      )
    );
  };

  return (
    <>
      <ParticlesBackground />
      <Box style={styles.centerScreen}>
        <ContentLoader variant="info" />
        <Card variant="outlined" sx={styles.card}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Welcome to Brave Chat!
            </Typography>
            <Typography variant="body1" color="lightgrey" gutterBottom>
              You have been invited to join a chat room.
            </Typography>
            <Typography variant="body2" color="lightgrey">
              Chat and collaborate with like-minded people.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleJoinClick}
              sx={{ marginTop: 2 }}
            >
              Join Room
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default InviteRoomPage;
