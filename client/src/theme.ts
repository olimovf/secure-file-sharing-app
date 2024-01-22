// MUI theme settings
import { PaletteMode } from '@mui/material';
const fontSize = 16;
const fontFamily = ['Roboto', 'sans-serif'].join(',');

export const themeSettings = (mode: PaletteMode) => {
	return {
		palette: {
			mode,
			...(mode === 'light'
				? {
						primary: {
							main: '#1976d2',
							light: '#42a5f5',
							dark: '#1565c0',
						},
						secondary: {
							main: '#9c27b0',
							light: '#ba68c8',
							dark: '#7b1fa2',
						},
						error: {
							main: '#d32f2f',
							light: '#ef5350',
							dark: '#c62828',
						},
						warning: {
							main: '#ed6c02',
							light: '#ff9800',
							dark: '#e65100',
						},
						info: {
							main: '#0288d1',
							light: '#03a9f4',
							dark: '#01579b',
						},
						success: {
							main: '#2e7d32',
							light: '#4caf50',
							dark: '#1b5e20',
						},
						text: {
							primary: 'rgba(0,0,0,0.87)',
							secondary: 'rgba(0,0,0,0.6)',
							disabled: 'rgba(0,0,0,0.12)',
						},
						background: {
							paper: '#fff',
							default: '#e4e3e3',
						},
					}
				: {
						primary: {
							main: '#90caf9',
							light: '#e3f2fd',
							dark: '#42a5f5',
						},
						secondary: {
							main: '#ce93d8',
							light: '#f3e5f5',
							dark: '#ab47bc',
						},
						error: {
							main: '#f44336',
							light: '#e57373',
							dark: '#d32f2f',
						},
						warning: {
							main: '#ffa726',
							light: '#ffb74d',
							dark: '#f57c00',
						},
						info: {
							main: '#29b6f6',
							light: '#4fc3f7',
							dark: '#0288d1',
						},
						success: {
							main: '#66bb6a',
							light: '#81c784',
							dark: '#388e3c',
						},
						text: {
							primary: '#fff',
							secondary: 'rgba(255,255,255,0.7)',
							disabled: 'rgba(255,255,255,0.5)',
						},
						background: {
							paper: '#121212',
							default: '#121212',
						},
					}),
		},
		typography: {
			fontFamily,
			fontSize,
			htmlFontSize: 16,
			h1: {
				fontFamily,
				fontSize: fontSize * 4.5,
				fontWeight: 300,
				// "@media (max-width: 768px)": {
				//   fontSize: fontSize * 2.8,
				// },
			},
			h2: {
				fontFamily,
				fontSize: fontSize * 3,
				fontWeight: 300,
				// "@media (max-width: 768px)": {
				//   fontSize: fontSize * 2,
				// },
			},
			h3: {
				fontFamily,
				fontSize: fontSize * 2.5,
				fontWeight: 400,
				// "@media (max-width: 768px)": {
				//   fontSize: fontSize * 1.75,
				// },
			},
			h4: {
				fontFamily,
				fontSize: fontSize * 2,
				fontWeight: 400,
				// "@media (max-width: 768px)": {
				//   fontSize: fontSize * 1.45,
				// },
			},
			h5: {
				fontFamily,
				fontSize: fontSize * 1.5,
				fontWeight: 500,
				// "@media (max-width: 768px)": {
				//   fontSize: fontSize * 1.3,
				// },
			},
			h6: {
				fontFamily,
				fontSize: fontSize * 1.2,
				fontWeight: 500,
				// "@media (max-width: 768px)": {
				//   fontSize: fontSize * 1.15,
				// },
			},
			subtitle1: {
				fontFamily,
				lineHeight: 1.75,
				fontSize: fontSize * 1,
				fontWeight: 400,
			},
			subtitle2: {
				fontFamily,
				lineHeight: 1.57,
				fontSize: fontSize * 0.875,
				fontWeight: 500,
			},
			body1: {
				fontFamily,
				lineHeight: 1.5,
				fontSize: fontSize * 1,
				fontWeight: 400,
			},
			body2: {
				fontFamily,
				lineHeight: 1.43,
				fontSize: fontSize * 1,
				fontWeight: 400,
			},
		},
		breakpoints: {
			values: {
				xs: 0,
				sm: 576,
				md: 768,
				lg: 992,
				xl: 1200,
			},
		},
		componets: {
			MuiUseMediaQuery: {
				defaultProps: {
					noSsr: true,
				},
			},
		},
	};
};
