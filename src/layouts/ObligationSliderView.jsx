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
  Button,Stack,Checkbox,Select,MenuItem
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModalSection from "../components/ModalSection";

const ViewDocDetails = [
  { label: '', key: ''}
]

const CustomerDetails = [ 
  {label : 'Customer Name', value: 'ALG Glbal Limited'},
  {label : 'Document Name', value: 'NDA_2024_Analysis_Report.pdf'},
  {label : 'Contract Type', value: 'Non-Disclosure Agreements (NDAs)'},
  {label : 'Selected Obligations', value: '02'}
 ]
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
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3 }}>
        <Box justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="subtitle1" fontWeight={600}>
              {page.title || "Untitled Page"}
            </Typography>
            <Box
              fontSize={10}
              px={1}
              py={0.3}
              bgcolor="#FFF3E0"
              borderRadius={1}
              color="#F57C00"
              fontWeight="bold"
            >
              {page.confidence} CONFIDENCE
            </Box>
            <Box flex={1} textAlign="right">
              <IconButton size="small" onClick={onClose}>
                <CloseIcon sx={{ color: "#FF5252" }} />
              </IconButton>
            </Box>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Section: {page.section} {" | "}
              SubSections: {page.subsections} {" | "}
              Parent: {page.parent || "N/A"}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" sx={{ textAlign: 'end',fontWeight: 600,color: '#2268E9',cursor: 'pointer' }}
         onClick={() => setMappingModalOpen(true)} >Map Domain</Typography>

        {Array.isArray(page.sections) && page.sections.length > 0 ? (
          page.sections.map((section, index) => (
            <Accordion
              key={index}
              defaultExpanded
              sx={{
                backgroundColor: "#ffffff",
                border: "1px solid #E7EEFC",
                borderRadius: "10px",
                boxShadow: "0 6px 6px rgba(0,0,0,0.08)",
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
                }}
              >
               <Box display="flex" alignItems="center">
                <Checkbox
                  checked={!!selectedSections[index]}
                  onChange={() => handleCheckboxChange(index)}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="subtitle2">
                  {section.title || `Section ${index + 1}`}
                </Typography>
              </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2, py: 1 }}>
                <Typography fontSize={13} fontWeight={500} gutterBottom>
                  OB - Domain Mapping Details
                </Typography>
                <Typography fontSize={12}>
                  Accountability: {section.accountability || "--"}
                </Typography>
                <Typography fontSize={12}>
                  Severity: {section.severity || "--"}
                </Typography>
                <Typography fontSize={12}>
                  Frequency: {section.frequency || "--"}
                </Typography>
                <Typography fontSize={12}>
                  Deliverable: {section.deliverable || "--"}
                </Typography>

                <Typography fontWeight={500} mt={2}>
                  T&C Obligations
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                  {section.obligation || "--"}
                </Typography>

                <Box mt={2} display="flex" justifyContent="center">
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => setModalOpen(true)}
                  >
                    📄 View Document
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No section details available.
          </Typography>
        )}
      </Box>

      <Box>
        <ModalSection
          title="Test"
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={3}
            p={2}
          >
            {/* Left - PDF Preview Image */}
            <Box
              flex={1}
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
                src="../assets/paper_2.jpg"
                alt="PDF Preview"
                style={{ maxWidth: "100%", maxHeight: 500 }}
              />
            </Box>

            {/* Right - Obligation Details */}
            <Box flex={1.2}>
              <Typography
                variant="h6"
                sx={{ minWidth: 140, color: "#60698F" }}
              >
                T&C Obligations
              </Typography>
              <Typography variant="body2" mb={2}>
                This schedules 5 defines the way in which benchmarking shall be
                implemented under this agreement. This schedules 5 defines the
                way in which benchmarking shall...
              </Typography>

              <Stack spacing={1.5} p={1}>
                <Typography variant="body2">
                  <strong>Accountability:</strong> Not Assigned
                </Typography>
                <Typography variant="body2">
                  <strong>Frequency:</strong> Not Assigned
                </Typography>
                <Typography variant="body2">
                  <strong>Severity:</strong> Not Assigned
                </Typography>
                <Typography variant="body2">
                  <strong>Deliverable:</strong> Not Assigned
                </Typography>
              </Stack>


              <Divider sx={{ my: 2 }} />

              <Stack spacing={1.5} p={1}>
                <Typography variant="body2">
                  <strong>Accountability:</strong> Not Assigned
                </Typography>
                <Typography variant="body2">
                  <strong>Frequency:</strong> Not Assigned
                </Typography>
                <Typography variant="body2">
                  <strong>Severity:</strong> Not Assigned
                </Typography>
                <Typography variant="body2">
                  <strong>Deliverable:</strong> Not Assigned
                </Typography>
              </Stack>
            </Box>
          </Box>
        </ModalSection>
      </Box>

      <Box>
        <ModalSection title='OB-Domain Mapping Details'
          open={MappingmodalOpen}
          onClose={() => setMappingModalOpen(false)}>
            <Stack spacing={2.5} sx={{ px: 2, py: 1.5 }}>
              {CustomerDetails.map((item, idx) => (
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
            <Typography sx={{fontWeight: 600,marginTop: '10px'}}> Mapping Details </Typography>
            <Stack spacing={2.5} sx={{ px: 2, py: 1.5 }}>
                {[
                  {
                    label: 'Accountability',
                    options: ['Legal Team', 'Finance Dept', 'Operations', 'Procurement'],
                  },
                  {
                    label: 'Severity',
                    options: ['Low', 'Medium', 'High', 'Critical'],
                  },
                  {
                    label: 'Frequency',
                    options: ['One-time', 'Monthly', 'Quarterly', 'Annually'],
                  },
                  {
                    label: 'Deliverable',
                    options: ['Compliance Report', 'Invoice Summary', 'Benchmarking Doc'],
                  },
                ].map((field, idx) => (
                  <Box key={idx} display="flex" alignItems="center">
                    <Typography
                      variant="body2"
                      sx={{ minWidth: 140, color: "#60698F", fontWeight: 500 }}
                    >
                      {field.label}
                    </Typography>
                    <Select
                      fullWidth
                      size="small"
                      defaultValue=""
                      sx={{ ml: 1 }}
                    >
                      <MenuItem value="" disabled>Select</MenuItem>
                      {field.options.map((option, i) => (
                        <MenuItem key={i} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                ))}
              </Stack>
              <Divider sx={{ my: 2 }}  />
              <Box display='flex' gap={1}>
                <Button variant="outlined" sx={{ backgroundColor: '#2268E9',color: '#fff'}}>Map</Button>
                <Button variant="outlined">Cancel</Button>
              </Box>
        </ModalSection>
      </Box>
    </Drawer>
  );
};

export default ObligationSliderView;
