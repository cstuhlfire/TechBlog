let updateBtnEl = document.querySelector(".update-post");

const updateHandler = async (event) => {
    event.preventDefault();
  
    let titleEl = document.querySelector('#post-name');
    let post_id = titleEl.getAtribute("data-id").value();
    let title = titleEl.value.trim();
    let post_text = document.querySelector('#post-desc').value.trim();
  
    alert("Event Handler: "+ title);
    if (title && post_text) {
      let response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, post_text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to update post');
      }
    }
  };

  updateBtnEl.addEventListener("click", updateHandler);
  
//   const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//       const id = event.target.getAttribute('data-id');
  
//       const response = await fetch(`/api/posts/${id}`, {
//         method: 'DELETE',
//       });
  
//       if (response.ok) {
//         document.location.replace('/');
//       } else {
//         alert('Failed to delete post');
//       }
//     }
//   };

// document.querySelector('.post-list').addEventListener('click', delButtonHandler);


//document.querySelector('.update-post').addEventListener('click', updateHandler);

  