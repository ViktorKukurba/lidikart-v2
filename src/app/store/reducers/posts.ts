import { WpPost } from '../../interfaces/wp-post';
import { ActionsTypes, ActionsPosts } from '../actions/posts';

interface PostsSection {
  list: WpPost[];
  category: string | number;
}

export interface PostsState {
  gallery: PostsSection;
  exhibition: PostsSection;
  wallPaintings: WpPost[];
}

const initSection: PostsSection = {
  list: [],
  category: null
};

const initialState: PostsState = {
  gallery: {...initSection},
  exhibition: {...initSection},
  wallPaintings: []
};

export function postsReducer(state = initialState, action: ActionsPosts) {
  switch (action.type) {
    case ActionsTypes.LoadedGalleryPosts: return {
      ...state,
      gallery: {
        ...state.gallery,
        list: action.payload
      }
    };

    case ActionsTypes.SelectGalleryCategory: return {
      ...state,
      gallery: {
        ...state.gallery,
        category: action.payload
      }
    };

    case ActionsTypes.LoadedExhibitionPosts: return {
      ...state,
      exhibition: {
        ...state.exhibition,
        list: action.payload
      }
    };

    case ActionsTypes.SelectExhibitionCategory: return {
      ...state,
      exhibition: {
        ...state.exhibition,
        category: action.payload
      }
    };

    case ActionsTypes.LoadedWallPaintingPosts: return {
      ...state,
      wallPaintings: action.payload
    };
  }
  return state;
}
