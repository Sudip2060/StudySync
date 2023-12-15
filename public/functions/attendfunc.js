
let sectionbuttoncontainer = document.querySelector('.sections-button-container')
if (sectionbuttoncontainer) {
    sectionbuttoncontainer.addEventListener('click', (event) => {
        let selectedbutton = event.target.closest('.section-button')
        let sectionname = selectedbutton.querySelector('.sectionbutton-label').textContent
        clearcontent()
        getstudentlist(sectionname)
    })
}

let weekselector = document.querySelector('.week-select-button')
weekselector.addEventListener('change', () => {
    let section = document.querySelector('.head-header').textContent;
    let sectionname = section.match(/section \d+/);
    clearcontent()
    getstudentlist(sectionname)
})


function clearcontent() {
    let leftcontent = document.querySelector('.left-main')
    let leftbars = leftcontent.querySelectorAll('.attendancerow')
    leftbars.forEach(leftbar => {
        leftcontent.removeChild(leftbar)
    });
}

async function getstudentlist(section) {
    try {
        const res = await fetch('/students?section=' + section, {
            method: 'get',
            headers: { 'content-type': 'application/json' }
        })
        if (res.ok) {
            const data = await res.json()
            document.querySelector('.head-header').textContent = 'Attendance-' + section
            data.forEach(student => {
                liststudentdetails(student)
            });
        }
        else {
            const error = await res.json()
        }
    }
    catch (err) {
        console.log(err)
    }
}

function liststudentdetails(student) {
    let mainleftdiv = document.querySelector('.left-main')

    let detailscontainer = document.createElement('div')
    detailscontainer.setAttribute('class', 'attendancerow')
    mainleftdiv.appendChild(detailscontainer)

    let idcontainer = document.createElement('p')
    idcontainer.setAttribute('class', 'stuid')
    idcontainer.textContent = student.studentid
    detailscontainer.appendChild(idcontainer)

    let namecontainer = document.createElement('p')
    namecontainer.setAttribute('class', 'stuname')
    namecontainer.textContent = student.studentname
    detailscontainer.appendChild(namecontainer)

    let attendancebutton = document.createElement('select')
    attendancebutton.setAttribute('class', 'attendancebutton')
    let defaultvalue = document.createElement('option')
    defaultvalue.disabled = true;
    defaultvalue.defaultSelected = true;
    let presentvalue = document.createElement('option')
    presentvalue.textContent = 'Present'
    let absentvalue = document.createElement('option')
    absentvalue.textContent = 'Absent'
    attendancebutton.appendChild(defaultvalue)
    attendancebutton.appendChild(absentvalue)
    attendancebutton.appendChild(presentvalue)
    detailscontainer.appendChild(attendancebutton)

    let attendancestatuses = student.attendancestatus
    attendancestatuses.forEach(attstatus => {
        let currentweek = document.querySelector('.week-select-button').value
        if (attstatus.week == currentweek) {
            if (attstatus.status == 'Absent') {
                attendancebutton.selectedIndex = 1
            }
            if (attstatus.status == 'Present') {
                attendancebutton.selectedIndex = 2
            }
        }
    });
    attendancebutton.addEventListener('change', showsavebutton)
}

let savebuttonadded = false
function showsavebutton() {
    if (!savebuttonadded) {
        let savebuttonholder = document.createElement('div')
        savebuttonholder.setAttribute('class','savebutton-holder')
        
        let savebutton = document.createElement('button')
        savebutton.setAttribute('class', 'attendancesavebutton')
        savebutton.textContent = 'Save'
        savebuttonholder.appendChild(savebutton)
        
        document.querySelector('.right').appendChild(savebuttonholder)
        savebutton.addEventListener('click', updateattendance)
    }
    return savebuttonadded = true
}

function updateattendance() {
    let week = document.querySelector('.week-select-button').value
    let section = document.querySelector('.head-header').textContent;
    let sectionname = section.match(/section \d+/);
    let datacontainer = document.querySelector('.left-main')
    let databars = datacontainer.querySelectorAll('.attendancerow')
    databars.forEach(bar => {
        let studentid = bar.querySelector('.stuid').textContent
        let status = bar.querySelector('.attendancebutton').value
        updateattendancerecord(sectionname, studentid, week, status)
    });
    updatedattendancemessage()
}

async function updateattendancerecord(studentsection, studentid, week, status) {
    try {
        const res = await fetch('/attendancedata', {
            method: 'put',
            body: JSON.stringify({ studentsection, studentid, week, status }),
            headers: { 'content-type': 'application/json' }
        })
        if (res.ok) {
            const updateddata = await res.json()
        }
        else {
            const error = await res.json()
            console.log(error)
        }
    }
    catch (err) {
        console.log(err.message)
    }
}


function updatedattendancemessage(){
    let updatemessagebox = document.querySelector('.attendanceupdatemessagebox')
    updatemessagebox.textContent = "Updated Sucessfully"

    setTimeout(() => {
        updatemessagebox.textContent = ''
    }, 1000);

    let attendancesavebuttonholder = document.querySelector('.savebutton-holder')
    if(attendancesavebuttonholder){
        document.querySelector('.right').removeChild(attendancesavebuttonholder)
        savebuttonadded = false
    }
}










