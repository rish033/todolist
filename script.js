tasks = []; //list of all tasks

const listInProgress = document.getElementById("table_inProgress");
const listCompleted = document.getElementById("table_Completed");
const inputData = document.getElementById("input");

options = { weekday: "short", day: "numeric", month: "short" };

/* adds tasks when called with task's details*/
function addTask(task_name, assignee, due_date) {
  tasks.push({
    id: tasks.length,
    taskName: task_name,
    assignee: assignee,
    dueDate: due_date.toLocaleDateString("en-US", options),
    done: false,
  });
}

/* delete tasks with task id */
function deleteTask(id) {
  document.getElementById(`task${id}`).remove();
}

/* toggles the status of the tasks */
function toggleTask(id) {
  tasks[id].done = !tasks[id].done; //changing the done status
  deleteTask(id); //deleting from 1st list
  loadtask(tasks[id]); //adding to other list
}

function loadtask(item) {
  /*checking if it belongs to done or not done */
  if (item.done) {
    //html code to insert
    html = `<tr id = 'task${item.id}'>
                    <td>${item.taskName}</td>
                    <td align="center">${item.assignee}</td>
                    <td align="center">${item.dueDate}</td>
                    <td align="center"><input type="checkbox" job = 'toggle' id = 'checkbox${item.id}' checked></td>
                </tr>`;
    listCompleted.insertAdjacentHTML("beforeend", html); //insert html
  } else {
    //html code to insert

    html = `<tr id = 'task${item.id}'>
                    <td>${item.taskName}</td>
                    <td align = "center">${item.assignee}</td>
                    <td align="center">${item.dueDate}</td>
                    <td align="center"> <input type="checkbox" job = 'toggle' id = 'checkbox${item.id}' > </td>
                </tr>`;
    listInProgress.insertAdjacentHTML("beforeend", html); //insert html
  }
}

// sends the tasks for submission if it is valid
function submitTask() {
  let inputAll = document.getElementsByClassName("input");
  if (inputAll.due_date.value === "") {
    //invalid due date
    alert("Please enter a valid due date");
    return;
  }
  due_date = new Date(inputAll.due_date.value);
  let todaysDate = new Date(); //getting the current date
  todaysDate.setHours(0, 0, 0, 0); //setting the time of this day to zero for comparision
  if (inputAll.task_name.value === "") {
    //no task's name
    alert("Please enter the task name");
    return;
  } else if (inputAll.assignee.value === "") {
    //no task's assignee
    alert("Please enter the Assignee's Name");
    return;
  } else if (due_date < todaysDate) {
    // the date is in the past
    alert("Please enter a Future date");
    return;
  }

  //valid tasks
  addTask(inputAll.task_name.value, inputAll.assignee.value, due_date);
  loadtask(tasks[tasks.length - 1], tasks.length - 1); //load the new task

  //reset the input fields
  for (i = 0; i < inputAll.length; i++) {
    inputAll[i].value = "";
  }
}

// return key to submit task
document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    submitTask();
  }
});

//click monitoring
document.addEventListener("click", function (event) {
  const element = event.target; // return the clicked element inside list

  //to avoid meaningless clicks
  const elementJob = element.attributes.hasOwnProperty("job")
    ? element.attributes.job.value
    : ""; // complete or delete

  //submit button is clicked
  if (elementJob == "submit") {
    submitTask();
  } else if (elementJob == "toggle") {
    //task is checked/unchecked
    const id = element.id.substr(8);
    toggleTask(id);
  }
});

//initiating
var dt = new Date(2022, 08, 15);
addTask("React Native", "Hari", dt);

tasks.forEach(function (item, index) {
  loadtask(item);
});