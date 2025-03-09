import { Box } from "@mui/material";
import { RightTopPanel } from "./RightTopPanel";
import { RightBottomPanel } from "./RightBottomPanel";
import { NotificationBar } from "./NotificationBar";
import { getCurrentRoll } from "../domain/roll";
import { prismaClient } from "../lib/dbClient";
import { getAllFaultTypes, getLastFaultForRoll } from "../domain/fault";
import { LiveServer } from "./LiveServer";

export const DashboardContent = async () => {
  const prisma = prismaClient();
  const currentRoll = await getCurrentRoll(prisma);
  const faultTypes = await getAllFaultTypes(prisma);

  const lastFaultInRoll = currentRoll
    ? await getLastFaultForRoll(prisma, currentRoll.id)
    : null;

  console.log("currentRoll", currentRoll?.rollNo);

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
          height: "100%",
          flexDirection: "row"
        }}
      >
        <LiveServer currentRoll={currentRoll} />
        <RightTopPanel
          currentRoll={currentRoll}
          faultTypes={faultTypes}
          lastFaultProp={lastFaultInRoll}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          overflow: "hidden",
          height: "100%"
        }}
      >
        <RightBottomPanel />
      </Box>
    </Box>
  );
};
