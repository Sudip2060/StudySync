
document.querySelector('.dashboard-button').addEventListener('click', () => {
    window.location.href = 'Dashboard.html'
})
document.querySelector('.changepassword-button').addEventListener('click', () => {
    window.location.href = '/changepassword'
})
document.querySelector('.logout-button').addEventListener('click', () => {
    document.querySelector('.overlay').style.display = 'block'
})
document.querySelector('.stayback').onclick = () => {
    document.querySelector('.overlay').style.display = 'none'
}

document.querySelector('.logout').addEventListener('click', async () => {
    try {
        const res = await fetch('/logout', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            }
        })
        if (res.ok) {
            console.log('Logout Successfull')
            window.location.href = '/login'
        }
        else {
            console.error('logout failed')
        }
    }
    catch (err) {
        console.log(err)
    }
})


document.querySelector('.savebutton').addEventListener('click', async () => {
    try {
        const email = document.querySelector('.cpemail').value;
        const oldpassword = document.querySelector('.cpcurrentpassword').value
        const newpassword = document.querySelector('.cpnewpassword').value
        const confirmnewpassword = document.querySelector('.cpconfirmpassword').value

        if (!email || !oldpassword || !newpassword || !confirmnewpassword) {
            let message = 'Please fill all of the details'
            let time = 1000
            displaymessage(message, time)
            return;
        }

        if (newpassword !== confirmnewpassword) {
            let message = "The new passwords doesn't match"
            let time = 1000
            displaymessage(message, time)
            return;
        }

        const res = await fetch('/passwordchange', {
            method: 'post',
            body: JSON.stringify({ email, oldpassword, newpassword }),
            headers: {
                'content-type': 'application/json'
            }
        })
        if (res.ok) {
            let messagebox = document.querySelector('.messagebox')
            let message = 'Password changed Sucessfully'
            let time = 800
            displaymessage(message, time)
            messagebox.style.color = '#008000'
            document.querySelector('.cpemail').value = ''
            document.querySelector('.cpcurrentpassword').value = ''
            document.querySelector('.cpnewpassword').value = ''
            document.querySelector('.cpconfirmpassword').value = ''
        }
        else {
            let message = 'Check your email and old password'
            let time = 1000
            displaymessage(message, time)
        }

        function displaymessage(message, time) {
            let messagebox = document.querySelector('.messagebox')
            messagebox.style.color = '#ff0000'
            messagebox.textContent = message
            setTimeout(() => {
                messagebox.textContent = ''
            }, time);
        }
    }
    catch (error) {
        console.log(error)
    }
})