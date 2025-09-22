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

import MoreIcon from "../assets/oblication-icon/moreIcon.svg";
import ContractForm from "./ContractForm";
import FileUpload from "../components/FileUpload";

const steps = ["Issue", "Risk", "Cost saving | Recovery","Summary"];
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

const CCNObservationIssueRisk = () => {
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
  const [Supportingdocumentmodal,setSupportingDocumentModal] = useState(false)
  const [riskDetailsmodalOpen, setRiskDetailsModalOpen] = useState(false);
  const [costsavingdetailmodalOpen, setCostSavingDetailModalOpen] =
    useState(false);
  const [issueDetailsmodalopen, setissueDetailsModalOpen] = useState(false);
  const [stockholdermodalopen, setStockholdermodalopen] = useState(false);
  const [BussinessCaseModalOpen, setBussinessCaseModalOpen] = useState(false);
  const [contractdocumentmodal, setContractDocumentsModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const [DocumentModalopen, setDocumentModal] = useState(false);
  const [fileUrl, setFileUrl] = useState(""); // default PDF
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const fileInputRef = useRef(null);

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
                md: "40%",
                lg: "40%",
                xl: "25%",
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
              <Box mb={3}></Box>

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
                      <Typography sx={commonNameStyle}>{"--"}</Typography>
                      <Typography mt={1} sx={commonLabelStyle}>
                        Supplier Name
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>MSA Titel</Typography>
                      <Typography sx={commonValueStyle}>
                        {"IT ADM Service FOR UK"}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>MSA Code</Typography>
                      <Typography sx={commonValueStyle}>
                        {"ALZ-Global-MSA-1000"}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        MSA Duration
                      </Typography>
                      <Typography sx={commonValueStyle}>
                        {"10-01-2025 To 12-31-2025"}
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
                        {"ALZ-GLOBAL-MSA-PROJ-1000-1"}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        Project Name
                      </Typography>
                      <Typography sx={commonValueStyle}>
                        {"IT ADM Service"}
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
                        Audit plan
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        Audit Plan Code
                      </Typography>
                      <Typography sx={commonValueStyle}>{"--"}</Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        VCCA | Review Period
                      </Typography>
                      <Typography sx={commonValueStyle}>{"--"}</Typography>
                    </Grid>
                  </Grid>
                </CardSection>
              </Box>

              {/* Vcca Observation First */}

              <Box mb={2}>
                <CardSection
                  title="VCCA Observation | Issue - pending"
                  showArrow
                  headerActionLabel="+Add New Process"
                  //   onHeaderActionClick={() => setProcessModalOpen(true)}
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
                            "RISK AREA",
                            "NCR CATEGORY",
                            "IMPACT",
                            "ISSUE (Y/N)",
                            "RISK (Y/N)",
                            "COST (Y/N)",
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

              {/* Vcca Observation Second */}
              <Box mb={2}>
                <CardSection
                  title="VCCA Observation | Issue - pending"
                  showArrow
                  headerActionLabel="+Add Issue Details"
                  onHeaderActionClick={() => setissueDetailsModalOpen(true)}
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
                            "ISSUE",
                            "RISK AREA",
                            "NCR CATEGORY",
                            "IMPACT",
                            "ISSUE (Y/N)",
                            "ISSUES SCORE",
                            "FIN IMPACT VALUE",
                            "VIEW",
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
          )}

          {activeStep === 1 && (
            <Box>
              <Box mb={3}></Box>

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
                      <Typography sx={commonNameStyle}>{"--"}</Typography>
                      <Typography mt={1} sx={commonLabelStyle}>
                        Supplier Name
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>MSA Titel</Typography>
                      <Typography sx={commonValueStyle}>
                        {"IT ADM Service FOR UK"}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>MSA Code</Typography>
                      <Typography sx={commonValueStyle}>
                        {"ALZ-Global-MSA-1000"}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        MSA Duration
                      </Typography>
                      <Typography sx={commonValueStyle}>
                        {"10-01-2025 To 12-31-2025"}
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
                        {"ALZ-GLOBAL-MSA-PROJ-1000-1"}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        Project Name
                      </Typography>
                      <Typography sx={commonValueStyle}>
                        {"IT ADM Service"}
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
                        Audit plan
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        Audit Plan Code
                      </Typography>
                      <Typography sx={commonValueStyle}>{"--"}</Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        VCCA | Review Period
                      </Typography>
                      <Typography sx={commonValueStyle}>{"--"}</Typography>
                    </Grid>
                  </Grid>
                </CardSection>
              </Box>

              {/* Vcca Observation First */}

              <Box mb={2}>
                <CardSection
                  title="VCCA Observation | Risk - pending"
                  showArrow
                  headerActionLabel="+Add New Process"
                  //   onHeaderActionClick={() => setProcessModalOpen(true)}
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
                            "RISK AREA",
                            "NCR CATEGORY",
                            "IMPACT",
                            "ISSUE (Y/N)",
                            "RISK (Y/N)",
                            "COST (Y/N)",
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

              {/* Vcca Observation Second */}
              <Box mb={2}>
                <CardSection
                  title="VCCA Observation | Risk - pending"
                  showArrow
                  headerActionLabel="+Add Risk Details"
                  onHeaderActionClick={() => setRiskDetailsModalOpen(true)}
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
                            "RISK#",
                            "RISK AREA",
                            "NCR CATEGORY",
                            "IMPACT",
                            "RISK (Y/S)",
                            "RISK SCORE",
                            "FIN IMPACT VALUE",
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
          )}

          {activeStep === 2 && (
            <Box>
              <Box mb={3}></Box>

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
                      <Typography sx={commonNameStyle}>{"--"}</Typography>
                      <Typography mt={1} sx={commonLabelStyle}>
                        Supplier Name
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>MSA Titel</Typography>
                      <Typography sx={commonValueStyle}>
                        {"IT ADM Service FOR UK"}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>MSA Code</Typography>
                      <Typography sx={commonValueStyle}>
                        {"ALZ-Global-MSA-1000"}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        MSA Duration
                      </Typography>
                      <Typography sx={commonValueStyle}>
                        {"10-01-2025 To 12-31-2025"}
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
                        {"ALZ-GLOBAL-MSA-PROJ-1000-1"}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        Project Name
                      </Typography>
                      <Typography sx={commonValueStyle}>
                        {"IT ADM Service"}
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
                        Audit plan
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        Audit Plan Code
                      </Typography>
                      <Typography sx={commonValueStyle}>{"--"}</Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        VCCA | Review Period
                      </Typography>
                      <Typography sx={commonValueStyle}>{"--"}</Typography>
                    </Grid>
                  </Grid>
                </CardSection>
              </Box>

              {/* Vcca Observation First */}

              <Box mb={2}>
                <CardSection
                  title="VCCA Observation | Costsaving - pending"
                  showArrow
                  headerActionLabel="+Add New Process"
                  //   onHeaderActionClick={() => setProcessModalOpen(true)}
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
                            "RISK AREA",
                            "NCR CATEGORY",
                            "IMPACT",
                            "ISSUE (Y/N)",
                            "RISK (Y/N)",
                            "COST (Y/N)",
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

              {/* Vcca Observation Second */}
              <Box mb={2}>
                <CardSection
                  title="VCCA Observation | Costsaving - pending"
                  showArrow
                  headerActionLabel="+Add Costsaving Details"
                  onHeaderActionClick={() => setCostSavingDetailModalOpen(true)}
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
                            "COST SAVING#",
                            "RISK AREA",
                            "NCR CATEGORY",
                            "IMPACT",
                            "COST (Y/S)",
                            "DUE DATE", 
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
          )}

           {activeStep === 3 && (
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
                      <Typography sx={commonLabelStyle}>MSA Titel</Typography>
                      <Typography sx={commonValueStyle}>
                        {"IT ADM Service FOR UK"}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>MSA Code</Typography>
                      <Typography sx={commonValueStyle}>
                        {"ALZ-Global-MSA-1000"}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        MSA Duration
                      </Typography>
                      <Typography sx={commonValueStyle}>
                        {"10-01-2025 To 12-31-2025"}
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
                        {"ALZ-GLOBAL-MSA-PROJ-1000-1"}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        Project Name
                      </Typography>
                      <Typography sx={commonValueStyle}>
                        {"IT ADM Service"}
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
                        Audit plan
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        Audit Plan Code
                      </Typography>
                      <Typography sx={commonValueStyle}>{"--"}</Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2.5 }}>
                      <Typography sx={commonLabelStyle}>
                        VCCA | Review Period
                      </Typography>
                      <Typography sx={commonValueStyle}>{"--"}</Typography>
                    </Grid>
                  </Grid>
                </CardSection>
              </Box>

              {/* Vcca Observation First */}

              <Box mb={2}>
                <CardSection
                  title="List of Table Data Will be Displayed"
                  showArrow
                  headerActionLabel="+Add New Process"
                  //   onHeaderActionClick={() => setProcessModalOpen(true)}
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
                            "RISK AREA",
                            "NCR CATEGORY",
                            "IMPACT",
                            "ISSUE (Y/N)",
                            "RISK (Y/N)",
                            "COST (Y/N)",
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

              {/* Vcca Observation Second */}
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
                            "OB#",
                            "ISSUE",
                            "RISK AREA",
                            "NCR CATEGORY",
                            "IMPACT",
                            "ISSUE (Y/N)",
                            "ISSUES SCORE",
                            "FIN IMPACT VALUE",
                            "VIEW",
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

      {/* Issue Details Modal */}

      <ModalSection
        title="Add Issue Details"
        open={issueDetailsmodalopen}
        onClose={() => setissueDetailsModalOpen(false)}
      >
        <Box
          sx={{
            width: "600px",
            p: "2px",
            bgcolor: "#fff",
            borderLeft: "1px solid #ddd",
          }}
        >
          <Grid container spacing={2} sx={{ p: 3 }}>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>Issue ID</Typography>
              <TextField fullWidth placeholder="" value="" />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Issue | Date Raised
              </Typography>
              <TextField fullWidth placeholder="" value="" />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Issue | Due Date
              </Typography>
              <TextField fullWidth placeholder="" value="" />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Issue | Priority
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
                    </Grid>
       */}
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Issue | Category
              </Typography>
              <Select fullWidth defaultValue="select" size="small">
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value=""></MenuItem>
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Regulatory Impact Indicator
              </Typography>
              <Select fullWidth defaultValue="select" size="small">
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value=""></MenuItem>
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Regulatory Impact Category
              </Typography>
              <Select fullWidth defaultValue="select" size="small">
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value=""></MenuItem>
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Financial Impact | Indicator (Y/S)
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

            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Financial Impact value
              </Typography>
              <TextField fullWidth placeholder="" value="" />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Issue | Likeihood
              </Typography>
              <Select fullWidth defaultValue="select" size="small">
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value=""></MenuItem>
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>Issue Impact</Typography>
              <Select fullWidth defaultValue="select" size="small">
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value=""></MenuItem>
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>Issue Score</Typography>
              <TextField fullWidth placeholder="" value="" />
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
                    </Grid>
       */}
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Issue Descriptions
              </Typography>
              <TextField fullWidth multiline rows={5} placeholder="" value="" />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <Typography sx={{ ...commonLabelStyle }}>Issue Remark</Typography>
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
                  onClick={() => setissueDetailsModalOpen(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ModalSection>

      {/* Risk Details Modal */}
      <ModalSection
        title="Add Risk Details"
        open={riskDetailsmodalOpen}
        onClose={() => setRiskDetailsModalOpen(false)}
      >
        <Box
          sx={{
            width: "600px",
            p: "2px",
            bgcolor: "#fff",
            borderLeft: "1px solid #ddd",
          }}
        >
          <Grid container spacing={2} sx={{ p: 3 }}>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>Risk ID</Typography>
              <TextField fullWidth placeholder="" value="" />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Risk | Date Raised
              </Typography>
              <TextField fullWidth placeholder="" value="" />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Risk | Due Date
              </Typography>
              <TextField fullWidth placeholder="" value="" />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Risk | Priority
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
                    </Grid>
       */}
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Risk | Category
              </Typography>
              <Select fullWidth defaultValue="select" size="small">
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value=""></MenuItem>
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Regulatory Impact Indicator
              </Typography>
              <Select fullWidth defaultValue="select" size="small">
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value=""></MenuItem>
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Regulatory Impact Category
              </Typography>
              <Select fullWidth defaultValue="select" size="small">
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value=""></MenuItem>
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Financial Impact | Indicator (Y/S)
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

            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Financial Impact value
              </Typography>
              <TextField fullWidth placeholder="" value="" />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Risk | Likeihood
              </Typography>
              <Select fullWidth defaultValue="select" size="small">
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value=""></MenuItem>
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>Risk Impact</Typography>
              <Select fullWidth defaultValue="select" size="small">
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value=""></MenuItem>
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>Risk Score</Typography>
              <TextField fullWidth placeholder="" value="" />
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
                    </Grid>
       */}
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Risk Descriptions
              </Typography>
              <TextField fullWidth multiline rows={5} placeholder="" value="" />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <Typography sx={{ ...commonLabelStyle }}>Risk Remark</Typography>
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
                  onClick={() => setRiskDetailsModalOpen(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ModalSection>

      {/* Cost Saving Details Modal */}
      <ModalSection
        title="Add Cost Management Details"
        open={costsavingdetailmodalOpen}
        onClose={() => setCostSavingDetailModalOpen(false)}
      >
        <Box
          sx={{
            width: "600px",
            p: "2px",
            bgcolor: "#fff",
            borderLeft: "1px solid #ddd",
          }}
        >
          <Grid container spacing={2} sx={{ p: 3 }}>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Cost Management | open Date
              </Typography>
              <TextField fullWidth placeholder="" value="" />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Cost Management | Due Date
              </Typography>
              <TextField fullWidth placeholder="" value="" />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Cost Saving | Indicator (Y/N)
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
                    </Grid>
       */}
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Cost Avoidance | Indicator (Y/N)
              </Typography>
              <Select fullWidth defaultValue="select" size="small">
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value=""></MenuItem>
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Cost Recovery | Chargeback Indicator
              </Typography>
              <Select fullWidth defaultValue="select" size="small">
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value=""></MenuItem>
              </Select>
            </Grid>
           

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                      <Divider
                        sx={{
                          borderStyle: "solid",
                          borderColor: "#E5E5E5",
                          borderWidth: "1px",
                          my: 1,
                        }}
                      />
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
                    </Grid>
       */}
           

            

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
                  onClick={() => setCostSavingDetailModalOpen(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
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


      {/* Supporting Document Modal  */}

       <ModalSection
        title="Add Supporting Documents"
        open={Supportingdocumentmodal}
        onClose={() => setSupportingDocumentModal(false)}
      >
        <Box
          sx={{
            width: "600px",
            p: "2px",
            bgcolor: "#fff",
            borderLeft: "1px solid #ddd",
          }}
        >
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

            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Document Version
              </Typography>
              <TextField fullWidth placeholder="" value="" />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Document Date
              </Typography>
              <TextField fullWidth placeholder="" value="" />
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
                    </Grid>
       */}
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
              <TextField fullWidth placeholder="" value="" />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Document upload Status
              </Typography>
              <Select fullWidth defaultValue="select" size="small">
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value=""></MenuItem>
              </Select>
            </Grid>
            {/* <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Financial Impact | Indicator (Y/S)
              </Typography>
              <Select fullWidth defaultValue="select" size="small">
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value=""></MenuItem>
              </Select>
            </Grid> */}

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

            {/* <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Financial Impact value
              </Typography>
              <TextField fullWidth placeholder="" value="" />
            </Grid> */}
            {/* <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Issue | Likeihood
              </Typography>
              <Select fullWidth defaultValue="select" size="small">
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value=""></MenuItem>
              </Select>
            </Grid> */}
            {/* <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>Issue Impact</Typography>
              <Select fullWidth defaultValue="select" size="small">
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value=""></MenuItem>
              </Select>
            </Grid> */}
            {/* <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography sx={{ ...commonLabelStyle }}>Issue Score</Typography>
              <TextField fullWidth placeholder="" value="" />
            </Grid> */}

            {/* <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                      <Divider
                        sx={{
                          borderStyle: "dashed",
                          borderColor: "#E5E5E5",
                          borderWidth: "1px",
                          my: 1,
                        }}
                      />
                    </Grid>
       */}
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Docuement Descriptions
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

            <Grid size={{ xs: 12, sm: 12, md: 12}}>
            <FileUpload />

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
                  onClick={() => setSupportingDocumentModal(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
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
              display: "flex",
              flexDirection: "column",
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
              <span style={{ fontWeight: 500, fontSize: 16 }}>
                {fileUrl ? fileUrl.split("/").pop() : "No Document Selected"}
              </span>

              <Typography
                sx={{
                  cursor: "pointer",
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#2268E9",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={handleAddDocumentClick}
              >
                Add Document
                <img
                  src={DeleteSvg}
                  alt=""
                  style={{
                    width: 11,
                    height: 13,
                    marginLeft: 25,
                    display: "inline-block",
                  }}
                />
              </Typography>

              {/* Hidden File Input */}
              <input
                type="file"
                accept="application/pdf,image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
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
              {fileUrl?.endsWith(".pdf") ? (
                <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} width={500} />
                </Document>
              ) : (
                <></>
              )}
            </Box>

            {/* Footer */}
            <Box
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
              <Typography
                sx={{ color: "#DCDCDC", fontSize: "16px", fontWeight: 500 }}
              >
                PDF Viewer Controls
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
                Contract Document Information
              </Typography>
            </Box>

            <Grid container spacing={2} sx={{ p: 3 }}>
              {/* <Box sx={{justifyContent:'space-between'}}> */}
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
                  Document Name
                </Typography>
                <TextField fullWidth placeholder="" value="" />
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
                <Typography sx={{ ...commonLabelStyle }}>
                  Document Date
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
                <Typography sx={{ ...commonLabelStyle }}>
                  Document Name
                </Typography>
                <TextField fullWidth placeholder="" value="" />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                <Typography sx={{ ...commonLabelStyle }}>
                  Document Uploaded Date
                </Typography>
                <TextField fullWidth placeholder="" value="" />
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

              {/* <Grid size={{ xs: 12, sm: 12, md: 12 }}>
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
              </Grid> */}

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

              {/* <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <Divider
                  sx={{
                    borderStyle: "solid",
                    borderColor: "#D3D6E14D",
                    borderWidth: "1px",
                    my: 2,
                  }}
                />
              </Grid> */}

              {/* <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
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
              </Grid> */}
              {/* </Box> */}

              {/*  */}

              <Box
                sx={{
                  borderTop: "1px solid #F3F3F3",
                  backgroundColor: "#fff",
                  px: 2,
                  py: 2,
                  boxShadow: "0px -2px 2px 0px #D3D6E14D",
                  width: "100%",
                  mt: 42,
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
                      // border: "1px solid #E5E5E5",
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
            </Grid>
          </Box>
        </Box>
      </Dialog>

      <ContractForm
        open={openContractForm}
        handleClose={() => setOpenContractForm(false)}
      />
    </Box>
  );
};

export default CCNObservationIssueRisk;
