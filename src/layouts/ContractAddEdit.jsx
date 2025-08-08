import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  TextField,
  Grid,
  Button,
  Avatar,
  Divider,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Stack,
  Paper,
  InputAdornment,Pagination
} from "@mui/material";
import CardSection from "../components/CardSection";
import TableSection from "../components/TableSection";
import ArrowSvg from "../assets/oblication-icon/arrow.svg";
import personSvg from "../assets/icons/person.svg";
import { getContractDetails } from "../Apis/ApiConfig";
import filterIconSvg from "../assets/icons/filter.svg";
import EditSvg from "../assets/icons/edit.svg";
import ModalSection from "../components/ModalSection";
const steps = [
  "Select Project SOW",
  "Business Case",
  "Deliverable",
  "Documents",
  "Summary",
];
const commonLabelStyle = {
  color: "#60698F",
  fontSize: "13px",
  fontWeight: 500,
  pr: 1,
  minWidth: "100px", // 👈 fixed width for alignment
  flexShrink: 0,
  whiteSpace: "nowrap",
};

const commonNameStyle = {
  fontFamily: "Inter",
  fontWeight: 600,
  fontSize: "15px",
  lineHeight: "100%",
  letterSpacing: "0%",
  verticalAlign: "middle",
  color: "#21263C",
};

const commonValueStyle = {
  fontFamily: "Inter",
  fontWeight: 500,
  fontSize: "13px",
  lineHeight: "100%",
  letterSpacing: "0%",
  verticalAlign: "middle",
  color: "#21263C",
  marginTop: "10px",
};

const FilterGrid = { xs: 12, sm: 6, md: 6, lg: 4, xl: 3 };

