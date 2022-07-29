const signupFormHandler = async (event) => {
    event.preventDefault()

    const userName = document.querySelector('#username-signup').value.trim()
    const email = document.querySelector('#email-signup').value.trim()
    const password = document.querySelector('#password-signup').value.trim()

    if (userName && email && password) {
        const response = await fetch(`/api/projects`, {
            method: 'POST',
            body: JSON.stringify({ userName, email, password }),
            headers: { 'content-Type': 'application/json'}
        })
        if (response.ok) {
            console.log('success')
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText)
        }
    }
}