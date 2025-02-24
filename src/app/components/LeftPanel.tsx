import { Box, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Live } from "./Live";
import theme from "../lib/theme";

export const LeftPanel = () => {
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
        spacing={2}
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
              <Typography color="text.primary" align="center">
                Current Roll No: 12345
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sx={{ pt: "16px !important" }}>
          <Typography variant="h6" color="text.primary">
            Heading for the second card
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={2} sx={{ height: "50%" }}>
          {[1, 2].map((cardNumber) => (
            <Grid
              key={cardNumber}
              item
              xs={6}
              sx={{
                height: "100%",
                paddingTop: "16px !important",
              }}
            >
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  bgcolor: "primary.main",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Typography variant="h5" color="text.primary">
                    Card {cardNumber + 1}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    This card covers the bottom half.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};
