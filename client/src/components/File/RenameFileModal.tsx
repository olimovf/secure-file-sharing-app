import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

export default function RenameFileModal() {
	const [open, setOpen] = React.useState(true);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Button variant='outlined' onClick={handleClickOpen}>
				Open dialog
			</Button>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby='customized-dialog-title'
				open={open}
			>
				<DialogTitle sx={{ m: 0, px: 2, py: 1.5 }}>Rename a file</DialogTitle>
				<IconButton
					aria-label='close'
					onClick={handleClose}
					sx={{
						position: 'absolute',
						right: 12,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
					size='small'
				>
					<CloseIcon />
				</IconButton>
				<DialogContent dividers sx={{ padding: '12px !important' }}>
					<FormControl sx={{ m: 1, width: 320 }} variant='outlined'>
						<Typography
							component={'label'}
							htmlFor='outlined-adornment-weight'
							fontSize={'16px'}
							mb={1}
						>
							New name
						</Typography>
						<OutlinedInput
							id='outlined-adornment-weight'
							endAdornment={
								<InputAdornment position='end'>.pdf</InputAdornment>
							}
						/>
					</FormControl>
				</DialogContent>
				<DialogActions sx={{ padding: '12px !important' }}>
					<Button autoFocus onClick={handleClose} size='small'>
						Save
					</Button>
				</DialogActions>
			</BootstrapDialog>
		</React.Fragment>
	);
}
