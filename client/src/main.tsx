import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ThemeContextProvider from './context/ThemeContextProvider.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeContextProvider>
				<BrowserRouter>
					<Routes>
						<Route path='/*' element={<App />} />
					</Routes>
				</BrowserRouter>
			</ThemeContextProvider>
		</Provider>
	</React.StrictMode>,
);
