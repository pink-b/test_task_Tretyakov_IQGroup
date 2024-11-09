// src/store/commentsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Comment {
    id: number;
    text: string;
}

interface CommentsState {
    comments: Comment[];
}

const initialState: CommentsState = {
    comments: [],
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<string>) => {
            const newComment: Comment = {
                id: state.comments.length > 0 ? state.comments[state.comments.length - 1].id + 1 : 1,
                text: action.payload,
            };
            state.comments.push(newComment);
        },
        removeComment: (state, action: PayloadAction<number>) => {
            state.comments = state.comments.filter(comment => comment.id !== action.payload);
        },
        clearComments: (state) => {
            state.comments = [];
        },
    },
});

export const { addComment, removeComment, clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;