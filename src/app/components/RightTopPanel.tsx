"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useLiveData } from "./providers/LiveDataContext";
import { Roll } from "../domain/roll";
import AddIcon from "@mui/icons-material/Add";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import Link from "next/link";

type RightTopPanelProps = {
  currentRoll: null | Roll;
};

export const RightTopPanel = ({ currentRoll }: RightTopPanelProps) => {
  const { liveDataRef, isConnected } = useLiveData();

  const noRoll = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box>
        <Typography variant="h4">No Roll Selected</Typography>
        <Stack spacing={2} direction="column">
          <Link href="/roll" passHref>
            <Button variant="contained" startIcon={<SelectAllIcon />}>
              Select Existing Roll
            </Button>
          </Link>
          <Link href="/roll/new" passHref>
            <Button variant="contained" startIcon={<AddIcon />}>
              Add New Roll
            </Button>
          </Link>
        </Stack>
      </Box>
    </Box>
  );

  const content = () => {
    if (!currentRoll) {
      return noRoll();
    }

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box>
          <h2>Roll No: {currentRoll.rollNo}</h2>
        </Box>
      </Box>
    );
  };

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
      {content()}
    </Box>
  );
};
