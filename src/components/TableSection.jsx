import React, { useState, useEffect } from "react";
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
  Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

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
  onView,
  onRowClick,
  onSelectionChange,
  ischeckboxWant = false,
  onMap,
}) => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (onSelectionChange) {
      const selectedRowData = Array.from(selectedRows).map(index => rows[index]);
      onSelectionChange(selectedRowData);
    }
  }, [selectedRows, rows, onSelectionChange]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(rows.map((_, index) => index)));
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (rowIndex) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowIndex)) {
      newSelected.delete(rowIndex);
    } else {
      newSelected.add(rowIndex);
    }
    setSelectedRows(newSelected);
    setSelectAll(newSelected.size === rows.length && rows.length > 0);
  };

  useEffect(() => {
    setSelectAll(selectedRows.size === rows.length && rows.length > 0);
  }, [selectedRows, rows]);

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
        boxShadow: "none",
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
                py: 2,
                px: 2,
                borderBottom: "1px solid #E0E0E0",
                textTransform: "uppercase",
                fontSize: "12px",
                letterSpacing: "0.15em",
              },
              borderTop: "1px solid #E0E0E0",
            }}
          >
            {ischeckboxWant && (
              <TableCell sx={{ fontWeight: "bold", width: "48px" }}>
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAll}
                  indeterminate={selectedRows.size > 0 && selectedRows.size < rows.length}
                  sx={{
                    color: "#60698F",
                    pl:2,
                    '&.Mui-checked': {
                      color: "#2268E9",
                    },
                    '&.MuiCheckbox-indeterminate': {
                      color: "#2268E9",
                    },
                  }}
                />
              </TableCell>
            )}
            {headers.map((header, idx) => (
              <TableCell key={idx} sx={{ fontWeight: "bold", py: 2, px: 2 }}>
                {header}
              </TableCell>
            ))}
            {(onEdit || onDelete || onView || onMap) && (
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
                colSpan={headers.length + (ischeckboxWant ? 1 : 0) + (onEdit || onDelete || onView || onMap ? 1 : 0)}
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
                    "& td": {
                      color: "#2268E9",
                      fontWeight: 500,
                      background: "#F9FAFF",
                    },
                  },
                }}
                onClick={() => onRowClick?.(row)}
              >
                {ischeckboxWant && (
                  <TableCell
                    sx={{
                      py: 2,
                      px: 2,
                      fontSize: "13px",
                      borderBottom: "1px solid #DCDCEF",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={selectedRows.has(rowIndex)}
                      onChange={() => handleRowSelect(rowIndex)}
                      sx={{
                        color: "#60698F",
                        '&.Mui-checked': {
                          color: "#2268E9",
                        },
                      }}
                    />
                  </TableCell>
                )}
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

                {(onEdit || onDelete || onView || onMap) && (
                  <TableCell align="left" sx={{ py: 1, px: 2, borderBottom: "1px solid #DCDCEF" }}>
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
                      
                      {onView && (
                        <IconButton
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            onView(row);
                          }}
                          sx={{
                            backgroundColor: "white",
                            color: "#2268E9",
                            fontSize: "12px",
                            fontWeight: 500,
                            borderRadius: "4px",
                            padding: "4px 8px",
                            minWidth: "auto",
                            height: "24px",
                            "&:hover": {
                               backgroundColor: "#1557D0",
                              color:'#fff'
                            },
                          }}
                        >
                          View
                        </IconButton>
                      )}

                      {onMap && (
                        <IconButton
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            onMap(row);
                          }}
                          sx={{
                            backgroundColor: "white",
                            color: "#2268E9",
                            fontSize: "12px",
                            fontWeight: 500,
                            borderRadius: "4px",
                            padding: "4px 8px",
                            minWidth: "auto",
                            height: "24px",
                            "&:hover": {
                              backgroundColor: "#1557D0",
                              color:'#fff'
                            },
                          }}
                        >
                          Map
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