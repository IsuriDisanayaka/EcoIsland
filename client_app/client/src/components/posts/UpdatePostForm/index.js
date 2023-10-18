import React, { useState } from 'react';

function UpdatePostForm({ post, onUpdate }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleUpdate = () => {
    onUpdate({ title, content });
  };

  return (
    <div>
      <h2>Update Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Post</button>
    </div>
  );
}

export default UpdatePostForm;
