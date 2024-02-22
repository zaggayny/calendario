window.onload = function (){
    generateCalendar();
    loadTasksFromLocalStorage();

};


function generateCalendar(){
    const calendar = document.getElementById('calendar');
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();


    const firstDayOfMonth = new Date (year, month , 1 );
    const LastDayOfMonth = new Date (year, month +1 ,0);

    const firstDayOfWeek = firstDayOfMonth.getDay();
    const totalDays = LastDayOfMonth.getDate();


    for (let i= 0 ; i<firstDayOfWeek ; i++){
        let blankDay = document.createElement("div");
        calendar.appendChild(blankDay);
    }

    for(let day=1; day <= totalDays ; day++ ){
        let daySquare = document.createElement("div");
        daySquare.className="calendar-day";
        daySquare.textContent=day;
        daySquare.id = `day-${day}`;
        calendar.appendChild(daySquare);
    }

}


function showAddTaskModal(){
    document.getElementById('addTaskModal').style.display='block';

}

function closeAddTaskModal(){
    document.getElementById('addTaskModal').style.display='none';

};
function deleteTask (taskElement){
    if (confirm("¿Estas seguro que quieres borrar esta tarea?")){
        taskElement.remove();
        saveTasksToLocalStorage(); 
    }
}

function editTask(taskElement){
    const newTaskDesc = prompt("edita tu tarea:", taskElement.textContent );
    if (newTaskDesc !== null && newTaskDesc.trim() !==""){
        taskElement.textContent = newTaskDesc;
        saveTasksToLocalStorage(); 
    }
}

function addTask(){
    const taskDate = new Date( document.getElementById ('task-date').value+ "T00:00:00");
    const taskDesc = document.getElementById('task-desc').value.trim();


    if (taskDesc && !isNaN(taskDate.getDate())){

        const calendarDays = document.getElementById('calendar').children;
        for(let i = 0 ; i < calendarDays.length ; i++){
            const day = calendarDays[i];
            if(parseInt(day.textContent)=== taskDate.getDate()){
                const taskElement = document.createElement("div");
                taskElement.className="task";
                taskElement.textContent = taskDesc;
            
                taskElement.addEventListener("contextmenu",function (event){
                    event.preventDefault();
                    deleteTask(taskElement);
                });
                taskElement.addEventListener('click',function(){editTask(taskElement);
                });

                day.appendChild(taskElement);
                saveTasksToLocalStorage(); 
                break;
                
            
            }
        }
        closeAddTaskModal();
    }else{
        alert("por favor ingrese una fecha válida y una descripción de la tarea!")
    }


   
    
    
}
 function saveTasksToLocalStorage() {
        const tasks = document.querySelectorAll('.task');
        const tasksArray = Array.from(tasks).map(task => {
            return {
                date: task.parentNode.textContent,
                description: task.textContent
            };
        });
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            const calendarDays = document.getElementById('calendar').children;
            for (let i = 0; i < calendarDays.length; i++) {
                const day = calendarDays[i];
                if (parseInt(day.textContent) === parseInt(task.date)) {
                    const taskElement = document.createElement("div");
                    taskElement.className = "task";
                    taskElement.textContent = task.description;

                    taskElement.addEventListener("contextmenu", function (event) {
                        event.preventDefault();
                        deleteTask(taskElement);
                    });
                    taskElement.addEventListener('click', function () {
                        editTask(taskElement);
                    });

                    day.appendChild(taskElement);
                    break;
                }
            }
        });
    }
}

