import { Route, Routes } from 'react-router-dom';
import App from './App';
import React from 'react';
import { DrumKit } from './screens/01-DrumKit/DrumKit';

export const Routing = () => (
  <Routes>
    <Route path={'/'} element={<App />} />
    <Route path={'/drumkit'} element={<DrumKit />} />
  </Routes>
);
