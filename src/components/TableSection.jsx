import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Status color logic
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "active":
      return "#2268E9";
    case "completed":
      return "#28a745";
    case "pending":
      return "#ffc107";
    case "terminate":
      return "#dc3545";
    default:
      return "#6c757d";
  }
};

const TableSection = ({ headers = [], rows = [], onEdit, onDelete,onRowClick }) => {
  if (!Array.isArray(headers) || !Array.isArray(rows)) return null;

  return (
    <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
      <Table size="small" aria-label="responsive table">
        <TableHead>
          <TableRow>
            {headers.map((header, idx) => (
              <TableCell key={idx} sx={{ fontWeight: "bold", py: 2, px: 2 }}>
                {header}
              </TableCell>
            ))}
            <TableCell sx={{ fontWeight: "bold", py: 2, px: 2 }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={headers.length + 1}>
                <Typography align="center" color="text.secondary">
                  No data available
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, rowIndex) => (
              <TableRow key={rowIndex} hover 
               sx={{ cursor: "pointer" }}
               onClick={() => onRowClick?.(row)} >
                {headers.map((header, colIndex) => {
                  const key = header.toLowerCase();
                  const value = row[key] ?? "—";

                  return (
                    <TableCell
                      key={colIndex}
                      sx={{
                        py: 2,
                        px: 2,
                        fontSize: "0.925rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {key === "status" ? (
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "14px",
                            color: getStatusColor(value),
                            textTransform: "capitalize",
                          }}
                        >
                          {value}
                        </Typography>
                      ) : (
                        value
                      )}
                    </TableCell>
                  );
                })}

                <TableCell sx={{ py: 1, px: 2 }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton color="primary" onClick={() => onEdit?.(row)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="error" onClick={() => onDelete?.(row)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableSection;
