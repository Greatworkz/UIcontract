import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { Document, Page } from "react-pdf";

// File Upload Section
const FileUploadSection = ({ onFilesSelected }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onFilesSelected(acceptedFiles);
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [], "application/pdf": [] },
    onDrop,
    multiple: true,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "1px dashed #2268E9",
        borderRadius: "8px",
        p: 6,
        textAlign: "center",
        backgroundColor: isDragActive ? "#f4f9ff" : "#F2F8FF",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      <Typography sx={{ fontSize: "14px", color: "#666", mb: 1, fontWeight: 500 }}>
        Drag & Drop files here or{" "}
        <span style={{ color: "#2268E9", cursor: "pointer" }}>Choose Files</span>
      </Typography>
    </Box>
  );
};

// File Preview Grid
const FilePreviewSection = ({ files, onDelete, onOpen }) => {
  return (
    <Box
      sx={{
        mt: 2,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: 2,
      }}
    >
      {files.map((file, index) => {
        const isPdf = file.type === "application/pdf";
        const fileUrl = URL.createObjectURL(file);

        return (
          <Box
            key={index}
            sx={{
              position: "relative",
              border: "1px solid #E5E5E5",
              borderRadius: "8px",
              p: 1,
              backgroundColor: "#fff",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
            onClick={() => onOpen(file)}
          >
            {isPdf ? (
              <Document file={fileUrl}>
                <Page pageNumber={1} width={100} />
              </Document>
            ) : (
              <img
                src={fileUrl}
                alt={file.name}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            )}

            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(index);
              }}
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                backgroundColor: "rgba(255,255,255,0.8)",
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>

            <Typography
              sx={{
                fontSize: "12px",
                mt: 1,
                textAlign: "center",
                wordBreak: "break-word",
              }}
            >
              {file.name}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

// Modal Preview
const PreviewModal = ({ openFile, onClose }) => {
  if (!openFile) return null;

  const fileUrl = URL.createObjectURL(openFile);
  const isPdf = openFile.type === "application/pdf";

  return (
    <Dialog open={!!openFile} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ position: "relative", p: 2 }}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {isPdf ? (
          <Document file={fileUrl}>
            <Page pageNumber={1} width={600} />
          </Document>
        ) : (
          <img
            src={fileUrl}
            alt={openFile.name}
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
              display: "block",
              margin: "auto",
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

// Main Component
const FileUploaderWithPreview = () => {
  const [files, setFiles] = useState([]);
  const [openFile, setOpenFile] = useState(null);

  const handleFilesSelected = (newFiles) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDeleteFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOpenPreview = (file) => {
    setOpenFile(file);
  };

  const handleClosePreview = () => {
    setOpenFile(null);
  };

  return (
    <Box sx={{ maxWidth: "900px", margin: "auto" }}>
      <FileUploadSection onFilesSelected={handleFilesSelected} />
      {files.length > 0 && (
        <FilePreviewSection
          files={files}
          onDelete={handleDeleteFile}
          onOpen={handleOpenPreview}
        />
      )}
      <PreviewModal openFile={openFile} onClose={handleClosePreview} />
    </Box>
  );
};

export default FileUploaderWithPreview;
