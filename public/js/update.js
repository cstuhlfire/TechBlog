const newFormHandler = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const id = event.target.getAttribute('data-id');

  const title = document.querySelector('#post-name').value.trim();
  const text = document.querySelector('#post-desc').value.trim();


    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ "title": title, "post_text": text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      
      //alert('Failed to update post');
    }
  
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      
      //alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.update-post')
  .addEventListener('click', newFormHandler);

document
  .querySelector('.del-post')
  .addEventListener('click', delButtonHandler);
