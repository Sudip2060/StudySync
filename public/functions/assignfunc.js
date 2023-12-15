window.addEventListener('load', async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const encodedSectionName = urlParams.get('sectionname');
    document.querySelector('.Assignment-left-header').textContent = encodedSectionName
    try {
        const res = await fetch('/assignments/data?sectionname=' + encodedSectionName, {
            method: 'get',
            headers: { 'content-type': 'application/json' }
        })
        if (res.ok) {
            const retrievedassignments = await res.json()
            retrievedassignments.forEach(assignment => {
                let assignmentTitle = assignment.assignmentname
                let startdate = new Date(assignment.startdate)
                let formattedstartdate = dateformatter(startdate)
                let enddate = new Date(assignment.enddate)
                let formattedenddate = dateformatter(enddate)
                addassignmentbar(assignmentTitle, formattedstartdate, formattedenddate)
            });
        }
        else {
            console.log('no data found')
        }
    }
    catch (err) {
        console.log(err.message)
    }
})

let overlaycreatebutton = document.getElementById('createbutton')
if (overlaycreatebutton) {
    overlaycreatebutton.onclick = function showOverlay() {
        document.getElementById("overlay").style.display = "block";
        document.querySelector('.message-box').textContent = "";
    }
}

let overlayclosebutton = document.querySelector('.close-btn')
if (overlayclosebutton) {
    overlayclosebutton.addEventListener('click', () => {
        document.getElementById("overlay").style.display = "none";
    })
}

let addassignmentbutton = document.getElementById('assignmentaddbutton')
if (addassignmentbutton) {
    addassignmentbutton.onclick = () => {
        const assignmentName = document.getElementById('sectionname').value;
        const startDate = document.getElementById('startdate').value;
        const endDate = document.getElementById('enddate').value;
        if (!assignmentName || !startDate || !endDate) {
            alert('Please fill in all required fields.');
            return;
        }
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        if (startDateObj >= endDateObj) {
            alert('Start date must be before the end date.');
            return;
        }
        postassignment();
        document.getElementById('sectionname').value = '';
        document.getElementById('startdate').value = '';
        document.getElementById('enddate').value = '';
        document.getElementById('instructions').value = '';

    };
}

async function postassignment() {
    const assignmentname = document.getElementById('sectionname').value;
    const startdate = document.getElementById('startdate').value;
    const enddate = document.getElementById('enddate').value;
    const instructions = document.getElementById('instructions').value;
    const section = document.querySelector('.Assignment-left-header').textContent
    try {
        const res = await fetch('/assignments/new', {
            method: 'post',
            body: JSON.stringify({ section, assignmentname, startdate, enddate, instructions }),
            headers: { 'Content-type': 'application/json' }
        })

        if (res.ok) {
            const data = await res.json()
            displaymessage('Sucessfully created '+ assignmentname)
            addassignmentbar(assignmentname, startdate, enddate)
            clearform()
        }
        else {
            const error = await res.json()
            displaymessage(error.message)
        }
        function clearform() {
            document.getElementById('sectionname').value = '';
            document.getElementById('startdate').value = '';
            document.getElementById('enddate').value = '';
            document.getElementById('instructions').value = '';
        }

        function displaymessage(message){
            let messagebox = document.querySelector('.message-box')
            messagebox.textContent = message
            setTimeout(() => {
                messagebox.textContent=''
            }, 1200);
        }
    }
    catch (err) {
        console.log(err)
    }
}

function addassignmentbar(assignmentname, sDate, edate) {
    const newAssignmentBox = document.createElement('div');
    newAssignmentBox.className = 'assignment-box';

    const boxLeft = document.createElement('div');
    boxLeft.classList.add('box-left');
    const assignmentTitle = document.createElement('p');
    assignmentTitle.id = 'assignmenttitle';
    assignmentTitle.textContent = assignmentname
    boxLeft.appendChild(assignmentTitle);
    newAssignmentBox.appendChild(boxLeft)

    const boxRight = document.createElement('div');
    boxRight.classList.add('box-right');
    const startDateDiv = document.createElement('div');
    startDateDiv.classList.add('startdate-div');
    const startDate = document.createElement('p');
    startDate.textContent = ('Start Date: ' + sDate);
    startDateDiv.appendChild(startDate);
    const endDateDiv = document.createElement('div');
    endDateDiv.classList.add('enddate-div');
    const endDate = document.createElement('p');
    endDate.textContent = 'End Date: ' + edate;
    endDateDiv.appendChild(endDate);
    boxRight.appendChild(startDateDiv);
    boxRight.appendChild(endDateDiv);

    newAssignmentBox.appendChild(boxRight)
    document.querySelector('.left-main').appendChild(newAssignmentBox);
}


let mainleftdiv = document.querySelector('.left-main')
if (mainleftdiv) {
    mainleftdiv.addEventListener('click', function (event) {
        const assignmentbar = event.target.closest('.assignment-box')
        document.querySelectorAll('.assignment-box').forEach(function (box) {
            box.style.backgroundColor = '';
            box.id = ''
        });
        assignmentbar.style.backgroundColor = '#48D8A4'
        assignmentbar.setAttribute('id', 'clickeddiv')
        const assignmenttitle = assignmentbar.querySelector('#assignmenttitle').textContent
        viewassignment(assignmenttitle)
    })
}


