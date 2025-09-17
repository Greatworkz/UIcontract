import React, { useCallback, useState } from "react";
import {
  Box,
  Typography,
  Link,
  Chip,
  IconButton,
  Paper,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  // handle dropped files
  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpeg", ".jpg"],
    },
    multiple: false,
  });

  // remove file
  const handleRemoveFile = (file) => {
    setFiles((prev) => prev.filter((f) => f !== file));
  };

  return (
    <Box>
      {/* Label */}
      <Typography
        variant="subtitle2"
        sx={{ mb: 1, fontWeight: 600, color: "#333" }}
      >
        Attachments
      </Typography>

      {/* Dropzone Area */}
      <Paper
        {...getRootProps()}
        sx={{
          border: "2px dashed #A5B4FC",
          borderRadius: "8px",
          backgroundColor: "#F9FAFB",
          p: 3,
          textAlign: "center",
          cursor: "pointer",
          "&:hover": { backgroundColor: "#F3F4F6" },
        }}
        elevation={0}
      >
        <input {...getInputProps()} />

        {/* If file uploaded, show file with chip */}
        {files.length > 0 ? (
          files.map((file, index) => (
            <Box key={index} display="flex" justifyContent="center">
              <Chip
                icon={<InsertDriveFileIcon />}
                label={file.name}
                color="primary"
                variant="filled"
                onDelete={() => handleRemoveFile(file)}
                deleteIcon={
                  <IconButton size="small">
                    <CloseIcon sx={{ fontSize: "16px" }} />
                  </IconButton>
                }
                sx={{ fontSize: "13px", height: "32px" }}
              />
            </Box>
          ))
        ) : (
          <>
            <InsertDriveFileIcon sx={{ fontSize: 40, color: "#94A3B8", mb: 1 }} />
            <Typography variant="body2" sx={{ color: "#555" }}>
              Drag and Drop file here or{" "}
              <Link component="button" underline="hover" sx={{color:'blue',fontSize:'13px'}}>
                Choose File
              </Link>
            </Typography>
          </>
        )}
      </Paper>

      {/* Supported file types info */}
      <Typography
        variant="caption"
        sx={{ display: "block", mt: 1, color: "#777" }}
      >
        Supported formats: Jpeg, Jpg or Pdf
      </Typography>
    </Box>
  );
};

export default FileUpload;