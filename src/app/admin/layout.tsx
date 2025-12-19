"use client";

import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Noto_Sans } from "next/font/google";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import {
  Avatar,
  AppBar as MuiAppBar,
  Toolbar as MuiToolbar,
} from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { usePathname } from "next/navigation";

import Drawer from "@/components/admin/Drawer";
import { useConfirmDialogStore } from "@/hooks/admin/useConfirmDialogStore";
import ConfirmDialog from "@/ui/ConfirmDialog";

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
                    <Avatar
                      sx={{
                        backgroundColor: "#fff",
                        color: "var(--admin-gray)",
                      }}
                    >
                      A
                    </Avatar>
                  </MuiToolbar>
                </MuiAppBar>
                {/* Page content */}
                <main
                  className="text-white p-6"
                  style={{
                    flexGrow: 1,
                    overflowX: "auto",
                    overflowY: "auto",
                  }}
                >
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
