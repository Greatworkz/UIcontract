import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, Box } from '@mui/material';

const COLORS = ['#F04438', '#FEC84B', '#6C757D']; // Red, Yellow, Gray (customize as needed)

const ChartSection = ({ title, data = [], height = 185 }) => {
  return (
    <Card sx={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        boxShadow: '0 6px 6px rgba(0,0,0,0.08)', // subtle shadow
      }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          {title}
        </Typography>

        <Box height={height}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartSection;
