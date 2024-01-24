import { CardContent, styled } from '@mui/material';

export const StyledCardMedia = styled('div')(() => ({
	height: 140,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'relative',
	cursor: 'pointer',
}));

export const StyledCardContent = styled(CardContent)(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '0 !important',
}));
