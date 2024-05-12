'use client'

import React, { useState } from 'react';

const CommentForm: React.FC = () => {
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/comment.api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        // Comment saved successfully, handle the response as needed
        console.log('Comment saved successfully');
        setText(''); // Clear the input field
      } else {
        // Handle errors
        console.error('Error saving comment');
      }
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your comment"
        className='text-neutral-900'
      />
      <button className='bg-neutral-900 ' type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
