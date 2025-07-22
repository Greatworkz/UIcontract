import React from "react";
import CardSection from "../components/CardSection";
import TableSection from "../components/TableSection";
import {
  Container,
  Grid,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Box,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const mockContracts = [
  {
    customer: "ALG Global Limited",
    type: "Non-Disclosure Agreement (NDAs)",
    file: "Confidential_Agreement_Report.pdf",
    code: "NDA-2025-05-022-001",
    date: "10/01/2025",
    time: "14:45:30",
    status: "Completed",
  },
  {
    customer: "ALG Global Limited",
    type: "Non-Disclosure Agreement (NDAs)",
    file: "NDA_2024_Analysis_Report.pdf",
    code: "NDA-2025-05-022-013",
    date: "04/06/2025",
    time: "14:45:42",
    status: "Active",
  },

  {
    customer: "ALG Global Limited",
    type: "Non-Disclosure Agreement (NDAs)",
    file: "Confidential_Agreement_Report.pdf",
    code: "NDA-2025-05-022-001",
    date: "10/01/2025",
    time: "14:45:30",
    status: "Terminate",
  },
  {
    customer: "ALG Global Limited",
    type: "Non-Disclosure Agreement (NDAs)",
    file: "NDA_2024_Analysis_Report.pdf",
    code: "NDA-2025-05-022-013",
    date: "04/06/2025",
    time: "14:45:42",
    status: "Active",
  },

  {
    customer: "ALG Global Limited",
    type: "Non-Disclosure Agreement (NDAs)",
    file: "Confidential_Agreement_Report.pdf",
    code: "NDA-2025-05-022-001",
    date: "10/01/2025",
    time: "14:45:30",
    status: "Completed",
  },
  {
    customer: "ALG Global Limited",
    type: "Non-Disclosure Agreement (NDAs)",
    file: "NDA_2024_Analysis_Report.pdf",
    code: "NDA-2025-05-022-013",
    date: "04/06/2025",
    time: "14:45:42",
    status: "Terminate",
  },

  {
    customer: "ALG Global Limited",
    type: "Non-Disclosure Agreement (NDAs)",
    file: "Confidential_Agreement_Report.pdf",
    code: "NDA-2025-05-022-001",
    date: "10/01/2025",
    time: "14:45:30",
    status: "Completed",
  },
  {
    customer: "ALG Global Limited",
    type: "Non-Disclosure Agreement (NDAs)",
    file: "NDA_2024_Analysis_Report.pdf",
    code: "NDA-2025-05-022-013",
    date: "04/06/2025",
    time: "14:45:42",
    status: "Active",
  },

  {
    customer: "ALG Global Limited",
    type: "Non-Disclosure Agreement (NDAs)",
    file: "Confidential_Agreement_Report.pdf",
    code: "NDA-2025-05-022-001",
    date: "10/01/2025",
    time: "14:45:30",
    status: "Terminate",
  },
  {
    customer: "ALG Global Limited",
    type: "Non-Disclosure Agreement (NDAs)",
    file: "NDA_2024_Analysis_Report.pdf",
    code: "NDA-2025-05-022-013",
    date: "04/06/2025",
    time: "14:45:42",
    status: "Active",
  },

  {
    customer: "ALG Global Limited",
    type: "Non-Disclosure Agreement (NDAs)",
    file: "Confidential_Agreement_Report.pdf",
    code: "NDA-2025-05-022-001",
    date: "10/01/2025",
    time: "14:45:30",
    status: "Completed",
  },
  {
    customer: "ALG Global Limited",
    type: "Non-Disclosure Agreement (NDAs)",
    file: "NDA_2024_Analysis_Report.pdf",
    code: "NDA-2025-05-022-013",
    date: "04/06/2025",
    time: "14:45:42",
    status: "Terminate",
  },
];

const Obligations = () => {
  const [tab, setTab] = React.useState("All");
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const filteredContracts =
    tab === "All" ? mockContracts : mockContracts.filter((c) => c.status === tab);

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* First Card: Tabs */}
      <Box sx={{ mb: 3 }}>
        <CardSection title="Extracted Obligation List">
          <Tabs
            value={tab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              mt: 1,
              '& .MuiTab-root': {
                fontSize: '14px',
                fontWeight: 500,
                textTransform: 'none',
                fontFamily: 'Inter, sans-serif',
                px: 2,
              },
              '& .MuiTabs-indicator': {
                height: '3px',
                borderRadius: '2px',
              },
            }}
          >
            <Tab label="All" value="All" />
            <Tab label="Active" value="Active" />
            <Tab label="Completed" value="Completed" />
          </Tabs>
        </CardSection>
      </Box>

      {/* Second Card: Filters and Table */}
      <Container maxWidth="xxl">
        <CardSection>
          <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Typography sx={{ color: '#000', fontWeight: 600 }}>
                Filter By :
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <Select defaultValue="ALG Global Limited">
                  <MenuItem value="ALG Global Limited">ALG Global Limited</MenuItem>
                  <MenuItem value="Another Company">Another Company</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <Select defaultValue="Non-Disclosure Agreement (NDAs)">
                  <MenuItem value="Non-Disclosure Agreement (NDAs)">NDAs</MenuItem>
                  <MenuItem value="Service Agreements">Service Agreements</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="10.01.2025 to 24.06.2025"
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <Typography
                sx={{
                  color: '#2268E9',
                  fontWeight: 500,
                  fontSize: '13px',
                  cursor: 'pointer',
                  textAlign: { xs: 'left', md: 'right' },
                }}
              >
                Clear Filter
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ overflowX: "auto" }}>
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
              rows={filteredContracts}
              onRowClick={(row) => navigate(`/obligationView/${row.id}`)}
              onEdit={(row) => console.log("Edit", row)}
              onDelete={(row) => console.log("Delete", row)}
            />
          </Box>
        </CardSection>
      </Container>
    </Box>
  );
};

export default Obligations;
