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
  InputAdornment,
  Pagination,
  stepConnectorClasses,
  StepConnector,
  Dialog,
  AppBar,
  Toolbar,
} from "@mui/material";
import CardSection from "../components/CardSection";
import TableSection from "../components/TableSection";
import ArrowSvg from "../assets/oblication-icon/arrow.svg";
import personSvg from "../assets/icons/person.svg";
import { getContractDetails } from "../Apis/ApiConfig";
import filterIconSvg from "../assets/icons/filter.svg";
import EditSvg from "../assets/icons/edit.svg";
import ModalSection from "../components/ModalSection";
import ThemedTabs, { ThemedTab } from "../components/TabSection";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { Document, Page, pdfjs } from "react-pdf";
import DeleteSvg from "../assets/icons/delete.svg";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
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
const adornmentRightStyle = {
  height: "100%",
  px: 1.5,
  backgroundColor: "#F7F7FF",
  border: "1px solid #E5E5E5",
  borderTopRightRadius: "6px",
  borderBottomRightRadius: "6px",
  fontSize: "14px",
  fontWeight: 400,
  color: "#061445",
};

const ColorConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
  },
  [`& .${stepConnectorClasses.line}`]: {
    display: "none", // hides in-between line
  },
}));
const ColorStepIconRoot = styled("div")(({ ownerState }) => ({
  // backgroundColor:
  //   ownerState.active || ownerState.completed ? "#2268E9" : "#434343",
  backgroundColor: ownerState.active
    ? "#2268E9" // Active step color
    : ownerState.completed
    ? "#308002" // ✅ Completed step color
    : "#434343", // Default color
  zIndex: 1,
  color: "#fff",
  width: 28,
  height: 28,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "14px",
}));

