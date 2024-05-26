import logo from './logo.svg';
import './App.css';
import Bookstore from './components/Bookstore';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import ViewBook from './components/ViewBook';
import BookForm from './components/BookForm';
import AddBook from './components/BookForm';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
function App() {
  return (
    <div className="app">
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Bookstore/>}/>
          <Route path='/book/:id' element={<ViewBook/>}/>
          <Route path='/add-book' element={<AddBook/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
    
  );
}

export default App;
