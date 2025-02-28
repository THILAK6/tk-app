import { Box } from "@mui/material";
import { LeftPanel } from "./LeftPanel";
import { RightTopPanel } from "./RightTopPanel";
import { RightBottomPanel } from "./RightBottomPanel";
import { NotificationBar } from "./NotificationBar";
import { getCurrentRoll } from "../lib/store";

export const DashboardContent = () => {
  const currentRoll = getCurrentRoll();

  const showNotificationBar = () => {
    if (!currentRoll) {
      return <NotificationBar />;
    }
  };

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
      {showNotificationBar()}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          gap: 2,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <LeftPanel currentRoll={currentRoll}/>
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
