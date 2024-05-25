import { Box, IconButton, styled } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export const Wrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: theme.spacing(0.5),
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
	borderRadius: theme.spacing(0.5),
	color: 'inherit',
}));

export const Brightness4Icon = styled(Brightness4)({
	fontSize: '24px',
});

export const Brightness7Icon = styled(Brightness7)({
	fontSize: '24px',
});
