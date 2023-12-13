let buttonflag = false;
document.querySelector('.left-main').addEventListener('click', (event) => {
    let selectedattendancebar = event.target.closest('.attendancerow')
    let colored = selectedattendancebar.classList.contains('colored');
    if (colored) {
        selectedattendancebar.style.backgroundColor = '';
    } else {
        selectedattendancebar.style.backgroundColor = '#A8EE9D';
    }
    selectedattendancebar.classList.toggle('colored')
    checkButtons()
});

function checkButtons() {
    let highlightedDiv = document.querySelector('.attendancerow.colored');
    let absentButton = document.querySelector('.absent-button-holder');
    let presentButton = document.querySelector('.present-button-holder');
    let left_div = document.querySelector('.left')
    if (!highlightedDiv) {
        left_div.removeChild(absentButton)
        left_div.removeChild(presentButton)
        return buttonflag = false;
    } else {
        addpresentabsentbutton()
    }
}

function addpresentabsentbutton() {
    if (!buttonflag) {
        let absentbuttoncontainer = document.createElement('div')
        absentbuttoncontainer.setAttribute('class', 'absent-button-holder')
        let absentbutton = document.createElement('button')
        absentbutton.textContent = 'Absent'
        absentbutton.setAttribute('class', 'absent-button')
        absentbuttoncontainer.appendChild(absentbutton)
        document.querySelector('.left').appendChild(absentbuttoncontainer)
        let presentbuttoncontainer = document.createElement('div')
        presentbuttoncontainer.setAttribute('class', 'present-button-holder')
        let presentbutton = document.createElement('button')
        presentbutton.textContent = 'Present'
        presentbutton.setAttribute('class', 'present-button')
        presentbuttoncontainer.appendChild(presentbutton)
        document.querySelector('.left').appendChild(presentbuttoncontainer)
        return buttonflag = true;
    }
}





