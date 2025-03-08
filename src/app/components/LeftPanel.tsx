import { Box, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Live } from "./Live";
import { Roll } from "../domain/roll";
import { getFaultsCount } from "../domain/fault";
import { prismaClient } from "../lib/dbClient";
import { FaultTypeDistributionChart } from "./FaultTypeDistributionChart";

type LeftPanelProps = {
  currentRoll: null | Roll;
};

export const LeftPanel = async ({ currentRoll }: LeftPanelProps) => {
  const prisma = prismaClient();
  const faultsCount = await getFaultsCount(prisma);
  const showRollInfo = () => {
    const textToShow = currentRoll
      ? `Current Roll No: ${currentRoll.rollNo}`
      : "No Roll Selected";
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {textToShow}
      </Typography>
    );
  };

  return (
    <Box
      component="section"
      sx={{
        height: "100%",
        width: "55%",
        flexShrink: 0,
        flexGrow: 0,
        bgcolor: "background.paper",
        p: 2,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{ height: "100%", margin: 0, width: "100%" }}
      >
        <Grid
          item
          xs={12}
          sx={{ height: "45%", paddingTop: "16px !important" }}
        >
          <Card
            elevation={0}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2,
              bgcolor: "primary.main",
            }}
          >
            <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
              <Live />
            </CardContent>
            <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
              {showRollInfo()}
            </CardContent>
          </Card>
        </Grid>
        <Grid container item xs={12} spacing={1} sx={{ height: "54%" }}>
          <Grid
            item
            xs={12}
            sx={{
              height: "100%",
              paddingTop: "16px !important",
            }}
          >
            <FaultTypeDistributionChart faultCounts={faultsCount} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