function ColorStepIcon(props) {
  const { active, completed, icon } = props;
  return (
    <ColorStepIconRoot ownerState={{ active, completed }}>
      {icon}
    </ColorStepIconRoot>
  );
}

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
  const [DeliverablemodalOpen, setDeliverablemodalOpen] = useState(false);
  const [BussinessCaseModalOpen, setBussinessCaseModalOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const [DocumentModalopen, setDocumentModal] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber] = useState(1);

  const handleClose = () => setDocumentModal(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

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

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleStepClick = (index) => {
    setActiveStep(index);
    if (!completedSteps.includes(index)) {
      setCompletedSteps((prev) => [...prev, index]); // Mark clicked step as completed
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
      <Box>
        {/* Step Tabs */}
        {/* <Tabs value={activeStep} onChange={handleStepChange} sx={{ mb: 3 }}>
        {steps.map((label, index) => (
          <Tab key={index} label={`${index + 1}. ${label}`} />
        ))}
      </Tabs> */}

        <Box sx={{ p: 3 }}>
          <Stepper
            activeStep={activeStep}
            connector={<ColorConnector />}
            sx={{
              mb: 3,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: {
                sm: "100%",
                md: "80%",
                lg: "60%",
                xl: "40%",
              },
              "& .MuiStep-root": {
                display: "inline-flex",
                alignItems: "center",
                padding: 0,
                minWidth: "auto",
              },
              "& .MuiStepLabel-root": {
                margin: 0,
                padding: 0,
              },
              "& .MuiStepConnector-root": {
                margin: 0,
              },
            }}
          >
            {steps.map((label, index) => (
              <Step
                key={label}
                onClick={() => handleStepClick(index)}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: 0,
                  minWidth: "auto",
                }}
              >
                <StepLabel
                  StepIconComponent={ColorStepIcon}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    "& .MuiStepLabel-label": {
                      color:
                        activeStep === index
                          ? "#2268E9 !important"
                          : completedSteps.includes(index)
                          ? "#308002 !important"
                          : "#60698F !important",
                      fontWeight: "600 !important",
                      fontSize: "14px",
                    },
                  }}
                >
                  {label}
                </StepLabel>
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
                    <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                      <Typography sx={commonNameStyle}>
                        {msaInfo.supplierName}
                      </Typography>
                      <Typography mt={1} sx={commonLabelStyle}>
                        Supplier Name
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>MSA Title</Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.msaTitle}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>MSA Code</Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.msaCode}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        MSA Duration
                      </Typography>
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
                    <Grid size={{ xs: 6, sm: 4, md: 2.7, lg: 2.6, xl: 2.4 }}>
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
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        Project Code
                      </Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.projectCode}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        Project Name
                      </Typography>
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
                    <Grid size={{ xs: 6, sm: 4, md: 2.7, lg: 2.6, xl: 2.4 }}>
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
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>SOW Code</Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.sowCode}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        Project Name
                      </Typography>
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
                    <Grid size={{ xs: 10, sm: 5, md: 2.5, lg: 2.4, xl: 2 }}>
                      <Typography sx={commonNameStyle}>
                        {msaInfo.supplierName}
                      </Typography>
                      <Typography mt={1} sx={commonLabelStyle}>
                        Supplier Name
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>MSA Title</Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.msaTitle}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>MSA Code</Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.msaCode}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 3 }}>
                      <Typography sx={commonLabelStyle}>
                        MSA Duration
                      </Typography>
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
                    <Grid size={{ xs: 6, sm: 4, md: 3.2, lg: 2.9, xl: 2.4 }}>
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
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>
                        Project Code
                      </Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.projectCode}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>
                        Project Name
                      </Typography>
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
                    <Grid size={{ xs: 6, sm: 4, md: 3.2, lg: 2.9, xl: 2.4 }}>
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
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>SOW Code</Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.projectCode}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>
                        Project Name
                      </Typography>
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
                      <Typography sx={commonLabelStyle}>
                        No Data Found
                      </Typography>
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
                    <Grid size={{ xs: 10, sm: 5, md: 2.5, lg: 2.4, xl: 2 }}>
                      <Typography sx={commonNameStyle}>
                        {msaInfo.supplierName}
                      </Typography>
                      <Typography mt={1} sx={commonLabelStyle}>
                        Supplier Name
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>MSA Title</Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.msaTitle}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>MSA Code</Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.msaCode}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 3 }}>
                      <Typography sx={commonLabelStyle}>
                        MSA Duration
                      </Typography>
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
                    <Grid size={{ xs: 6, sm: 4, md: 3.2, lg: 2.9, xl: 2.4 }}>
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
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>
                        Project Code
                      </Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.projectCode}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>
                        Project Name
                      </Typography>
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
                    <Grid size={{ xs: 6, sm: 4, md: 3.2, lg: 2.9, xl: 2.4 }}>
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
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>SOW Code</Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.projectCode}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>
                        Project Name
                      </Typography>
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
                  onHeaderActionClick={() => setDeliverablemodalOpen(true)}
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
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 3 }}
                      >
                        {/* Item 1 */}
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              // width: 3,
                              height: 9,
                              border: "1px solid #00A838",
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
                              // width: "1px",
                              height: 9,
                              border: "1px solid #FF0F8F",
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
                              // width: "1px",
                              height: 9,
                              border: "1px solid #FF0F8F",
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
            <Box>
              <Box mb={3}>
                <CardSection title="Documents" showArrow>
                  <Grid container spacing={2} alignItems="center">
                    <Grid>
                      <img src={personSvg} alt="" srcset="" />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                      <Typography sx={commonNameStyle}>
                        {msaInfo.supplierName}
                      </Typography>
                      <Typography mt={1} sx={commonLabelStyle}>
                        Supplier Name
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>MSA Code</Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.msaCode}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        MSA Duration
                      </Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.duration}
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>
                        MSA Value (TCV)
                      </Typography>
                      <Typography
                        sx={{ ...commonValueStyle, color: "#078600" }}
                      >
                        $1,250,000.00
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>TCV -ACV</Typography>
                      <Typography sx={commonValueStyle}>2.00%</Typography>
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
                    <Grid size={{ xs: 6, sm: 4, md: 2.7, lg: 2.6, xl: 2.4 }}>
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
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>SOW Code</Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.sowCode}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>SOW Title</Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.sowProjectName}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>
                        SOW Value (TCV)
                      </Typography>
                      <Typography
                        sx={{ ...commonValueStyle, color: "#078600" }}
                      >
                        $25,000.00
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>
                        Contract Staus
                      </Typography>
                      <Typography sx={commonValueStyle}>Active</Typography>
                    </Grid>
                  </Grid>
                </CardSection>
              </Box>

              <Box mb={2}>
                <CardSection
                  title="SOW Document List"
                  showArrow
                  headerActionLabel="+ Add Document"
                  onHeaderActionClick={() => setDocumentModal(true)}
                >
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
                            "CUSTOMER",
                            "SUPPLIER",
                            "SOW",
                            "SCHEDULE",
                            "SCHEDULE",
                            "DOCUMENT NAME",
                          ]}
                          rows={[]}
                          onRowClick={(row) => console.log("Row Click", row)}
                          onEdit={(row) => console.log("Edit", row)}
                          onDelete={(row) => console.log("Delete", row)}
                        />
                      </Box>
                    </Box>
                  </Box>
                </CardSection>
              </Box>
            </Box>
          )}

          {activeStep === 4 && (
            <Box>
              <Box mb={3}>
                <CardSection title="Summary" showArrow>
                  <Grid container spacing={2} alignItems="center">
                    <Grid>
                      <img src={personSvg} alt="" srcset="" />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                      <Typography sx={commonNameStyle}>
                        {msaInfo.supplierName}
                      </Typography>
                      <Typography mt={1} sx={commonLabelStyle}>
                        Supplier Name
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>MSA Code</Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.msaCode}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>
                        MSA Duration
                      </Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.duration}
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>
                        MSA Value (TCV)
                      </Typography>
                      <Typography
                        sx={{ ...commonValueStyle, color: "#078600" }}
                      >
                        1,250,000.00
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>TCV -ACV</Typography>
                      <Typography sx={commonValueStyle}>2.00%</Typography>
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
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.4 }}>
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
                    <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>SOW Code</Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.sowCode}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>SOW Title</Typography>
                      <Typography sx={commonValueStyle}>
                        {msaInfo.sowProjectName}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>
                        SOW Value (TCV)
                      </Typography>
                      <Typography
                        sx={{ ...commonValueStyle, color: "#078600" }}
                      >
                        $25,000.00
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>
                        Contract Staus
                      </Typography>
                      <Typography sx={commonValueStyle}>Active</Typography>
                    </Grid>
                  </Grid>
                </CardSection>
              </Box>

              <Box
                sx={{
                  mt: "20px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #0A18290D",
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <ThemedTabs value={tabIndex} onChange={handleTabChange}>
                    <ThemedTab label="SOW Detail" />
                    <ThemedTab label="SOW Summary" />
                    <ThemedTab label="Services" />
                    <ThemedTab label="Deliverables" />
                    <ThemedTab label="Contract Documents" />
                    <ThemedTab label="OB Register" />
                    <ThemedTab label="TCV-ACV Analysisi" />
                  </ThemedTabs>
                </Box>

                {tabIndex === 0 && (
                  <Box p={2}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                        <CardSection
                          title="SOW Basic Details"
                          sx={{
                            minHeight: "300px",
                            border: "1px solid #DCDCEF !important",
                          }}
                        ></CardSection>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                        <CardSection
                          title="SOW Contract Information"
                          sx={{ minHeight: "300px" }}
                        ></CardSection>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                        <CardSection
                          title="SOW Contract Document Information"
                          sx={{ minHeight: "300px" }}
                        ></CardSection>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>

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
            {activeStep !== 0 && (
              <Button
                sx={{
                  border: "1px solid #2268E9",
                  fontSize: "13px",
                  fontWeight: 400,
                  backgroundColor: "#FFFFFF",
                  color: "#2268E9",
                  borderRadius: "6px",
                }}
                onClick={handleBack}
              >
                {"<"} Previous
              </Button>
            )}

            <Button
              sx={{
                fontSize: "13px",
                fontWeight: 400,
                backgroundColor: "#2268E9",
                color: "#FFFFFF",
                borderRadius: "6px",
                textTransform: "none",
              }}
              onClick={handleNext}
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
                borderRadius: "6px",
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
          {[
            {
              label: "Cycle",
              input: (
                <Select fullWidth defaultValue="" size="small">
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                </Select>
              ),
            },
            {
              label: "BU Location",
              input: <TextField fullWidth value="United State of America NA" />,
            },
            {
              label: "Business Unit",
              input: <TextField fullWidth value="Governance" />,
            },
            {
              label: "Line of Business",
              input: <TextField fullWidth value="Advisory Services" />,
            },
            {
              label: "IT Service Suites",
              input: <TextField fullWidth value="Advisory design services" />,
            },
            {
              label: "Service Deliver location",
              input: (
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  value="River Quest, Quai Voltaire, BC, FRA, WEURO"
                />
              ),
            },
          ].map((field, index) => (
            <Box key={index} mb={3} display="flex" alignItems="center" gap={4}>
              <Typography
                sx={{
                  ...commonLabelStyle,
                  width: "150px", // ✅ fixed label width for alignment
                  flexShrink: 0, // prevents label from shrinking
                }}
              >
                {field.label}
              </Typography>
              <Box sx={{ flex: 1 }}>{field.input}</Box>
            </Box>
          ))}

          <Divider
            sx={{
              borderStyle: "solid",
              borderColor: "#DCDCEF",
              // borderWidth: "1px",
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
        {/* <Box sx={{ px: 3.5, py: 3.5 }}>
          
          <Typography
            sx={{ fontWeight: 600, fontSize: "14px", color: "#061445" }}
          >
            Projects
          </Typography>

          <Grid container spacing={2} mt={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <Typography sx={commonLabelStyle}>
                Project Expected Time for ROI
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                size="small"
                fullWidth
                value="2"
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end" sx={adornmentRightStyle}>
                      Years
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography sx={commonLabelStyle}>
                Project | NPV | Invest Rate
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                size="small"
                fullWidth
                value="20"
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end" sx={adornmentRightStyle}>
                      %
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Divider
            sx={{
              borderStyle: "dashed",
              borderColor: "#E5E5E5",
              borderWidth: "1px",
              my: 3,
            }}
          />

          
          <Typography
            sx={{ fontWeight: 600, fontSize: "14px", color: "#061445" }}
          >
            Investment
          </Typography>

          
          {[
            { label: "First time Investment" },
            { label: "Recurring Investment | Year 1" },
            { label: "Recurring Investment | Year 2" },
          ].map((row, idx) => (
            <Grid
              container
              spacing={2}
              mt={2}
              alignItems="center"
              key={idx}
              wrap="wrap"
            >
              <Grid item xs={12} md={4}>
                <Typography sx={commonLabelStyle}>{row.label}</Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <TextField
                      size="small"
                      fullWidth
                      value="In"
                      InputProps={{
                        disableUnderline: true,
                        sx: { textAlign: "center" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      size="small"
                      fullWidth
                      value="0.00"
                      InputProps={{
                        disableUnderline: true,
                        sx: { textAlign: "center" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      size="small"
                      fullWidth
                      value="In"
                      InputProps={{
                        disableUnderline: true,
                        sx: { textAlign: "center" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      size="small"
                      fullWidth
                      value="18.00"
                      InputProps={{
                        disableUnderline: true,
                        sx: { textAlign: "center" },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Box> */}

        <Box sx={{ px: 3.5, py: 3.5 }}>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "18px",
              letterSpacing: 0,
              verticalAlign: "middle",
              color: "#061445",
            }}
          >
            Projects
          </Typography>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "200px" }}>
              Project Expected Time for ROI
            </Typography>
            <TextField fullWidth placeholder="" value="" />
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "200px" }}>
              Project | NPV | Invest Rate
            </Typography>
            <TextField fullWidth placeholder="" value="" />
          </Box>

          <Divider
            sx={{
              borderStyle: "dashed",
              borderColor: "#DCDCEF",
              borderWidth: "1px",
              my: 2,
            }}
          />

          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "18px",
              letterSpacing: 0,
              verticalAlign: "middle",
              color: "#061445",
            }}
          >
            Investment
          </Typography>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "200px" }}>
              First time Investment
            </Typography>
            <TextField fullWidth placeholder="" value="" />
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "200px" }}>
              Recurring Investment | Year 1
            </Typography>
            <TextField fullWidth placeholder="" value="" />
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "200px" }}>
              Recurring Investment | Year 2
            </Typography>
            <TextField fullWidth placeholder="" value="" />
          </Box>
          <Divider
            sx={{
              borderStyle: "solid",
              borderColor: "#DCDCEF",
              // borderWidth: "1px",
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
              onClick={() => setBussinessCaseModalOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </ModalSection>

      {/* Deliverable Modal */}

      <ModalSection
        title="New Deliverable"
        open={DeliverablemodalOpen}
        onClose={() => setDeliverablemodalOpen(false)}
      >
        <Box sx={{ px: 3.5, py: 3.5 }}>
          <Box mb={3} mt={1} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "150px" }}>
              Deliverable ID
            </Typography>
            <TextField fullWidth placeholder="" value="" />
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "150px" }}>
              Project Phase
            </Typography>
            <Select fullWidth defaultValue="" size="small">
              <MenuItem value="">Select</MenuItem>
              <MenuItem value=""></MenuItem>
            </Select>
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "150px" }}>
              Project Phase
            </Typography>
            <TextField fullWidth placeholder="" value="" />
          </Box>
          <Divider
            sx={{
              borderStyle: "dashed",
              borderColor: "#DCDCEF",
              borderWidth: "1px",
              my: 2,
            }}
          />
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "150px" }}>
              Milestone code
            </Typography>
            <TextField fullWidth placeholder="" value="" />
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "150px" }}>
              Milestone Amount
            </Typography>
            <TextField fullWidth placeholder="" value="" />
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "150px" }}>
              Due Date
            </Typography>
            <TextField fullWidth placeholder="" value="" />
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
              onClick={() => setDeliverablemodalOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </ModalSection>

      {/* Add Document Modal */}

      <Dialog fullScreen open={DocumentModalopen} onClose={handleClose}>
        {/* Top blue header */}
        <AppBar sx={{ position: "relative", bgcolor: "#061445" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: "20px",
                color: "#fff",
                lineHeight: "30px",
                letterSpacing: 0.2,
              }}
            >
              Add New Document
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Content area */}
        <Box sx={{ display: "flex", height: "100%" }}>
          {/* Left: PDF Preview */}
          <Box
            sx={{
              flex: 1,
              bgcolor: "#f5f5f5",
              p: 0, // Remove extra padding, we'll control inside
              display: "flex",
              flexDirection: "column", // so header/content/footer stack vertically
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 2,

                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0px 2px 4px 0px #00000040",
              }}
            >
              <span sx={{ fontWeight: 500, fontSize: 16 }}>
                NDA_2024_Analysis_Report.pdf
              </span>
              {/* Example header action */}
              <Typography
                sx={{
                  cursor: "pointer",
                  fontSize: 16,
                  fontWeight: 500,
                  color: '#2268E9',
                  p: 0,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Add Document
                <img
                  src={DeleteSvg}
                  alt=""
                  style={{
                    width: 11,
                    height: 13,
                    marginLeft: 25,
                    mr: 0.5,
                    display: "inline-block",
                  }}
                />
              </Typography>
              
              
            </Box>

            {/* Main Content */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "auto",
                p: 2,
              }}
            >
              {/* Replace with your PDF viewer */}
              {/* <Document file="/sample.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} width={500} />
      </Document> */}
            </Box>

            {/* Footer */}
            <Box
              sx={{
                p: 1.5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                boxShadow: " 0px -1px 4px 0px #00000040",
                backgroundColor: '#fff'
              }}
            >
              <Typography sx={{ color: '#DCDCDC',fontSize: '16px',fontWeight: 500}}>
              PDF viewer Controls
              </Typography>
            </Box>
          </Box>

          {/* Right: Form */}

          <Box
            sx={{
              width: "600px",
              p: "2px",
              bgcolor: "#fff",
              borderLeft: "1px solid #ddd",
            }}
          >
            <Box
              sx={{
                py: { xs: 1.5, sm: 1.5, md: 2 },
                px: 2,
                borderTopLeftRadius: "6px",
                borderTopRightRadius: "6px",
                backgroundColor: "#EBEBFC",
                color: "#061445",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                Uploaded Document Information
              </Typography>
            </Box>

            <Grid container spacing={2} sx={{ p: 3 }}>
              <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                <Typography sx={{ ...commonLabelStyle }}>
                  MSA Schedule
                </Typography>
                <Select fullWidth defaultValue="select" size="small">
                  <MenuItem value="select">Select</MenuItem>
                  <MenuItem value=""></MenuItem>
                </Select>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                <Typography sx={{ ...commonLabelStyle }}>
                  MSA Schedule Code
                </Typography>
                <TextField fullWidth placeholder="" value="" />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <Typography sx={{ ...commonLabelStyle }}>
                  MSA Schedule
                </Typography>
                <TextField fullWidth placeholder="" value="" />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <Divider
                  sx={{
                    borderStyle: "dashed",
                    borderColor: "#E5E5E5",
                    borderWidth: "1px",
                    my: 1,
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                <Typography sx={{ ...commonLabelStyle }}>Schedule #</Typography>
                <TextField fullWidth placeholder="" value="" />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                <Typography sx={{ ...commonLabelStyle }}>
                  Document Type
                </Typography>
                <Select fullWidth defaultValue="select" size="small">
                  <MenuItem value="select">Select</MenuItem>
                  <MenuItem value=""></MenuItem>
                </Select>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                <Typography sx={{ ...commonLabelStyle }}>
                  Document Version
                </Typography>
                <Select fullWidth defaultValue="select" size="small">
                  <MenuItem value="select">Select</MenuItem>
                  <MenuItem value=""></MenuItem>
                </Select>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                <Typography sx={{ ...commonLabelStyle }}>Version#</Typography>
                <TextField fullWidth placeholder="" value="" />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <Divider
                  sx={{
                    borderStyle: "dashed",
                    borderColor: "#E5E5E5",
                    borderWidth: "1px",
                    my: 1,
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <Typography sx={{ ...commonLabelStyle }}>
                  Document Name
                </Typography>
                <TextField fullWidth placeholder="" value="" />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                <Typography sx={{ ...commonLabelStyle }}>
                  Uploaded Date
                </Typography>
                <TextField fullWidth placeholder="" value="" />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                <Typography sx={{ ...commonLabelStyle }}>
                  Upload Status
                </Typography>
                <Select fullWidth defaultValue="select" size="small">
                  <MenuItem value="select">Select</MenuItem>
                  <MenuItem value=""></MenuItem>
                </Select>
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <Divider
                  sx={{
                    borderStyle: "dashed",
                    borderColor: "#E5E5E5",
                    borderWidth: "1px",
                    my: 1,
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <Typography sx={{ ...commonLabelStyle }}>
                  Document Descriptions
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  placeholder=""
                  value=""
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <Divider
                  sx={{
                    borderStyle: "solid",
                    borderColor: "#D3D6E14D",
                    borderWidth: "1px",
                    my: 2,
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
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
                    // onClick={() => setDeliverablemodalOpen(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ContractAddEdit;
