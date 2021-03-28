import React, { useCallback, useRef, useReducer, useEffect } from 'react';
import Axios from 'axios';

import './App.scss';

export default function App() {
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

  const pagesReducer = (state, action) => {
    switch (action.type) {
      case 'ADVANCE_PAGE':
        return { ...state, page: state.page + 1 }
      default:
        return state;
    }
  }
  
  const [postsData, postsDispatch] = useReducer(postsReducer, { posts: [], loading: true, });
  const [pages, pagerDispatch] = useReducer(pagesReducer, { page: 0 });

  // mock images heights where 0 will load no image
  const mockImagesHeight = [271, 186, 192, 0];

  // perform an API call
  useEffect(() => {
    postsDispatch({ type: 'GETTING_POSTS', loading: true });

    Axios.get(`https://picsum.photos/v2/list?page=${pages.page}&limit=10`)
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
  }, [ postsDispatch, pages.page ]);

  // implement infinite scrolling with intersection observer
  let pageBottomRef = useRef(null);

  const scrollObserver = useCallback(
    node => {
      new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.intersectionRatio > 0) {
            pagerDispatch({ type: 'ADVANCE_PAGE' });
          }
        });
      }).observe(node);
    },
    [pagerDispatch]
  );

  useEffect(() => {
    if (pageBottomRef.current) {
      scrollObserver(pageBottomRef.current);
    }
  }, [scrollObserver, pageBottomRef]);

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
                <div className="post-card__body" style={{ height: randHeight }}>
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

        {postsData.fetching && (
          <div className="fetching">
            <p>Fetching posts</p>
          </div>
        )}
        <div id="container-bottom" ref={pageBottomRef}></div>
      </main>

      <footer className="App__footer">
      </footer>
    </section>
  );
}
