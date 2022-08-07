const newFormHandler = async (event) => {
    event.preventDefault()

    const title = document.querySelector('#article-title').value;
    const article_description = document.querySelector('#article-description').value;
    const article_content = document.querySelector('#article-content').value;

    const response = await fetch('/api/article', {
        method: 'POST',
        body: JSON.stringify({ title, article_description, article_content}),
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