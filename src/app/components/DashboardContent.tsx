import { Box } from "@mui/material";
import { LeftPanel } from "./LeftPanel";
import { RightTopPanel } from "./RightTopPanel";
import { RightBottomPanel } from "./RightBottomPanel";
import { NotificationBar } from "./NotificationBar";

export const DashboardContent = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflow: "hidden",
      }}
    >
      <NotificationBar/>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          gap: 2,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <LeftPanel />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          <RightTopPanel />
          <RightBottomPanel />
        </Box>
      </Box>
    </Box>
  );
};