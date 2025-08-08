import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  CircularProgress,
  IconButton,
  Chip,
  Stack,
  Divider,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  MenuItem,
  FormControl,
  Select,
  InputAdornment,
  Switch,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  getPagesData,
  getContractDetails,
  getMetricsData,
  GetCustomerDetails,
  GetsObligationChartData,
} from "../Apis/ApiConfig";
import ChartSection from "../components/ChartSection";
import MetricSection from "../components/MatricSection";
import ThemedTabs, { ThemedTab } from "../components/TabSection";
import ObligationSliderView from "./ObligationSliderView";
import ModalSection from "../components/ModalSection";
import TotalClassSvg from "../assets/oblication-icon/total_classes.svg";
import ConfidenceSvg from "../assets/oblication-icon/confidence.svg";
import filterIconSvg from "../assets/icons/filter.svg";
import BotSvg from "../assets/oblication-icon/bot_orange.svg";
import BlueBotSvg from "../assets/oblication-icon/bot_blue.svg";
import personSvg from "../assets/icons/person.svg";
import CopySvg from "../assets/icons/Copy.svg";
import VectorSvg from "../assets/icons/Vector.svg";
import ArrowSvg from "../assets/oblication-icon/arrow.svg";
import DateSvg from "../assets/icons/dateIcon.svg";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import ToggleGridSvg from "../assets/icons/ToggleGrid.svg";
import ToggleListSvg from "../assets/icons/ToogleTable.svg";

const iconMap = {
  "Total Classes": TotalClassSvg,
  Confidence: ConfidenceSvg,
  "High Confidence": TotalClassSvg,
  "Total Pages": TotalClassSvg,
  "Processed By": BotSvg,
};
const headers = ["", "Image", "Page Info", "Description", "Actions"];


