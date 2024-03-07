import {
	CardContent,
	Typography,
	TypographyProps,
	styled,
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
