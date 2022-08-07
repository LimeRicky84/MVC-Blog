const deleteFormHandler = async (event) => {
    event.preventDefault()

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    const response = await fetch(`/api/article/${id}`, {
        method: 'DELETE',
        body: json.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText)
    }
}

document
    .querySelector('.delete-article')
    .addEventListener('click', deleteFormHandler)