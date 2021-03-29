export const postsReducer = (state, action) => {
  switch (action.type) {
    case 'COLLECTING_POSTS':
      return { ...state, posts: state.posts.concat(action.posts) }
    case 'GETTING_POSTS':
      return { ...state, loading: action.loading }
    default:
      return state;
  }
};

export const pagesReducer = (state, action) => {
  switch (action.type) {
    case 'ADVANCE_PAGE':
      return { ...state, page: state.page + 1 }
    default:
      return state;
  }
};
  