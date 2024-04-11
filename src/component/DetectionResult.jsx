import { Box, Card, CardContent, Typography } from "@mui/joy";
import React from "react";

const DetectionResult = ({ result }) => {
  return (
    <>
      <Box
        width="2rem"
        height="2rem"
        position="absolute"
        top="16.15rem"
        right="41rem"
        sx={{
          borderRadius: "50%",
          background: "#8e50c4",
          transition: "all ease-in 2s",
        }}
      ></Box>
      <Box
        width="20rem"
        height="4px"
        position="absolute"
        right="22.1rem"
        top="17rem"
        sx={{ background: "#8e50c4" }}
      ></Box>
      <Box
        width="4px"
        height="10rem"
        position="absolute"
        right="18rem"
        top="15rem"
        sx={{ background: "#8e50c4", transform: "rotate(125deg)" }}
      ></Box>
      <Card
        variant="soft"
        color="primary"
        invertedColors
        sx={{
          p: "1rem",
          border: "solid 1px #8e50c4",
          position: "absolute",
          right: "10rem",
          top: "22rem",
          maxWidth: "20rem",
        }}
      >
        <CardContent>
          <Typography level="body-md">Results</Typography>
          <Typography level="h3" textOverflow="">
            {result}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default DetectionResult;
