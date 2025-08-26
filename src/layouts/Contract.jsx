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
import { getContractListApi } from "../Apis/ApiConfig";
import FullScreenDialog from "../components/FullScreenDIalog";
const commonLabelStyle = {
  color: "#60698F",
  fontSize: "13px",
  fontWeight: 500,
  pr: 1,
  minWidth: "100px", // 👈 fixed width for alignment
  flexShrink: 0,
  whiteSpace: "nowrap",
};

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
  const [DocumentModalopen, setDocumentModal] = useState(false);
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

  const handleClose = () => setDocumentModal(false);

  // const filteredContracts = contractList; // directly use API-loaded data
  const filteredContracts =
    tab === "All" ? contractList : contractList.filter((c) => c.Status === tab);

  const [formData, setFormData] = useState({
    customerName: "",
    supplierName: "",
    msaCode: "",
    msaTitle: "",
    msaDuration: "",
    sowValue1: "",
    projectName: "",
    msaTcvRevised: "",
    msaTcvUtilized: "",
    availableFund: "",
    sowCode: "",
    sowScope: "",
    sowTitle: "",
    contractDuration: "",
    sowDuration: "",
    sowCurrency: "",
    sowValue: "",
    version: "",
    bundleId: "",
    contractType: "",
    status: "",
    signedOn: "",
    approvedOn: "",
    serviceDuration: "",
    pricingTeam: "",
    billingTeam: "",
    contractExhibit: "select",
    schedules: "",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };
  return (
    <Box sx={{ backgroundColor: "#F7F7F9", minHeight: "100vh" }}>
      <HeaderTabSection
        title="Contract List"
        tab={tab}
        handleTabChange={handleTabChange}
        onAddNew={() => setDocumentModal(true)}
        btnTitle="+ Add New Contract"
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

      <Box>
        <FullScreenDialog
          open={DocumentModalopen}
          onClose={handleClose}
          title="New Contract"
        >
          {/* MSA INFORMATION */}
          <Box mb={3}>
            <CardSection title="MSA INFORMATION" showArrow>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    Customer Name
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Customer Name"
                    value={formData.customerName}
                    onChange={handleChange("customerName")}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    Supplier Name
                  </Typography>
                  <TextField fullWidth placeholder="" value={formData.supplierName}
                    onChange={handleChange("supplierName")} />
                </Grid>

                {/* <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>MSA Code</Typography>
                  <TextField fullWidth placeholder="" value={formData.msaCode}
                    onChange={handleChange("msaCode")} />
                </Grid> */}

                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>MSA Code</Typography>
                  <TextField fullWidth placeholder="" value={formData.msaCode}
                    onChange={handleChange("msaCode")} />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    MSA Title
                  </Typography>
                  <TextField fullWidth placeholder="" value={formData.msaTitle}
                    onChange={handleChange("msaTitle")} />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    MSA Duration
                  </Typography>
                  <TextField fullWidth placeholder="" value={formData.msaDuration}
                    onChange={handleChange("msaDuration")} />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    SOW Value | TCV
                  </Typography>
                  <TextField fullWidth placeholder="" value={formData.sowValue}
                    onChange={handleChange("sowValue")} />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    Project Name
                  </Typography>
                  <TextField fullWidth placeholder="" value={formData.projectName}
                    onChange={handleChange("projectName")} />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    MSA TCV | Revised TCV
                  </Typography>
                  <TextField fullWidth placeholder="" value={formData.msaTcvRevised}
                    onChange={handleChange("msaTcvRevised")} />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    MSA TCV | Utilized
                  </Typography>
                  <TextField fullWidth placeholder="" value={formData.msaTcvUtilized}
                    onChange={handleChange("msaTcvUtilized")} />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    Available Fund
                  </Typography>
                  <TextField fullWidth placeholder="" value={formData.availableFund}
                    onChange={handleChange("availableFund")} />
                </Grid>
              </Grid>
            </CardSection>
          </Box>

          {/* SOW Base Details */}
          <Box mb={3}>
            <CardSection title="SOW Base Details" showArrow>
              <Grid container spacing={2}>
                {/* Left side 50% */}

                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 12, md: 11 }}>
                      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                        <Typography sx={{ ...commonLabelStyle }}>
                          SOW Code
                        </Typography>
                        <TextField fullWidth placeholder="" value="" />
                      </Grid>

                      <Typography sx={{ ...commonLabelStyle, mt: 1 }}>
                        SOW Scope of service
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        minRows={10} // ensures multiple rows
                        placeholder="Enter details here..."
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "200px", // fixed height
                            alignItems: "flex-start", // text starts at top
                            width: "100%",
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 6 }} mt={1}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                      <Typography sx={{ ...commonLabelStyle }}>
                        SOW Title
                      </Typography>
                      <TextField fullWidth placeholder="" value="" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                      <Typography sx={{ ...commonLabelStyle }}>
                        SOW | Contract Duration
                      </Typography>
                      <TextField fullWidth placeholder="" value="" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                      <Typography sx={{ ...commonLabelStyle }}>
                        SOW Duration
                      </Typography>
                      <TextField fullWidth placeholder="" value="" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                      <Typography sx={{ ...commonLabelStyle }}>
                        SOW Currency
                      </Typography>
                      <Select fullWidth defaultValue="select" size="small">
                        <MenuItem value="select">Select</MenuItem>
                        <MenuItem value=""></MenuItem>
                      </Select>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                      <Typography sx={{ ...commonLabelStyle }}>
                        SOW Value | TCV
                      </Typography>
                      <TextField fullWidth placeholder="" value="" />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardSection>
          </Box>

          {/* SOW CONTRACT INFORMATION */}
          <Box mb={3}>
            <CardSection title="SOW CONTRACT INFORMATION" showArrow>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    SOW Version #
                  </Typography>
                  <TextField fullWidth placeholder="" value="" />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    SOW Source Bundle ID
                  </Typography>
                  <TextField fullWidth placeholder="" value="" />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    Type Of Contract
                  </Typography>
                  <Select fullWidth defaultValue="select" size="small">
                    <MenuItem value="select">Select</MenuItem>
                    <MenuItem value=""></MenuItem>
                  </Select>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    SOW | Status
                  </Typography>
                  <TextField fullWidth placeholder="" value="" />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    SOW | Signed on Date
                  </Typography>
                  <TextField fullWidth placeholder="" value="" />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    SOW | Approved Date
                  </Typography>
                  <TextField fullWidth placeholder="" value="" />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    SOW | Service Duration
                  </Typography>
                  <TextField fullWidth placeholder="" value="" />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    Pricing Team
                  </Typography>
                  <Select fullWidth defaultValue="select" size="small">
                    <MenuItem value="select">Select</MenuItem>
                    <MenuItem value=""></MenuItem>
                  </Select>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    Billing Team
                  </Typography>
                  <Select fullWidth defaultValue="select" size="small">
                    <MenuItem value="select">Select</MenuItem>
                    <MenuItem value=""></MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </CardSection>
          </Box>

          {/* SOW CONTRACT DOCUMENT INFORMATION */}
          <Box mb={3}>
            <CardSection title="SOW CONTRACT DOCUMENT INFORMATION" showArrow>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    Contract Exhibit | Nomenciature
                  </Typography>
                  <Select fullWidth defaultValue="select" size="small">
                    <MenuItem value="select">Select</MenuItem>
                    <MenuItem value=""></MenuItem>
                  </Select>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <Typography sx={{ ...commonLabelStyle }}>
                    # of Schdules
                  </Typography>
                  <TextField fullWidth placeholder="" value="" />
                </Grid>
              </Grid>
            </CardSection>
          </Box>

          {/* SOW SUMMARY */}
          <Box mb={3}>
            <CardSection title="SOW SUMMARY" showArrow>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                      <Typography sx={{ ...commonLabelStyle }}>
                        Baseline Assumptions
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        minRows={10} // ensures multiple rows
                        placeholder="Enter details here..."
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "200px", // fixed height
                            alignItems: "flex-start", // text starts at top
                            width: "100%",
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                      <Typography sx={{ ...commonLabelStyle }}>
                        Issues
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        minRows={10} // ensures multiple rows
                        placeholder="Enter details here..."
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "200px", // fixed height
                            alignItems: "flex-start", // text starts at top
                            width: "100%",
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                      <Typography sx={{ ...commonLabelStyle }}>
                        Riskes
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        minRows={10} // ensures multiple rows
                        placeholder="Enter details here..."
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "200px", // fixed height
                            alignItems: "flex-start", // text starts at top
                            width: "100%",
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                      <Typography sx={{ ...commonLabelStyle }}>
                        Summary Remarks
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        minRows={10} // ensures multiple rows
                        placeholder="Enter details here..."
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "200px", // fixed height
                            alignItems: "flex-start", // text starts at top
                            width: "100%",
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardSection>
          </Box>

          {/* SOW STRATEGIC INFORMATION */}
          <Box mb={3}>
            <CardSection title="SOW STRATEGIC INFORMATION" showArrow>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                      <Typography sx={{ ...commonLabelStyle }}>
                        Compliment Documentation
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        minRows={10} // ensures multiple rows
                        placeholder="Enter details here..."
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "200px", // fixed height
                            alignItems: "flex-start", // text starts at top
                            width: "100%",
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                      <Typography sx={{ ...commonLabelStyle }}>
                        Innovation Incentives
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        minRows={10} // ensures multiple rows
                        placeholder="Enter details here..."
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "200px", // fixed height
                            alignItems: "flex-start", // text starts at top
                            width: "100%",
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                      <Typography sx={{ ...commonLabelStyle }}>
                        Benchmarking and Price Renegotiations
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        minRows={10} // ensures multiple rows
                        placeholder="Enter details here..."
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "200px", // fixed height
                            alignItems: "flex-start", // text starts at top
                            width: "100%",
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                      <Typography sx={{ ...commonLabelStyle }}>
                        Business Countinuity and Termination Preparedness
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        minRows={10} // ensures multiple rows
                        placeholder="Enter details here..."
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "200px", // fixed height
                            alignItems: "flex-start", // text starts at top
                            width: "100%",
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                      <Typography sx={{ ...commonLabelStyle }}>
                        Auditing | Financial Security
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        minRows={10} // ensures multiple rows
                        placeholder="Enter details here..."
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "200px", // fixed height
                            alignItems: "flex-start", // text starts at top
                            width: "100%",
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                      <Typography sx={{ ...commonLabelStyle }}>
                        Exit Strategy
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        minRows={10} // ensures multiple rows
                        placeholder="Enter details here..."
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "200px", // fixed height
                            alignItems: "flex-start", // text starts at top
                            width: "100%",
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                  <Divider
                    sx={{
                      borderStyle: "solid",
                      borderColor: "#D3D6E14D",
                      borderWidth: "1px",
                      // my: 2,
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
                      onClick={() => navigate("/contract/add")}
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
                      // onClick={() => setDeliverablemodalOpen(false)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardSection>
          </Box>
        </FullScreenDialog>
      </Box>
    </Box>
  );
};

export default ContractList;
