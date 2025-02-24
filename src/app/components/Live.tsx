"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import theme from "../lib/theme";

type LiveData = {
  currentValue: number;
  currentMeterPerMinute: number;
};

export const Live: React.FC = () => {
  const [liveData, setLiveData] = useState<LiveData>({
    currentValue: 0,
    currentMeterPerMinute: 0,
  });
  const hostUrl = process.env.NEXT_PUBLIC_HOST!;

  useEffect(() => {
    const eventSource = new EventSource(hostUrl + "/api/mqtt");

    eventSource.onmessage = (event) => {
      console.log("Received message:", event.data);
      setLiveData(JSON.parse(event.data));
    };

    eventSource.onerror = (error) => {
      console.error("EventSource error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <Card sx={{ bgcolor: theme.palette.secondary.main, padding: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          align="center"
          sx={{ color: theme.palette.text.primary }}
        >
          Live Data
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <Box>
            <Typography variant="subtitle1" color="textSecondary">
              Current Value
            </Typography>
            <Typography variant="h4" color="primary">
              {liveData.currentValue}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" color="textSecondary">
              Meter Per Minute
            </Typography>
            <Typography variant="h4" color="primary">
              {liveData.currentMeterPerMinute}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
