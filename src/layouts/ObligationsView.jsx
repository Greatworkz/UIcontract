import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Chip,
  useTheme,
  useMediaQuery,
  Stack,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  MenuItem,
  Checkbox,
  IconButton,
  Button,
} from "@mui/material";
import CardSection from "../components/CardSection";
import ChartSection from "../components/ChartSection";
import MetricSection from "../components/MatricSection";
import ThemedTabs, { ThemedTab } from "../components/TabSection";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ObligationSliderView from "./ObligationSliderView";
const Matricks = [
  { label: "Total Classes", value: 34, icon: "" },
  { label: "Confidence", value: 14, icon: "" },
  { label: "High Confidence", value: 19, icon: "" },
  { label: "Total Pages", value: 36, icon: "" },
  { label: "Processed By", value: "Open Ai", icon: "" },
];

const contractDetails = {
  customer_name: "ALG Glibal Limited",
  extraction_code: "NDA-2025-05-022-013",
  uploaded_file: "NDA_2024_Analysis_Report.pdf",
  uploaded_on: "04/06/2025 03:33:24",
  document_type: "Non-Disclosure Agreements",
  start_date: "23/06/2025",
  end_date: "23/08/2025",
  duration: "60 Days",
};

const basicDetails = [
  { label: "Customer Name", value: contractDetails.customer_name },
  { label: "Extraction Code", value: contractDetails.extraction_code },
  { label: "Uploaded File", value: contractDetails.uploaded_file },
  { label: "Uploaded On", value: contractDetails.uploaded_on },
];

const contractMeta = [
  { label: "Document Type", value: contractDetails.document_type },
  { label: "Start Date", value: contractDetails.start_date, color: "green" },
  { label: "End Date", value: contractDetails.end_date, color: "green" },
  { label: "Duration", value: contractDetails.duration },
];

const obligationChartData = [
  { label: "Highly Confidence", value: 45, color: "#dc3545" },
  { label: "Confidence", value: 35, color: "#ffc107" },
];

const pageData = [
  {
    id: 1,
    title: "Page 1",
    section: "1.0",
    subsections: 6,
    mapped: "3/6",
    confidence: "90%",
    description:
      "This schedules 5 defines the way in which benchmarking shall be implemented under this agreement",
    image: "https://i.pravatar.cc/100?u=page1",
    sections: [
      {
        title: 'Section 3.1',
        accountability: '',
        severity: '',
        frequency: '',
        deliverable: '',
        obligation: 'This schedules 5 defines the way in which benchmarking shall be implemented...'
      },
      {
        title: 'Section 3.2',
        accountability: '',
        severity: '',
        frequency: '',
        deliverable: '',
        obligation: 'This schedules 5 defines the way in which benchmarking shall be implemented...'
      },
      {
        title: 'Section 3.3',
        accountability: '',
        severity: '',
        frequency: '',
        deliverable: '',
        obligation: 'This schedules 5 defines the way in which benchmarking shall be implemented...'
      },
    ]
  },
  {
    id: 2,
    title: "Page 2",
    section: "2.0",
    subsections: 4,
    mapped: "3/6",
    confidence: "90%",
    description: "This schedules 5 defines the way in which benchmarking",
    image: "https://i.pravatar.cc/100?u=page2",
    sections: [
      {
        title: 'Section 3.1',
        accountability: '',
        severity: '',
        frequency: '',
        deliverable: '',
        obligation: 'This schedules 5 defines the way in which benchmarking shall be implemented...'
      },
      {
        title: 'Section 3.2',
        accountability: '',
        severity: '',
        frequency: '',
        deliverable: '',
        obligation: 'This schedules 5 defines the way in which benchmarking shall be implemented...'
      },
    ]
  },
];

const ObligationView = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedPage, setSelectedPage] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = (page) => {
    setSelectedPage(page);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedPage(null);
  };

  return (
    <Box px={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} py={3}>
      {/* Header */}
      <Box display="flex" flexDirection="column" mb={3}>
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          <Typography variant="h6" fontWeight="bold">
            {contractDetails.customer_name}
          </Typography>
          <Chip label="ACTIVE" size="small" color="success" />
        </Box>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          {contractDetails.uploaded_file}
        </Typography>
      </Box>

      {/* Metric Cards */}
      <Grid container spacing={2} mb={2}>
        {Matricks.map((metric, index) => (
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
                    sx={{ minWidth: 140, color: "#60698F" }}
                  >
                    {item.label}
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 1 }}>
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
                    sx={{ minWidth: 140, color: "#60698F" }}
                  >
                    {item.label}
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 1 }}>
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

      <Box mt={5}>
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
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Search content"
                    // value={search}
                    // onChange={(e) => setSearch(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
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
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox"></TableCell>
                    {/* Optional: Add meaningful headers here */}
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
                          sx={{ textTransform: "none",fontWeight: 600 }}
                          onClick={() => handleOpenDrawer(page)}
                        >
                          View SubSections
                        </Button>
                      </TableCell>

                      <TableCell>
                      <Button
                          variant="text"
                          size="medium"
                          sx={{ textTransform: "none",color:'#000',fontWeight: 600 }}
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
      <ObligationSliderView open={drawerOpen} onClose={handleCloseDrawer} page={selectedPage} />
    </Box>
  );
};

export default ObligationView;
