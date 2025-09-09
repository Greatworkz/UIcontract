import React, { useState, useEffect,useRef } from "react";
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
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import HeaderTabSection from "../components/HeaderTabSection";
import filterIconSvg from "../assets/icons/filter.svg";
import DateRangeInput from "../components/DateRange";
import { getAuditPlanListApi } from "../Apis/ApiConfig";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import ModalSection from "../components/ModalSection";
const commonLabelStyle = {
  color: "#3a436b", // #60698F
  fontSize: "13px",
  fontWeight: 500,
  pr: 1,
  minWidth: "100px", // 👈 fixed width for alignment
  flexShrink: 0,
  whiteSpace: "nowrap",
  marginBottom: "7px",
};

const AuditPlan = () => {
  const [tab, setTab] = React.useState("All");
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  // const filteredContracts =
  //   tab === "All" ? mockContracts : mockContracts.filter((c) => c.status === tab);
  const [auditplanlist, setAuditplanlist] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const rowsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [openContractForm, setOpenContractForm] = useState(false);
  const [auditmodalOpen, setAuditmodalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const inputRef = useRef(null);

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const response = await getAuditPlanListApi({
        status: tab !== "All" ? tab : undefined,
        page: currentPage,
        limit: rowsPerPage,
      });
      console.log("API Response:", response);
      setAuditplanlist(response); // adjust based on actual API response shape
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
  const filteredAuditPlan =
    tab === "All"
      ? auditplanlist
      : auditplanlist.filter((c) => c.Status === tab);

  console.log("Filtered Audit Plan:", filteredAuditPlan);

  return (
    <Box sx={{ backgroundColor: "#F7F7F9", minHeight: "100vh" }}>
      <HeaderTabSection
        title="Audit Plans"
        tab={tab}
        handleTabChange={handleTabChange}
        onAddNew={() => setAuditmodalOpen(true)}
        btnTitle="+ New Audit Plan"
      />

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
                    color: "#21263C",
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
                "Audit plan Code",
                "Audit Plan Title",
                "Supplier Name",
                "MSA Code",
                "Duration",
                "Status",
              ]}
              rows={filteredAuditPlan}
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

      <ModalSection
        title="New Audit Plan"
        open={auditmodalOpen}
        onClose={() => setAuditmodalOpen(false)}
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
            <Typography sx={commonLabelStyle}>Customer Name</Typography>
            <Select fullWidth defaultValue="" size="small">
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="India">India</MenuItem>
            </Select>
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={5}>
            <Typography sx={commonLabelStyle}>Supplier Name</Typography>
            <TextField fullWidth placeholder="" value="IT ADM SERIVE  FOR UK" />
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={5}>
            <Typography sx={commonLabelStyle}>MSA Code</Typography>
            <TextField fullWidth placeholder="" value="ALG-GLOBAL-MSA-1093" />
          </Box>
          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>Audit Plan Code</Typography>
            <TextField
              fullWidth
              placeholder=""
              value="10/01/2021  To  09/03/2024"
            />
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={5}>
            <Typography sx={commonLabelStyle}>Audit Plan Title</Typography>
            <TextField
              fullWidth
              placeholder=""
              value="ALG-GLOBAL-MSA-PRO-10023"
            />
          </Box>

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
            <Typography sx={commonLabelStyle}>Audit Durations</Typography>
            <TextField
              fullWidth
              placeholder=""
              value="10/01/2021  To  09/03/2024"
            />
          </Box>

          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box mb={3} mt={3} display="flex" alignItems="center" gap={4}>
              <Typography sx={commonLabelStyle}>Audit Durations</Typography>
              <DatePicker
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    inputRef={inputRef}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => inputRef.current?.focus()}>
                            <CalendarTodayIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>
          </LocalizationProvider> */}

          <Box mb={3} mt={3} display="flex" alignItems="center" gap={5}>
            <Typography sx={commonLabelStyle}>Auditors Name</Typography>
            <TextField fullWidth placeholder="" value="ALG-GLOBAL-SOW-10023" />
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
              Save and continue
            </Button>
            <Button
              sx={{
                border: "1px solid #E5E5E5",
                fontSize: "13px",
                fontWeight: 400,
                backgroundColor: "#FFFFFF",
                color: "#061445",
              }}
              onClick={() => setAuditmodalOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </ModalSection>
    </Box>
  );
};

export default AuditPlan;
