import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Settings } from './Settings';
import { Output } from './Output';

const App: React.FC = () => {
  const [state, setState] = useState({numberOfColors: 1});
  return <>
    <h1>pal-gen</h1>

    <Settings onChange={data=>{setState({numberOfColors: data.colorsQty})}}/>
    <Output numberOfColors={state.numberOfColors} />
  </>
}

export default App;
