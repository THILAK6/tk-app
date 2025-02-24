import { Box } from "@mui/material";

export const RightBottomPanel = () => {
  return (
    <Box
      component="section"
      sx={{
        height: "50%",
        width: "100%",
        bgcolor: "background.paper",
        p: 2,
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      Right Bottom Panel Content
    </Box>
  );
};