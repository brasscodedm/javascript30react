import { Route, Routes } from 'react-router-dom';
import App from './App';
import React from 'react';
import { DrumKit } from './screens/01-DrumKit/DrumKit';
import { JsAndCssClock } from './screens/02-Clock/JsAndCssClock';
import { CSSVariables } from './screens/03-CSSVariables/CSSVariables';
import { ArrayCardio1 } from './screens/04-ArrayCardio1/ArrayCardio1';
import { ImageGallery } from './screens/05-ImageGalery/ImageGallery';
import { TypeAhead } from './screens/06-TypeAhead/TypeAhead';
import { ArrayCardio2 } from './screens/07-ArrayCardio2/ArrayCardio2';
import { HTML5Canvas } from './screens/08-HTML5Canvas/HTML5Canvas';
import { DevTools } from './screens/09-DEV-Tools/DevTools';

export const Routing = () => (
  <Routes>
    <Route path={'/'} element={<App />} />
    <Route path={'/drumkit'} element={<DrumKit />} />
    <Route path={'/clock'} element={<JsAndCssClock />} />
    <Route path={'/css-variables'} element={<CSSVariables />} />
    <Route path={'/array-cardio-1'} element={<ArrayCardio1 />} />
    <Route path={'/image-gallery'} element={<ImageGallery />} />
    <Route path={'/type-ahead'} element={<TypeAhead />} />
    <Route path={'/array-cardio-2'} element={<ArrayCardio2 />} />
    <Route path={'/html5-canvas'} element={<HTML5Canvas />} />
    <Route path={'/dev-tools'} element={<DevTools />} />
  </Routes>
);
