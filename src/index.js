import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { useState } from "react";
import Tmp from './Tmp'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {//<App />
    }
    <Tmp />
    {/*<StarRating maxRating={65}/>
    <StarRating maxRating={10}/>
  <Test></Test>*/}
  </React.StrictMode>
);
