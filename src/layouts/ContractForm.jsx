import React,{ useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  Divider,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FullScreenDialog from "../components/FullScreenDIalog"; // make sure this exists
import CardSection from "../components/CardSection"; // the expandable section you already built

const commonLabelStyle = {
  fontSize: "13px",
  fontWeight: 500,
  color: "#061445",
  mb: 1,
};

const ContractForm = ({ open, handleClose }) => {
  const navigate = useNavigate();
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
    <FullScreenDialog
    open={open} onClose={handleClose}
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

          {/* <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
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
          </Grid> */}
        </Grid>
      </CardSection>
    </Box>
    <Box display="flex" justifyContent="flex-start" gap={2} mt={2}>
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
          onClick={handleClose}
        >
          Cancel
        </Button>
      </Box>
  </FullScreenDialog>
  );
};

export default ContractForm;
