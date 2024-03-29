const commentFormHandler = async (event) => {
    event.preventDefault()

    const comment_text = document.querySelector('#comment-text').value.trim()

    const article_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    if (comment_text) {
        console.log(comment_text)
        const response = await fetch('/api/comment', {
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
            console.log(response)
            document.location.reload()
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.add-comment').addEventListener('submit', commentFormHandler);