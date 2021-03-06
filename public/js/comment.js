const commentFormHandler = async (event) => {
    event.preventDefault()

    const commentText = document.querySelector('#comment-text').value.trim()

    const article_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    if (commentText) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                article_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            document.location.reload()
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);