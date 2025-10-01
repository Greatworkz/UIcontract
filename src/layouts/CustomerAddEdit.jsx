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
  OutlinedInput,
  ListItemText,
  TableContainer,
  Table,
  TableCell,
  TableBody,
  TableRow,
  Card,
  List,
  ListItem,
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
import SearchIcon from "@mui/icons-material/Search";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import MoreIcon from "../assets/oblication-icon/moreIcon.svg";
import ContractForm from "./ContractForm";
import { useNavigate } from "react-router-dom";

const steps = [
  "Select Customer",
  "Budget Funding",
  "Budget Allocation",
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

const commonTablevalueStyle = {
  fontFamily: "Inter",
  fontWeight: 500,
  fontSize: "13px",
  lineHeight: "100%",
  letterSpacing: "0%",
  verticalAlign: "middle",
  color: "#21263C",
  ml: 5,
  // marginTop: "10px",
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

const sampleData = [
  {
    CYCLE: "1",
    "BU LOCATION": "New York",
    "BUSINESS UNIT": "Finance",
    "LINE OF BUSINESS": "Banking",
    "IT SERVICE SUITE": "Core Banking",
    "BUSINESS LOCATION": "Manhattan",
    Status: "active",
  },
  {
    CYCLE: "2",
    "BU LOCATION": "London",
    "BUSINESS UNIT": "Operations",
    "LINE OF BUSINESS": "Trading",
    "IT SERVICE SUITE": "Trading Platform",
    "BUSINESS LOCATION": "City of London",
    Status: "completed",
  },
  {
    CYCLE: "3",
    "BU LOCATION": "Tokyo",
    "BUSINESS UNIT": "Risk Management",
    "LINE OF BUSINESS": "Compliance",
    "IT SERVICE SUITE": "Risk Analytics",
    "BUSINESS LOCATION": "Shibuya",
    Status: "pending",
  },
];

const mockCustomers = [
  { name: "greatbrands pvt lmt", code: "#CL002" },
  { name: "MRF pvt lmt", code: "#CL002" },
];

const customerOptions = [
  "Ajay",
  "Ajith",
  "Vijay",
  "Lokan",
  "Santhosh",
  "Vignesh",
];

const FilterGrid = { xs: 12, sm: 6, md: 6, lg: 4, xl: 3 };

const CustomerAddEdit = () => {
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
  const [NewCustomerModal, SetNewCustomerModal] = useState(false);
  const [ScopemodalOpen, setScopemodalOpen] = useState(false);
  const [businessunitmodalopen, setBusinessUnitModalOpen] = useState(false);
  const [processmodalOpen, setProcessModalOpen] = useState(false);
  const [stockholdermodalopen, setStockholdermodalopen] = useState(false);
  const [BussinessCaseModalOpen, setBussinessCaseModalOpen] = useState(false);
  const [contractdocumentmodal, setContractDocumentsModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [customerName, setCustomerName] = useState([]);
  const [selecteditserviceSuites, setSelectedItserviceSuites] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const [DocumentModalopen, setDocumentModal] = useState(false);
  const [fileUrl, setFileUrl] = useState(""); // default PDF
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

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

  const handleClose = () => setDocumentModal(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.code.toLowerCase().includes(searchText.toLowerCase())
  );

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

  const handleCustomerSelect = (customerName) => {
    setSelectedCustomer(customerName);
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

  const handleChangeForCustomerName = (event) => {
    const { value } = event.target;
    setCustomerName(typeof value === "string" ? [value] : value);
  };

  const handleDeleteCustomerName = (itemToDelete) => {
    setCustomerName((prev) => prev.filter((item) => item !== itemToDelete));
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredOptions = customerOptions.filter((option) =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSaveforCustomer = () => {
    if (selectedCustomer) {
      onSave(selectedCustomer);
      handleClose();
    }
  };

  const handleCloseforCustomer = () => {
    setSearchText("");
    setSelectedCustomer(null);
    onClose();
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

  //   console.log(itServiceSuites, "Cjeee");
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
            // alignItems="flex-start"
            // justifyContent="space-between"
            sx={{ mt: 2 }}
          >
            {/* LEFT: Back Arrow */}
            <IconButton
              size="small"
              sx={{
                width: "14px",
                height: "14px",
                padding: 0,
                mt: "3px",
                mb: "8px",
                ml: "8px",
              }}
              onClick={() => navigate(-1)}
            >
              <img
                src={ArrowSvg}
                alt="icon"
                style={{ width: "100%", height: "100%" }}
              />
            </IconButton>
            <Typography
              sx={{
                ...commonLabelStyle,
                fontSize: "15px",
                fontWeight: "bolder",
                color: "black",
                ml: 1,
                mt: "0.5px",
              }}
            >
              New Customer Budget
            </Typography>

            {/* CENTER: Person image + name + select */}
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
          </Stepper>

          {activeStep === 0 && (
            <Box>
              <Box mb={3}></Box>

              {/* MSA Information Section */}

              <Box mb={3}>
                <CardSection
                  title="Customers List"
                  showArrow
                  headerActionLabel="+ Add Customer"
                  onHeaderActionClick={() => SetNewCustomerModal(true)}
                >
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
                </CardSection>
              </Box>
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <Box mb={3}>
                <CardSection
                  title="Customer Details"
                  showArrow
                  //   headerActionLabel={
                  //     <>
                  //       <img src={EditSvg} alt="Edit" width={10} height={12} />
                  //       &nbsp; Edit
                  //     </>
                  //   }
                  //   onHeaderActionClick={() => setMSAmodalOpen(true)}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 10, sm: 5, md: 2.5, lg: 2.4, xl: 2 }}>
                      <Typography mt={1} sx={commonLabelStyle}>
                        Customer Code
                      </Typography>
                      <Typography sx={commonValueStyle}>#CL001</Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>
                        Customer Name
                      </Typography>
                      <Typography sx={commonValueStyle}>
                        Great works Pvt Ltd
                      </Typography>
                    </Grid>
                  </Grid>
                </CardSection>
              </Box>

              <Box mb={2}>
                <CardSection
                  title="Budget Funding"
                  showArrow
                  headerActionLabel="+Add Fund"
                  onHeaderActionClick={() => setProcessModalOpen(true)}
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
                            "BUDGET FUNDING METHOD",
                            "BUDGET PERIOD",
                            "BUDGET CURRENCY",
                            "BUDGET VALUE",
                            "DISCRETIONARY",
                            "NON DISCRETIONARY",
                          ]}
                          rows={[]}
                          ischeckboxWant={false}
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
              <Box mb={3}>
                <CardSection
                  title="Customer Details"
                  showArrow
                  //   headerActionLabel={
                  //     <>
                  //       <img src={EditSvg} alt="Edit" width={10} height={12} />
                  //       &nbsp; Edit
                  //     </>
                  //   }
                  //   onHeaderActionClick={() => setMSAmodalOpen(true)}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 10, sm: 5, md: 2.5, lg: 2.4, xl: 2 }}>
                      <Typography mt={1} sx={commonLabelStyle}>
                        Customer Code
                      </Typography>
                      <Typography sx={commonValueStyle}>#CL001</Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4, md: 2.5, lg: 2.5, xl: 2 }}>
                      <Typography sx={commonLabelStyle}>
                        Customer Name
                      </Typography>
                      <Typography sx={commonValueStyle}>
                        Great works Pvt Ltd
                      </Typography>
                    </Grid>
                  </Grid>
                </CardSection>
              </Box>

              <Box mb={3}>
                <CardSection
                  title="Budget Funding"
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
                    <Grid size={{ xs: 10, sm: 5, md: 2.5, lg: 2.4, xl: 2 }}>
                      <Typography mt={1} sx={commonLabelStyle}>
                        Budget Funding Methods
                      </Typography>
                      <Typography sx={commonValueStyle}>
                        Centralized corporate Funding
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 10, sm: 5, md: 2.5, lg: 2.4, xl: 2 }}>
                      <Typography mt={1} sx={commonLabelStyle}>
                        Budget Period
                      </Typography>
                      <Typography sx={commonValueStyle}>
                        10-04-2025 to 10-07-2025
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 10, sm: 5, md: 2.5, lg: 2.4, xl: 2 }}>
                      <Typography mt={1} sx={commonLabelStyle}>
                        Budget value | Amount
                      </Typography>
                      <Typography sx={commonValueStyle}>$ 5,00,000</Typography>
                    </Grid>
                  </Grid>
                </CardSection>
              </Box>

              <Box mb={2}>
                <CardSection
                  title="Budget Allocation ( select business unit )"
                  showArrow
                  //   headerActionLabel="+Add Fund"
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
                            "GEOGRAPHY",
                            "COUNTRY",
                            "SERVICE CATEGORY",
                            "INDUSTRY",
                            "BUSINESS UNIT",
                            "LINE OF BUSINESS",
                          ]}
                          rows={[]}
                          ischeckboxWant={false}
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

              <Box mb={2}>
                <CardSection
                  title="Allocated Budget"
                  showArrow
                  //   headerActionLabel="+Add Fund"
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
                            "GEOGRAPHY",
                            "COUNTRY",
                            "INDUSTRY",
                            "BUSINESS UNITE",
                            "LINE OF BUSINESS",
                            "SERVICE CATEGORY",
                            "IT SERVICE SUITE",
                            "ALLOCATED CATEGORY",
                            "FUND ALLOCATED",
                          ]}
                          rows={[]}
                          ischeckboxWant={false}
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

          {
            activeStep === 3 && (
                <h5>Details Coming soon..</h5>
            )
          }
        </Box>

        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: "1px solid #F3F3F3",
            backgroundColor: "#fff",
            px: 2,
            py: 2,
            boxShadow: "0px -2px 2px 0px #D3D6E14D",
            zIndex: 1200,
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

      <ModalSection
        title="Select Customer"
        open={NewCustomerModal}
        onClose={() => SetNewCustomerModal(false)}
      >
        <Box sx={{ px: 3, pb: 3 }}>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#60698F",
              // mb: 1,
              mt: 2,
            }}
          >
            Customer Name
          </Typography>

          <Box mb={2} mt={2} display="grid" alignItems="center" gap={1}>
            <Select fullWidth defaultValue="" size="small" sx={{}}>
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="India">India</MenuItem>
            </Select>
          </Box>

          <Box
            sx={{
              border: "1px solid #E5E5E5",
              borderRadius: "6px",
              backgroundColor: "#FFFFFF",
              mb: 3,
            }}
          >
            <Box sx={{ p: 1.5, borderBottom: "1px solid #E5E5E5" }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search customer by code or name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon size={18} color="#60698F" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#FFFFFF",
                    fontSize: "13px",
                    "& fieldset": {
                      borderColor: "#2268E9",
                    },
                    "&:hover fieldset": {
                      borderColor: "#2268E9",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2268E9",
                      borderWidth: "1px",
                    },
                  },
                  "& .MuiOutlinedInput-input::placeholder": {
                    color: "#60698F",
                    opacity: 1,
                  },
                }}
              />
            </Box>

            <List
              sx={{
                maxHeight: "200px",
                overflowY: "auto",
                p: 0,
              }}
            >
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer, index) => (
                  <ListItem
                    key={index}
                    onClick={() => handleCustomerSelect(customer.name)}
                    sx={{
                      cursor: "pointer",
                      py: 1.5,
                      px: 2,
                      borderBottom:
                        index < filteredCustomers.length - 1
                          ? "1px solid #F5F5F5"
                          : "none",
                      backgroundColor:
                        selectedCustomer === customer.name
                          ? "#F5F8FF"
                          : "#FFFFFF",
                      "&:hover": {
                        backgroundColor: "#F5F8FF",
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "#061445",
                          }}
                        >
                          {customer.name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#60698F",
                            mt: 0.25,
                          }}
                        >
                          {customer.code}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                  }}
                >
                  <Typography sx={{ color: "#60698F", fontSize: "13px" }}>
                    No customers found
                  </Typography>
                </Box>
              )}
            </List>
          </Box>

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
              onClick={() => SetNewCustomerModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </ModalSection>
    </Box>
  );
};

export default CustomerAddEdit;
