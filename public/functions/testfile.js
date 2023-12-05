

    document.getElementById("deletebutton").onclick = async () => {

        const assignmentname = prompt("enter the assignment name to delete")
        if (assignmentname) {
            try {
                const res = await fetch('assignments/delete?name=' + assignmentname, {
                    method: "delete",
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                if (res.ok) {
                    console.log('user deleted Successfully')
                    window.alert('user deleted successfully')
                }
                else {
                    console.log('error deleting the user')
                    window.alert('cannot find the user')

                }
            }
            catch (err) {
                console.err(err)
            }
        }
    }


    document.getElementById('editbutton').onclick = () => {
        createTestOverlay();
    }

    function createTestOverlay() {
        const testOverlay = document.createElement("div");
        testOverlay.style.display = "none";
        testOverlay.style.position = "fixed";
        testOverlay.style.top = "0";
        testOverlay.style.left = "0";
        testOverlay.style.width = "100%";
        testOverlay.style.height = "100%";
        testOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        testOverlay.style.justifyContent = "center";
        testOverlay.style.alignItems = "center";
        testOverlay.style.zIndex = "1";
        testOverlay.id = "test-overlay"

        const overlayContent = document.createElement("div");
        overlayContent.style.backgroundColor = "white";
        overlayContent.style.padding = "20px";
        overlayContent.style.borderRadius = "10px";
        overlayContent.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";

        const closeBtn = document.createElement("span");
        closeBtn.textContent = "X";
        closeBtn.style.position = "absolute";
        closeBtn.style.top = "10px";
        closeBtn.style.right = "10px";
        closeBtn.style.cursor = "pointer";
        closeBtn.onclick = hideTestOverlay;

        const formTitle = document.createElement("h2");
        formTitle.textContent = "Test Overlay Form";

        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Name:";
        const nameInput = document.createElement("input");
        nameInput.type = "text";

        const startDateLabel = document.createElement("label");
        startDateLabel.textContent = "Start Date:";
        const startDateInput = document.createElement("input");
        startDateInput.type = "date";

        const endDateLabel = document.createElement("label");
        endDateLabel.textContent = "End Date:";
        const endDateInput = document.createElement("input");
        endDateInput.type = "date";

        const instructionsLabel = document.createElement("label");
        instructionsLabel.textContent = "Instructions:";
        const instructionsTextarea = document.createElement("textarea");
        instructionsTextarea.rows = "4";
        instructionsTextarea.cols = "50";

        const submitBtn = document.createElement("button");
        submitBtn.textContent = "Update";
        submitBtn.onclick = submitTestForm;

        overlayContent.appendChild(closeBtn);
        overlayContent.appendChild(formTitle);
        overlayContent.appendChild(nameLabel);
        overlayContent.appendChild(nameInput);
        overlayContent.appendChild(document.createElement("br"));
        overlayContent.appendChild(startDateLabel);
        overlayContent.appendChild(startDateInput);
        overlayContent.appendChild(document.createElement("br"));
        overlayContent.appendChild(endDateLabel);
        overlayContent.appendChild(endDateInput);
        overlayContent.appendChild(document.createElement("br"));
        overlayContent.appendChild(instructionsLabel);
        overlayContent.appendChild(instructionsTextarea);
        overlayContent.appendChild(document.createElement("br"));
        overlayContent.appendChild(submitBtn);

        testOverlay.appendChild(overlayContent);

        document.body.appendChild(testOverlay);
        testOverlay.style.display = "flex";
    }

    function hideTestOverlay() {
        const testOverlay = document.querySelector("#test-overlay");
        testOverlay.style.display = "none";
        document.body.removeChild(testOverlay);
    }

    async function submitTestForm() {
        const assignmentname = document.querySelector("#test-overlay input[type='text']").value;
        const startdate = document.querySelector("#test-overlay input[type='date']").value;
        const enddate = document.querySelector("#test-overlay input[type='date']").value;
        const instructions = document.querySelector("#test-overlay textarea").value;

        try {
            const res = await fetch('/assignments/update?name=' + assignmentname, {
                method: "put",
                headers: {
                    "Content-type": "application/json"
                },
                body:JSON.stringify({assignmentname,startdate,enddate,instructions})
            })
            if (res.ok) {
                const data = await res.json()
                window.alert('assignment updated')
                hideTestOverlay()
            }
            else {
                const error = await res.json()
                window.alert('An error occured')
            }
        }
        catch(err){
            console.error(err)

        }




    }