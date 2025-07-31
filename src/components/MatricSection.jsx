import { Grid, Paper, Typography, Box } from "@mui/material";

const MetricSection = ({ title, value, icon }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        height: "100%",
        borderRadius: '8px',
        backgroundColor: '#fff',
        border: '1px solid #E9EEFF'
      }}
    >
      <Box
        component="img"
        src={icon}
        alt={title}
        sx={{ width: 52, height: 52 }}
      />
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px', fontWeight: 500, color: '#696D9A'}}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: '20px', fontWeight: 600}}>
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};

export default MetricSection;
