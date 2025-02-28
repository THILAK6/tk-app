'use client'
import { Box, Button } from "@mui/material";
import { useLiveData } from "./providers/LiveDataContext";

export const RightTopPanel = () => {
  const { liveDataRef, isConnected } = useLiveData(); 

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
        mb: 1,
      }}
    >
      Right Top Panel Content
      <Button></Button>
    </Box>
  );
};
