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
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DateRangeInput from "../components/DateRange";
import { getObligationListApi } from "../Apis/ApiConfig";
import filterIconSvg from "../assets/icons/filter.svg";

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
    tab === "All" ? obligation : obligation.filter((c) => c.Status === tab);

  return (
    <Box sx={{ backgroundColor: "#F7F7F9", minHeight: "100vh" }}>
      {/* First Card: Tabs */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            width: "100%",
            height: "58px",
            position: "relative",
            opacity: 1,
            px: 2,
            py: 2,
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontStyle: "normal",
              fontSize: "20px",
              lineHeight: "30px",
              letterSpacing: "0.2px",
              color: "#061445",
            }}
          >
            Extracted Obligation List
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            width: "100%",
            height: "auto",
            position: "relative",
            opacity: 1,
            px: 2,
            border: "1px solid #F3F3F3",
            boxShadow: "0px 2px 2px 0px #D3D6E14D",
            display: "flex",
          }}
        >
          <Tabs
            value={tab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            TabIndicatorProps={{ style: { display: "none" } }} // hide default indicator
            sx={{
              mt: 1,
              pb: 0,
              "& .MuiTab-root": {
                fontSize: "13px",
                fontWeight: 400,
                textTransform: "none",
                fontFamily: "Inter, sans-serif",
                color: "#061445",
                minWidth: "auto",
                position: "relative",
                paddingX: 2,

                // 👇 Custom short underline
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "30px",
                  height: "3px",
                  backgroundColor: "transparent",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                },
              },
              // 👇 Active tab underline style
              "& .Mui-selected::after": {
                backgroundColor: "#2268E9",
              },
              "& .Mui-selected": {
                fontWeight: 600,
              },
            }}
          >
            <Tab label="All" value="All" />
            <Tab label="Active" value="Active" />
            <Tab label="Completed" value="Completed" />
            <Tab label="Terminated" value="Terminated" />
          </Tabs>
        </Box>
      </Box>

      {/* Second Card: Filters and Table */}
      <Container maxWidth="xxl">
        <CardSection>
          <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#061445",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                <img
                  src={filterIconSvg}
                  alt=""
                  style={{
                    width: 13,
                    height: 14,
                    marginRight: 5,
                    mr: 0.5,
                    display: "inline-block",
                  }}
                />
                Filter By :
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <Select defaultValue="ALG Global Limited">
                  <MenuItem
                    value="ALG Global Limited"
                    sx={{ fontSize: "13px", minWidth: "240px" }}
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

            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              flexGrow={1}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#061445",
                  mr: 1,
                }}
              >
                Sort By :
              </Typography>
              <FormControl>
                <Select
                  defaultValue="This Year"
                  variant="standard"
                  disableUnderline
                  sx={{
                    fontSize: "13px",
                    minWidth: "180px",
                  }}
                >
                  <MenuItem value="This Year">This Year</MenuItem>
                  <MenuItem value="This Month">This Month</MenuItem>
                  <MenuItem value="This Week">This Week</MenuItem>
                </Select>
              </FormControl>
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
