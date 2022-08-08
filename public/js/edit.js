const { json } = require("sequelize/types")

const editFormHandler = async (event) => {
    event.preventDefault()

    const title = document.querySelector('#article-title').value
    const article_description = document.querySelector('#article-description').value
    const article_content = document.querySelector('#article-content').value
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/article/${id}`, {
        method: 'PUT',
        body: json.stringify({
            title,
            article_description,
            article_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document
.querySelector('.edit-article-form')
.addEventListener('submit', editFormHandler);