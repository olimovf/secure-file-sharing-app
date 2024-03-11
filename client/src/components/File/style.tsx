import {
	CardContent,
	Typography,
	TypographyProps,
	styled,
	Dialog,
} from '@mui/material';

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
	justifyContent: 'center',
	padding: '0 !important',
}));

export const FileName = styled((props: TypographyProps) => (
	<Typography component={'div'} {...props} />
))(() => ({
	width: '100%',
	display: '-webkit-box',
	WebkitBoxOrient: 'vertical',
	WebkitLineClamp: 1,
	overflow: 'hidden',
	textAlign: 'center',
}));

export const StyledDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));
