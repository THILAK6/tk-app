import { ReactNode } from "react";
import { Box, IconButton, Typography, Paper, Avatar } from "@mui/material";
import {
  HomeRounded as HomeIcon,
  PrecisionManufacturingRounded as MachineIcon,
  FactCheck as ConclusionIcon,
  Business as CustomerIcon,
  PersonRounded as UserIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Category as InspectedTypeIcon,
} from "@mui/icons-material";
import NavList from "./NavList";
import { Subject, subjects } from "@/app/domain/subject";

export type HomeAndSubject = "home" | Subject;

type NavItem = {
  icon: React.JSX.Element;
  id: HomeAndSubject;
  path: string;
};

const subjectIcons = {
  machine: <MachineIcon />,
  conclusion: <ConclusionIcon />,
  customer: <CustomerIcon />,
  user: <UserIcon />,
  inspectedType: <InspectedTypeIcon />,
};

export const navItems: NavItem[] = [
  { icon: <HomeIcon />, id: "home", path: "/" },
  ...subjects.map((id) => ({
    icon: subjectIcons[id],
    id,
    path: `/subject/${id}`,
  })),
];

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      component={"main"}
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Paper
        component={"nav"}
        elevation={0}
        sx={{
          width: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 3,
          flexShrink: 0,
          borderRadius: 0,
        }}
      >
        <Typography
          component={"h1"}
          variant="h6"
          sx={{
            mb: 4,
          }}
        >
          XX yyyy
        </Typography>
        <NavList />
        <Box component={"div"} sx={{ mt: "auto", mb: 3 }}>
          <IconButton sx={{ color: "white" }}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Paper>

      <Box
      component={"section"}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 3,
          overflow: "hidden",
          maxWidth: "calc(100vw - 80px)",
        }}
      >
        <Box 
        component={"header"}
        sx={{ display: "flex", justifyContent: "space-between", mb: 3, flexShrink: 0 }}>
          <Box sx={{ position: "relative", width: "50%" }}></Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton sx={{ color: "white" }}>
              <NotificationsIcon />
            </IconButton>
            <Avatar sx={{ width: 40, height: 40 }} />
          </Box>
        </Box>
        <Box sx={{ flex: 1, overflow: "hidden", minHeight: 0 }}>{children}</Box>
      </Box>
    </Box>
  );
};
