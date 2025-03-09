"use client";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useLiveData } from "./providers/LiveDataContext";
import { Roll } from "../domain/roll";
import AddIcon from "@mui/icons-material/Add";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import Link from "next/link";
import { FaultWithoutMeta, FaultType } from "../domain/fault";
import { useEffect, useState } from "react";
import { RemoveRedEye } from "@mui/icons-material";

type RightTopPanelProps = {
  currentRoll: null | Roll;
  faultTypes: FaultType[];
  lastFaultProp: FaultWithoutMeta | null;
};

export const RightTopPanel = ({
  currentRoll,
  faultTypes,
  lastFaultProp,
}: RightTopPanelProps) => {
  const { liveDataRef } = useLiveData();
  const [faultType, setFaultType] = useState<string>(
    faultTypes.length > 0 ? faultTypes[0].faultType : ""
  );

  const [lastFault, setLastFault] = useState<FaultWithoutMeta | null>(null);
  const [remarks, setRemarks] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setLastFault(lastFaultProp);
  }, [lastFaultProp]);

  const addFault = async () => {
    if (!currentRoll) return;

    const faultFromUI: FaultWithoutMeta = {
      date: new Date(),
      refRoll: currentRoll.id,
      faultLength: liveDataRef.current?.currentValue || 0,
      time: new Date(),
      faultTypeId:
        faultTypes.find((ft) => ft.faultType === faultType)?.id || "",
      remarks: remarks,
    };

    const response = await fetch("/api/fault", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(faultFromUI),
    });

    if (response.ok) {
      setLastFault(faultFromUI);
      setSuccessMessage("Fault added successfully!");
    } else {
      setSuccessMessage("Failed to select roll.");
    }
  };

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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          p: 2,
        }}
      >
        <Box>
          <h2>Roll No: {currentRoll.rollNo}</h2>
        </Box>
        {lastFault && (
          <TableContainer component={Paper} sx={{ mt: 0.2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Length</TableCell>
                  <TableCell>Fault Type</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{lastFault.faultLength}</TableCell>
                  <TableCell>
                    {
                      faultTypes.find((ft) => ft.id === lastFault.faultTypeId)
                        ?.faultType
                    }
                  </TableCell>
                  <TableCell>{lastFault.date.toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
          <Select
            label="Fault Types"
            value={faultType}
            onChange={(e) => setFaultType(e.target.value)}
            sx={{ minWidth: 200, mr: 2 }}
          >
            {faultTypes.map((faultType) => (
              <MenuItem key={faultType.id} value={faultType.faultType}>
                {faultType.faultType}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={addFault}
            sx={{ mr: 2 }}
          >
            Add Fault
          </Button>
          <Button
            variant="contained"
            startIcon={<RemoveRedEye />}
            onClick={addFault}
          >
            See All Faults
          </Button>
        </Box>
        <Box sx={{ mt: 2, width: "100%" }}>
          <TextField
            label="Remarks"
            variant="outlined"
            fullWidth
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </Box>
        <Snackbar
          open={!!successMessage}
          autoHideDuration={3000}
          onClose={() => setSuccessMessage(null)}
        >
          <Alert
            onClose={() => setSuccessMessage(null)}
            severity={
              successMessage === "Fault added successfully!"
                ? "success"
                : "error"
            }
          >
            {successMessage}
          </Alert>
        </Snackbar>
      </Box>
    );
  };

  return (
    <Box
      component="section"
      sx={{
        height: "100%",
        width: "100%",
        bgcolor: "background.paper",
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
