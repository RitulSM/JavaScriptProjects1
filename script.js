document.addEventListener('DOMContentLoaded', () => {
    const todoinput = document.getElementById("todo-input");
    const addtaskbutton = document.getElementById("add-task-btn");
    const todolist = document.getElementById("todo-list");
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        rendertasks(task);
    });

    addtaskbutton.addEventListener('click', () => {
        const taskText = todoinput.value.trim();
        if (taskText === "") return;
        const newtask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newtask);
        savetasks();
        rendertasks(newtask);
        todoinput.value = '';
    });

    function rendertasks(task) {
        const li = document.createElement('li');
        li.setAttribute("data-id", task.id);
        if (task.completed) li.classList.add('completed');
        li.innerHTML = `
            <span>${task.text}</span>
            <button>delete</button>
        `;
        li.addEventListener('click', (e) => {
            if (e.target.tagName === "BUTTON") return;
            task.completed = !task.completed;
            li.classList.toggle('completed');
            savetasks(); // Save task completion status
        });

        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            savetasks(); // Save after deleting
        });

        todolist.appendChild(li);
    }

    function savetasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
