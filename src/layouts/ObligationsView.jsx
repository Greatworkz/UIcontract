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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import MetricSection from "../components/MatricSection";
import CardSection from "../components/CardSection";
import ThemedTabs, { ThemedTab } from "../components/TabSection";
import ObligationSliderView from "./ObligationSliderView";
import ModalSection from "../components/ModalSection";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import TotalClassSvg from "../assets/icons/Total classes.svg";
import ConfidenceSvg from "../assets/icons/Confidence.svg";
import HighConfidenceSvg from "../assets/icons/Highly Confidence.svg";
import TotalPagesSvg from "../assets/icons/Total pages.svg";
import BotSvg from "../assets/icons/BOT.svg";

const iconMap = {
  "Total Classes": TotalClassSvg,
  Confidence: ConfidenceSvg,
  "High Confidence": HighConfidenceSvg,
  "Total Pages": TotalPagesSvg,
  "Processed By": BotSvg,
};

// const obligationChartData = [
//   { label: "Highly Confidence", value: 45, color: "#dc3545" },
//   { label: "Confidence", value: 35, color: "#ffc107" },
// ];

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
    <Box px={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} py={3}>
      {/* Header */}
      <Box display="flex" flexDirection="column" mb={3}>
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          {/* Back Arrow */}
          <IconButton size="small">
            {" "}
            {/* You can define this */}
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>

          {/* Customer Name */}
          <Typography variant="h6" fontWeight="bold">
            {contractData.customer_name}
          </Typography>

          {/* Chip - square and colored */}
          <Chip
            label="ACTIVE"
            size="small"
            sx={{
              borderRadius: "3px", // Square shape
              backgroundColor: "#C5E9D1", // Custom color
              color: "#008631", // Text color
              fontWeight: 500,
              px: 1.5,
              border: "1px",
            }}
          />
        </Box>

        {/* Subtext */}
        <Typography
          variant="body2"
          color="text.secondary"
          mt={0.5}
          sx={{
            fontSize: "12px",
            fontWeight: 500,
            color: "#60698F",
            ml: 6,
            mt: 1,
          }}
        >
          {contractData.uploaded_file}
        </Typography>
      </Box>

      {/* Metric Cards */}
      <Grid container spacing={2} mb={2}>
        {metricsData.map((metric, index) => (
          <Grid size={{ xs: 6, sm: 4, md: 2.4, lg: 2.4, xl: 2.4 }} key={index}>
            <MetricSection
              title={metric.label}
              value={metric.value}
              icon={metric.icon}
            />
          </Grid>
        ))}
      </Grid>

      {/* Detail Cards */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }}>
          <CardSection title="Basic Details">
            <Stack spacing={2.5} sx={{ px: 2, py: 1.5 }}>
              {basicDetails.map((item, idx) => (
                <Box key={idx} display="flex">
                  <Typography
                    variant="body2"
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
                    variant="body2"
                    sx={{
                      ml: 1,
                      color: "#21263C",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </CardSection>
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }} md={4}>
          <CardSection title="Contract Details">
            <Stack spacing={2.5} sx={{ px: 2, py: 1.5 }}>
              {contractMeta.map((item, idx) => (
                <Box key={idx} display="flex">
                  <Typography
                    variant="body2"
                    sx={{
                      minWidth: 180,
                      color: "#60698F",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      ml: 1,
                      color: "#21263C",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </CardSection>
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }} md={4}>
          <ChartSection title="Obligation Donut" data={obligationChartData} />
        </Grid>
      </Grid>

      {/* Tabs & Table */}

      <Box sx={{ mt: "20px" }}>
        <CardSection>
          <Box sx={{ borderBottom: "1px solid #e0e0e0", mb: 2 }}>
            <ThemedTabs value={tabIndex} onChange={handleTabChange}>
              <ThemedTab label="Sections" />
              <ThemedTab label="Pages" />
              <ThemedTab label="Confidence" />
            </ThemedTabs>
          </Box>

          {tabIndex === 0 && <Box mt={2}>Section content</Box>}

          {tabIndex === 1 && (
            <Box mt={2}>
              <Grid container spacing={2} mb={3}>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                  <TextField
                    fullWidth
                    label="Search content"
                    // value={search}
                    // onChange={(e) => setSearch(e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                  <TextField
                    fullWidth
                    select
                    label="All Confidence"
                    defaultValue=""
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="90%">90%</MenuItem>
                    <MenuItem value="80%">80%</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

              {/* Table */}
              <Table sx={{ overflowX: "auto" }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      padding="checkbox"
                      sx={{
                        borderColor: "#E5E5E5",
                        backgroundColor: "#F9FAFF", // Needed for radius visibility
                        borderRadius: "3px",
                      }}
                    >
                      {/* Optional: checkbox or leave empty */}
                    </TableCell>
                    {/* Add other header cells here */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pageData.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell padding="checkbox">
                        <Checkbox />
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
                            border: "1px solid #ccc",
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Typography fontWeight={600}>{page.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Section: {page.section} | SubSections:{" "}
                          {page.subsections} | Mapped: {page.mapped}
                        </Typography>
                        <Box
                          mt={1}
                          display="inline-block"
                          bgcolor="#FFF3E0"
                          px={1}
                          py={0.5}
                          borderRadius={1}
                          fontSize="12px"
                          fontWeight="bold"
                          color="#F57C00"
                        >
                          {page.confidence} CONFIDENCE
                        </Box>
                      </TableCell>

                      <TableCell sx={{ maxWidth: 300 }}>
                        <Typography
                          variant="body2"
                          noWrap
                          title={page.description}
                        >
                          {page.description}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <IconButton size="small" title="Copy">
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" title="Open">
                          <OpenInNewIcon fontSize="small" />
                        </IconButton>
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="text"
                          size="medium"
                          sx={{ textTransform: "none", fontWeight: 600 }}
                          onClick={() => handleOpenDrawer(page)}
                        >
                          View SubSections
                        </Button>
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="text"
                          size="medium"
                          sx={{
                            textTransform: "none",
                            color: "#000",
                            fontWeight: 600,
                          }}
                          onClick={() => setUpdateModalOpen(true)}
                        >
                          update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}

          {tabIndex === 2 && <Box mt={2}>Confidence content</Box>}
        </CardSection>
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
          <Box sx={{ px: 2, py: 1.5, width: 420 }}>
            {/* Customer Info */}
            <Stack spacing={1.5}>
              {customerData.map((item, idx) => (
                <Box key={idx} display="flex">
                  <Typography
                    variant="body2"
                    sx={{ minWidth: 160, color: "#60698F" }}
                  >
                    {item.label}
                  </Typography>
                  <Typography variant="body2">{item.value}</Typography>
                </Box>
              ))}
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Section Title */}
            <Typography variant="subtitle2" fontWeight={600} mb={1}>
              Status Update
            </Typography>

            {/* Select Date */}
            <Box mb={2}>
              <Typography variant="body2" mb={0.5}>
                Select Date
              </Typography>
              <TextField
                type="date"
                fullWidth
                size="small"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
                <Typography variant="body2" sx={{ flex: 1 }}>
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
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio size="small" />}
                    label="No"
                  />
                </RadioGroup>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            {/* Footer Buttons */}
            <Box display="flex" justifyContent="flex-start" gap={2}>
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: "#2268E9", color: "#fff" }}
              >
                Map
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setUpdateModalOpen(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </ModalSection>
      </Box>
    </Box>
  );
};

export default ObligationView;
