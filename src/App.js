import './App.css';
import { Route, Routes } from 'react-router-dom';
import PostingPage from './pages/PostingPage';
import MainPage from './pages/MainPage';
import PostPage from './pages/PostPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/posting' element={<PostingPage />} />
        <Route path='/post/:id' element={<PostPage />}/>
      </Routes>
    </div>
  );
}

export default App;