const ObligationView = () => {
  // const { contractId } = useParams();
  const [pageData, setPageData] = useState(null);
  const [contractData, setContractData] = useState(null);
  const [metricsData, setMetricsData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [date, setDate] = useState("2025-06-06");
  const [obligationChartData, setObligationChartData] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  const [selectedPage, setSelectedPage] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [UpdatemodalOpen, setUpdateModalOpen] = useState(false);
  // const [viewMode, setViewMode] = useState("grid");
  const [isGridView, setIsGridView] = useState("grid");

  const handleChange = (field) => (e) => {
    setStatus((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleOpenDrawer = (page) => {
    setSelectedPage(page);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedPage(null);
  };

  useEffect(() => {
    // if (!contractId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const pageResult = await getPagesData();
        const contractResult = await getContractDetails();
        const metricsResult = await getMetricsData();
        const customerResult = await GetCustomerDetails();
        const chatdata = await GetsObligationChartData();
        const withIcons = metricsResult.map((item) => ({
          ...item,
          icon: iconMap[item.label] || null,
        }));

        setPageData(pageResult);
        setContractData(contractResult);
        setMetricsData(withIcons);
        setCustomerData(customerResult);
        setObligationChartData(chatdata);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const basicDetails = [
    { label: "Customer Name", value: contractData?.customer_name || "-" },
    { label: "Extraction Code", value: contractData?.extraction_code || "-" },
    { label: "Uploaded File", value: contractData?.uploaded_file || "-" },
    { label: "Uploaded On", value: contractData?.uploaded_on || "-" },
  ];

  const contractMeta = [
    { label: "Document Type", value: contractData?.document_type || "-" },
    { label: "Start Date", value: contractData?.start_date || "-" },
    { label: "End Date", value: contractData?.end_date || "-" },
    { label: "Duration", value: contractData?.duration || "-" },
  ];

  if (loading) {
    return (
      <Box p={3} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!contractData || !pageData) {
    return (
      <Box p={3}>
        <Typography>Unable to load contract or page data.</Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >

      <Box flex="1">
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
                      {contractData.customer_name}
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

                  <FormControl variant="standard">
                    <Select
                      value={contractData.uploaded_file}
                      disableUnderline
                      variant="standard"
                      displayEmpty
                      sx={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#60698F",
                        border: "none",
                        boxShadow: "none",
                        minWidth: "10px",
                        padding: 0,
                        "&::before, &::after": {
                          display: "none",
                        },
                        "&:hover:not(.Mui-disabled)::before": {
                          borderBottom: "none",
                        },
                        "& .MuiSelect-select": {
                          padding: "0px !important",
                          minHeight: "unset",
                          lineHeight: "normal",
                        },
                      }}
                    >
                      <MenuItem value={contractData.uploaded_file}>
                        {contractData.uploaded_file}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <Box display="flex" gap={1} justifyContent="flex-end" mt={1}>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    height: "34px",
                    borderRadius: "6px",
                    border: "1px solid #E5E5E5",
                    opacity: 1,
                    textTransform: "none",
                    fontWeight: 400,
                    fontSize: "13px",
                    color: "#061445",
                  }}
                  onClick={() => console.log("Compare clicked")}
                >
                  Compare version
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    width: "fit-content",
                    height: "34px",
                    borderRadius: "6px",
                    border: "1px solid #E5E5E5",
                    opacity: 1,
                    textTransform: "none",
                    fontWeight: 400,
                    fontSize: "13px",
                    color: "#000000",
                    minWidth: "auto",
                  }}
                  onClick={() => console.log("Cancel clicked")}
                >
                  X
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box px={{ xs: 2, sm: 3, md: 3, lg: 3, xl: 3 }} py={3}>
          {/* Metric Cards */}
          <Grid container spacing={2} mb={2}>
            {metricsData.map((metric, index) => (
              <Grid
                size={{ xs: 6, sm: 4, md: 2.4, lg: 2.4, xl: 2.4 }}
                key={index}
              >
                <MetricSection
                  title={metric.label}
                  value={metric.value}
                  icon={metric.icon}
                />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={2}>
            {/* First Card */}
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #0A18290D",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    py: { xs: 1.5, sm: 1.5, md: 2 },
                    px: 2,
                    borderTopLeftRadius: "6px",
                    borderTopRightRadius: "6px",
                    backgroundColor: "#FAFAFD",
                    color: "#061445",
                    // borderBottom: "1px solid #0A18290D",
                    // padding: '10px'
                  }}
                >
                  <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                    Basic Details
                  </Typography>
                </Box>

                {/* Scrollable Body */}
                <Box sx={{ flexGrow: 1, overflow: "auto", px: 2, py: 1.5 }}>
                  <Stack spacing={2.5}>
                    {basicDetails.map((item, idx) => (
                      <Box
                        key={idx}
                        display="flex"
                        flexWrap="nowrap"
                        minWidth={0}
                      >
                        <Typography
                          sx={{
                            width: 140,
                            color: "#60698F",
                            fontSize: "13px",
                            fontWeight: 500,
                            flexShrink: 0,
                          }}
                        >
                          {item.label}
                        </Typography>
                        <Typography
                          sx={{
                            ml: 1,
                            color: "#21263C",
                            fontSize: "13px",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                          }}
                          title={item.value}
                        >
                          {item.value}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Grid>

            {/* Second Card - Same logic applies */}
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #0A18290D",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    py: { xs: 1.5, sm: 1.5, md: 2 },
                    px: 2,
                    borderTopLeftRadius: "6px",
                    borderTopRightRadius: "6px",
                    backgroundColor: "#FAFAFD",
                    color: "#061445",
                    // borderBottom: "1px solid #0A18290D",
                    // padding: '10px'
                  }}
                >
                  <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                    Contract Details
                  </Typography>
                </Box>

                {/* Scrollable Body */}
                <Box sx={{ flexGrow: 1, overflow: "auto", px: 2, py: 1.5 }}>
                  <Stack spacing={2.5}>
                    {contractMeta.map((item, idx) => (
                      <Box
                        key={idx}
                        display="flex"
                        flexWrap="nowrap"
                        minWidth={0}
                      >
                        <Typography
                          sx={{
                            width: 140,
                            color: "#60698F",
                            fontSize: "13px",
                            fontWeight: 500,
                            flexShrink: 0,
                          }}
                        >
                          {item.label}
                        </Typography>
                        <Typography
                          sx={{
                            ml: 1,
                            color: "#21263C",
                            fontSize: "13px",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                          }}
                          title={item.value}
                        >
                          {item.value}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Grid>

            {/* Third Chart Card */}
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <ChartSection
                title="Obligation Donut"
                data={obligationChartData}
                sx={{
                  height: "250px", // this now works since ChartSection applies it
                }}
              />
            </Grid>
          </Grid>

          {/* Tabs & Table */}

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
                <ThemedTab label="Sections" />
                <ThemedTab label="Pages" />
                <ThemedTab label="Confidence" />
              </ThemedTabs>
            </Box>

            {tabIndex === 0 && (
              <Box p={2} mt={2}>
                Section content
              </Box>
            )}

            {tabIndex === 1 && (
              <Box mt={2} p={2}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 2,
                    mb: 3,
                  }}
                >
                  {/* Filter By */}
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
                  </Box>

                  {/* Search Field */}
                  <TextField
                    placeholder="Search content"
                    size="small"
                    sx={{ minWidth: 200 }}
                  />

                  {/* Select */}
                  <Select
                    defaultValue="All Confidence"
                    size="small"
                    sx={{ minWidth: 180 }}
                  >
                    <MenuItem value="All Confidence">All Confidence</MenuItem>
                    <MenuItem value="90%">90%</MenuItem>
                    <MenuItem value="80%">80%</MenuItem>
                  </Select>

                  {/* Spacer to push toggle to the right */}
                  <Box sx={{ flexGrow: 1 }} />

                  <ToggleButtonGroup
                    value={isGridView ? "grid" : "list"}
                    exclusive
                    onChange={(event, value) => {
                      if (value !== null) {
                        setIsGridView(value === "grid");
                      }
                    }}
                    size="small"
                    sx={{
                      minWidth: 78,
                      height: 34,
                      backgroundColor: "#EBEAF2",
                      borderRadius: "6px",
                      alignItems: "center",
                      p: 0.5,
                    }}
                  >
                    <ToggleButton
                      value="grid"
                      sx={{
                        px: 1.5,
                        width: 36,
                        height: 30,
                        // backgroundColor: "#EBEAF2",
                        // borderRadius: "6px",
                        border: "none",
                        "&.Mui-selected": {
                          backgroundColor: "#FFFFFF !important",
                          boxShadow: "0px 2px 4px 0px #181C2E0F",
                          borderRadius: "4px",
                          opacity: 1,
                        },
                      }}
                    >
                      <img
                        src={ToggleGridSvg}
                        alt="Grid"
                        style={{ width: 12, height: 12 }}
                      />
                    </ToggleButton>

                    <ToggleButton
                      value="list"
                      sx={{
                        px: 1.5,
                        width: 36,
                        height: 30,
                        // backgroundColor: "#EBEAF2",
                        // borderRadius: "6px",
                        border: "none",
                        "&.Mui-selected": {
                          backgroundColor: "#FFFFFF !important",
                          boxShadow: "0px 2px 4px 0px #181C2E0F",
                          borderRadius: "4px",
                          opacity: 1,
                        },
                      }}
                    >
                      <img
                        src={ToggleListSvg}
                        alt="List"
                        style={{ width: 16, height: 16 }}
                      />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>

                {/* Table */}
                <Table
                  sx={{
                    overflowX: "auto",
                    "& td, & th": {
                      border: "none",
                    },
                    "& .MuiTableCell-root": {
                      border: "none",
                    },
                  }}
                >
                  <TableBody>
                    {isGridView ? (
                      pageData.map((page) => (
                        <TableRow
                          key={page.id}
                          sx={{
                            display: "block",
                            cursor: "pointer",
                            borderRadius: "6px",
                            border: "1px solid #E7EEFC",
                            backgroundColor: "#FFFFFF",
                            opacity: 1,
                            mb: 2,
                            "& .hover-action-cell": {
                              // display: "none",
                              visibility: "hidden",
                            },
                            "&:hover .hover-action-cell": {
                              visibility: "visible",
                            },
                          }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              sx={{
                                "& path": {
                                  stroke: "#E5E5E5",
                                  strokeWidth: 1,
                                },
                              }}
                            />
                          </TableCell>

                          <TableCell>
                            <img
                              src={page.image}
                              alt={page.title}
                              style={{
                                width: 60,
                                height: 80,
                                objectFit: "cover",
                                borderRadius: 4,
                              }}
                            />
                          </TableCell>

                          <TableCell sx={{ width: "400px" }}>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#061445",
                              }}
                            >
                              {page.title}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "#60698F",
                                display: "flex",
                                alignItems: "center",
                                gap: 1.2,
                              }}
                            >
                              Section: {page.section}
                              <Box
                                component="span"
                                sx={{
                                  width: "0px",
                                  height: "13px",
                                  borderLeft: "1px solid #F2F2FF",
                                }}
                              />
                              SubSections: {page.subsections}
                              <Box
                                component="span"
                                sx={{
                                  width: "0px",
                                  height: "13px",
                                  borderLeft: "1px solid #F2F2FF",
                                }}
                              />
                              Mapped: {page.mapped}
                            </Typography>
                            <Box
                              display="flex"
                              alignItems="center"
                              mt={2}
                              gap={1.2}
                            >
                              <img
                                src={BlueBotSvg}
                                style={{ width: 20, height: 20 }}
                                alt=""
                              />
                              <Box
                                display="inline-block"
                                bgcolor="#FFF3E0"
                                px={1}
                                py={0.5}
                                fontSize="10px"
                                color="#996800"
                                sx={{
                                  border: "1px solid #FFF1D3",
                                  fontWeight: 600,
                                  borderRadius: "3px",
                                  letterSpacing: "1px",
                                }}
                              >
                                {page.confidence} CONFIDENCE
                              </Box>
                            </Box>
                          </TableCell>

                          <TableCell
                            sx={{
                              width: "800px",
                              height: "70px",
                              opacity: 1,
                              border: "1px solid #F2F2FF",
                              borderWidth: "1px",
                              verticalAlign: "top",
                            }}
                          >
                            <Typography
                              sx={{
                                color: "#60698F",
                                fontSize: "13px",
                                mb: 1,
                                fontWeight: 500,
                                display: "inline-block", // allows span + text in one line
                              }}
                            >
                              Title
                            </Typography>

                            <Typography
                              sx={{
                                color: "#21263C",
                                fontSize: "14px",
                                fontWeight: 400,
                                lineHeight: "20px",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                // maxWidth: 400,
                              }}
                            >
                              {page.description}
                            </Typography>
                          </TableCell>

                          <TableCell className="hover-action-cell">
                            <Box display="flex" alignItems="center" gap={2}>
                              {/* Icons */}
                              <Box display="flex" alignItems="center" gap={1}>
                                <img
                                  src={CopySvg}
                                  style={{ width: 14, height: 14 }}
                                  alt=""
                                />
                                <img
                                  src={VectorSvg}
                                  style={{ width: 14, height: 14 }}
                                  alt=""
                                />
                              </Box>
                              <Box
                                component="span"
                                sx={{
                                  width: "0px",
                                  height: "13px",
                                  borderLeft: "1px solid #ECECFF",
                                }}
                              />
                              {/* View SubSections Button */}
                              <Button
                                variant="text"
                                sx={{
                                  textTransform: "none",
                                  fontWeight: 500,
                                  fontSize: "14px",
                                  color: "#0080FE",
                                  minWidth: "max-content",
                                }}
                                onClick={() => handleOpenDrawer(page)}
                              >
                                View SubSections
                              </Button>

                              <Box
                                component="span"
                                sx={{
                                  width: "0px",
                                  height: "13px",
                                  borderLeft: "1px solid #ECECFF",
                                }}
                              />
                              {/* Update Button */}
                              <Button
                                variant="text"
                                sx={{
                                  textTransform: "none",
                                  fontWeight: 500,
                                  fontSize: "14px",
                                  color: "#21263C",
                                  minWidth: "max-content",
                                }}
                                onClick={() => setUpdateModalOpen(true)}
                              >
                                update
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <Table
                        sx={{
                          border: "1px solid #ECECFF",
                          borderRadius: "8px",
                          overflow: "hidden",
                        }}
                      >
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "#F8F9FB", position: "sticky", top: 0, zIndex: 1 }}>
                            {headers.map((header) => (
                              <TableCell
                                key={header}
                                sx={{
                                  fontWeight: 600,
                                  fontSize: "13px",
                                  color: "#21263C",
                                  borderBottom: "1px solid #ECECFF",
                                  padding: "12px 16px",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {header}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                        {pageData.map((page) => (
                        <TableRow
                          key={page.id}
                          sx={{
                            // display: "block",
                            cursor: "pointer",
                            borderRadius: "6px",
                            border: "1px solid #E7EEFC",
                            backgroundColor: "#FFFFFF",
                            opacity: 1,
                            mb: 2,
                            "& .hover-action-cell": {
                              // display: "none",
                              visibility: "hidden",
                            },
                            "&:hover .hover-action-cell": {
                              visibility: "visible",
                            },
                          }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              sx={{
                                "& path": {
                                  stroke: "#E5E5E5",
                                  strokeWidth: 1,
                                },
                              }}
                            />
                          </TableCell>

                          <TableCell>
                            <img
                              src={page.image}
                              alt={page.title}
                              style={{
                                width: 60,
                                height: 80,
                                objectFit: "cover",
                                borderRadius: 4,
                              }}
                            />
                          </TableCell>

                          <TableCell sx={{ width: "400px" }}>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#061445",
                              }}
                            >
                              {page.title}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "#60698F",
                                display: "flex",
                                alignItems: "center",
                                gap: 1.2,
                              }}
                            >
                              Section: {page.section}
                              <Box
                                component="span"
                                sx={{
                                  width: "0px",
                                  height: "13px",
                                  borderLeft: "1px solid #F2F2FF",
                                }}
                              />
                              SubSections: {page.subsections}
                              <Box
                                component="span"
                                sx={{
                                  width: "0px",
                                  height: "13px",
                                  borderLeft: "1px solid #F2F2FF",
                                }}
                              />
                              Mapped: {page.mapped}
                            </Typography>
                            <Box
                              display="flex"
                              alignItems="center"
                              mt={2}
                              gap={1.2}
                            >
                              <img
                                src={BlueBotSvg}
                                style={{ width: 20, height: 20 }}
                                alt=""
                              />
                              <Box
                                display="inline-block"
                                bgcolor="#FFF3E0"
                                px={1}
                                py={0.5}
                                fontSize="10px"
                                color="#996800"
                                sx={{
                                  border: "1px solid #FFF1D3",
                                  fontWeight: 600,
                                  borderRadius: "3px",
                                  letterSpacing: "1px",
                                }}
                              >
                                {page.confidence} CONFIDENCE
                              </Box>
                            </Box>
                          </TableCell>

                          <TableCell
                            sx={{
                              width: "800px",
                              height: "70px",
                              opacity: 1,
                              border: "1px solid #F2F2FF",
                              borderWidth: "1px",
                              verticalAlign: "top",
                            }}
                          >
                            <Typography
                              sx={{
                                color: "#60698F",
                                fontSize: "13px",
                                mb: 1,
                                fontWeight: 500,
                                display: "inline-block", // allows span + text in one line
                              }}
                            >
                              Title
                            </Typography>

                            <Typography
                              sx={{
                                color: "#21263C",
                                fontSize: "14px",
                                fontWeight: 400,
                                lineHeight: "20px",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                // maxWidth: 400,
                              }}
                            >
                              {page.description}
                            </Typography>
                          </TableCell>

                          <TableCell className="hover-action-cell">
                            <Box display="flex" alignItems="center" gap={2}>
                              {/* Icons */}
                              <Box display="flex" alignItems="center" gap={1}>
                                <img
                                  src={CopySvg}
                                  style={{ width: 14, height: 14 }}
                                  alt=""
                                />
                                <img
                                  src={VectorSvg}
                                  style={{ width: 14, height: 14 }}
                                  alt=""
                                />
                              </Box>
                              <Box
                                component="span"
                                sx={{
                                  width: "0px",
                                  height: "13px",
                                  borderLeft: "1px solid #ECECFF",
                                }}
                              />
                              {/* View SubSections Button */}
                              <Button
                                variant="text"
                                sx={{
                                  textTransform: "none",
                                  fontWeight: 500,
                                  fontSize: "14px",
                                  color: "#0080FE",
                                  minWidth: "max-content",
                                }}
                                onClick={() => handleOpenDrawer(page)}
                              >
                                View SubSections
                              </Button>

                              <Box
                                component="span"
                                sx={{
                                  width: "0px",
                                  height: "13px",
                                  borderLeft: "1px solid #ECECFF",
                                }}
                              />
                              {/* Update Button */}
                              <Button
                                variant="text"
                                sx={{
                                  textTransform: "none",
                                  fontWeight: 500,
                                  fontSize: "14px",
                                  color: "#21263C",
                                  minWidth: "max-content",
                                }}
                                onClick={() => setUpdateModalOpen(true)}
                              >
                                update
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                        </TableBody>
                      </Table>
                    )}
                  </TableBody>
                </Table>
              </Box>
            )}

            {tabIndex === 2 && (
              <Box mt={2} p={2}>
                Confidence content
              </Box>
            )}
          </Box>

          <ObligationSliderView
            open={drawerOpen}
            onClose={handleCloseDrawer}
            page={selectedPage}
          />

          <Box>
            <ModalSection
              title="OB- Status Update & Tracking"
              open={UpdatemodalOpen}
              onClose={() => setUpdateModalOpen(false)}
            >
              <Box sx={{ px: 3.5, py: 3.5 }}>
                {/* Customer Info */}
                <Stack spacing={2.5}>
                  {customerData.map((item, idx) => (
                    <Box key={idx} display="flex">
                      <Typography
                        sx={{
                          minWidth: 140,
                          color: "#60698F",
                          fontSize: "13px",
                          fontWeight: 500,
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        sx={{
                          minWidth: 140,
                          color: "#21263C",
                          fontSize: "13px",
                          fontWeight: 500,
                          ml: 1,
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
                <Divider sx={{ my: 2.5, border: "1px dotted #DCDCEF" }} />

                <Typography
                  sx={{
                    fontWeight: 600,
                    marginTop: "10px",
                    marginBottom: "10px",
                    fontSize: "14px",
                    color: "#061445",
                  }}
                >
                  {" "}
                  Status Update{" "}
                </Typography>

                <Box mb={3} mt={3} display="flex" alignItems="center" gap={2}>
                  <Typography
                    sx={{
                      whiteSpace: "nowrap",
                      color: "#061445",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    Select Date
                  </Typography>
                  <TextField
                    type="text"
                    size="small"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    variant="standard" // required for disableUnderline to work
                    sx={{ flexGrow: 1 }}
                    InputProps={{
                      disableUnderline: true, // this removes the underline
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton disableRipple>
                            <img
                              src={DateSvg}
                              alt="calendar"
                              style={{ width: 18, height: 18 }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        fontSize: "13px",
                        paddingRight: "8px",
                      },
                    }}
                  />
                </Box>

                {/* Radio Buttons Section */}
                {[
                  { label: "OB Submitted on Time", key: "obSubmitted" },
                  { label: "OB Complied", key: "obComplied" },
                  { label: "SLA Impact", key: "slaImpact" },
                  { label: "Billable by Service Provider", key: "billable" },
                  { label: "KPI-Non Compliance", key: "kpiNonCompliance" },
                  { label: "Has issue", key: "hasIssue" },
                  { label: "Financial Impact", key: "financialImpact" },
                  { label: "Has Risk", key: "hasRisk" },
                ].map((item) => (
                  <Box
                    key={item.key}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mt={1}
                  >
                    <Typography
                      sx={{
                        flex: 1,
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#60698F",
                      }}
                    >
                      {item.label}
                    </Typography>
                    <RadioGroup
                      row
                      value={status[item.key]}
                      onChange={handleChange(item.key)}
                      sx={{ gap: 1 }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio size="small" />}
                        label="Yes"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            color: "#21263C",
                            fontSize: "13px",
                            fontWeight: 500,
                          },
                        }}
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio size="small" />}
                        label="No"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            color: "#21263C",
                            fontSize: "13px",
                            fontWeight: 500,
                          },
                        }}
                      />
                    </RadioGroup>
                  </Box>
                ))}

                <Divider sx={{ my: 2, border: "1px solid #DCDCEF" }} />

                <Box
                  display="flex"
                  gap={2}
                  sx={{ fontSize: "13px", fontWeight: 400 }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      backgroundColor: "#2268E9",
                      border: "1px solid #2268E9",
                      color: "#fff",
                      borderRadius: "6px",
                    }}
                  >
                    Map
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      border: "1px solid #E5E5E5",
                      color: "#061445",
                      borderRadius: "6px",
                    }}
                    onClick={() => setUpdateModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </ModalSection>
          </Box>
        </Box>
      </Box>

      {/* Footer Section */}
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
  );
};

export default ObligationView;
