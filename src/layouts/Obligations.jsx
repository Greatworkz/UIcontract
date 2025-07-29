import React, { useState, useEffect } from "react";
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
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DateRangeInput from "../components/DateRange";
import { getObligationListApi } from "../Apis/ApiConfig";
import filterIconSvg from '../assets/icons/filter.svg';

const Obligations = () => {
  const [tab, setTab] = React.useState("All");
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };
  const [dateRange, setDateRange] = useState([null, null]);
  const rowsPerPage = 10;
  const [obligation, setObligation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  // const filteredContracts =
  //   tab === "All"
  //     ? mockContracts
  //     : mockContracts.filter((c) => c.Status === tab);

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const response = await getObligationListApi({
        status: tab !== "All" ? tab : undefined,
        page: currentPage,
        limit: rowsPerPage,
      });
      setObligation(response); // adjust based on actual API response shape
      setTotalCount(response.totalCount || response.length);
    } catch (err) {
      console.error("Failed to fetch contracts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, [tab, currentPage]);

  // const filteredContracts = obligation; // directly use API-loaded data
  const filteredContracts =
    tab === "All"
      ? obligation
      : obligation.filter((c) => c.Status === tab);

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* First Card: Tabs */}
      <Box sx={{ mb: 3 }}>
        <CardSection title="Extracted Obligation List" sx={{ pb: 0 }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              mt: 1,
              pb:0,
              "& .MuiTab-root": {
                fontSize: "13px",
                fontWeight: 400,
                textTransform: "none",
                fontFamily: "Inter, sans-serif",
                // px: 2,
                color: '#061445',
                minWidth: "auto",
              },
              "& .Mui-selected": {
                fontWeight: 600,
              },
              "& .MuiTabs-indicator": {
                height: "3px",
                borderRadius: "2px",
                backgroundColor: "#2268E9",
                width: "fit-content",
                fontWeight: 600
              },
            }}
          >
            <Tab label="All" value="All" />
            <Tab label="Active" value="Active" />
            <Tab label="Completed" value="Completed" />
            <Tab label="Terminated" value="Terminated" />
          </Tabs>
        </CardSection>
      </Box>

      {/* Second Card: Filters and Table */}
      <Container maxWidth="xxl">
        <CardSection>
          <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Typography
                sx={{ display: "flex",
                  alignItems: "center", color: "#061445", fontWeight: 600, fontSize: "14px" }}
              >
                <img src={filterIconSvg} alt="" style={{ width: 13, height: 14,marginRight: 5, mr: 0.5,
        display: "inline-block",  }} />
                Filter By :
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <Select defaultValue="ALG Global Limited">
                  <MenuItem
                    value="ALG Global Limited"
                    sx={{ fontSize: "13px" }}
                  >
                    ALG Global Limited
                  </MenuItem>
                  <MenuItem value="Another Company" sx={{ fontSize: "13px" }}>
                    Another Company
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <Select defaultValue="Non-Disclosure Agreement (NDAs)">
                  <MenuItem value="Non-Disclosure Agreement (NDAs)">
                    NDAs
                  </MenuItem>
                  <MenuItem value="Service Agreements">
                    Service Agreements
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <DateRangeInput value={dateRange} onChange={setDateRange} />
            </Grid>

            <Grid item xs={12} md={2}>
              <Typography
                sx={{
                  color: "#2268E9",
                  fontWeight: 500,
                  fontSize: "13px",
                  cursor: "pointer",
                  textAlign: { xs: "left", md: "right" },
                }}
              >
                Clear Filter
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ overflowX: "auto" }}>
            <TableSection
              headers={[
                "Customer Name",
                "Contract Type",
                "File Name",
                "Extraction Code",
                "Update On",
                "Status",
              ]}
              rows={filteredContracts}
              loading={loading}
              onRowClick={(row) => navigate(`/obligationView/${row.id}`)}
              onEdit={(row) => console.log("Edit", row)}
              onDelete={(row) => console.log("Delete", row)}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2, // margin top
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
        </CardSection>
      </Container>
    </Box>
  );
};

export default Obligations;
