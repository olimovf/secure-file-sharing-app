import { styled, Container as MuiContainer } from '@mui/material';

export const StyledContainer = styled(MuiContainer)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	minHeight: '100vh',
	paddingTop: theme.spacing(2),
	paddingBottom: theme.spacing(2),
}));
