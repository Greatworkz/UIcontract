import { Grid, Paper, Typography, Box } from "@mui/material";

const MetricSection = ({ title, value, icon }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 3,
        height: "100%",
        borderRadius: 2,
        backgroundColor: '#fff'
      }}
    >
      <Box
        component="img"
        src={icon}
        alt={title}
        sx={{ width: 40, height: 40 }}
      />
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px', fontWeight: 500, color: '#696D9A'}}>
          {title}
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};

export default MetricSection;
