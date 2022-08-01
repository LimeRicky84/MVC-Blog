const signupFormHandler = async (event) => {
    event.preventDefault()

    const user_name = document.querySelector('#signup-username').value.trim()
    const first_name = document.querySelector('#signup-firstname').value.trim()
    const last_name = document.querySelector('#signup-lastname').value.trim()
    const email = document.querySelector('#signup-email').value.trim()
    const password = document.querySelector('#signup-password').value.trim()

        // console.log(userName)
        // console.log(firstName)
        // console.log(lastName)

    if (user_name && email && password) {
        const response = await fetch(`/api/user/signup`, {
            method: 'POST',
            body: JSON.stringify({ user_name, first_name, last_name, email, password }),
            headers: { 'content-Type': 'application/json'}
        })
        console.log(response)
        // console.log(userName)
        // console.log(firstName)
        // console.log(lastName)
        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText)
        }
    }
}

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);