import { Grid, Skeleton, Box } from '@mui/material';

export default function MovieSkeleton() {
  return (
    <Grid container spacing={2}>
      {Array.from(new Array(9)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 3,
              overflow: 'hidden',
              height: 400,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Skeleton variant="rectangular" height={250} width="100%" />
            <Box sx={{ p: 2 }}>
              <Skeleton width="80%" />
              <Skeleton width="40%" />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
