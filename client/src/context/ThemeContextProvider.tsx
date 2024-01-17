import { createContext, ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import useMode from '../hooks/useMode';

export const ThemeContext = createContext({});

type ThemeContextProviderProps = {
	children: ReactNode;
};

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
	children,
}) => {
	const { theme, toggleColorMode } = useMode();

	return (
		<ThemeContext.Provider value={{ toggleColorMode }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};

export default ThemeContextProvider;
