addTask("buy milk")
addTask("Learn to wrap gifts", 1639944400000)

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {

    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        // console.log(timezoneOffset)
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

function addTask(description, dueTime){
    let ul = document.getElementById("task_list");
    let li = document.createElement("li");
    li.innerHTML = description;
    let span = document.createElement("span");
    if (dueTime){
        let date = new Date(dueTime);
        span.innerHTML = ' due '+date.toLocaleDateString('en-US')+' '+date.toLocaleTimeString('en-US');
        span.setAttribute("class", "due");
    }
    let button = document.createElement("button");
    button.innerHTML = "Done";
    button.setAttribute("class", "btn btn-sm btn-outline-danger done");
    button.setAttribute("type", "button");
    button.onclick = function(){
        button.parentElement.remove();
    }
    li.appendChild(span);
    li.appendChild(button);

    ul.appendChild(li);

    document.getElementById("duetime_input").value='';
    document.getElementById("duedate_input").value='';
    document.getElementById("task_description_input").value='';
}

document.getElementById("add_task").addEventListener("click", addTaskFromInput);
document.getElementById("task_description_input").addEventListener("keydown", function(key){
    if (key.key === 'Enter'){
        addTaskFromInput();
    }
    }
);

function addTaskFromInput(){
    let description = document.getElementById("task_description_input").value;
    let due_date = document.getElementById("duedate_input");
    // console.log(document.getElementById("duetime_input").value)
    let due_time = document.getElementById("duetime_input");
    let dueTime = dateAndTimeToTimestamp(due_date, due_time);
    addTask(description, dueTime);
}

function del(obj){
    let oParent = obj.parentNode;
    document.getElementById("task_list").removeChild(oParent);
}