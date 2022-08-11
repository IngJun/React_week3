import './App.css';
import { Route, Routes } from 'react-router-dom';
import PostingPage from './pages/PostingPage';
import MainPage from './pages/MainPage';
import PostPage from './pages/PostPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadCommentsFB, loadPostsFB } from './redux/modules/posts';
import NotFound from './pages/NotFound';


function App() {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(loadPostsFB());
    dispatch(loadCommentsFB());
  })

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/posting' element={<PostingPage />} />
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