const ContractAddEdit = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [contractData, setContractData] = useState(null);
  const [msaInfo, setMsaInfo] = useState({
    supplierName: "John Mckenzie" || "--",
    msaTitle: "IT ADM SERIVE  FOR UK" || "--",
    msaCode: "ALG-GLOBAL-MSA-1093" || "--",
    duration: "10/01/2021  To  09/03/2024" || "-- To --",
    projectCode: "ALG-GLOBAL-MSA-PRO-10023" || "--",
    projectName: "IT ADM Service" || "--",
    sowCode: "ALG-GLOBAL-SOW-10023" || "--",
    sowProjectName: "IT ADM - ADS Service for US & UE" || "--",
  });
  const rowsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const handleStepChange = (e, newValue) => setActiveStep(newValue);
  const handleEditClick = () => alert("Edit clicked"); // Replace with modal/edit form logic
  const [MSAmodalOpen, setMSAmodalOpen] = useState(false);
  const [ScopemodalOpen, setScopemodalOpen] = useState(false);
  const [BussinessCaseModalOpen, setBussinessCaseModalOpen] = useState(false);
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

  useEffect(() => {
    // if (!contractId) return;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const contractResult = await getContractDetails();
      setContractData(contractResult);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box>
      <Box display="flex" flexDirection="column">
        <Box
          sx={{
            height: "auto",
            border: "1px solid #F3F3F3",
            backgroundColor: "#fff",
            pb: 0,
            px: 2,
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            sx={{ mt: 2 }}
          >
            {/* LEFT: Back Arrow */}
            <IconButton
              size="small"
              sx={{
                width: "14px",
                height: "14px",
                padding: 0,
                mt: "18px",
              }}
            >
              <img
                src={ArrowSvg}
                alt="icon"
                style={{ width: "100%", height: "100%" }}
              />
            </IconButton>

            {/* CENTER: Person image + name + select */}
            <Box
              display="flex"
              alignItems="flex-start"
              flexGrow={1}
              sx={{ mr: 2 }}
            >
              <Box
                component="img"
                src={personSvg}
                alt="Person Icon"
                sx={{
                  width: 56,
                  height: 56,
                  mr: 1,
                }}
              />

              <Box display="flex" flexDirection="column">
                <Box display="flex" alignItems="center" flexWrap="wrap">
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#21263C",
                      mr: 1,
                    }}
                  >
                    {contractData?.customer_name || "--"}
                  </Typography>

                  <Chip
                    label="ACTIVE"
                    size="small"
                    sx={{
                      borderRadius: "3px",
                      backgroundColor: "#DAFFE7",
                      color: "#008631",
                      fontWeight: 600,
                      px: 1.5,
                      py: 1,
                      textAlign: "center",
                      border: "1px solid #C5E9D1",
                      letterSpacing: "1px",
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#60698F",
                    padding: 0,
                    mt: 0.5,
                  }}
                >
                  {contractData?.uploaded_file || "--"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
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
              <CardSection title="Apply filters" showArrow>
                <Grid container spacing={2}>
                  {/* Customer */}
                  <Grid size={FilterGrid}>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      alignItems={{ xs: "flex-start", md: "center" }}
                      spacing={1}
                    >
                      <Typography sx={commonLabelStyle}>Customer</Typography>
                      <Select
                        fullWidth
                        defaultValue="ALG Global Limited"
                        size="small"
                      >
                        <MenuItem value="ALG Global Limited">
                          ALG Global Limited
                        </MenuItem>
                      </Select>
                    </Stack>
                  </Grid>

                  {/* Geography */}
                  <Grid size={FilterGrid}>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      alignItems={{ xs: "flex-start", md: "center" }}
                      spacing={1}
                    >
                      <Typography sx={commonLabelStyle}>Geography</Typography>
                      <Select fullWidth defaultValue="" size="small">
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="India">India</MenuItem>
                      </Select>
                    </Stack>
                  </Grid>

                  {/* Country */}
                  <Grid size={FilterGrid}>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      alignItems={{ xs: "flex-start", md: "center" }}
                      spacing={1}
                    >
                      <Typography sx={commonLabelStyle}>Country</Typography>
                      <Select fullWidth defaultValue="" size="small">
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="India">India</MenuItem>
                      </Select>
                    </Stack>
                  </Grid>

                  {/* Service Suite */}
                  <Grid size={FilterGrid}>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      alignItems={{ xs: "flex-start", md: "center" }}
                      spacing={1}
                    >
                      <Typography sx={commonLabelStyle}>
                        Service Suite
                      </Typography>
                      <Select fullWidth defaultValue="" size="small">
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="BPO">BPO</MenuItem>
                      </Select>
                    </Stack>
                  </Grid>

                  {/* Supplier */}
                  <Grid size={FilterGrid}>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      alignItems={{ xs: "flex-start", md: "center" }}
                      spacing={1}
                    >
                      <Typography sx={commonLabelStyle}>Supplier</Typography>
                      <Select
                        fullWidth
                        defaultValue="ALG Global Limited"
                        size="small"
                      >
                        <MenuItem value="ALG Global Limited">
                          ALG Global Limited
                        </MenuItem>
                      </Select>
                    </Stack>
                  </Grid>

                  {/* MSA Code */}
                  <Grid size={FilterGrid}>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      alignItems={{ xs: "flex-start", md: "center" }}
                      spacing={1}
                    >
                      <Typography sx={commonLabelStyle}>MSA Code</Typography>
                      <Select
                        fullWidth
                        defaultValue="ALG-GLOBAL-MSA-1093"
                        size="small"
                      >
                        <MenuItem value="ALG-GLOBAL-MSA-1093">
                          ALG-GLOBAL-MSA-1093
                        </MenuItem>
                      </Select>
                    </Stack>
                  </Grid>

                  {/* Project Code */}
                  <Grid size={FilterGrid}>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      alignItems={{ xs: "flex-start", md: "center" }}
                      spacing={1}
                    >
                      <Typography sx={commonLabelStyle}>
                        Project Code
                      </Typography>
                      <Select
                        fullWidth
                        defaultValue="ALG-GLOBAL-MSA-PRO-10.."
                        size="small"
                      >
                        <MenuItem value="ALG-GLOBAL-MSA-PRO-10..">
                          ALG-GLOBAL-MSA-PRO-10..
                        </MenuItem>
                      </Select>
                    </Stack>
                  </Grid>
                </Grid>
              </CardSection>
            </Box>

            {/* MSA Information Section */}

            <Box mb={3}>
              <CardSection
                title="MSA Information"
                showArrow
                headerActionLabel={
                  <>
                    <img src={EditSvg} alt="Edit" width={10} height={12} />
                    &nbsp; Edit
                  </>
                }
                onHeaderActionClick={() => setMSAmodalOpen(true)}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid>
                    <img src={personSvg} alt="" srcset="" />
                  </Grid>
                  <Grid size={{ xs: 10, sm: 5, md: 3, lg: 3, xl: 3 }}>
                    <Typography sx={commonNameStyle}>
                      {msaInfo.supplierName}
                    </Typography>
                    <Typography mt={1} sx={commonLabelStyle}>
                      Supplier Name
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                    <Typography sx={commonLabelStyle}>MSA Title</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.msaTitle}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                    <Typography sx={commonLabelStyle}>MSA Code</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.msaCode}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography sx={commonLabelStyle}>MSA Duration</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.duration}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider
                  sx={{
                    borderStyle: "dashed",
                    borderColor: "#E5E5E5",
                    borderWidth: "1px",
                    my: 2,
                  }}
                />

                <Grid container spacing={2}>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography
                      sx={{
                        color: "#061445",
                        fontSize: "13px",
                        fontWeight: 600,
                      }}
                    >
                      Project
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography sx={commonLabelStyle}>Project Code</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.projectCode}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography sx={commonLabelStyle}>Project Name</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.projectName}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider
                  sx={{
                    borderStyle: "dashed",
                    borderColor: "#E5E5E5",
                    borderWidth: "1px",
                    my: 2,
                  }}
                />

                <Grid container spacing={2}>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography
                      sx={{
                        color: "#061445",
                        fontSize: "13px",
                        fontWeight: 600,
                      }}
                    >
                      SOW Code
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography sx={commonLabelStyle}>SOW Code</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.sowCode}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography sx={commonLabelStyle}>Project Name</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.sowProjectName}
                    </Typography>
                  </Grid>
                </Grid>
              </CardSection>
            </Box>

            {/* Scope of Service Section */}
            <Box mb={2}>
              <CardSection
                title="Scope of Service"
                showArrow
                headerActionLabel="+ Add Scope"
                onHeaderActionClick={() => setScopemodalOpen(true)}
              >
                {/* <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    py: { xs: 1.5, sm: 1.5, md: 2 },
                    px: 2,
                  }}
                >
                  <Box
                    sx={{
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "6px",
                      backgroundColor: "#FAFAFD",
                      color: "#061445",
                      display: "flex",
                      // justifyContent: "space-between",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      component="img"
                      src={DownArrow}
                      alt="Arrow"
                      sx={{ width: 11, height: 6 }}
                    />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#061445",
                      }}
                    >
                      Scope of Service
                    </Typography>
                  </Box>

                  <Button
                    variant="text"
                    size="small"
                    sx={{ color: "#2268E9", fontWeight: 500, fontSize: "13px" }}
                  >
                    + Add Scope
                  </Button>
                </Box> */}

                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <img
                      src={filterIconSvg}
                      alt=""
                      style={{ width: 13, height: 14, marginRight: 5 }}
                    />
                    <Typography
                      sx={{
                        color: "#061445",
                        fontWeight: 600,
                        fontSize: "14px",
                      }}
                    >
                      Filter By :
                    </Typography>
                    {/* Search Field */}
                    <TextField
                      placeholder="Search content"
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>

                  <Box sx={{ overflowX: "auto" }}>
                    <Box sx={{ minWidth: 800 }}>
                      <TableSection
                        headers={[
                          "CYCLE",
                          "BU LOCATION",
                          "BUSINESS UNIT",
                          "LINE OF BUSINESS",
                          "IT SERVIE SUITES",
                          "SERVICE DELIVERY LOCATION",
                        ]}
                        rows={[]}
                        onRowClick={(row) => console.log("Row Click", row)}
                        // onEdit={(row) => console.log("Edit", row)}
                        // onDelete={(row) => console.log("Delete", row)}
                      />
                    </Box>
                  </Box>
                </Box>
              </CardSection>
            </Box>
          </Box>
        )}
        {activeStep === 1 && (
          <Box>
            <Box mb={3}>
              <CardSection
                title="MSA Information"
                showArrow
                headerActionLabel={
                  <>
                    <img src={EditSvg} alt="Edit" width={10} height={12} />
                    &nbsp; Edit
                  </>
                }
                onHeaderActionClick={() => setMSAmodalOpen(true)}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid>
                    <img src={personSvg} alt="" srcset="" />
                  </Grid>
                  <Grid size={{ xs: 10, sm: 5, md: 3, lg: 3, xl: 3 }}>
                    <Typography sx={commonNameStyle}>
                      {msaInfo.supplierName}
                    </Typography>
                    <Typography mt={1} sx={commonLabelStyle}>
                      Supplier Name
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                    <Typography sx={commonLabelStyle}>MSA Title</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.msaTitle}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                    <Typography sx={commonLabelStyle}>MSA Code</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.msaCode}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography sx={commonLabelStyle}>MSA Duration</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.duration}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider
                  sx={{
                    borderStyle: "dashed",
                    borderColor: "#E5E5E5",
                    borderWidth: "1px",
                    my: 2,
                  }}
                />

                <Grid container spacing={2}>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography
                      sx={{
                        color: "#061445",
                        fontSize: "13px",
                        fontWeight: 600,
                      }}
                    >
                      Project
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography sx={commonLabelStyle}>Project Code</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.projectCode}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography sx={commonLabelStyle}>Project Name</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.projectName}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider
                  sx={{
                    borderStyle: "dashed",
                    borderColor: "#E5E5E5",
                    borderWidth: "1px",
                    my: 2,
                  }}
                />

                <Grid container spacing={2}>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography
                      sx={{
                        color: "#061445",
                        fontSize: "13px",
                        fontWeight: 600,
                      }}
                    >
                      SOW Code
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography sx={commonLabelStyle}>SOW Code</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.projectCode}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography sx={commonLabelStyle}>Project Name</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.projectName}
                    </Typography>
                  </Grid>
                </Grid>
              </CardSection>
            </Box>
            <Box mb={3}>
              <CardSection
                title="Business Case & Projects"
                showArrow
                headerActionLabel="+ Add Business Case"
                onHeaderActionClick={() => setBussinessCaseModalOpen(true)}
              >
                <Box sx={{ overflowX: "auto", textAlign: "center" }}>
                  <Box sx={{ minWidth: 800 }}>
                    <Typography sx={commonLabelStyle}>No Data Found</Typography>
                    {/* <TableSection
                        headers={[
                          
                        ]}
                        rows={[]}
                        onRowClick={(row) => console.log("Row Click", row)}
                        onEdit={(row) => console.log("Edit", row)}
                        onDelete={(row) => console.log("Delete", row)}
                      /> */}
                  </Box>
                </Box>
              </CardSection>
            </Box>
          </Box>
        )}
        {activeStep === 2 && (
          <Box>
            <Box mb={3}>
              <CardSection
                title="MSA Information"
                showArrow
                headerActionLabel={
                  <>
                    <img src={EditSvg} alt="Edit" width={10} height={12} />
                    &nbsp; Edit
                  </>
                }
                onHeaderActionClick={() => setMSAmodalOpen(true)}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid>
                    <img src={personSvg} alt="" srcset="" />
                  </Grid>
                  <Grid size={{ xs: 10, sm: 5, md: 3, lg: 3, xl: 3 }}>
                    <Typography sx={commonNameStyle}>
                      {msaInfo.supplierName}
                    </Typography>
                    <Typography mt={1} sx={commonLabelStyle}>
                      Supplier Name
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                    <Typography sx={commonLabelStyle}>MSA Title</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.msaTitle}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                    <Typography sx={commonLabelStyle}>MSA Code</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.msaCode}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography sx={commonLabelStyle}>MSA Duration</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.duration}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider
                  sx={{
                    borderStyle: "dashed",
                    borderColor: "#E5E5E5",
                    borderWidth: "1px",
                    my: 2,
                  }}
                />

                <Grid container spacing={2}>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography
                      sx={{
                        color: "#061445",
                        fontSize: "13px",
                        fontWeight: 600,
                      }}
                    >
                      Project
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography sx={commonLabelStyle}>Project Code</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.projectCode}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography sx={commonLabelStyle}>Project Name</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.projectName}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider
                  sx={{
                    borderStyle: "dashed",
                    borderColor: "#E5E5E5",
                    borderWidth: "1px",
                    my: 2,
                  }}
                />

                <Grid container spacing={2}>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography
                      sx={{
                        color: "#061445",
                        fontSize: "13px",
                        fontWeight: 600,
                      }}
                    >
                      SOW Code
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography sx={commonLabelStyle}>SOW Code</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.projectCode}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
                    <Typography sx={commonLabelStyle}>Project Name</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.projectName}
                    </Typography>
                  </Grid>
                </Grid>
              </CardSection>
            </Box>

            <Box mb={2}>
              <CardSection
                title="Deliverables - Registered"
                showArrow
                headerActionLabel="+ Deliverable"
                onHeaderActionClick={() => setScopemodalOpen(true)}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    {/* Left Side */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={filterIconSvg}
                        alt=""
                        style={{ width: 13, height: 14, marginRight: 5 }}
                      />
                      <Typography
                        sx={{
                          color: "#061445",
                          fontWeight: 600,
                          fontSize: "14px",
                        }}
                      >
                        Filter By :
                      </Typography>
                      <TextField
                        placeholder="Search content"
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Box>

                    {/* Right Side */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                      {/* Item 1 */}
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            width: 3,
                            height: 9,
                            border: "3px solid #00A838",
                            mr: 1,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "#757383",
                          }}
                        >
                          Total Deliverable :{" "}
                          <Box component="span" sx={{ color: "#21263C" }}>
                            89
                          </Box>
                        </Typography>
                      </Box>

                      {/* Item 2 */}
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            width: "1px",
                            height: 9,
                            border: "3px solid #FF0F8F",
                            mr: 1,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "#757383",
                          }}
                        >
                          Total Deliverables with Milestones :{" "}
                          <Box component="span" sx={{ color: "#21263C" }}>
                            132
                          </Box>
                        </Typography>
                      </Box>

                      {/* Item 3 */}
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            width: "1px",
                            height: 9,
                            border: "3px solid #FF0F8F",
                            mr: 1,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "#757383",
                          }}
                        >
                          Total Deliverables without Mile stones :{" "}
                          <Box component="span" sx={{ color: "#21263C" }}>
                            132
                          </Box>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ overflowX: "auto" }}>
                    <Box sx={{ minWidth: 800 }}>
                      <TableSection
                        headers={[
                          "DELIVERABLE ID",
                          "PROJECT PHASE",
                          "DELIVERABLE DATE",
                          "MILESTONE CODE",
                          "MILESTONE AMOUNT",
                          "DUE DATE",
                        ]}
                        rows={[]}
                        onRowClick={(row) => console.log("Row Click", row)}
                        onEdit={(row) => console.log("Edit", row)}
                        onDelete={(row) => console.log("Delete", row)}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 4, // margin top
                    }}
                  >
                    {/* Right side - Total count */}
                    <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>
                      Total Count : {totalCount}
                    </Typography>

                    {/* Left side - Pagination */}
                    <Pagination
                      count={Math.ceil(totalCount / rowsPerPage)} // e.g., 173 / 10 = 18 pages
                      page={currentPage}
                      onChange={(e, page) => setCurrentPage(page)}
                      size="small"
                    />
                  </Box>
                </Box>
              </CardSection>
            </Box>
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

        <Box
          sx={{
            borderTop: "1px solid #F3F3F3",
            backgroundColor: "#fff",
            px: 2,
            py: 2,
            boxShadow: "0px -2px 2px 0px #D3D6E14D",
          }}
        >
          <Box display="flex" justifyContent="flex-start" gap={2}>
            <Button
              sx={{
                fontSize: "13px",
                fontWeight: 400,
                backgroundColor: "#2268E9",
                color: "#FFFFFF",
                borderRadius: "6px",
                textTransform: "none",
              }}
            >
              Save & Continue
            </Button>
            <Button
              sx={{
                border: "1px solid #E5E5E5",
                fontSize: "13px",
                fontWeight: 400,
                backgroundColor: "#FFFFFF",
                color: "#061445",
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>

      {/*  MSA Edit Modal */}

      <ModalSection
        title="MSA Information"
        open={MSAmodalOpen}
        onClose={() => setMSAmodalOpen(false)}
      >
        <Box sx={{ px: 3.5, py: 3.5 }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              color: "#061445",
            }}
          >
            Mapping Details
          </Typography>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>Supplier Name</Typography>
            <Select fullWidth defaultValue="" size="small">
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="India">India</MenuItem>
            </Select>
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>MSA Titel</Typography>
            <TextField fullWidth placeholder="" value="IT ADM SERIVE  FOR UK" />
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>MSA Code</Typography>
            <TextField fullWidth placeholder="" value="ALG-GLOBAL-MSA-1093" />
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>MSA Duration</Typography>
            <TextField
              fullWidth
              placeholder=""
              value="10/01/2021  To  09/03/2024"
            />
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>Project Code</Typography>
            <TextField
              fullWidth
              placeholder=""
              value="ALG-GLOBAL-MSA-PRO-10023"
            />
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>Project Name</Typography>
            <TextField fullWidth placeholder="" value="IT ADM Service" />
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>SOW Code</Typography>
            <TextField fullWidth placeholder="" value="ALG-GLOBAL-SOW-10023" />
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>Project Name</Typography>
            <TextField
              fullWidth
              placeholder=""
              value="IT ADM - ADS Service for  US & UE"
            />
          </Box>

          <Divider
            sx={{
              borderStyle: "solid",
              borderColor: "#DCDCEF",
              borderWidth: "1px",
              my: 2,
            }}
          />

          <Box display="flex" justifyContent="flex-start" gap={2}>
            <Button
              sx={{
                fontSize: "13px",
                fontWeight: 400,
                backgroundColor: "#2268E9",
                color: "#FFFFFF",
                borderRadius: "6px",
                textTransform: "none",
              }}
            >
              Save and Update
            </Button>
            <Button
              sx={{
                border: "1px solid #E5E5E5",
                fontSize: "13px",
                fontWeight: 400,
                backgroundColor: "#FFFFFF",
                color: "#061445",
              }}
              onClick={() => setMSAmodalOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </ModalSection>

      {/* Add Scope Modal */}

      <ModalSection
        title="Scope of Service"
        open={ScopemodalOpen}
        onClose={() => setScopemodalOpen(false)}
      >
        <Box sx={{ px: 3.5, py: 3.5 }}>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>Cycle</Typography>
            <Select fullWidth defaultValue="" size="small">
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="2">2</MenuItem>
            </Select>
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>BU Location</Typography>
            <TextField
              fullWidth
              placeholder=""
              value="United State of America NA"
            />
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>Business Unit</Typography>
            <TextField fullWidth placeholder="" value="Governance" />
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>Line of Business</Typography>
            <TextField fullWidth placeholder="" value="Advisory Services" />
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>IT Service Suites</Typography>
            <TextField
              fullWidth
              placeholder=""
              value="Advisory design services"
            />
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>
              Service Deliver location
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={5}
              placeholder=""
              value="River Quest, Quai Voltaire, BC, FRA, WEURO"
            />
          </Box>

          <Divider
            sx={{
              borderStyle: "solid",
              borderColor: "#DCDCEF",
              borderWidth: "1px",
              my: 2,
            }}
          />

          <Box display="flex" justifyContent="flex-start" gap={2}>
            <Button
              sx={{
                fontSize: "13px",
                fontWeight: 400,
                backgroundColor: "#2268E9",
                color: "#FFFFFF",
                borderRadius: "6px",
                textTransform: "none",
              }}
            >
              Save and Update
            </Button>
            <Button
              sx={{
                border: "1px solid #E5E5E5",
                fontSize: "13px",
                fontWeight: 400,
                backgroundColor: "#FFFFFF",
                color: "#061445",
              }}
              onClick={() => setScopemodalOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </ModalSection>

      {/* Bussiness Case Modal */}
      <ModalSection
        title="Business Case & Projects"
        open={BussinessCaseModalOpen}
        onClose={() => setBussinessCaseModalOpen(false)}
      >
        <Box sx={{ px: 3.5, py: 3.5 }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              color: "#061445",
            }}
          >
            Projects
          </Typography>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={3}>
            <Typography sx={commonLabelStyle}>
              Project Expected Time for ROI
            </Typography>
            <TextField
              size="small"
              fullWidth
              value="2"
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      width: 62,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#F7F7FF",
                      border: "1px solid #E5E5E5",
                      borderTopRightRadius: "6px",
                      borderBottomRightRadius: "6px",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#061445",
                    }}
                  >
                    Years
                  </InputAdornment>
                ),
                sx: {
                  paddingRight: 0,
                  paddingLeft: "10px",
                  paddingTop: 0,
                  paddingBottom: 0,
                },
              }}
            />
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={3}>
            <Typography sx={commonLabelStyle}>
              Project | NPV | Invest Rate
            </Typography>
            <TextField
              size="small"
              fullWidth
              value="20"
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      width: 62,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#F7F7FF",
                      border: "1px solid #E5E5E5",
                      borderTopRightRadius: "6px",
                      borderBottomRightRadius: "6px",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#061445",
                    }}
                  >
                    %
                  </InputAdornment>
                ),
                sx: {
                  paddingRight: 0,
                  paddingLeft: "10px",
                  paddingTop: 0,
                  paddingBottom: 0,
                },
              }}
            />
          </Box>

          <Divider
            sx={{
              borderStyle: "dashed",
              borderColor: "#E5E5E5",
              borderWidth: "1px",
              my: 2,
            }}
          />
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              color: "#061445",
            }}
          >
            Investment
          </Typography>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={3}>
            <Typography sx={commonLabelStyle}>
              Project | NPV | Invest Rate
            </Typography>
            <TextField
              size="small"
              fullWidth
              sx={{ padding: 0 }}
              value="0.000"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      width: 62,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#F7F7FF",
                      border: "1px solid #E5E5E5",
                      borderTopLeftRadius: "6px",
                      borderBottomLeftRadius: "6px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#061445",
                      }}
                    >
                      In
                    </Typography>
                  </InputAdornment>
                ),
                sx: {
                  paddingLeft: 0,
                  paddingRight: "10px",
                  paddingTop: 0,
                  paddingBottom: 0,
                },
              }}
            />
          </Box>
        </Box>
      </ModalSection>
    </Box>
  );
};

export default ContractAddEdit;
