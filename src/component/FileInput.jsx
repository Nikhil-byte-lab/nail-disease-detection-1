import { Box, Button, Typography, styled } from "@mui/joy";
import React, { useEffect } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import BiotechIcon from "@mui/icons-material/Biotech";
import PlaceHolderImage from "../assets/placeholder.png";
import DetectionResult from "./DetectionResult";

const origin = window.location.origin
  .split(":")
  .filter((_, index) => index < 2)
  .join(":");

const ANALYSIS_URL = `${origin}:5000/analyse`;

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const FileInput = ({
  image,
  setImage,
  isLoading,
  setIsLoading,
  result,
  setResult,
  isResultVisible,
  setIsResultVisible,
}) => {
  // const [image, setImage] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [result, setResult] = useState(null);
  // const [isResultVisible, setIsResultVisible] = useState(false);

  useEffect(() => {
    setIsResultVisible(false);
  }, [image, setIsResultVisible]);

  const handleFileUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const analyseImage = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch(ANALYSIS_URL, {
      method: "POST",
      body: formData,
    });

    const parsedRes = await response.json();

    setTimeout(() => {
      setIsLoading(false);
      setResult(parsedRes);
      setIsResultVisible(true);
    }, 1000);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt="2rem"
      flexDirection="column"
    >
      {!image && (
        <Box height="18rem" my="2rem">
          <img
            src={PlaceHolderImage}
            alt="Placeholder"
            style={{ height: "100%", borderRadius: "1.25rem" }}
          />
        </Box>
      )}
      {result && isResultVisible && (
        <DetectionResult result={result.prediction} />
      )}
      {image && (
        <Box height="18rem" mt="2rem">
          <img
            src={URL.createObjectURL(image)}
            alt="user selected"
            style={{ height: "100%", borderRadius: "1.25rem" }}
          />
        </Box>
      )}
      {image && (
        <Typography sx={{ my: "1rem" }}>
          Selected Image: {image.name}
        </Typography>
      )}
      <Button
        component="label"
        role={undefined}
        tabIndex={-1}
        variant="outlined"
        color={!image ? "neutral" : "success"}
        startDecorator={<AddPhotoAlternateIcon />}
        disabled={isLoading}
      >
        Upload a file
        <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
      </Button>
      {image && !isLoading ? (
        <Button
          startDecorator={<BiotechIcon />}
          sx={{ mt: "2rem" }}
          onClick={analyseImage}
        >
          Analyse
        </Button>
      ) : (
        image &&
        isLoading && (
          <Button sx={{ mt: "2rem" }} loading variant="solid">
            Solid
          </Button>
        )
      )}
    </Box>
  );
};

export default FileInput;
