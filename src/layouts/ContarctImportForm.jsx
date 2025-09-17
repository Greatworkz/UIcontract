import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  Divider,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import FullScreenDialog from "../components/FullScreenDIalog"; // make sure this exists
import CardSection from "../components/CardSection"; // the expandable section you already built
import { useSnackbar } from "../utils/snackbar";
import ModalSection from "../components/ModalSection";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SuccessGif from "../assets/icons/sucess.gif";

const commonLabelStyle = {
  fontSize: "13px",
  fontWeight: 500,
  color: "#061445",
  mb: 1,
};

const ContarctImportForm = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const [openContractForm, setOpenContractForm] = useState(true);
  const [ImportContractModalOpen, SetImportContractModalOpen] = useState(false);
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

  const [selectedFile, setSelectedFile] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleClose = () => {
    setOpenContractForm(false);
  };

  const handleCancel = () => {
    setOpenContractForm(false);
    setSuccessOpen(false);
    navigate("/contracts");
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      accept: {
        "text/csv": [".csv"],
        "application/vnd.ms-excel": [".xls"], // old Excel format
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          ".xlsx",
        ], // modern Excel format
      },
      maxSize: 5 * 1024 * 1024, // 5MB limit
      onDrop: (acceptedFiles) => {
        setSelectedFile(acceptedFiles[0]);
      },
    });

  const SubmitForm = () => {
    // snackbar.success("Data saved successfully!")
    // navigate("/contracts")
    SetImportContractModalOpen(true);
  };

  const handleImport = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      SetImportContractModalOpen(false);
      setSuccessOpen(true);
    }
  };

  return (
    <FullScreenDialog
      open={openContractForm}
      onClose={handleCancel}
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
              <TextField
                fullWidth
                placeholder=""
                value={formData.supplierName}
                onChange={handleChange("supplierName")}
              />
            </Grid>

            {/* <Grid size={{ xs: 12, sm: 12, md: 3 }}>
            <Typography sx={{ ...commonLabelStyle }}>MSA Code</Typography>
            <TextField fullWidth placeholder="" value={formData.msaCode}
              onChange={handleChange("msaCode")} />
          </Grid> */}

            <Grid size={{ xs: 12, sm: 12, md: 3 }}>
              <Typography sx={{ ...commonLabelStyle }}>MSA Code</Typography>
              <TextField
                fullWidth
                placeholder=""
                value={formData.msaCode}
                onChange={handleChange("msaCode")}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 3 }}>
              <Typography sx={{ ...commonLabelStyle }}>MSA Title</Typography>
              <TextField
                fullWidth
                placeholder=""
                value={formData.msaTitle}
                onChange={handleChange("msaTitle")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 3 }}>
              <Typography sx={{ ...commonLabelStyle }}>MSA Duration</Typography>
              <TextField
                fullWidth
                placeholder=""
                value={formData.msaDuration}
                onChange={handleChange("msaDuration")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 3 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                SOW Value | TCV
              </Typography>
              <TextField
                fullWidth
                placeholder=""
                value={formData.sowValue}
                onChange={handleChange("sowValue")}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 3 }}>
              <Typography sx={{ ...commonLabelStyle }}>Project Name</Typography>
              <TextField
                fullWidth
                placeholder=""
                value={formData.projectName}
                onChange={handleChange("projectName")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 3 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                MSA TCV | Revised TCV
              </Typography>
              <TextField
                fullWidth
                placeholder=""
                value={formData.msaTcvRevised}
                onChange={handleChange("msaTcvRevised")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 3 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                MSA TCV | Utilized
              </Typography>
              <TextField
                fullWidth
                placeholder=""
                value={formData.msaTcvUtilized}
                onChange={handleChange("msaTcvUtilized")}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 3 }}>
              <Typography sx={{ ...commonLabelStyle }}>
                Available Fund
              </Typography>
              <TextField
                fullWidth
                placeholder=""
                value={formData.availableFund}
                onChange={handleChange("availableFund")}
              />
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
              <Typography sx={{ ...commonLabelStyle }}>SOW | Status</Typography>
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
              <Typography sx={{ ...commonLabelStyle }}>Pricing Team</Typography>
              <Select fullWidth defaultValue="select" size="small">
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value=""></MenuItem>
              </Select>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 3 }}>
              <Typography sx={{ ...commonLabelStyle }}>Billing Team</Typography>
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
                  <Typography sx={{ ...commonLabelStyle }}>Issues</Typography>
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
                  <Typography sx={{ ...commonLabelStyle }}>Riskes</Typography>
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

      <Box display="flex" justifyContent="flex-start" gap={2} mt={1} mb={2}>
        <Button
          sx={{
            fontSize: "13px",
            fontWeight: 400,
            backgroundColor: "#2268E9",
            color: "#FFFFFF",
            borderRadius: "6px",
            textTransform: "none",
          }}
          onClick={SubmitForm}
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
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Box>

      <Box>
        <ModalSection
          title="Import Contract"
          open={ImportContractModalOpen}
          onClose={() => SetImportContractModalOpen(false)}
        >
          <Box sx={{ px: 3.5, py: 3.5 }}>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#555",
                mb: 2,
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
              }}
            >
              Upload your contract details easily by using our import option.
              Only files in the <br /> provided format will be accepted.{" "}
              <Typography
                component="span"
                sx={{
                  color: "#2268E9",
                  fontWeight: 400,
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                onClick={() => window.open("/Sample_Contract.csv")}
              >
                Download Sample_Contract.csv
              </Typography>
            </Typography>

            <ul
              style={{ fontSize: "13px", color: "#777", marginBottom: "16px" }}
            >
              <li>Download the sample file to see the required format.</li>
              <li>Fill in or edit your contract details in the sample file.</li>
              <li>Upload the completed file to import your contracts.</li>
            </ul>

            {/* Dropzone Area */}
            <Box
              {...getRootProps()}
              sx={{
                border: "1px dashed #2268E9",
                borderRadius: "8px",
                p: 8,
                textAlign: "center",
                backgroundColor: isDragActive ? "#f4f9ff" : "#F2F8FF",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />
              <Typography
                sx={{ fontSize: "14px", color: "#666", mb: 1, fontWeight: 500 }}
              >
                Drag and Drop file here or{" "}
                <span style={{ color: "#2268E9", cursor: "pointer" }}>
                  Choose File
                </span>
              </Typography>

              {selectedFile && (
                <Typography sx={{ fontSize: "13px", color: "#333" }}>
                  Selected: {selectedFile.name}
                </Typography>
              )}

              {fileRejections.length > 0 && (
                <Typography sx={{ fontSize: "13px", color: "red", mt: 1 }}>
                  Invalid file type or size (max 5MB). Please upload
                  CSV/XLS/XLSX only.
                </Typography>
              )}
            </Box>

            <Typography
              variant="caption"
              sx={{ display: "block", mt: 2, color: "#777" }}
            >
              Supported formats: CSV, XLS, XLSX
            </Typography>

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
                disabled={!selectedFile}
                onClick={() => {
                  handleImport();
                }}
              >
                Import File
              </Button>
              <Button
                variant="outlined"
                sx={{
                  border: "1px solid #E5E5E5",
                  color: "#061445",
                  borderRadius: "6px",
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </ModalSection>
      </Box>

      <Box>
        {/* ✅ Success Dialog */}
        <Dialog
          open={successOpen}
          onClose={() => setSuccessOpen(false)}
          PaperProps={{
            sx: {
              position: "absolute",
              top: "0%", // move near top
              left: "50%",
              transform: "translateX(-50%)", // center horizontally
              m: 0,
              fontFamily: 'Inter'
            },
          }}
        >
          <DialogContent
            sx={{ textAlign: "center", py: 4, px: 6, fontFamily: "Inter" }}
          >
            <img
              src={SuccessGif}
              alt="success"
              style={{ width: "40%", height: "40%", marginBottom: "16px" }}
            />

            <Typography
              sx={{fontSize: '16px', fontWeight: 600, color: "#008631", mb: 1 }}
            >
              Successfully Imported
            </Typography>

            <Typography sx={{ fontFamily: 'Inter', fontSize: "14px", color: "##061445",fontWeight: 400 }}>
              A Contract file has been imported successfully and you <br/> can view it
              in the contract list.
            </Typography>
          </DialogContent>

          <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
            <Button
              variant="outlined"
              sx={{ backgroundColor: "#2268E9" ,fontSize: '13px', fontWeight: 400,color: '#fff'}}
              onClick={() => {
                setSuccessOpen(false);
                navigate("/contracts"); // redirect to contract list
              }}
            >
              View Contract list
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </FullScreenDialog>
  );
};

export default ContarctImportForm;
