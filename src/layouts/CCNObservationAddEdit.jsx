import React, { useState, useEffect, useRef } from "react";
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
  InputBase,
  Checkbox,
  FormControlLabel,
  Menu,
  TextareaAutosize,
  FormControl,
  RadioGroup,
  Radio,
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
import DeleteSvg from "../assets/icons/delete.svg"
import SingleDatePicker from "../components/SingleDatePicker";
import FileUploadSection from "./fileuploadSection";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import MoreIcon from "../assets/oblication-icon/moreIcon.svg";
import ContractForm from "./ContractForm";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FileUpload from "../components/FileUpload";
import { useNavigate } from "react-router-dom";
// import AuditObservationAddEdit from "./AuditObservationIssueRisk";

const steps = [
  "Audit Plan",
  "Business Mapping",
  "Processes View",
  "Stakeholders",
  "Contract Documents",
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
  "& .MuiInputBase-root": {
    padding: "0px !important", // remove padding from input root
  },
  "& .MuiInputAdornment-root": {
    backgroundColor: "#F7F7FF",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: 400,
    color: "#061445 !important",
    borderTopRightRadius: "4px",
    borderBottomRightRadius: "4px",
    border: "1px solid #E5E5E5",
  },
};

const CompactInputs = {
  ...adornmentRightStyle,
  width: "125px",
  "& .MuiOutlinedInput-root": {
    minWidth: "auto !important",
    width: "125px !important",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    padding: 0,
    color: "#061445 !important",
    "& fieldset": {
      border: "none",
    },
  },
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
    ? "#308002" // Completed step color
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

const CCNObservationAddEdit = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [contractData, setContractData] = useState(null);
  const [msaInfo, setMsaInfo] = useState({
    supplierName: "John Mckenzie" || "--",
    msaTitle: "IT ADM SERIVE  FOR UK" || "--",
    msaCode: "ALG-GLOBAL-MSA-1093" || "--",
    duration: "10/01/2021  To  09/03/2024" || "-- To --",
    projectCode: "ALG-GLOBAL-MSA-PRO-10023" || "--",
    projectName: "IT ADM Service" || "--",
    plancode: "ALG-GLOBAL-SOW-10023" || "--",
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
  const [processmodalOpen, setProcessModalOpen] = useState(false);
  const [documentModalOpen,setDocumentModalOpen]= useState(false)
  const [stockholdermodalopen, setStockholdermodalopen] = useState(false);
  const [BussinessCaseModalOpen, setBussinessCaseModalOpen] = useState(false);
  const [contractdocumentmodal, setContractDocumentsModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const [DocumentModalopen, setDocumentModal] = useState(false);
  const [Supportingdocumentmodal,setSupportingDocumentModal] =  useState(false)
  const [ObservationModal, setObservationModal] = useState(false);
  const [fileUrl, setFileUrl] = useState(""); // default PDF
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [DocDate, setDocDate] = useState(null);
  const [DocUploadDate, setDocUploadDate] = useState(null);
  

  const [formData, setFormData] = useState({
    issueIndicator: "",
    riskIndicator: "",
    costRecoveryIndicator: "",
    observationDueDate: null,
    expectedActionPlanDate: null,
    issueMitigationPlan: "",
    auditRecommendations: "",
  });

  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const DropDown = Boolean(anchorEl);
  const [openContractForm, setOpenContractForm] = useState(false);
  const DropDownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const DropDownClose = () => {
    setAnchorEl(null);
  };

  const handleAddDocumentClick = () => {
    fileInputRef.current.click(); // open file dialog
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type;
    if (fileType.includes("pdf") || fileType.includes("image")) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      setPageNumber(1);
    } else {
      alert("Please select a PDF or Image file");
    }
  };

  const handleClose = () => setObservationModal(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleNext = () => {
  
    navigate('/auditObservation-issue')
  };
  

  const handleCloseforSupportingDocument = () =>{
    setSupportingDocumentModal(false)
  }

   const UploadDocument = async () => {
    snackbar.success("Data saved successfully!");
    handleCloseforSupportingDocument();
  }

    const handleFilesSelected = (files) => {
    console.log("Uploaded files:", files);
    // you can send them to API or store in state here
  }

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

  const handleRadioChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleDateChange = (field) => (date) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  const handleTextChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
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
    <>
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
                    label="Draft"
                    size="small"
                    sx={{
                      borderRadius: "3px",
                      backgroundColor: "#F1F1F1",
                      color: "black",
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
            <Box display="flex" gap={1} justifyContent="flex-end" mt={1}>
              {/* <Button
                size="small"
                variant="outlined"
                sx={{
                  width: "fit-content",
                  borderRadius: "6px",
                  border: "1px solid #E5E5E5",
                  opacity: 1,
                  textTransform: "none",
                  fontWeight: 400,
                  color: "#000000",
                  minWidth: "auto",
                  padding: "9px",
                }}
                onClick={DropDownOpen}
              >
                <img
                  src={MoreIcon}
                  alt="icon"
                  style={{ width: "100%", height: "100%" }}
                />
              </Button> */}

              <Menu anchorEl={anchorEl} open={DropDown} onClose={DropDownClose}>
                <MenuItem
                  onClick={() => {
                    setOpenContractForm(true);
                    DropDownClose();
                  }}
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0px",
                    verticalAlign: "middle",
                    color: "#000000",
                    "&:hover": {
                      backgroundColor: "#2268E9",
                      color: "#fff",
                    },
                  }}
                >
                  Edit
                </MenuItem>
              </Menu>
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
          {/* <Stepper
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
                xl: "60%",
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
          </Stepper> */}

          <Box>
            <Box mb={3}>
              <CardSection
                title="MSA Information"
                showArrow
                // headerActionLabel={
                //   <>
                //     <img src={EditSvg} alt="Edit" width={10} height={12} />
                //     &nbsp; Edit
                //   </>
                // }
                // onHeaderActionClick={() => setMSAmodalOpen(true)}
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
                    <Typography sx={commonLabelStyle}>MSA Code</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.msaCode}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2 }}>
                    <Typography sx={commonLabelStyle}>MSA Titel</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.msaTitle}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 3 }}>
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
                    <Typography sx={commonLabelStyle}>Project Code</Typography>
                    <Typography sx={commonValueStyle}>
                      {msaInfo.projectCode}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2 }}>
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
                  <Grid size={{ xs: 6, sm: 4, md: 3.2, lg: 2.9, xl: 2.4 }}>
                    <Typography
                      sx={{
                        color: "#061445",
                        fontSize: "13px",
                        fontWeight: 600,
                      }}
                    >
                      Audit Plan
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2 }}>
                    <Typography sx={commonLabelStyle}>
                      VCCA | Audit Plan Code
                    </Typography>
                    <Typography sx={commonValueStyle}>{"02"}</Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2 }}>
                    <Typography sx={commonLabelStyle}>
                      VCC Review Period
                    </Typography>
                    <Typography sx={commonValueStyle}>
                      {"12-11-2015 To 15-12-2025"}
                    </Typography>
                  </Grid>
                </Grid>
              </CardSection>
            </Box>

            <Box mb={2}>
              <CardSection
                title="Audit Observation Reference | Supporting Obligation (OB Register)"
                showArrow
                headerActionLabel="+Add New Observation"
                onHeaderActionClick={() => setObservationModal(true)}
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
                  </Box>

                  <Box sx={{ overflowX: "auto" }}>
                    <Box sx={{ minWidth: 800 }}>
                      <TableSection
                        headers={[
                          "OB#",
                          "DOMAIN",
                          "SCHEDULE",
                          "SEC#",
                          "CLAUSE#",
                          "DOC TYPE",
                          "SEVERITY",
                          "FREQUENCY",
                          "ACCOUNTABILITY",
                          "VIEW",
                        ]}
                        rows={[]}
                        onRowClick={(row) => console.log("Row Click", row)}
                        // onEdit={(row) => console.log("Edit", row)}
                        // onDelete={(row) => console.log("Delete", row)}
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
                    {/* <Pagination
                        count={Math.ceil(totalCount / rowsPerPage)} // e.g., 173 / 10 = 18 pages
                        page={currentPage}
                        onChange={(e, page) => setCurrentPage(page)}
                        size="small"
                      /> */}
                  </Box>
                </Box>
              </CardSection>
            </Box>
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
              {/* {activeStep !== 0 && ( */}
              {/* // <Button */}
              {/* //   sx={{ */}
              {/* //     border: "1px solid #2268E9",
              //     fontSize: "13px",
              //     fontWeight: 400,
              //     backgroundColor: "#FFFFFF",
              //     color: "#2268E9",
              //     borderRadius: "6px",
              //   }}
              //   onClick={handleBack} */}
              {/* // > */}
              {/* //   {"<"} Previous */}
              {/* // </Button> */}
              {/* // )} */}

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

        {/* <Box
          sx={{
            borderTop: "1px solid #F3F3F3",
            backgroundColor: "#fff",
            px: 2,
            py: 2,
            boxShadow: "0px -2px 2px 0px #D3D6E14D",
          }}
        >
          <Box display="flex" justifyContent="flex-start" gap={2}>
            {/* {activeStep !== 0 && ( */}
        {/* // <Button */}
        {/* //   sx={{ */}
        {/* //     border: "1px solid #2268E9",
              //     fontSize: "13px",
              //     fontWeight: 400,
              //     backgroundColor: "#FFFFFF",
              //     color: "#2268E9",
              //     borderRadius: "6px",
              //   }}
              //   onClick={handleBack} */}
        {/* // > */}
        {/* //   {"<"} Previous */}
        {/* // </Button> */}
        {/* // )} */}

        {/* <Button
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
          </Box> */}
        {/* </Box>  */}
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
            <Select fullWidth defaultValue="" size="small" sx={{ ml: 5 }}>
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="India">India</MenuItem>
            </Select>
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>MSA Code</Typography>
            <TextField
              fullWidth
              placeholder=""
              value="ALG-GLOBAL-MSA-1093"
              sx={{ ml: 5 }}
            />
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>MSA Titel</Typography>
            <TextField
              fullWidth
              placeholder=""
              value="IT ADM SERIVE  FOR UK"
              sx={{ ml: 5 }}
            />
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>MSA Duration</Typography>
            <TextField
              fullWidth
              placeholder=""
              value="10/01/2021  To  09/03/2024"
              sx={{ ml: 5 }}
            />
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>Project Code</Typography>
            <TextField
              fullWidth
              placeholder=""
              value="ALG-GLOBAL-MSA-PRO-10023"
              sx={{ ml: 5 }}
            />
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>Project Name</Typography>
            <TextField
              fullWidth
              placeholder=""
              value="IT ADM Service"
              sx={{ ml: 5 }}
            />
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>Audit Plan Code</Typography>
            <TextField fullWidth placeholder="" value="" sx={{ ml: 4 }} />
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>Audit Plan Duration</Typography>
            <TextField fullWidth placeholder="" value="" sx={{ ml: 1.5 }} />
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

      {/* Bussiness Case Modal */}
      <ModalSection
        title="Business Case & Projects"
        open={BussinessCaseModalOpen}
        onClose={() => setBussinessCaseModalOpen(false)}
      >
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
            <TextField
              onChange={() => {}}
              sx={{ ...adornmentRightStyle, width: "250px" }}
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end" sx={{ bgcolor: "#F7F7FF" }}>
                    Years
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "200px" }}>
              Project | NPV | Invest Rate
            </Typography>
            <TextField
              onChange={() => {}}
              sx={{ ...adornmentRightStyle, width: "250px" }}
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end" sx={{ bgcolor: "#F7F7FF" }}>
                    %
                  </InputAdornment>
                ),
              }}
            />
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

          <Box mb={3} mt={3} display="flex" alignItems="center" flexWrap="wrap">
            <Typography
              sx={{
                ...commonLabelStyle,
                width: "200px",
                mr: 4,
              }}
            >
              First time Investment
            </Typography>

            <TextField
              variant="outlined"
              onChange={() => {}}
              sx={{ ...CompactInputs, borderRight: "none" }}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start" sx={{ bgcolor: "#F7F7FF" }}>
                    In
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              variant="outlined"
              onChange={() => {}}
              sx={CompactInputs}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start" sx={{ bgcolor: "#F7F7FF" }}>
                    In
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" flexWrap="wrap">
            <Typography
              sx={{
                ...commonLabelStyle,
                width: "200px",
                mr: 4,
              }}
            >
              Recurring Investment | Year 1
            </Typography>

            {/* First Input */}
            <TextField
              variant="outlined"
              onChange={() => {}}
              sx={CompactInputs}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start" sx={{ bgcolor: "#F7F7FF" }}>
                    In
                  </InputAdornment>
                ),
              }}
            />

            {/* Second Input */}
            <TextField
              variant="outlined"
              onChange={() => {}}
              sx={{ ...CompactInputs, borderRight: "none" }}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start" sx={{ bgcolor: "#F7F7FF" }}>
                    In
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" flexWrap="wrap">
            <Typography
              sx={{
                ...commonLabelStyle,
                width: "200px",
                mr: 4,
              }}
            >
              Recurring Investment | Year 2
            </Typography>

            {/* First Input */}
            <TextField
              variant="outlined"
              onChange={() => {}}
              sx={{ ...CompactInputs, borderRight: "none" }}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start" sx={{ bgcolor: "#F7F7FF" }}>
                    In
                  </InputAdornment>
                ),
              }}
            />

            {/* Second Input */}
            <TextField
              variant="outlined"
              onChange={() => {}}
              sx={CompactInputs}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start" sx={{ bgcolor: "#F7F7FF" }}>
                    In
                  </InputAdornment>
                ),
              }}
            />
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
        title="New Process"
        open={processmodalOpen}
        onClose={() => setProcessModalOpen(false)}
      >
        <Box sx={{ px: 3.5, py: 3.5 }}>
          <Box mb={3} mt={1} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "150px" }}>
              Domain Name
            </Typography>
            <TextField Select fullWidth placeholder="" value="" />
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "150px" }}>
              Process and <br /> Procedures Reviewed
            </Typography>

            <TextareaAutosize
              minRows={6}
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                borderRadius: "4px",
                border: "1px solid rgba(0, 0, 0, 0.23)",
                resize: "vertical", // allows user to resize
                // height:'100%'
              }}
            />
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "150px" }}>
              Duration
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
              onClick={() => setProcessModalOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </ModalSection>

      <ModalSection
        title="New Stockholder"
        open={stockholdermodalopen}
        onClose={() => setStockholdermodalopen(false)}
      >
        <Box sx={{ px: 3.5, py: 3.5 }}>
          <Box mb={3} mt={1} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "150px" }}>
              Internal stakeholder Name
            </Typography>
            <TextField fullWidth placeholder="" value="" />
          </Box>
          <Box mb={3} mt={1} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "150px" }}>
              External stakeholder Name
            </Typography>
            <TextField fullWidth placeholder="" value="" />
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "150px" }}>
              Stakeholder Designation
            </Typography>
            <TextField fullWidth placeholder="" value="" />
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "150px" }}>
              Stakeholder Company
            </Typography>
            <TextField fullWidth placeholder="" value="" />
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "150px" }}>
              Contact Details
            </Typography>
            <TextField fullWidth placeholder="" value="" />
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "150px" }}>
              Stakeholder's Email
            </Typography>
            <TextField fullWidth placeholder="" value="" />
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={{ ...commonLabelStyle, width: "150px" }}>
              Interviewed Duration
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
              onClick={() => setStockholdermodalopen(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </ModalSection>


        {/* Add Supporting Document Modal */}
       <ModalSection
        title="Add Supporting Documents"
        open={Supportingdocumentmodal}
        onClose={handleCloseforSupportingDocument}
      >
        <Box>
          <Grid container spacing={2} sx={{ p: 3 }}>
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
                Document Name | Title
              </Typography>
              <TextField fullWidth placeholder="" value="" />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6 }} gap={2}>
              <Typography sx={{ ...commonLabelStyle }}>
                Document Version
              </Typography>

              <Box display="flex" gap={2}>
                <Select
                  defaultValue="select"
                  size="small"
                  fullWidth={false}
                  sx={{
                    width: "180px !important", // direct width for select
                    minWidth: "0 !important",
                  }}
                >
                  <MenuItem value="select">Select</MenuItem>
                  <MenuItem value=""></MenuItem>
                </Select>

                <TextField
                  placeholder=""
                  value=""
                  fullWidth={false}
                  sx={{
                    "& .MuiInputBase-root": {
                      width: "80px !important",
                      minWidth: "0 !important",
                    },
                  }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Document Date
              </Typography>
              <SingleDatePicker
                value={DocDate}
                onChange={(newDate) => setDocDate(newDate)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Document File Name
              </Typography>
              <TextField fullWidth placeholder="" value="" />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Document Upload Date
              </Typography>
              <SingleDatePicker
                value={DocUploadDate}
                onChange={(newDate) => setDocUploadDate(newDate)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Document Upload Status
              </Typography>
              <Select fullWidth defaultValue="select" size="small">
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value=""></MenuItem>
              </Select>
            </Grid>

            {/* <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Divider
                sx={{
                  borderStyle: "dashed",
                  borderColor: "#E5E5E5",
                  borderWidth: "1px",
                  my: 1,
                }}
              />
            </Grid> */}

            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Document Descriptions
              </Typography>
              <TextField fullWidth multiline rows={5} placeholder="" value="" />
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

            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <Typography sx={{ ...commonLabelStyle }}>Attachments</Typography>
              <FileUploadSection onFilesSelected={handleFilesSelected} />
            </Grid>

            <Typography sx={{fontSize:'10px'}}>Supported format : Jpeg,jpg or Pdf</Typography>

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

                  onClick={UploadDocument}
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
                  onClick={handleCloseforSupportingDocument}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ModalSection>

      {/* Add Document Modal */}

      <Dialog fullScreen open={ObservationModal} onClose={handleClose}>
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
              New Observation
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
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Main Content */}

            <Box>
              <Box mb={3}></Box>

              {/* MSA Information Section */}

              <Box mb={3}>
                <CardSection
                  title="MSA Information"
                  showArrow
                  // headerActionLabel={
                  //   <>
                  //     <img src={EditSvg} alt="Edit" width={10} height={12} />
                  //     &nbsp; Edit
                  //   </>
                  // }
                  onHeaderActionClick={() => setMSAmodalOpen(true)}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid>
                      <img src={personSvg} alt="" srcset="" />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2, xl: 2 }}>
                      <Typography sx={commonNameStyle}>{"--"}</Typography>
                      <Typography mt={1} sx={commonLabelStyle}>
                        Supplier Name
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>MSA Code</Typography>
                      <Typography sx={commonValueStyle}>{"--"}</Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>MSA Titel</Typography>
                      <Typography sx={commonValueStyle}>{"--"}</Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        MSA Duration
                      </Typography>
                      <Typography sx={commonValueStyle}>{"--"}</Typography>
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
                      <Typography sx={commonValueStyle}>{"--"}</Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        Project Name
                      </Typography>
                      <Typography sx={commonValueStyle}>{"--"}</Typography>
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
                        Audit plan
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        VCCA | Audit Plan Code
                      </Typography>
                      <Typography sx={commonValueStyle}>{"--"}</Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        VCC | Review period
                      </Typography>
                      <Typography sx={commonValueStyle}>{"--"}</Typography>
                    </Grid>
                  </Grid>
                </CardSection>
              </Box>

              {/* Audit Observation Reference  obligation Reference*/}

              <Box mb={3} sx={{ width: "100%", maxWidth: "100vw", px: 0 }}>
                <CardSection
                  title="Audit Observation Reference | Obligation Reference (TNC)"
                  showArrow
                >
                  <Grid container spacing={2} sx={{ width: "100%" }}>
                    <Grid item xs={12}>
                      <Grid container spacing={2} sx={{ width: "100%" }}>
                        {/* Field 1 */}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={4}
                          sx={{ minWidth: "350px" }}
                        >
                          <Typography sx={{ ...commonLabelStyle, mb: 1 }}>
                            MSA | SOW | Schedule #
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder=""
                            value=""
                            sx={{
                              backgroundColor: "#fff",
                              "& .MuiOutlinedInput-root": {
                                height: "40px",
                              },
                              width: "100%",
                            }}
                          />
                        </Grid>

                        {/* Field 2 */}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={4}
                          sx={{ minWidth: "360px" }}
                        >
                          <Typography sx={{ ...commonLabelStyle, mb: 1 }}>
                            MSA | SOW | Section #
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder=""
                            value=""
                            sx={{
                              backgroundColor: "#fff",
                              "& .MuiOutlinedInput-root": {
                                height: "40px",
                              },
                              width: "100%",
                            }}
                          />
                        </Grid>

                        {/* Field 3 */}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={4}
                          sx={{ minWidth: "350px" }}
                        >
                          <Typography sx={{ ...commonLabelStyle, mb: 1 }}>
                            MSA | SOW | Clause #
                          </Typography>
                          <Select
                            fullWidth
                            size="small"
                            sx={{
                              backgroundColor: "#fff",
                              height: "40px",
                              width: "100%",
                              "& .MuiSelect-select": {
                                display: "flex",
                                alignItems: "center",
                              },
                            }}
                          >
                            {/* Menu items */}
                          </Select>
                        </Grid>

                        {/* Field 4 */}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={4}
                          sx={{ minWidth: "350px" }}
                        >
                          <Typography sx={{ ...commonLabelStyle, mb: 1 }}>
                            Severity
                          </Typography>
                          <Select
                            fullWidth
                            size="small"
                            sx={{
                              backgroundColor: "#fff",
                              height: "40px",
                              width: "100%",
                              "& .MuiSelect-select": {
                                display: "flex",
                                alignItems: "center",
                              },
                            }}
                          >
                            {/* Menu items */}
                            <MenuItem>Select</MenuItem>
                          </Select>
                        </Grid>

                        {/* Field 5 */}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={4}
                          sx={{ minWidth: "350px" }}
                        >
                          <Typography sx={{ ...commonLabelStyle, mb: 1 }}>
                            Frequency
                          </Typography>
                          <Select
                            fullWidth
                            size="small"
                            sx={{
                              backgroundColor: "#fff",
                              height: "40px",
                              width: "100%",
                              "& .MuiSelect-select": {
                                display: "flex",
                                alignItems: "center",
                              },
                            }}
                          >
                            {/* Menu items */}
                          </Select>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardSection>
              </Box>

              {/* Observation | Risk Information */}

              <Box mb={3} sx={{ width: "100%", maxWidth: "100vw", px: 0 }}>
                <CardSection title="Observation | Risk Information" showArrow>
                  <Grid container spacing={2} sx={{ width: "100%" }}>
                    <Grid item xs={12}>
                      <Grid container spacing={2} sx={{ width: "100%" }}>
                        {/* Field 1 */}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={4}
                          sx={{ minWidth: "350px" }}
                        >
                          <Typography sx={{ ...commonLabelStyle, mb: 1 }}>
                            Domain
                          </Typography>
                          <Select
                            fullWidth
                            size="small"
                            sx={{
                              backgroundColor: "#fff",
                              height: "40px",
                              width: "100%",
                              "& .MuiSelect-select": {
                                display: "flex",
                                alignItems: "center",
                              },
                            }}
                          >
                            {/* Menu items */}
                          </Select>
                        </Grid>

                        {/* Field 2 */}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={4}
                          sx={{ minWidth: "360px" }}
                        >
                          <Typography sx={{ ...commonLabelStyle, mb: 1 }}>
                            Key Process Area
                          </Typography>
                          <Select
                            fullWidth
                            size="small"
                            sx={{
                              backgroundColor: "#fff",
                              height: "40px",
                              width: "100%",
                              "& .MuiSelect-select": {
                                display: "flex",
                                alignItems: "center",
                              },
                            }}
                          >
                            {/* Menu items */}
                          </Select>
                        </Grid>

                        {/* Field 3 */}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={4}
                          sx={{ minWidth: "350px" }}
                        >
                          <Typography sx={{ ...commonLabelStyle, mb: 1 }}>
                            Risk Area
                          </Typography>
                          <Select
                            fullWidth
                            size="small"
                            sx={{
                              backgroundColor: "#fff",
                              height: "40px",
                              width: "100%",
                              "& .MuiSelect-select": {
                                display: "flex",
                                alignItems: "center",
                              },
                            }}
                          >
                            {/* Menu items */}
                          </Select>
                        </Grid>

                        {/* Field 4 */}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={4}
                          sx={{ minWidth: "350px" }}
                        >
                          <Typography sx={{ ...commonLabelStyle, mb: 1 }}>
                            MSA Scedule
                          </Typography>
                          <Select
                            fullWidth
                            size="small"
                            sx={{
                              backgroundColor: "#fff",
                              height: "40px",
                              width: "100%",
                              "& .MuiSelect-select": {
                                display: "flex",
                                alignItems: "center",
                              },
                            }}
                          >
                            {/* Menu items */}
                          </Select>
                        </Grid>

                        {/* Field 5 */}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={4}
                          sx={{ minWidth: "350px" }}
                        >
                          <Typography sx={{ ...commonLabelStyle, mb: 1 }}>
                            Risk | Likeihood
                          </Typography>
                          <Select
                            fullWidth
                            size="small"
                            sx={{
                              backgroundColor: "#fff",
                              height: "40px",
                              width: "100%",
                              "& .MuiSelect-select": {
                                display: "flex",
                                alignItems: "center",
                              },
                            }}
                          >
                            {/* Menu items */}
                          </Select>
                        </Grid>

                        {/* Field 6 */}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={4}
                          sx={{ minWidth: "350px" }}
                        >
                          <Typography sx={{ ...commonLabelStyle, mb: 1 }}>
                            Risk | Impact
                          </Typography>
                          <Select
                            fullWidth
                            size="small"
                            sx={{
                              backgroundColor: "#fff",
                              height: "40px",
                              width: "100%",
                              "& .MuiSelect-select": {
                                display: "flex",
                                alignItems: "center",
                              },
                            }}
                          >
                            {/* Menu items */}
                          </Select>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardSection>
              </Box>

              {/* Audit Observation  | Non compliance Category */}

              <Box mb={3}>
                <CardSection
                  title="Audit Observation | Non Compliance (NCR) category"
                  showArrow
                >
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                      {/* <Divider
                        sx={{
                          borderStyle: "dashed",
                          borderColor: "#E5E5E5",
                          borderWidth: "1px",
                          my: 2,
                        }}
                      /> */}

                      {/* First row with Scope and Audit Title */}
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                          <Typography sx={{ ...commonLabelStyle }}>
                            VCCA | Audit Observation Description
                          </Typography>
                          <TextField
                            fullWidth
                            multiline
                            minRows={10}
                            placeholder="Enter details here..."
                            sx={{
                              "& .MuiInputBase-root": {
                                height: "200px",
                                alignItems: "flex-start",
                                width: "100%",
                                mt: 1,
                              },
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                          <Typography sx={{ ...commonLabelStyle }}>
                            Alternate Analysis
                          </Typography>
                          <TextField
                            fullWidth
                            multiline
                            minRows={10}
                            placeholder="Enter details here..."
                            sx={{
                              "& .MuiInputBase-root": {
                                height: "200px",
                                alignItems: "flex-start",
                                width: "100%",
                                mt: 1,
                              },
                            }}
                          />
                        </Grid>
                      </Grid>

                      {/* Second divider - placed after the first row */}
                      {/* <Divider
                        sx={{
                          borderStyle: "dashed",
                          borderColor: "#E5E5E5",
                          borderWidth: "1px",
                          my: 2,
                        }}
                      />
               */}

                      <Grid container spacing={2} sx={{ width: "100%", mt: 2 }}>
                        {/* Field 1 */}
                        <Grid item xs={12} md={12}>
                          <Typography sx={{ ...commonLabelStyle, mb: 1 }}>
                            Audit Observation Impact
                          </Typography>
                          <Select
                            fullWidth
                            size="small"
                            sx={{
                              backgroundColor: "#fff",
                              height: "40px",
                              width: "450px",
                              "& .MuiSelect-select": {
                                display: "flex",
                                alignItems: "center",
                              },
                            }}
                          >
                            {/* Menu items */}
                          </Select>
                        </Grid>

                        {/* Field 2 */}
                        <Grid item xs={12} md={6}>
                          <Typography sx={{ ...commonLabelStyle, mb: 1 }}>
                            Observation | Open date
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            sx={{
                              backgroundColor: "#fff",
                              width: "450px",
                              "& .MuiOutlinedInput-root": { height: "40px" },
                            }}
                          />
                        </Grid>

                        {/* Field 3 */}
                        <Grid item xs={12} md={6}>
                          <Typography sx={{ ...commonLabelStyle, mb: 1 }}>
                            Non Compliance (NCR) category (Y/N)
                          </Typography>
                          <Select
                            fullWidth
                            size="small"
                            sx={{
                              backgroundColor: "#fff",
                              height: "40px",
                              width: "450px",
                              "& .MuiSelect-select": {
                                display: "flex",
                                alignItems: "center",
                              },
                            }}
                          >
                            {/* Menu items */}
                          </Select>
                        </Grid>

                        {/* Field 4 */}
                        <Grid item xs={12} md={6}>
                          <Typography sx={{ ...commonLabelStyle, mb: 1 }}>
                            NCR Category Name
                          </Typography>
                          <Select
                            fullWidth
                            size="small"
                            sx={{
                              backgroundColor: "#fff",
                              height: "40px",
                              width: "450px",
                              "& .MuiSelect-select": {
                                display: "flex",
                                alignItems: "center",
                              },
                            }}
                          >
                            <MenuItem>Select</MenuItem>
                          </Select>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardSection>
              </Box>

              {/* Issue | Risk | Cost Recovery | Action Plan | Audit Recommendations */}
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box mb={3}>
                  <CardSection
                    title="Issue | Risk | Cost Recovery | Action Plan | Audit Recommendations"
                    showArrow
                  >
                    {/* <Box sx={{display:'grid'}}> */}

                    <Grid container spacing={4}>
                      {/* --- Group 1: Radio Groups --- */}
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          {/* Radio 1 */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                minWidth: "280px",
                              }}
                            >
                              Observation | Issue Indicator (Y/N)
                            </Typography>
                            <RadioGroup
                              row
                              value={formData.issueIndicator}
                              onChange={handleRadioChange("issueIndicator")}
                              sx={{ gap: 2 }}
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio size="small" />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio size="small" />}
                                label="No"
                              />
                            </RadioGroup>
                          </Box>

                          {/* Radio 2 */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                minWidth: "280px",
                              }}
                            >
                              Observation | Risk Indicator (Y/N)
                            </Typography>
                            <RadioGroup
                              row
                              value={formData.riskIndicator}
                              onChange={handleRadioChange("riskIndicator")}
                              sx={{ gap: 2 }}
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio size="small" />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio size="small" />}
                                label="No"
                              />
                            </RadioGroup>
                          </Box>

                          {/* Radio 3 */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                minWidth: "280px",
                              }}
                            >
                              Observation | Cost Recovery Indicator (Y/N)
                            </Typography>
                            <RadioGroup
                              row
                              value={formData.costRecoveryIndicator}
                              onChange={handleRadioChange(
                                "costRecoveryIndicator"
                              )}
                              sx={{ gap: 2 }}
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio size="small" />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio size="small" />}
                                label="No"
                              />
                            </RadioGroup>
                          </Box>
                        </Box>
                      </Grid>

                      {/* --- Group 2: Date Pickers --- */}
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          {/* Date Picker 1 */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                minWidth: "280px",
                              }}
                            >
                              Observation Due Date
                            </Typography>
                            <DatePicker
                              value={formData.observationDueDate}
                              onChange={handleDateChange("observationDueDate")}
                              slotProps={{
                                textField: { size: "small", fullWidth: false },
                              }}
                            />
                          </Box>

                          {/* Date Picker 2 */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                minWidth: "280px",
                              }}
                            >
                              Expected Action Plan Closure Date
                            </Typography>
                            <DatePicker
                              value={formData.expectedActionPlanDate}
                              onChange={handleDateChange(
                                "expectedActionPlanDate"
                              )}
                              slotProps={{
                                textField: { size: "small", fullWidth: false },
                              }}
                            />
                          </Box>
                        </Box>
                      </Grid>

                      {/* --- Group 3: Text Areas --- */}
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          {/* TextArea 1 */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 3,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                minWidth: "280px",
                              }}
                            >
                              Issue | Risk Mitigation Action Plan
                            </Typography>
                            <TextField
                              multiline
                              rows={4}
                              fullWidth
                              value={formData.issueMitigationPlan}
                              onChange={handleTextChange("issueMitigationPlan")}
                            />
                          </Box>

                          {/* TextArea 2 */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 3,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                minWidth: "280px",
                              }}
                            >
                              Audit Recommendations
                            </Typography>
                            <TextField
                              multiline
                              rows={4}
                              fullWidth
                              value={formData.auditRecommendations}
                              onChange={handleTextChange(
                                "auditRecommendations"
                              )}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* </Box> */}
                  </CardSection>
                </Box>
              </LocalizationProvider>


              {/* Supporting Documents */}
               <Box mb={2}>
                              <CardSection
                                title="Supporting Documents"
                                showArrow
                                headerActionLabel="+Add Document"
                                onHeaderActionClick={() => setSupportingDocumentModal(true)}
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
                                  </Box>
              
                                  <Box sx={{ overflowX: "auto" }}>
                                    <Box sx={{ minWidth: 800 }}>
                                      <TableSection
                                        headers={[
                                          "MSA ID",
                                          "DOCUMENT TYPE",
                                          "DOCUMENT NAME",
                                          "VERSION",
                                          "DOCUMENT DATE",
                                          "ATTACHMENTS",
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
                                    {/* <Pagination
                                      count={Math.ceil(totalCount / rowsPerPage)} // e.g., 173 / 10 = 18 pages
                                      page={currentPage}
                                      onChange={(e, page) => setCurrentPage(page)}
                                      size="small"
                                    /> */}
                                  </Box>
                                </Box>
                              </CardSection>
                            </Box>


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
                        {/* {activeStep !== 0 && ( */}
                          {/* // <Button */}
                          {/* //   sx={{ */}
                          {/* //     border: "1px solid #2268E9",
                          //     fontSize: "13px",
                          //     fontWeight: 400,
                          //     backgroundColor: "#FFFFFF",
                          //     color: "#2268E9",
                          //     borderRadius: "6px",
                          //   }}
                          //   onClick={handleBack} */}
                          {/* // > */}
                          {/* //   {"<"} Previous */}
                          {/* // </Button> */}
                        {/* // )} */}
            
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
                          Save Observation
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

            {/* Footer */}
            {/* <Box
              sx={{
                p: 1.5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                boxShadow: "0px -1px 4px 0px #00000040",
                backgroundColor: "#fff",
              }}
            >
              
            </Box> */}
          </Box>

          {/* Right: Form */}
        </Box>
      </Dialog>


      
    
    </Box>
    
</>
  );


};

export default CCNObservationAddEdit;
