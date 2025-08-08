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
      return "#A96800";
    case "completed":
      return "#008631";
    case "pending":
      return "#ffc107";
    case "terminate":
      return "#AF0000";
    default:
      return "#6c757d";
  }
};

const TableSection = ({
  headers = [],
  rows = [],
  onEdit,
  onDelete,
  onRowClick,
}) => {
  if (!Array.isArray(headers) || !Array.isArray(rows)) return null;

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        minHeight: "100px",
        overflowX: "auto",
        borderTop: "1px solid #0A18290D",
        borderBottom: "1px solid #0A18290D",
        borderLeft: "none",
        borderRight: "none",
        boxShadow: "none", // optional: remove Paper shadow
      }}
    >
      <Table size="small" aria-label="responsive table">
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                backgroundColor: "#FAFAFB",
                color: "#60698F",
                fontWeight: 600,
                py: 1,
                px: 1,
                borderBottom: "1px solid #E0E0E0",
                textTransform: "uppercase",
                fontSize: "12px",
                letterSpacing: "0.15em",
                // verticalAlign: "middle",
              },
              borderTop: "1px solid #E0E0E0",
            }}
          >
            {headers.map((header, idx) => (
              <TableCell key={idx} sx={{ fontWeight: "bold", py: 2, px: 2 }}>
                {header}
              </TableCell>
            ))}
            {(onEdit || onDelete) && (
              <TableCell sx={{ fontWeight: "bold", py: 2, px: 2 }}>
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={headers.length + (onEdit || onDelete ? 1 : 0)}
                sx={{ fontSize: "13px" }}
              >
                <Typography
                  align="center"
                  sx={{ fontSize: "13px", color: "#60698F", fontWeight: 500 }}
                >
                  No data available
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                align="left"
                sx={{
                  cursor: "pointer",
                  fontWeight: 500,

                  "&:hover": {
                    // backgroundColor: "#fff",
                    "& td": {
                      color: "#2268E9",
                      fontWeight: 500,
                      background: "#F9FAFF",
                    },
                  },
                }}
                onClick={() => onRowClick?.(row)}
              >
                {headers.map((header, colIndex) => {
                  const key = header;
                  const value = row[key] ?? "—";
                  return (
                    <TableCell
                      key={colIndex}
                      align="left"
                      sx={{
                        py: 2,
                        px: 2,
                        fontSize: "13px",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #DCDCEF",
                      }}
                    >
                      {key === "Status" ? (
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "13px",
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

                {(onEdit || onDelete) && (
                  <TableCell align="left" sx={{ py: 1, px: 2 }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {onEdit && (
                        <IconButton
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(row);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      )}
                      {onDelete && (
                        <IconButton
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(row);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableSection;
