import { useEffect, useMemo, useState } from 'react';
import { PaletteMode, createTheme } from '@mui/material';
import { themeSettings } from '../theme';

const useMode = () => {
	const storedMode = localStorage.getItem('mode');
	const [mode, setMode] = useState<PaletteMode>(
		storedMode === 'light' || storedMode === 'dark' ? storedMode : 'light',
	);

	const toggleColorMode = () => {
		setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	useEffect(() => {
		localStorage.setItem('mode', mode);
	}, [mode]);

	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

	return { theme, toggleColorMode };
};

export default useMode;
