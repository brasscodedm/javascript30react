import { Route, Routes } from 'react-router-dom';
import App from './App';
import React from 'react';
import { DrumKit } from './screens/01-DrumKit/DrumKit';
import { JsAndCssClock } from './screens/02-Clock/JsAndCssClock';
import { CSSVariables } from './screens/03-CSSVariables/CSSVariables';

export const Routing = () => (
  <Routes>
    <Route path={'/'} element={<App />} />
    <Route path={'/drumkit'} element={<DrumKit />} />
    <Route path={'/clock'} element={<JsAndCssClock />} />
    <Route path={'/css-variables'} element={<CSSVariables />} />
  </Routes>
);
