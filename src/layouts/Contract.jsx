import React,{ useState, useEffect } from "react";
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
  Typography,Pagination
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import HeaderTabSection from "../components/HeaderTabSection";
import filterIconSvg from "../assets/icons/filter.svg";
import DateRangeInput from "../components/DateRange";
import { getContractListApi } from "../Apis/ApiConfig";

const ContractList = () => {
  const [tab, setTab] = React.useState("All");
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  // const filteredContracts =
  //   tab === "All" ? mockContracts : mockContracts.filter((c) => c.status === tab);
  const [contractList, setContractList] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const rowsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const response = await getContractListApi({
        status: tab !== "All" ? tab : undefined,
        page: currentPage,
        limit: rowsPerPage,
      });
      setContractList(response); // adjust based on actual API response shape
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

  // const filteredContracts = contractList; // directly use API-loaded data
  const filteredContracts =
    tab === "All" ? contractList : contractList.filter((c) => c.Status === tab);

  return (

    <Box sx={{ backgroundColor: "#F7F7F9", minHeight: "100vh" }}>
      <HeaderTabSection title="Contract List" tab={tab} handleTabChange={handleTabChange} />

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
                  fontWeight: 500,
                  fontSize: "13px",
                  color: "#60698F",
                  // mr: 1,
                }}
              >
                Sort By :
              </Typography>
              <FormControl variant="standard">
                <Select
                  defaultValue="This Year"
                  variant="standard"
                  disableUnderline
                  sx={{
                    fontSize: "13px",
                    minWidth: "10px",
                    border: "none",
                    boxShadow: "none",
                    color: '#21263C',
                    fontWeight: 500,
                    "&::before, &::after": {
                      display: "none",
                    },
                    "&:hover:not(.Mui-disabled)::before": {
                      borderBottom: "none",
                    },
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
              onRowClick={(row) => navigate(`/contract/edit/${row.id}`)}
              onEdit={(row) => console.log("Edit", row)}
              onDelete={(row) => console.log("Delete", row)}
            />
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
        </CardSection>
      </Container>
    </Box>
  );
};

export default ContractList;
