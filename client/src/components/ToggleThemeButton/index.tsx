import { useContext } from 'react';
import { useTheme } from '@mui/material';
import { ThemeContext } from '../../context/ThemeContextProvider';
import {
	Brightness4Icon,
	Brightness7Icon,
	StyledIconButton,
	Wrapper,
} from './style';

const ToggleThemeButton = () => {
	const theme = useTheme();
	const { toggleColorMode } = useContext(ThemeContext);

	return (
		<Wrapper>
			<StyledIconButton onClick={toggleColorMode}>
				{theme.palette.mode === 'dark' ? (
					<Brightness4Icon />
				) : (
					<Brightness7Icon />
				)}
			</StyledIconButton>
		</Wrapper>
	);
};

export default ToggleThemeButton;
