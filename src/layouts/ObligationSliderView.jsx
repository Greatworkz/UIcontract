import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Stack,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModalSection from "../components/ModalSection";
import BotSvg from "../assets/icons/BOT 1.svg";
import ViewDocIcon from "../assets/icons/View Document.svg";
import PdfImage from "../assets/icons/pdfImage.svg";
const ViewDocDetails = [{ label: "", key: "" }];

const CustomerDetails = [
  { label: "Customer Name", value: "ALG Glbal Limited" },
  { label: "Document Name", value: "NDA_2024_Analysis_Report.pdf" },
  { label: "Contract Type", value: "Non-Disclosure Agreements (NDAs)" },
  { label: "Selected Obligations", value: "02" },
];

const ObligationSliderView = ({ open, onClose, page }) => {
  if (!page) {
    return null;
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [MappingmodalOpen, setMappingModalOpen] = useState(false);
  const [selectedSections, setSelectedSections] = useState({});

  const handleCheckboxChange = (index) => {
    setSelectedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const PdfModaldetails1 = [
    {
      label: "T&C Obligations",
      value:
        "This schedules 5 defines the way in which benchmarking shall be implemented under this agreement. This schedules 5 defines the way in which benchmarking shall...",
    },
    { label: "No.of Pages", value: "03" },
    { label: "Section", value: "3.0" },
    { label: "Sub Section", value: "3.1" },
    { label: "Deliverable:", value: "Not Assigned" },
  ];
  const PdfModaldetails2 = [
    { label: "Accountability:", value: "Not Assigned" },
    { label: "Frequency:", value: "Not Assigned" },
    { label: "Severity:", value: "Not Assigned" },
    { label: "Deliverable:", value: "Not Assigned" },
  ];
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3 }}>
        <Box justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={2}>
            <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
              {page.title || "Untitled Page"}
            </Typography>
            <Box
              display="inline-block"
              bgcolor="#FFF3E0"
              px={1}
              py={0.5}
              fontSize="10px"
              color="#996800"
              sx={{
                border: "1px solid #FFF1D3",
                fontWeight: 600,
                borderRadius: "3px",
                letterSpacing: "1px",
              }}
            >
              {page.confidence} CONFIDENCE
            </Box>
            <img src={BotSvg} alt="" style={{ width: 16, height: 16 }} />
            <Box flex={1} textAlign="right">
              <IconButton size="small" onClick={onClose}>
                <CloseIcon sx={{ color: "#FF5252" }} />
              </IconButton>
            </Box>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#60698F",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              Section:{" "}
              <Box component="span" sx={{ color: "#21263C" }}>
                {page.section}
              </Box>
              <Box
                component="span"
                sx={{
                  width: "0px",
                  height: "13px",
                  borderLeft: "1px solid #F2F2FF",
                }}
              />
              SubSections:
              <Box component="span" sx={{ color: "#21263C" }}>
                {page.subsections}
              </Box>
              <Box
                component="span"
                sx={{
                  width: "0px",
                  height: "13px",
                  borderLeft: "1px solid #F2F2FF",
                }}
              />
              Parent:
              <Box component="span" sx={{ color: "#21263C" }}>
                {page.parent || "N/A"}
              </Box>
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2, color: "#DCDCEF" }} />
        <Typography
          variant="subtitle2"
          sx={{
            textAlign: "end",
            fontWeight: 600,
            color: "#2268E9",
            cursor: "pointer",
          }}
          onClick={() => setMappingModalOpen(true)}
        >
          Map Domain
        </Typography>

        {Array.isArray(page.sections) && page.sections.length > 0 ? (
          page.sections.map((section, index) => {
            const detailItems = [
              {
                label: "Accountability",
                value: section.accountability || "--",
              },
              { label: "Severity", value: section.severity || "--" },
              { label: "Frequency", value: section.frequency || "--" },
              { label: "Deliverable", value: section.deliverable || "--" },
            ];

            return (
              <Accordion
                key={index}
                defaultExpanded
                sx={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #E7EEFC",
                  borderRadius: "6px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  mb: 2,
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    fontWeight: 600,
                    color: "#333",
                    fontSize: "15px",
                    "& .MuiAccordionSummary-content.Mui-expanded": {
                      margin: 0,
                    },
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "6px",
                      backgroundColor: "#FAFAFD",
                      opacity: 1,
                    }}
                  >
                    <Checkbox
                      checked={!!selectedSections[index]}
                      onChange={() => handleCheckboxChange(index)}
                      size="small"
                      sx={{
                        mr: 1,
                        color: "#E5E5E5",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{ fontSize: "14px", fontWeight: 400 }}
                    >
                      {section.title || `Section ${index + 1}`}
                    </Typography>
                  </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ px: 2, py: 1 }}>
                  <Typography
                    sx={{ color: "#061445", fontWeight: 600, fontSize: "14px" }}
                  >
                    OB - Domain Mapping Details
                  </Typography>
                  <Box
                    sx={{
                      flexGrow: 1,
                      textAlign: "start",
                      overflow: "auto",
                      py: 1.5,
                    }}
                  >
                    <Stack spacing={2}>
                      {detailItems.map((item, idx) => (
                        <Box
                          key={idx}
                          display="flex"
                          flexWrap="nowrap"
                          minWidth={0}
                        >
                          <Typography
                            sx={{
                              width: 140,
                              color: "#60698F",
                              fontSize: "13px",
                              fontWeight: 500,
                              flexShrink: 0,
                            }}
                          >
                            {item.label}
                          </Typography>
                          <Typography
                            sx={{
                              ml: 1,
                              color: "#21263C",
                              fontSize: "13px",
                              fontWeight: 500,
                              whiteSpace: "nowrap",
                            }}
                            title={item.value}
                          >
                            {item.value}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                    <Divider
                      sx={{
                        mt: 2,
                        borderTop: "1px dashed #DCDCEF",
                        opacity: 1,
                      }}
                    />

                    <Typography
                      sx={{
                        color: "#061445",
                        fontWeight: 500,
                        fontSize: "14px",
                      }}
                      mt={2}
                    >
                      T&C Obligations
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#21263C",
                        fontSize: "14px",
                        fontWeight: 400,
                        whiteSpace: "pre-line",
                      }}
                      mt={1}
                    >
                      {section.obligation || "--"}
                    </Typography>

                    <Divider
                      sx={{
                        my: 2,
                        borderTop: "1px dashed #DCDCEF",
                        opacity: 1,
                        transform: "rotate(0deg)",
                      }}
                    />

                    <Box mt={2} display="flex" justifyContent="center">
                      <Button
                        variant="text"
                        size="small"
                        startIcon={
                          <img
                            src={ViewDocIcon}
                            alt="view"
                            style={{ width: 16, height: 16 }}
                          />
                        }
                        onClick={() => setModalOpen(true)}
                        sx={{
                          letterSpacing: "0.2px",
                          textTransform: "capitalize",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        View Document
                      </Button>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })
        ) : (
          <Typography>No sections available.</Typography>
        )}
      </Box>

      <ModalSection
        title="Test"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
          {/* Left - PDF Content + Image Preview */}
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            gap={2}
            sx={{ backgroundColor: "#F6F6F6" }}
          >
            <Box
              sx={{
                p: 1,
                backgroundColor: "#00000099",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              PDF controls
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={400}
              border="1px solid #eee"
              borderRadius={2}
              bgcolor="#f9f9f9"
              p={2}
            >
              <img
                src={PdfImage}
                alt="PDF Preview"
                style={{ maxWidth: "100%", maxHeight: 700 }}
              />
            </Box>
          </Box>

          {/* Right - Obligation Details */}
          <Box flex={1.2} sx={{ p: 2 }}>
            <Stack spacing={2.5} p={1}>
              {PdfModaldetails1.map((item, idx) => (
                <Box key={idx} display="flex" flexWrap="nowrap" minWidth={0}>
                  <Typography
                    sx={{
                      width: 140,
                      color: "#60698F",
                      fontSize: "13px",
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#21263C",
                      fontSize: "13px",
                      fontWeight: 400,
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      flex: 1,
                      
                    }}
                    title={item.value}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Divider sx={{ my: 2, border: "1px solid #DCDCEF" }} />

            <Stack spacing={2.5} p={1}>
              {PdfModaldetails2.map((item, idx) => (
                <Box key={idx} display="flex" flexWrap="nowrap" minWidth={0}>
                  <Typography
                    sx={{
                      width: 140,
                      color: "#60698F",
                      fontSize: "13px",
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#21263C",
                      fontSize: "13px",
                      fontWeight: 400,
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      flex: 1,
                    }}
                    title={item.value}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="flex-start"
          px={3}
          py={2}
          borderTop="1px solid #DCDCEF"
          mt={2}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={() => setModalOpen(false)}
            sx={{
              width: 60,
              height: 34,
              borderRadius: "6px",
              border: "1px solid #2268E9",
              textTransform: "none",
              color: "#fff",
              backgroundColor: "#2268E9",
            }}
          >
            Close
          </Button>
        </Box>
      </ModalSection>

      <Box>
        <ModalSection
          title="OB-Domain Mapping Details"
          open={MappingmodalOpen}
          onClose={() => setMappingModalOpen(false)}
        >
          <Box sx={{ px: 3.5, py: 3 }}>
            <Stack spacing={2.5} >
              {CustomerDetails.map((item, idx) => (
                <Box key={idx} display="flex">
                  <Typography
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
                    sx={{
                      minWidth: 140,
                      color: "#21263C",
                      fontSize: "13px",
                      fontWeight: 500,
                      ml: 1,
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <Divider sx={{ my: 2, border: "1px solid #DCDCEF" }} />

            <Typography sx={{ fontWeight: 600, marginTop: "10px",marginBottom: "10px",fontSize: '14px',color: '#061445' }}>
              {" "}
              Mapping Details{" "}
            </Typography>
            <Stack spacing={2.5} >
              {[
                {
                  label: "Accountability",
                  options: [
                    "Legal Team",
                    "Finance Dept",
                    "Operations",
                    "Procurement",
                  ],
                },
                {
                  label: "Severity",
                  options: ["Low", "Medium", "High", "Critical"],
                },
                {
                  label: "Frequency",
                  options: ["One-time", "Monthly", "Quarterly", "Annually"],
                },
                {
                  label: "Deliverable",
                  options: [
                    "Compliance Report",
                    "Invoice Summary",
                    "Benchmarking Doc",
                  ],
                },
              ].map((field, idx) => (
                <Box key={idx} display="flex" alignItems="center">
                  <Typography
                    sx={{ minWidth: 140, color: "#60698F", fontWeight: 500 ,fontSize: '13px'}}
                  >
                    {field.label}
                  </Typography>
                  <Select fullWidth size="small" defaultValue="" sx={{ ml: 1 }}>
                    <MenuItem value="" disabled>
                      Select
                    </MenuItem>
                    {field.options.map((option, i) => (
                      <MenuItem key={i} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              ))}
            </Stack>
            <Divider sx={{ my: 2, border: "1px solid #DCDCEF" }} />
            <Box display="flex" gap={1} sx={{fontSize: '13px',fontWeight: 400}}>
              <Button
                variant="outlined"
                sx={{ backgroundColor: "#2268E9",border : '1px solid #2268E9', color: "#fff", borderRadius: '6px'}}
              >
                Map
              </Button>
              <Button variant="outlined" sx={{ border : '1px solid #E5E5E5' , color: '#061445',borderRadius: '6px'}}>Cancel</Button>
            </Box>
          </Box>
        </ModalSection>
      </Box>
    </Drawer>
  );
};

export default ObligationSliderView;
