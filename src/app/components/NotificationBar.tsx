'use client';

import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export const NotificationBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Box
    component={"aside"}
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: "8px 16px",
        borderRadius: 1,
        flexShrink: 0,
      }}
    >
      <Typography color="text.primary">Note: No Roll is select. Please select role to save data</Typography>
      <IconButton onClick={() => setVisible(false)} size="small">
        <CloseIcon />
      </IconButton>
    </Box>
  );
};