"use client";

import React from "react";
import { styled, Theme, CSSObject, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CloseOutlined, SvgIconComponent } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  quickNavigations,
  courseManagementNavigations,
  userManagementNavigations,
  generalNavigations,
  reportsNavigations,
} from "@/config/admin";

/**
 * Responsive Drawer
 *
 * - Desktop: permanent, collapsible mini-drawer (open/closed)
 * - Tablet & Mobile: temporary overlay drawer (slides over content)
 *
 * Props:
 *  - open: boolean (controls permanent drawer open state)
 *  - onClose: () => void (used to close temporary drawer on mobile)
 *  - onToggle?: () => void (optional toggle handler for desktop)
 */
const DRAWER_WIDTH = 260;

/* ---------------- MIXINS ---------------- */
const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "var(--admin-body-bg-2)",
  color: "var(--admin-text-gray)",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: "var(--admin-body-bg-2)",
  color: "var(--admin-text-gray)",
});

/* ---------------- STYLED PERMANENT DRAWER ---------------- */
const CustomMuiDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }: { theme?: Theme; open?: boolean }) => {
  return {
    width: DRAWER_WIDTH,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    flexShrink: 0,
    ...(open
      ? {
          ...openedMixin(theme as Theme),
          "& .MuiDrawer-paper": openedMixin(theme as Theme),
        }
      : {
          ...closedMixin(theme as Theme),
          "& .MuiDrawer-paper": closedMixin(theme as Theme),
        }),
  };
});

/* ---------------- HEADER ---------------- */
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface Props {
  open: boolean; // controls desktop permanent collapsed/expanded
  onClose: () => void; // close overlay (mobile)
  onToggle?: () => void; // toggle permanent (desktop)
}

export interface NavItem { name: string; href: string; icon: SvgIconComponent; }

const Drawer: React.FC<Props> = ({ open, onClose, onToggle }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md")); // md ~ 960px

  const renderNav = (items: NavItem[]) =>
    items.map(({ name, href, icon: Icon }: NavItem) => {
      const isActive = pathname === href;
      return (
        <ListItem
          key={name}
          disablePadding
          sx={{ display: "block", marginTop: "5px" }}
        >
          <Link
            href={href}
            onClick={() => (isMobileOrTablet ? onClose() : null)}
            className={`
              group flex py-1.5 px-4 rounded-sm transition-all duration-300 ease-out
              ${
                isMobileOrTablet
                  ? "justify-start gap-3"
                  : // : open
                    // ? "justify-start gap-3"
                    "justify-center gap-3"
              }
              ${isActive ? "bg-white/10 text-white" : ""}
            `}
            style={{ textDecoration: "none" }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
                color: isActive ? "#fff" : "#a7acb1",
                ".group:hover &": { color: "#fff" },
                ml: !isMobileOrTablet && !open ? 1.5 : "auto",
                mr: !isMobileOrTablet && open ? 1.5 : "auto",
              }}
            >
              <Icon />
            </ListItemIcon>

            <ListItemText
              primary={name}
              sx={{
                opacity: isMobileOrTablet ? 1 : open ? 1 : 0,
                transition: "opacity .2s",
                color: isActive ? "#fff" : "#a7acb1",
                ".group:hover &": { color: "#fff" },
                margin: 0,
              }}
            />
          </Link>
        </ListItem>
      );
    });

  /* Permanent (desktop) variant */
  if (!isMobileOrTablet) {
    return (
      <CustomMuiDrawer variant="permanent" open={open}>
        <DrawerHeader sx={{ px: 2 }}>
          <Typography variant="h6" sx={{ color: "#fff" }}>
            Logo
          </Typography>
          <IconButton onClick={onToggle} size="small">
            <CloseOutlined sx={{ color: "#fff" }} />
          </IconButton>
        </DrawerHeader>

        <Box sx={{ px: 1.5 }}>
          <List>{renderNav(quickNavigations)}</List>

          {open ? (
            <Typography sx={sectionTitleStyle}>Course Management</Typography>
          ) : (
            <Divider />
          )}
          <List>{renderNav(courseManagementNavigations)}</List>

          {open ? (
            <Typography sx={sectionTitleStyle}>User Management</Typography>
          ) : (
            <Divider />
          )}
          <List>{renderNav(userManagementNavigations)}</List>

          {open ? (
            <Typography sx={sectionTitleStyle}>General</Typography>
          ) : (
            <Divider />
          )}
          <List>{renderNav(generalNavigations)}</List>

          {open ? (
            <Typography sx={sectionTitleStyle}>Reports</Typography>
          ) : (
            <Divider />
          )}
          <List>{renderNav(reportsNavigations)}</List>
        </Box>
      </CustomMuiDrawer>
    );
  }

  /* Temporary overlay (mobile/tablet) variant */
  return (
    <MuiDrawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: {
          width: DRAWER_WIDTH,
          backgroundColor: "var(--admin-body-bg-2)",
          color: "var(--admin-text-gray)",
        },
      }}
    >
      <DrawerHeader sx={{ px: 2 }}>
        <Typography variant="h6" sx={{ color: "#fff" }}>
          Logo
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseOutlined sx={{ color: "#fff" }} />
        </IconButton>
      </DrawerHeader>

      <Box sx={{ px: 1.5 }}>
        <List>{renderNav(quickNavigations)}</List>
        <Divider sx={{ my: 1 }} />
        <Typography sx={sectionTitleStyle}>Course Management</Typography>

        <List>{renderNav(courseManagementNavigations)}</List>
        <Divider sx={{ my: 1 }} />
        <Typography sx={sectionTitleStyle}>User Management</Typography>

        <List>{renderNav(userManagementNavigations)}</List>
        <Divider sx={{ my: 1 }} />
        <Typography sx={sectionTitleStyle}>General</Typography>

        <List>{renderNav(generalNavigations)}</List>
        <Divider sx={{ my: 1 }} />
        <Typography sx={sectionTitleStyle}>Reports</Typography>

        <List>{renderNav(reportsNavigations)}</List>
      </Box>
    </MuiDrawer>
  );
};

const sectionTitleStyle = {
  textTransform: "uppercase",
  fontSize: "12px",
  fontWeight: 600,
  px: 2,
  py: 1.5,
  color: "#fff",
};

export default Drawer;
