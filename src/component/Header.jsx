import { Box, Button, Typography } from "@mui/joy";
import React from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import NailHead from "../assets/nail-head.jpg";

const Header = ({ reset }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap={"2rem"}
      p="2rem"
      sx={{ fontSize: "xx-large", fontWeight: "semi-bold" }}
    >
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        gap={"2rem"}
      >
        <img
          src={NailHead}
          alt="Nail Logo"
          style={{ height: "4.5rem", borderRadius: "1.25rem" }}
        />
        <Typography color="#D8B4F8" level="h2" sx={{ color: "#8e50c4" }}>
          Nails Analyser
        </Typography>
      </Box>
      <Button
        variant="outlined"
        startDecorator={<RestartAltIcon />}
        onClick={reset}
      >
        Reset
      </Button>
    </Box>
  );
};

export default Header;
