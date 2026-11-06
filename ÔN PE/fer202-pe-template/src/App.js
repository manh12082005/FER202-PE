import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ContextProvider } from './context/ContextProvider';
import ListItems from './components/ListItems';
import AddItem from './components/AddItem';
import Header from './components/Header';

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<ListItems />} />
            <Route path="/add" element={<AddItem />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
