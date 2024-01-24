import { styled, Paper } from '@mui/material';

export const FormWrapper = styled(Paper)(({ theme }) => ({
	width: '450px',
	padding: `${theme.spacing(2)} ${theme.spacing(3.5)}`,
	borderRadius: theme.spacing(1),
}));
