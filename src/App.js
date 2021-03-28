import React, { useEffect, useReducer } from 'react';
import Axios from 'axios';

import './App.scss';

function App() {
  const postsReducer = (state, action) => {
    switch (action.type) {
      case 'COLLECTING_POSTS':
        return { ...state, posts: state.posts.concat(action.posts) }
      case 'GETTING_POSTS':
        return { ...state, loading: action.loading }
      default:
        return state;
    }
  };

  const [postsData, postsDispatch] = useReducer(postsReducer, { posts: [], loading: true, });

  // mock images heights where 0 will load no image
  const mockImagesHeight = [271, 186, 192, 0];

  // perform an API call
  useEffect(() => {
    postsDispatch({ type: 'GETTING_POSTS', loading: true });

    Axios.get('https://picsum.photos/v2/list')
      .then(response => response.data)
      .then(posts => {
        // console.log('posts', posts);
        postsDispatch({ type: 'COLLECTING_POSTS', posts });
        postsDispatch({ type: 'GETTING_POSTS', loading: false });
      })
      .catch(e => {
        // handle error
        postsDispatch({ type: 'GETTING_POSTS', loading: false });
        console.log(e);
      })
  }, [ postsDispatch ]);

  return (
    <section className="App">
      <header className="App__header">
      </header>      

      <main className="App__container">
        <div className="posts">
          {postsData.posts.map((post) => {
            const { id, author } = post;
            // mock images different heights
            const randHeight = mockImagesHeight[Math.floor(Math.random() * mockImagesHeight.length)];
            // mock the case with no image
            const mockImageUrl = randHeight ? `https://picsum.photos/id/${id}/248/${randHeight}` : false;

            return (
              <div key={id} className="post-card">
                <div className="post-card__body">
                  {mockImageUrl && (
                    <img
                      alt={author}
                      className="post-card__img"
                      src={mockImageUrl}
                    />
                  )}
                </div>
                <div className="post-card__footer">
                  <p className="post-card__text">{author}</p>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      <footer className="App__footer">
      </footer>
    </section>
  );
}

export default App;
