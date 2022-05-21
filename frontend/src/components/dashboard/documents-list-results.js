import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';

export const DocumentsListResults = ({ documents, ...rest }) => {
  const [selectedDocumentsIds, setSelectedDocumentsIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedDocumentsIds;

    if (event.target.checked) {
      newSelectedDocumentsIds = documents.map((documents) => documents.id);
    } else {
      newSelectedDocumentsIds = [];
    }

    setSelectedDocumentsIds(newSelectedDocumentsIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedDocumentsIds.indexOf(id);
    let newSelectedDocumentsIds = [];

    if (selectedIndex === -1) {
      newSelectedDocumentsIds = newSelectedDocumentsIds.concat(selectedDocumentsIds, id);
    } else if (selectedIndex === 0) {
      newSelectedDocumentsIds = newSelectedDocumentsIds.concat(selectedDocumentsIds.slice(1));
    } else if (selectedIndex === selectedDocumentsIds.length - 1) {
      newSelectedDocumentsIds = newSelectedDocumentsIds.concat(selectedDocumentsIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedDocumentsIds = newSelectedDocumentsIds.concat(
        selectedDocumentsIds.slice(0, selectedIndex),
        selectedDocumentsIds.slice(selectedIndex + 1)
      );
    }

    setSelectedDocumentsIds(newSelectedDocumentsIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedDocumentsIds.length === documents.length}
                    color="primary"
                    indeterminate={
                      selectedDocumentsIds.length > 0
                      && selectedDocumentsIds.length < documents.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Registration date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.slice(0, limit).map((documents) => (
                <TableRow
                  hover
                  key={documents.id}
                  selected={selectedDocumentsIds.indexOf(documents.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedDocumentsIds.indexOf(documents.id) !== -1}
                      onChange={(event) => handleSelectOne(event, documents.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={documents.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(documents.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {documents.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {documents.email}
                  </TableCell>
                  <TableCell>
                    {`${documents.address.city}, ${documents.address.state}, ${documents.address.country}`}
                  </TableCell>
                  <TableCell>
                    {documents.phone}
                  </TableCell>
                  <TableCell>
                    {format(documents.createdAt, 'dd/MM/yyyy')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={documents.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

DocumentsListResults.propTypes = {
  documents: PropTypes.array.isRequired
};
