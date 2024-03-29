//for each section invokes the showstudentdata function by passing the section name
let sectionsbuttoncontainer = document.querySelector('.sections-button-container')
if(sectionsbuttoncontainer){
    sectionsbuttoncontainer.addEventListener('click',(event)=>{
        let sectionsbutton = event.target.closest('.section-button')
        let sectionnameholder = sectionsbutton.querySelector('.sectionbutton-label')
        let sectionname = sectionnameholder.textContent
        clearcontent()
        showstudentdata(sectionname)
    })
}   

//clears the content where the student data will be placed
function clearcontent(){
    let datacontent = document.querySelector('.middle-main')
    let databars = datacontent.querySelectorAll('.classlistrow')
    databars.forEach(databar => {
        datacontent.removeChild(databar)    
    });
}

//retrieves student data from the database based on the section name passed
async function showstudentdata(section){
    try{
        const res = await fetch('/students?section=' + section,{
            method:'get',
            headers:{'content-type':'application/json'}
        })
        if(res.ok){
            const studentdata = await res.json()
            document.querySelector('.middle-header').textContent = 'Classlist-'+section
            document.querySelector('.stu-count').textContent = studentdata.length + ' students'
            studentdata.forEach(student => {
                addclasslistrows(student)
            });
        }
        else{
            const errormessage = await res.json()
            console.log(errormessage)
        }   
    }
    catch(err){
        console.log(err.message)
    }
}

// creates a row to place student details 
function addclasslistrows(student){
    let emptymessage = document.querySelector('.emptyclasslistmessage')
    emptymessage.style.display = 'none'
    let datacontainerdiv = document.createElement('div')
    datacontainerdiv.setAttribute('class','classlistrow')
    let classlistcontainer = document.querySelector('.middle-main')

    classlistcontainer.appendChild(datacontainerdiv)

    let imagecontainer = document.createElement('div')
    imagecontainer.setAttribute('class','personimageholder')
    datacontainerdiv.appendChild(imagecontainer)

    let imagebox = document.createElement('div')
    imagebox.setAttribute('class','personimage')
    imagecontainer.appendChild(imagebox)

    let image = document.createElement('img')
    if(student.studentgender==='male'){
        image.src='/images/male.png'
    }
    else{
        image.src='/images/female.png'
    }
    imagebox.appendChild(image)

    let idcontainer = document.createElement('p')
    idcontainer.setAttribute('class','clsstuid')
    idcontainer.textContent = student.studentid
    datacontainerdiv.appendChild(idcontainer)

    let namecontainer = document.createElement('p')
    namecontainer.setAttribute('class','stuname')
    namecontainer.textContent = student.studentname
    datacontainerdiv.appendChild(namecontainer)

    let rolecontainer = document.createElement('p')
    rolecontainer.setAttribute('clas','clssturole')
    rolecontainer.textContent = 'Student'
    datacontainerdiv.appendChild(rolecontainer)

    let emailcontainer = document.createElement('p')
    emailcontainer.setAttribute('class','clsstuemail')
    emailcontainer.textContent = student.studentemail
    datacontainerdiv.appendChild(emailcontainer)

}


let email_button =document.querySelector('.email-button')
if(email_button){
    email_button.addEventListener('click',()=>{
       window.location.href = 'mailto:sghimi16@my.centennialcollege.ca'
    })
}