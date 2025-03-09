import { Card, CardContent, Typography, Box } from "@mui/material";
import { Live } from "./Live";
import { Roll } from "../domain/roll";

type LiverServerProps = {
  currentRoll: null | Roll;
};

export const LiveServer = ({ currentRoll }: LiverServerProps) => {
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
        width: "100%",
        bgcolor: "background.paper",
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        mb: 1,
      }}
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
    </Box>
  );
};
