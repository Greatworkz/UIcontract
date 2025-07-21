import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  Grid,
  Checkbox,
  Typography,
  IconButton,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Card,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EditIcon from '@mui/icons-material/Edit';
import CardSection from '../components/CardSection';

const pageData = [
  {
    id: 1,
    title: 'Page 1',
    section: '1.0',
    subsections: 6,
    mapped: '3/6',
    confidence: '90%',
    description:
      'This schedules 5 defines the way in which benchmarking shall be implemented under this agreement',
    image: 'https://i.pravatar.cc/100?u=page1',
  },
  {
    id: 2,
    title: 'Page 2',
    section: '2.0',
    subsections: 4,
    mapped: '3/6',
    confidence: '90%',
    description: 'This schedules 5 defines the way in which benchmarking',
    image: 'https://i.pravatar.cc/100?u=page2',
  },
];

export default function TEST() {
  const [tabIndex, setTabIndex] = useState(1);
  const [search, setSearch] = useState('');

  const handleTabChange = (e, val) => setTabIndex(val);

  return (
    <Box sx={{mt: 4}}>
    <CardSection >
      {/* Tabs */}
      <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Sections" />
        <Tab label="Pages" />
        <Tab label="Confidence" />
      </Tabs>

      {/* Tab: Pages */}
      {tabIndex === 1 && (
        <>
          {/* Filter Controls */}
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Search content"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth select label="All Confidence" defaultValue="">
                <MenuItem value="">All</MenuItem>
                <MenuItem value="90%">90%</MenuItem>
                <MenuItem value="80%">80%</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          {/* Table Inside Card */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                {/* <TableCell>Image</TableCell>
                <TableCell>Page Info</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
                <TableCell>SubSections</TableCell>
                <TableCell>Update</TableCell> */}
              </TableRow>
            </TableHead>

            <TableBody>
              {pageData.map((page) => (
                <TableRow key={page.id}>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>

                  <TableCell>
                    <img
                      src={page.image}
                      alt={page.title}
                      style={{
                        width: 60,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: 4,
                        border: '1px solid #ccc',
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography fontWeight={600}>{page.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Section: {page.section} | SubSections: {page.subsections} | Mapped: {page.mapped}
                    </Typography>
                    <Box
                      mt={1}
                      display="inline-block"
                      bgcolor="#FFF3E0"
                      px={1}
                      py={0.5}
                      borderRadius={1}
                      fontSize="12px"
                      fontWeight="bold"
                      color="#F57C00"
                    >
                      {page.confidence} CONFIDENCE
                    </Box>
                  </TableCell>

                  <TableCell sx={{ maxWidth: 300 }}>
                    <Typography variant="body2" noWrap title={page.description}>
                      {page.description}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <IconButton size="small" title="Copy">
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" title="Open">
                      <OpenInNewIcon fontSize="small" />
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    <Button variant="text" size="small" sx={{ textTransform: 'none' }}>
                      View SubSections
                    </Button>
                  </TableCell>

                  <TableCell>
                    <IconButton size="small" title="Update">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </CardSection>
    </Box>
  );
}
