import React, { useState } from 'react';
import {
  Box, Typography, MenuItem, Select, TextField, Tabs, Tab,
  Card, CardContent, Grid, Button, Avatar, Divider, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CardSection  from '../components/CardSection';
const steps = ['Select Project SOW', 'Business Case', 'Deliverable', 'Documents', 'Summary'];

const ContractAddEdit = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [msaInfo, setMsaInfo] = useState({
    supplierName: '--',
    msaTitle: '--',
    msaCode: '--',
    duration: '-- To --',
    projectCode: '--',
    projectName: '--',
    sowCode: '--',
  });

  const handleStepChange = (e, newValue) => setActiveStep(newValue);
  const handleEditClick = () => alert('Edit clicked'); // Replace with modal/edit form logic

  return (
    <Box sx={{ p: 3 }}>
      {/* Step Tabs */}
      <Tabs value={activeStep} onChange={handleStepChange} sx={{ mb: 3 }}>
        {steps.map((label, index) => (
          <Tab key={index} label={`${index + 1}. ${label}`} />
        ))}
      </Tabs>


      <CardSection title="Apply filters">
      <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Select fullWidth defaultValue="ALG Global Limited">
                <MenuItem value="ALG Global Limited">ALG Global Limited</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={2}>
              <Select fullWidth defaultValue="">
                <MenuItem value="">Geography</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={2}>
              <Select fullWidth defaultValue="">
                <MenuItem value="">Country</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={2}>
              <Select fullWidth defaultValue="">
                <MenuItem value="">Service Suite</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={3}>
              <Select fullWidth defaultValue="">
                <MenuItem value="">Supplier</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <Select fullWidth defaultValue="ALG-GLOBAL-MSA-1093">
                <MenuItem value="ALG-GLOBAL-MSA-1093">ALG-GLOBAL-MSA-1093</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <Select fullWidth defaultValue="ALG-GLOBAL-MSA-PRO-10..">
                <MenuItem value="ALG-GLOBAL-MSA-PRO-10..">ALG-GLOBAL-MSA-PRO-10..</MenuItem>
              </Select>
            </Grid>
          </Grid>
      </CardSection>

      {/* MSA Information Section */}
      

      <CardSection title="MSA Information">
      <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar src="/user-avatar.png" alt="User" />
            </Grid>
            <Grid item xs={10} sm={5} md={3}>
              <Typography variant="body2">Supplier Name</Typography>
              <Typography variant="subtitle2">{msaInfo.supplierName}</Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Typography variant="body2">MSA Title</Typography>
              <Typography variant="subtitle2">{msaInfo.msaTitle}</Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Typography variant="body2">MSA Code</Typography>
              <Typography variant="subtitle2">{msaInfo.msaCode}</Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Typography variant="body2">MSA Duration</Typography>
              <Typography variant="subtitle2">{msaInfo.duration}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={6} sm={4}>
              <Typography variant="body2">Project Code</Typography>
              <Typography variant="subtitle2">{msaInfo.projectCode}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="body2">Project Name</Typography>
              <Typography variant="subtitle2">{msaInfo.projectName}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="body2">SOW Code</Typography>
              <Typography variant="subtitle2">{msaInfo.sowCode}</Typography>
            </Grid>
          </Grid>
      </CardSection>

      {/* Scope of Service Section */}
      <Card variant="outlined">
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" fontWeight={600}>Scope of Service</Typography>
            <Button variant="outlined" size="small">+ Add Scope</Button>
          </Box>
          <TextField
            fullWidth
            placeholder="Search content"
            size="small"
            sx={{ mt: 2 }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContractAddEdit;
