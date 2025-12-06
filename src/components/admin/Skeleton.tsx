"use client";

import { Box, Skeleton } from "@mui/material";


// ==========================
// ALL LMS SKELETONS IN ONE FILE
// ==========================

// 1. Dashboard Card Skeleton
export function DashboardCardSkeleton() {
  return (
    <Box
      sx={{
        padding: 3,
        borderRadius: "1rem",
        bgcolor: "color-mix(in oklab, var(--color-white) /* #fff = #ffffff */ 10%, transparent)",
        boxShadow: 1,
        width: "100%",
      }}
    >
      <Skeleton variant="text" width={120} height={20} />
      <Skeleton variant="text" width={80} height={40} />
      <Skeleton variant="rectangular" height={10} sx={{ mt: 1, borderRadius: 1 }} />
    </Box>
  );
}

// 2. Stats Grid Skeleton
export function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
          <DashboardCardSkeleton />
      ))}
    </div>
  );
}

// 3. Bar Chart Skeleton
export function BarChartSkeleton() {
  return (
    <Box
      sx={{
        padding: 3,
        borderRadius: 3,
        bgcolor: "color-mix(in oklab, var(--color-white) /* #fff = #ffffff */ 10%, transparent)",
        height: 300,
        boxShadow: 1,
      }}
    >
      <Skeleton variant="text" width={150} height={25} />
      <Skeleton variant="rectangular" height="80%" sx={{ mt: 2, borderRadius: 2 }} />
    </Box>
  );
}

// 4. Donut Chart Skeleton
export function DonutChartSkeleton() {
  return (
    <Box
      sx={{
        padding: 3,
        borderRadius: 3,
        bgcolor: "color-mix(in oklab, var(--color-white) /* #fff = #ffffff */ 10%, transparent)",
        height: 300,
        boxShadow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Skeleton variant="circular" width={140} height={140} sx={{ mt: 4 }} />
      <Skeleton variant="text" width={120} height={20} sx={{ mt: 3 }} />
    </Box>
  );
}

// 5. Table Skeleton
export function TableSkeleton() {
  return (
    <Box
      sx={{
        padding: 3,
        borderRadius: 3,
        bgcolor: "color-mix(in oklab, var(--color-white) /* #fff = #ffffff */ 10%, transparent)",
        boxShadow: 1,
      }}
    >
      <Skeleton height={30} width="40%" />
      <Skeleton height={40} width="100%" sx={{ mt: 2 }} />

      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} height={50} width="100%" sx={{ mt: 1 }} />
      ))}
    </Box>
  );
}

// 6. Course Card Skeleton
export function CourseCardSkeleton() {
  return (
    <Box
      sx={{
        borderRadius: 3,
        bgcolor: "color-mix(in oklab, var(--color-white) /* #fff = #ffffff */ 10%, transparent)",
        boxShadow: 1,
        overflow: "hidden",
      }}
    >
      <Skeleton variant="rectangular" height={140} />
      <Box sx={{ p: 2 }}>
        <Skeleton variant="text" width="80%" height={22} />
        <Skeleton variant="text" width="60%" height={18} />
        <Skeleton variant="rectangular" width={80} height={28} sx={{ mt: 2, borderRadius: 1 }} />
      </Box>
    </Box>
  );
}

// 7. Course Grid Skeleton
// export function CourseGridSkeleton() {
//   return (
//     <Grid container spacing={3}>
//       {Array.from({ length: 8 }).map((_, i) => (
//         <Grid item xs={12} sm={6} md={3} key={i}>
//           <CourseCardSkeleton />
//         </Grid>
//       ))}
//     </Grid>
//   );
// }

// 8. Student Row Skeleton
export function StudentRowSkeleton() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 1 }}>
      <Skeleton variant="circular" width={40} height={40} />
      <Box sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </Box>
      <Skeleton variant="rectangular" width={80} height={30} sx={{ borderRadius: 1 }} />
    </Box>
  );
}

// 9. Profile Skeleton
export function ProfileSkeleton() {
  return (
    <Box sx={{ p: 3, bgcolor: "color-mix(in oklab, var(--color-white) /* #fff = #ffffff */ 10%, transparent)", borderRadius: 3, boxShadow: 1 }}>
      <Skeleton variant="circular" width={80} height={80} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="50%" height={30} />
      <Skeleton variant="text" width="70%" height={20} />
      <Skeleton variant="rectangular" width="100%" height={120} sx={{ mt: 3, borderRadius: 2 }} />
    </Box>
  );
}
