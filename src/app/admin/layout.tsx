"use client";

import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Noto_Sans } from "next/font/google";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import {
  Avatar,
  ListItemIcon,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  Toolbar as MuiToolbar,
  Typography,
} from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { usePathname } from "next/navigation";

import Drawer from "@/components/admin/Drawer";
import { useConfirmDialogStore } from "@/hooks/admin/useConfirmDialogStore";
import ConfirmDialog from "@/ui/ConfirmDialog";
import { Divider } from "@mui/material";
import PersonOutline from "@mui/icons-material/PersonOutline";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-noto-sans)",
  },
});

/**
 * AdminRootLayout
 *
 * - Desktop: permanent collapsible drawer (handled via `open` state)
 * - Tablet/Mobile: temporary overlay drawer (open state toggles modal drawer)
 */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const opens = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const pathname = usePathname();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  // open state:
  // - On desktop this controls collapsed/expanded (permanent drawer)
  // - On mobile/tablet this controls overlay open/close
  const [open, setOpen] = React.useState<boolean>(() => !isMobileOrTablet);

  React.useEffect(() => {
    // when screen size changes, make a sensible default
    setOpen(!isMobileOrTablet);
  }, [isMobileOrTablet]);

  const handleDrawerToggle = () => setOpen((s) => !s);
  const handleDrawerClose = () => setOpen(false);
  const {
    openConfirmDialog,
    title,
    description,
    confirmText,
    cancelText,
    loading,
    isDestructive,
    onConfirm,
    onCancel,
  } = useConfirmDialogStore();

  return (
    <ThemeProvider theme={theme}>
      <div
        className={`${notoSans.variable} relative w-full min-h-screen bg-[url('/admin/images/body-bg-1.webp')] bg-cover bg-center`}
      >
        {/* If we're on auth pages, render children only */}
        {pathname?.includes("auth") ? (
          <>{children}</>
        ) : (
          <>
            <CssBaseline />
            <Box sx={{ display: "flex" }}>
              {/* Drawer: component decides permanent vs temporary based on breakpoints */}
              <Drawer
                open={open}
                onClose={handleDrawerClose}
                onToggle={handleDrawerToggle}
              />

              {/* Main area */}
              <Box
                sx={{
                  flexGrow: 1,
                  minHeight: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                {/* Topbar */}
                <MuiAppBar
                  position="relative"
                  sx={{
                    background: "transparent",
                    boxShadow: "none",
                    zIndex: !open
                      ? theme.zIndex.drawer + 1
                      : theme.zIndex.appBar,
                  }}
                >
                  <MuiToolbar sx={{ justifyContent: "space-between" }}>
                    <IconButton color="inherit" onClick={handleDrawerToggle}>
                      <MenuOutlined />
                    </IconButton>
                    <>
                      <IconButton
                        onClick={handleOpen}
                        size="small"
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            fontSize: 18,
                            fontWeight: 600,
                          }}
                        >
                          A
                        </Avatar>
                      </IconButton>

                      <Menu
                        id="account-menu"
                        anchorEl={anchorEl}
                        open={opens}
                        onClose={handleClose}
                        onClick={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            mt: 1.5,
                            minWidth: 220,
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "var(--border-color)",
                            overflow: "visible",
                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
                            backgroundColor: "var(--admin-body-bg)",

                            /* V-notch */
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: -6,
                              right: 20,
                              width: 10,
                              height: 10,
                              bgcolor: "inherit",
                              borderLeft: "1px solid",
                              borderTop: "1px solid",
                              borderColor: "var(--border-color)",
                              transform: "rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        }}
                        MenuListProps={{
                          sx: {
                            py: 0.5,
                          },
                        }}
                      >
                        {/* Header */}
                        <Box
                          px={2}
                          py={2}
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          textAlign="center"
                        >
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              fontSize: 18,
                              fontWeight: 600,
                              mb: 1,
                            }}
                          >
                            A
                          </Avatar>

                          <Typography
                            variant="subtitle2"
                            color="white"
                            fontWeight={600}
                            noWrap
                          >
                            Hello, Admin
                          </Typography>

                          <Typography
                            variant="caption"
                            color="var(--admin-gray)"
                            noWrap
                          >
                            Administrator
                          </Typography>
                        </Box>

                        <Divider sx={{ borderColor: "var(--border-color)" }} />

                        {/* Actions */}

                        <Divider />

                        <MenuItem
                          sx={{
                            color: "var(--admin-gray)",
                            transition: "color 0.2s ease",

                            "&:hover": {
                              color: "var(--admin-text-white)",

                              "& .MuiListItemIcon-root": {
                                color: "var(--admin-text-white)",
                              },
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 32,
                              color: "inherit",
                              transition: "color 0.2s ease",
                            }}
                          >
                            <LogoutOutlined fontSize="small" />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Menu>
                    </>
                  </MuiToolbar>
                </MuiAppBar>
                {/* Page content */}
                <main className="text-white p-6 flex-1 overflow-x-auto overflow-y-auto">
                  {children}
                </main>
              </Box>
            </Box>
            <ConfirmDialog
              open={openConfirmDialog}
              title={title}
              description={description}
              confirmText={confirmText}
              cancelText={cancelText}
              loading={loading}
              isDestructive={isDestructive}
              onConfirm={onConfirm}
              onCancel={onCancel}
            />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
