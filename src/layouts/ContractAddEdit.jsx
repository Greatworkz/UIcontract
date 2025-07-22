import React, { useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  TextField,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
  Divider,
  IconButton,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CardSection from "../components/CardSection";
import TableSection from "../components/TableSection";
const steps = [
  "Select Project SOW",
  "Business Case",
  "Deliverable",
  "Documents",
  "Summary",
];

const ContractAddEdit = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [msaInfo, setMsaInfo] = useState({
    supplierName: "--",
    msaTitle: "--",
    msaCode: "--",
    duration: "-- To --",
    projectCode: "--",
    projectName: "--",
    sowCode: "--",
  });

  const handleStepChange = (e, newValue) => setActiveStep(newValue);
  const handleEditClick = () => alert("Edit clicked"); // Replace with modal/edit form logic

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };
  return (
    <Box sx={{ p: 3 }}>
      {/* Step Tabs */}
      {/* <Tabs value={activeStep} onChange={handleStepChange} sx={{ mb: 3 }}>
        {steps.map((label, index) => (
          <Tab key={index} label={`${index + 1}. ${label}`} />
        ))}
      </Tabs> */}

       <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Box>
          <Box mb={3}>
            <CardSection title="Apply filters">
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
                  <Grid container alignItems="center">
                    <Grid
                      size={{ xs: 12, sm: 6, md: 2, lg: 3, xl: 4 }}
                      alignItems="center"
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: "#60698F", pr: 1 }}
                      >
                        Customer
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 9, lg: 9, xl: 8 }}>
                      <Select
                        fullWidth
                        defaultValue="ALG Global Limited"
                        size="small"
                      >
                        <MenuItem value="ALG Global Limited">
                          ALG Global Limited
                        </MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Geography */}
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
                  <Grid container alignItems="center">
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#60698F", pr: 1 }}
                      >
                        Geography
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 8, lg: 8, xl: 8 }}>
                      <Select fullWidth defaultValue="" size="small">
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="India">India</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Country */}
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
                  <Grid container alignItems="center">
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#60698F", pr: 1 }}
                      >
                        Country
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 8, lg: 8, xl: 8 }}>
                      <Select fullWidth defaultValue="" size="small">
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="India">India</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Service Suite */}
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
                  <Grid container alignItems="center">
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#60698F", pr: 1 }}
                      >
                        Service Suite
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 8, lg: 8, xl: 8 }}>
                      <Select fullWidth defaultValue="" size="small">
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="BPO">BPO</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Supplier */}
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
                  <Grid container alignItems="center">
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#60698F", pr: 1 }}
                      >
                        Supplier
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 8, lg: 8, xl: 8 }}>
                      <Select
                        fullWidth
                        defaultValue="ALG Global Limited"
                        size="small"
                      >
                        <MenuItem value="ALG Global Limited">
                          ALG Global Limited
                        </MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>

                {/* MSA Code */}
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
                  <Grid container alignItems="center" spacing={4}>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#60698F", pr: 1 }}
                      >
                        MSA Code
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 8, lg: 8, xl: 8 }}>
                      <Select
                        fullWidth
                        defaultValue="ALG-GLOBAL-MSA-1093"
                        size="small"
                      >
                        <MenuItem value="ALG-GLOBAL-MSA-1093">
                          ALG-GLOBAL-MSA-1093
                        </MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Project Code */}
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
                  <Grid container alignItems="center" spacing={4}>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#60698F", pr: 1 }}
                      >
                        Project Code
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 8, lg: 8, xl: 8 }}>
                      <Select
                        fullWidth
                        defaultValue="ALG-GLOBAL-MSA-PRO-10.."
                        size="small"
                      >
                        <MenuItem value="ALG-GLOBAL-MSA-PRO-10..">
                          ALG-GLOBAL-MSA-PRO-10..
                        </MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardSection>
          </Box>

          {/* MSA Information Section */}

          <Box mb={3}>
            <CardSection title="MSA Information">
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2} alignItems="center">
                <Grid>
                  <Avatar src="/user-avatar.png" alt="User" />
                </Grid>
                <Grid size={{ xs: 10, sm: 5, md: 3, lg: 3, xl: 3 }}>
                  <Typography variant="body2">Supplier Name</Typography>
                  <Typography variant="subtitle2">
                    {msaInfo.supplierName}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                  <Typography variant="body2">MSA Title</Typography>
                  <Typography variant="subtitle2">
                    {msaInfo.msaTitle}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                  <Typography variant="body2">MSA Code</Typography>
                  <Typography variant="subtitle2">{msaInfo.msaCode}</Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                  <Typography variant="body2">MSA Duration</Typography>
                  <Typography variant="subtitle2">
                    {msaInfo.duration}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                  <Typography variant="body2">Project Code</Typography>
                  <Typography variant="subtitle2">
                    {msaInfo.projectCode}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                  <Typography variant="body2">Project Name</Typography>
                  <Typography variant="subtitle2">
                    {msaInfo.projectName}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                  <Typography variant="body2">SOW Code</Typography>
                  <Typography variant="subtitle2">{msaInfo.sowCode}</Typography>
                </Grid>
              </Grid>
            </CardSection>
          </Box>

          {/* Scope of Service Section */}
          <Box mb={2}>
            <CardSection>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  Scope of Service
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  sx={{ color: "#2268E9", fontWeight: 600 }}
                >
                  + Add Scope
                </Button>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontWeight: 600, color: "#000", mr: 2 }}>
                  {" "}
                  Filter :{" "}
                </Typography>
                <TextField placeholder="Search content" size="small" />
              </Box>
              <Box sx={{ overflowX: "auto" }}>
                <Box sx={{ minWidth: 800 }}>
                  <TableSection
                    headers={[
                      "Customer",
                      "Type",
                      "File",
                      "Code",
                      "Date",
                      "Time",
                      "Status",
                    ]}
                    rows={[]}
                    onRowClick={(row) => console.log("Row Click", row)}
                    onEdit={(row) => console.log("Edit", row)}
                    onDelete={(row) => console.log("Delete", row)}
                  />
                </Box>
              </Box>
            </CardSection>
          </Box>
        </Box>
      )}
      {activeStep === 1 && (
        <Box mb={2}>
          <CardSection title="Business Case">
            <Typography>This is Business Case content</Typography>
          </CardSection>
        </Box>
      )}
      {activeStep === 2 && (
        <Box mb={2}>
          <CardSection title="Deliverable">
            <Typography>This is Deliverable content</Typography>
          </CardSection>
        </Box>
      )}
      {activeStep === 3 && (
        <Box mb={2}>
          <CardSection title="Documents">
            <Typography>This is Documents content</Typography>
          </CardSection>
        </Box>
      )}

      {activeStep === 4 && (
        <Box mb={2}>
          <CardSection title="Summary">
            <Typography>This is Summary content</Typography>
          </CardSection>
        </Box>
      )}
      
      <CardSection>
        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
            >
              Save & Continue
            </Button>
            <Button variant="outlined">Cancel</Button>
          </Box>
        </Box>
      </CardSection>
    </Box>
  );
};

export default ContractAddEdit;
