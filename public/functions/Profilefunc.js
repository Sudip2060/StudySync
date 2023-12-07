
document.querySelector('.dashboard-button').addEventListener('click', () => {
    window.location.href = '/profile'
})
document.querySelector('.changepassword-button').addEventListener('click', () => {
    window.location.href = '/changepassword'
})
document.querySelector('.logout-button').addEventListener('click', () => {
    document.querySelector('.overlay').style.display = 'block'
})
document.querySelector('.accountSettings-button').addEventListener('click', () => {
    window.location.href = '/accountsettings'
})
document.querySelector('.stayback').onclick = () => {
    document.querySelector('.overlay').style.display = 'none'
}


const logoutbutton = document.querySelector('.logout')
if(logoutbutton){
logoutbutton.addEventListener('click', async () => {
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
}

const passwordchangebutton = document.querySelector('.savebutton')
if (passwordchangebutton) {
    passwordchangebutton.addEventListener('click', async () => {
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
}

window.addEventListener('load', async () => {
    try {
        const res = await fetch('/userdetails', {
            method: 'get',
            headers: {
                'content-type': 'application/json'
            }
        })
        if (res.ok) {
            const data = await res.json()
            document.querySelector('.prof_name').textContent = data.firstname + ' ' + data.lastname
            let emailvalue = document.querySelector('.AS-emailvalue')
            if (emailvalue) {
                emailvalue.value = data.email
            }
            let phonenovvalue = document.querySelector('.AS-phonenovalue')
            if (phonenovvalue) {
                phonenovvalue.value = data.phonenumber
            }
            let postalcodevalue = document.querySelector('.AS-postalcodevalue')
            if (postalcodevalue) {
                postalcodevalue.value = data.postalcode
            }
            let fullname = document.querySelector('.DB-fullname')
            if(fullname){
                fullname.textContent = 'Full name: ' + data.firstname + ' ' + data.lastname   
            }
            let emailaddress = document.querySelector('.DB-emailaddress')
            if(emailaddress){
                emailaddress.textContent = 'Email address: ' + data.email
            }
            let phonenumber = document.querySelector('.DB-phonenumber')
            if(phonenumber){
                phonenumber.textContent = 'Phone number: ' + data.phonenumber
            }
            let instiution = document.querySelector('.DB-institution')
            if(instiution){
                instiution.textContent = 'Institution: '+ data.institution
            }
            let postalcode = document.querySelector('.DB-postalcode')
            if(postalcode){
                postalcode.textContent = 'Postal code: '+ data.postalcode
            }
        }
        else {
            console.log('no data found')
        }
    }
    catch (err) {
        console.log(err)
    }
})

const AS_savebutton = document.querySelector('.AS-savebutton')
if(AS_savebutton){
AS_savebutton.addEventListener('click', async () => {
    const email = document.querySelector('.AS-emailvalue').value
    const phonenumber = document.querySelector('.AS-phonenovalue').value
    const postalcode = document.querySelector('.AS-postalcodevalue').value
    try {
        const res = await fetch('/updateaccount',{
            method:'put',
            body:JSON.stringify({email,phonenumber,postalcode}),
            headers:{'content-type':'application/json'}
        })
        if(res.ok){
            document.querySelector('.AS-errormessagebox').style.color='green'
            let message='Saved Sucessfully'
            showmessage(message)
        }
        else{
            let message = 'An error occured'
            showmessage(message )
        }
        function showmessage(message){
            let messagebox = document.querySelector('.AS-errormessagebox')
            messagebox.textContent = message
            setTimeout(() => {
                messagebox.textContent=''
            }, 900);
        }

    }
    catch (err) {
        console.log(err.message)
    }
})
}