import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ThemeContextProvider from './context/ThemeContextProvider.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeContextProvider>
				<BrowserRouter>
					<Routes>
						<Route path='/*' element={<App />} />
					</Routes>
				</BrowserRouter>
				<ToastContainer />
			</ThemeContextProvider>
		</Provider>
	</React.StrictMode>,
);
