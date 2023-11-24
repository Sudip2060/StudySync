

document.getElementById('createbutton').onclick = function showOverlay() {
    document.getElementById("overlay").style.display = "block";
    document.querySelector('.message-box').textContent = "";
}
function hideOverlay() {
    document.getElementById("overlay").style.display = "none";
}

document.getElementById('assignmentaddbutton').onclick = function () {
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
    addassignmentbar(assignmentName, startDate, endDate)
    document.getElementById('sectionname').value = '';
    document.getElementById('startdate').value = '';
    document.getElementById('enddate').value = '';
    document.getElementById('instructions').value = '';

};


async function postassignment() {
    const assignmentname = document.getElementById('sectionname').value;
    const startdate = document.getElementById('startdate').value;
    const enddate = document.getElementById('enddate').value;
    const instructions = document.getElementById('instructions').value;
    try {
        const res = await fetch('/assignments/new', {
            method: 'post',
            body: JSON.stringify({ assignmentname, startdate, enddate, instructions }),
            headers: { 'Content-type': 'application/json' }
        })

        if (res.ok) {
            const data = await res.json()
            console.log(data)
            document.querySelector('.message-box').textContent = JSON.stringify(assignmentname) + ' sucessfully added '
        }
        else {
            const err = await res.json()
            console.log(err)
        }
    }
    catch (error) {
        console.log(error)
    }

}




function addassignmentbar(assignmentname, sDate, edate) {
    const newAssignmentContainer = document.createElement('div');
    newAssignmentContainer.className = "assignment-container";

    const newCheckbox = document.createElement('input')
    newCheckbox.type = 'checkbox';
    newCheckbox.id = 'assignmentcheck';

    newAssignmentContainer.appendChild(newCheckbox);

    const newAssignmentBox = document.createElement('div');
    newAssignmentBox.className = 'assignment-box';
    newAssignmentContainer.appendChild(newAssignmentBox)

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
    document.querySelector('.left-main').appendChild(newAssignmentContainer);
}

document.querySelector('.left-main').addEventListener('click', function (event) {
    if (event.target.classList.contains('assignment-box')) {
        const assignmentName = event.target.querySelector('.box-left #assignmenttitle').textContent;
        viewassignment(assignmentName);
    }
});


async function viewassignment(assignmentname) {
    document.querySelector('.right-bodycontainer').textContent = ''
    try {
        const res = await fetch('/assignments/name?name=' + assignmentname, {
            method: "get",
            headers: {
                'Content-type': 'application/json'
            }

        })
        if (res.ok) {
            const data = await res.json()
            console.log(data)
            document.querySelector('.test_div').textContent = JSON.stringify(data)
        }
        else {
            const error = await res.json()
            console.log(error)
            document.querySelector('.test_div').textContent = JSON.stringify(error)
        }
    }
    catch (err) {
        console.log(err)
    }

}








    