function preview() {
    let mainpreview = document.createElement('div')
    mainpreview.setAttribute('class', 'right-bodycontainer')
    let rightmain = document.querySelector('.right-main')
    rightmain.appendChild(mainpreview)

    let previewAssignmenthead = document.createElement('div')
    previewAssignmenthead.setAttribute('class', 'previewAssignment-head')
    mainpreview.appendChild(previewAssignmenthead)

    let previewassignmenttitle = document.createElement('p')
    previewassignmenttitle.setAttribute('class', 'previewAssignmenttitle')
    previewAssignmenthead.appendChild(previewassignmenttitle)

    let datecontainer = document.createElement('div')
    datecontainer.setAttribute('class', 'previewAssignment-date')
    mainpreview.appendChild(datecontainer)

    let startdate = document.createElement('p')
    startdate.setAttribute('class', 'PreviewAssignmentstartdate')
    datecontainer.appendChild(startdate)

    let enddate = document.createElement('p')
    enddate.setAttribute('class', 'PreviewAssignmentenddate')
    datecontainer.appendChild(enddate)

    let instructionscontainer = document.createElement('div')
    instructionscontainer.setAttribute('class', 'previewAssignmentinstrutions')
    mainpreview.appendChild(instructionscontainer)

    let instructionshead = document.createElement('p')
    instructionshead.setAttribute('class', 'Assignmentinstrutiontitle')

    let instructionsBody = document.createElement('p')
    instructionsBody.setAttribute('class', 'instructionsBody')

    instructionscontainer.appendChild(instructionshead)
    instructionscontainer.appendChild(instructionsBody)
}

async function viewassignment(assignmentname) {
    let sectionname = document.querySelector('.Assignment-left-header').textContent
    try {
        const res = await fetch('/assignments/name?name=' + assignmentname + '&section=' + sectionname, {
            method: "get",
            headers: {
                'Content-type': 'application/json'
            }
        })
        if (res.ok) {
            previewmessagebox = document.querySelector('.emptypreviewmessage')
            if (previewmessagebox) {
                document.querySelector('.right-header').removeChild(previewmessagebox)
            }
            oldpreviewcontainer = document.querySelector('.right-bodycontainer')
            if (oldpreviewcontainer) {
                document.querySelector('.right-main').removeChild(oldpreviewcontainer)
            }
            preview()
            createdeleteeditbutton()
            const data = await res.json()
            document.querySelector('.previewAssignmenttitle').textContent = data.assignment.assignmentname

            const Startdate = new Date(data.assignment.startdate)
            const Enddate = new Date(data.assignment.enddate)

            document.querySelector('.PreviewAssignmentstartdate').textContent = 'Start Date: ' + (Startdate)
            document.querySelector('.PreviewAssignmentenddate').textContent = 'End Date: ' + (Enddate)
            document.querySelector('.instructionsBody').textContent = data.assignment.instructions
        }
        else {
            const error = await res.json()
            console.log(error)
        }
    }
    catch (err) {
        console.log(err)
    }

}
function dateformatter(date) {
    let dateformat = { year: 'numeric', month: 'numeric', day: 'numeric' }
    return date.toLocaleDateString('en-us', dateformat)
}

function createdeleteeditbutton() {
    let previouseditbutton = document.querySelector('editbutton-holder')
    let previousdeletebutton = document.querySelector('.deletebutton-holder')
    if (previousdeletebutton || previouseditbutton) {
        return
    }
    else {
        let buttoncontainer = document.querySelector('.right-foot')
        let editbuttonholder = document.createElement('div')
        editbuttonholder.setAttribute('class', 'editbutton-holder')
        let editbutton = document.createElement('button')
        editbutton.setAttribute('id', 'editbutton')
        editbutton.textContent = 'edit'
        editbuttonholder.appendChild(editbutton)
        buttoncontainer.appendChild(editbuttonholder)
        let deletebuttonholder = document.createElement('div')
        deletebuttonholder.setAttribute('class', 'deletebutton-holder')
        let deletebutton = document.createElement('button')
        deletebutton.setAttribute('id', 'deletebutton')
        deletebutton.textContent = 'Delete'
        deletebuttonholder.appendChild(deletebutton)
        buttoncontainer.appendChild(deletebuttonholder)
    }
    let deletebutton = document.getElementById('deletebutton')
    if (deletebutton) {
        deletebutton.onclick = deleteassignment

    }
    let assignmenteditbutton = document.querySelector('#editbutton')
    if (assignmenteditbutton) {
        assignmenteditbutton.onclick = () => {
            let assignmentBar = document.querySelector('#clickeddiv')
            let assignmenttitle = assignmentBar.querySelector('#assignmenttitle').textContent
            let sectionname = document.querySelector('.Assignment-left-header').textContent
            let url = '/editassignment?assignmentname=' + encodeURIComponent(assignmenttitle) + '&section=' + sectionname
            window.location.href = url
        }
    }
}
async function deleteassignment() {
    try {
        let clickeddiv = document.getElementById('clickeddiv')
        let assignmenttitle = clickeddiv.querySelector('#assignmenttitle').textContent
        const res = await fetch('assignments/delete?name=' + assignmenttitle, {
            method: "delete",
            headers: {
                "Content-type": "application/json"
            }
        })
        if (res.ok) {
            console.log('Assignment deleted Successfully')
            removebuttonsandpreview()
        }
        else {
            console.log('error deleting the Assignment')
        }
    }
    catch (err) {
        console.log(err)
    }
}
function removebuttonsandpreview() {
    let bar_container = document.querySelector('.left-main')
    bar_container.removeChild(clickeddiv)
    let previewcontainer = document.querySelector('.right-main')
    let previewbody = document.querySelector('.right-bodycontainer')
    previewcontainer.removeChild(previewbody)
    let olddeletebutton = document.querySelector('.deletebutton-holder')
    let oldeditbutton = document.querySelector('.editbutton-holder')
    let buttoncontainers = document.querySelector('.right-foot')
    buttoncontainers.removeChild(olddeletebutton)
    buttoncontainers.removeChild(oldeditbutton)
}

























