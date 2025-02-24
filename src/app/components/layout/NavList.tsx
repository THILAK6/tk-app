"use client";

import { List, ListItemButton, ListItemIcon } from "@mui/material";
import Link from "next/link";
import { navItems } from "./DashboardLayout";
import { usePathname } from "next/navigation";

const NavList = () => {
  const pathname = usePathname();

  return (
    <List sx={{ width: "100%" }}>
      {navItems.map((item) => {
        const isSelected = pathname === item.path;
        return (
        <Link key={item.id} href={item.path} passHref style={{ width: "100%", textDecoration: "none" }}>
          <ListItemButton
                selected={isSelected}
                sx={{
                  justifyContent: "center",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                  ...(isSelected && { bgcolor: "rgba(255,255,255,0.1)" }),
                }}
              >
            <ListItemIcon
              sx={{
                minWidth: "auto",
              }}
            >
              {item.icon}
            </ListItemIcon>
          </ListItemButton>
        </Link>
      )})}
    </List>
  );
};

export default NavList;