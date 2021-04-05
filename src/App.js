import React, { useReducer, useEffect, useRef, useCallback } from 'react';
import Axios from 'axios';

import { postsReducer, pagesReducer } from './reducers';

import Header from './Header/Header';
import PostCard from './PostCard/PostCard';

import './App.scss';

const apiMainUrl = 'https://5c07ecd0646dca0013f87e8b.mockapi.io/flow';
const apiAvaterUrl = 'https://avatars.abstractapi.com/v1?api_key=a265273c72a94acea28c942b20ae4458';
const mockImagesHeight = [271, 186, 192, 0]; // mock images heights where 0 will load no image

export default function App() {
  const [postsData, postsDispatch] = useReducer(postsReducer, { posts: [], loading: true, });
  const [pagesData, pagesDispatch] = useReducer(pagesReducer, { page: 0 })

  // filter posts list
  const filterByTag = (param) => () => {
    console.log('filter by', param);
  };

  // implement infinite scrolling with intersection observer
  let pageBottom = useRef(null);
  const observeScroll = useCallback(
    node => {
      new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.intersectionRatio > 0) {
            pagesDispatch({ type: 'NEXT_PAGE' });
          }
        });
      }).observe(node);
    },
    [pagesDispatch]
  );

  // perform an API call
  useEffect(() => {
    postsDispatch({ type: 'GETTING_POSTS', loading: true });

    Axios.get(`${apiMainUrl}?page=${pagesData.page}&limit=5`)    
      .then(response => response.data)
      .then(posts => {
        postsDispatch({ type: 'COLLECTING_POSTS', posts });
        postsDispatch({ type: 'GETTING_POSTS', loading: false });
      })
      .catch(e => {
        // handle error
        postsDispatch({ type: 'GETTING_POSTS', loading: false });
        console.log(e);
      })
  }, [ postsDispatch, pagesData.page ]);

  // perform scrolling observation
  useEffect(() => {
    if (pageBottom.current) {
      observeScroll(pageBottom.current);
    }
  }, [observeScroll, pageBottom]);

  return (
    <section className="App">
      <main className="App__container">
        <Header filterByTag={filterByTag} />

        <div className="posts">
          {postsData.posts.map((post, index) => {
            const { id, text, ownerName, likes, comments } = post;

            // mock images different heights
            const randHeight = mockImagesHeight[Math.floor(Math.random() * mockImagesHeight.length)];
            // mock the case with no image
            const mockImageUrl = randHeight ? `https://picsum.photos/id/${id}/248/${randHeight}` : '';
            // mock avatar
            const mockAvatarUrl = `${apiAvaterUrl}&name=${ownerName}`;

            return (
              <PostCard 
                key={`${id}_${index}`} 
                url={mockImageUrl}
                name={text}
                owner={ownerName} 
                ownerImage={mockAvatarUrl}
                height={randHeight} 
                likes={likes} 
                comments={comments} 
              />
            )
          })}
        </div>

        {postsData.loading && (
          <div className="loading">
            <p>Loading...</p>
          </div>
        )}

        <div id="pageBottom" ref={pageBottom}></div>
      </main>

      <footer className="App__footer"></footer>
    </section>
  );
}
