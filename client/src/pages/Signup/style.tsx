import { styled, Container as MuiContainer, Paper } from '@mui/material';

export const Container = styled(MuiContainer)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	minHeight: '100vh',
	paddingTop: theme.spacing(2),
	paddingBottom: theme.spacing(2),
}));

export const FormWrapper = styled(Paper)(({ theme }) => ({
	width: '450px',
	padding: `${theme.spacing(2)} ${theme.spacing(3.5)}`,
	borderRadius: theme.spacing(1),
}));
