import React, {useState, useEffect} from "react";
import socket from './services/socket-io';
import { Button, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import CollectData from "./components/CollectData";
import GamePage from "./components/GamePage";
import Pocetna from "./components/Pocetna";
import TrainModelPage from "./components/TrainModelPage";

const App = () => {
  return(
    <Router>
    <div>
      <Navbar  bg="dark" variant="dark" style={{fontSize: '1.3em'}}>
        <Navbar.Brand href="/" style={{fontSize: '1.3em'}}>EEG Playground</Navbar.Brand>
        <NavDropdown title="" id="basic-nav-dropdown" style={{color: 'white'}}>
          <NavDropdown.Item href="/collectdata">Collect Data</NavDropdown.Item>
          <NavDropdown.Item href="trainmodel">Train Model</NavDropdown.Item>
          <NavDropdown.Item href="/game">Play</NavDropdown.Item>
        </NavDropdown>
      </Navbar>
    </div>
    <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/collectdata" element={<CollectData />} />
        <Route path="/trainmodel" element={<TrainModelPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  )
}

export default App;