"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import theme from "../lib/theme";
import { useLiveData } from "./providers/LiveDataContext";

const Live: React.FC = () => {
  const { liveData, isConnected } = useLiveData();
  console.log(isConnected);

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

Live.displayName = "Live";
export { Live };
