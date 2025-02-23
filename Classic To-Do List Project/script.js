document.addEventListener("DOMContentLoaded", () => {
    //step-1 is to grab all the elements we have in our project
    const inputField = document.getElementById("Todo-Input");
    const addTask = document.getElementById("Add-Task-Button");
    const taskList = document.getElementById("Task-list");
    const enterKey = document.getElementById("Todo-Input");
    //now we also have to store these tasks so for that we have to delcare an empty array
    //updated task arrray
    //now here we are getting stringify from saveTask() and parsing it to make it back to its original data structure 
    // || ----> means or
    // here getItem(should be same as a setIntem(this name here in this section))
    let task = JSON.parse(localStorage.getItem("tasks")) || [];

    task.forEach((task) => renderTask(task));
    // here we are checking wherether or not input is empty or not if it is empty than now we have to just return;
    addTask.addEventListener("click", () => {
        const taskText = inputField.value.trim();
        if (taskText === "") return;
        //here we have to give these a unique idfor stricking css
        const newTask = {
            id: Date.now(),             // for giving it unique id we are using date(can be anything)
            text: taskText,
            completed: false,
        };
        task.push(newTask);             // here we are pushing into task array 
        saveTask();                     // here we are saving our pushed values into task array
        renderTask(newTask);            // it will instanlty show us the added item in list
        inputField.value = "";          // clears the input
        console.log(task);              // here we are just printing our task array in console(which shows us our newTask object capsule with uniwue id of date and other two things)
    });
    //delete task function
    function deleteTask(id) {
        task = task.filter((task) => task.id !== id); // the filter out the tasks whose id is not matching.
        saveTask(); // save to local storage.
        // renderTask(); // render each task. idk why but it works so we will keep it as is
    }
    //pickup the task from local storage 
    function renderTask(task) {
        console.log(task.text); // this .text will only get us the text value field from our task array object data capsule
        const li = document.createElement("li");
        li.setAttribute("data-ID", task.id);  //here we are extracting unique id from task array

        li.innerHTML = `
            <p> ${task.text}</p>
            <button class="delbutton"> Delete </button > `;
        // taskList.appendChild(li);

        li.addEventListener("click", (e) => {
            if (e.target.classList.contains("delbutton")) return;
            task.completed = !task.completed
            li.classList.toggle("completed");
            li.classList.toggle("cut");
            saveTask();
        });

        // delete task
        li.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                deleteTask(task.id);
                li.remove();
            }
        });


        taskList.appendChild(li);

    }

    function saveTask() {
        //invoking localhost api by using localStorgae keyword which automatically wil give us the access
        // of out local storage here
        // and using setItems so that we can add things to the local storage 
        //JSON.stringify will convert our array into a special string.
        // our empty array name was "task"
        localStorage.setItem("tasks", JSON.stringify(task));
    }

    // this is just making enter as a click button of add to list (not necessarly needed)
    enterKey.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("Add-Task-Button").click();
        }
    });
    // enter is click button ends here
});

