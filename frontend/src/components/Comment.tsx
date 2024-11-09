// src/components/Comments.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, removeComment } from '../redux/features/commentsSlice';
import { RootState } from '../redux/store/store';

const Comments: React.FC = () => {
    const [commentText, setCommentText] = useState('');
    const comments = useSelector((state: RootState) => state.comments.comments);
    const dispatch = useDispatch();

    const handleAddComment = () => {
        if (commentText.trim()) {
            dispatch(addComment(commentText));
            setCommentText('');
        }
    };

    const handleRemoveComment = (id: number) => {
        dispatch(removeComment(id));
    };

    return (
        <div>
            <h3>Комментарии</h3>
            <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Введите комментарий"
            />
            <button onClick={handleAddComment}>Добавить комментарий</button>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        {comment.text}
                        <button onClick={() => handleRemoveComment(comment.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;