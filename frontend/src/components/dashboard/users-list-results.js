import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
	Box,
	Card,
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Button,
	Snackbar,
	Alert
} from '@mui/material';
import AdminService from '../../services/admin.service';

export const UsersListResults = ({ users, ...rest }) => {
	const [selectedUsersIds, setSelectedUsersIds] = useState([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);
	const [snackbar, setSnackbar] = useState(false);

	const handleSelectAll = (event) => {
		let newSelectedUsersIds;

		if (event.target.checked) {
			newSelectedUsersIds = users.map((users) => users.id);
		} else {
			newSelectedUsersIds = [];
		}

		setSelectedUsersIds(newSelectedUsersIds);
	};

	const handleSelectOne = (event, id) => {
		const selectedIndex = selectedUsersIds.indexOf(id);
		let newSelectedUsersIds = [];

		if (selectedIndex === -1) {
			newSelectedUsersIds = newSelectedUsersIds.concat(selectedUsersIds, id);
		} else if (selectedIndex === 0) {
			newSelectedUsersIds = newSelectedUsersIds.concat(selectedUsersIds.slice(1));
		} else if (selectedIndex === selectedUsersIds.length - 1) {
			newSelectedUsersIds = newSelectedUsersIds.concat(selectedUsersIds.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelectedUsersIds = newSelectedUsersIds.concat(
				selectedUsersIds.slice(0, selectedIndex),
				selectedUsersIds.slice(selectedIndex + 1)
			);
		}

		setSelectedUsersIds(newSelectedUsersIds);
	};

	const handleLimitChange = (event) => {
		setLimit(event.target.value);
	};

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const validateUser = (user) => {
		AdminService.validateUser(user).then(res => {
			if (res) {
				setSnackbar(true)
			}
		});
	}

	return (
		<Card {...rest}>
			<PerfectScrollbar>
				<Box sx={{ minWidth: 1050 }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox">
									<Checkbox
										checked={selectedUsersIds.length === users.length}
										color="primary"
										indeterminate={
											selectedUsersIds.length > 0
											&& selectedUsersIds.length < users.length
										}
										onChange={handleSelectAll}
									/>
								</TableCell>
								<TableCell>
									Email
								</TableCell>
								<TableCell>
									Username
								</TableCell>
								<TableCell>
									Stare
								</TableCell>
								<TableCell>
									Acțiuni
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.slice(0, limit).map((users) => (
								<TableRow
									hover
									key={users.id}
									selected={selectedUsersIds.indexOf(users.id) !== -1}
								>
									<TableCell padding="checkbox">
										<Checkbox
											checked={selectedUsersIds.indexOf(users.id) !== -1}
											onChange={(event) => handleSelectOne(event, users.id)}
											value="true"
										/>
									</TableCell>
									<TableCell>
										{users.username}
									</TableCell>
									<TableCell>
										{users.email}
									</TableCell>
									<TableCell>
										{users.confirmed ? 'Validat' : 'Nevalidat'}
									</TableCell>
									<TableCell>
										{!users.confirmed && <Button variant='text' onClick={() => validateUser(users.id)}>Validează</Button>}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>
			</PerfectScrollbar>
			<TablePagination
				component="div"
				count={users.length}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleLimitChange}
				page={page}
				rowsPerPage={limit}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		
		<Snackbar open={snackbar} autoHideDuration={2000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
			<Alert severity="success" sx={{ width: '100%' }}>
				Contul a fost validat cu succes.
			</Alert>
      	</Snackbar>
		</Card>
	);
};

UsersListResults.propTypes = {
	users: PropTypes.array.isRequired
};
