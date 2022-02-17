import { Route, Routes } from 'react-router-dom';
import App from './App';
import React from 'react';

export const Routing = () => (
	<Routes>
		<Route path={'/'} element={<App />} />
	</Routes>
);
