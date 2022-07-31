const newFormHandler = async (event) => {
    event.preventDefault()

    const title = document.querySelector('#article-title').value;
    const description = document.querySelector('#article-description').value;
    const content = document.querySelector('#article-content').value;

    const response = await fetch('/api/article', {
        method: 'POST',
        body: JSON.stringify({ title, description, content}),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post').addEventListener('submit', newFormHandler);
