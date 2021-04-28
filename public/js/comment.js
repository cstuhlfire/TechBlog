const newFormHandler = async (event) => {
    event.preventDefault();
  
    const post_id = event.target.getAttribute('data-postid');
    const user_id = event.target.getAttribute('data-nameid');
    
    console.log(`\n\n${post_id}\n\n`);
    console.log(`\n\n${user_id}\n\n`);

     const comment = document.querySelector('#post-desc').value.trim();
  
    if (comment) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment, user_id, post_id,}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/comments/${post_id}`);
      } else {
          document.location.replace("/");
      }
    }
  };
  
  
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
  
  