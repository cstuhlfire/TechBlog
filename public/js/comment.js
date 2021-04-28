const newFormHandler = async (event) => {
    event.preventDefault();
  
    const post_id = event.target.getAttribute('data-postid');
    
     const comment = document.querySelector('#post-desc').value.trim();
  
    if (comment) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ "comment": comment, 
                                "post_id": post_id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/screen_comments/${post_id}`);
      } else {
         // document.location.replace("/");
      }
    }
  };
  
  
  
  document.querySelector('.new-post-form').addEventListener('click', newFormHandler);
  
  