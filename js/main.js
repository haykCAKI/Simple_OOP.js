class Task {
    constructor() {
        this.id = 1;
        this.array = [];
        this.editID = null;
    }

    readData() {
        let taskManager = {};
        taskManager.id = this.id;
        taskManager.taskText = document.getElementById("inputTask").value;
        taskManager.taskData = document.getElementById("dateTask").value;
        return taskManager;
    }

    formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        const year = date.getFullYear().toString().slice(2); // Extract last two digits of the year
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${year}/${month}/${day} ${hours}:${minutes}`;
    }

    tableList() {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        for (let i = 0; i < this.array.length; i++) {
            let tr = tbody.insertRow();
            let td_id = tr.insertCell();
            let td_task = tr.insertCell();
            let td_data = tr.insertCell();
            let td_action = tr.insertCell();

            td_id.innerText = this.array[i].id;
            td_id.classList.add('center');

            td_task.innerText = this.array[i].taskText;
            td_data.innerText = this.formatDateTime(this.array[i].taskData);

            let imgEdit = document.createElement('img');
            let imgDelete = document.createElement('img');

            imgEdit.src = 'img/edit.svg';
            imgEdit.setAttribute('onclick', `taskManage.prepareEdition(${JSON.stringify(this.array[i])})`);

            imgDelete.src = 'img/delete.svg';
            imgDelete.setAttribute('onclick', `taskManage.delete(${this.array[i].id})`);

            td_action.appendChild(imgEdit);
            td_action.appendChild(imgDelete);
        }
    }

    add(taskManager) {
        taskManager.taskText = String(taskManager.taskText);
        this.array.push(taskManager);
        this.id++;
    }

    validate(taskManager) {
        try {
            let msg = '';
            if (taskManager.taskText === '') {
                msg += 'You didn\'t fill in this field';
            }
            if (msg !== '') {
                alert(msg);
                return false;
            }
            return true;
        } catch (err) {
            console.error(err);
        }
    }

    cancel() {
        document.getElementById('inputTask').value = '';
        document.getElementById('dateTask').value = '';

        document.getElementById('btn1').innerText = 'Salvar';
        this.editID = null;
    }

    update(id, taskManager) {
        for (let i = 0; i < this.array.length; i++) {
            if (this.array[i].id == id) {
                this.array[i].taskText = taskManager.taskText;
                this.array[i].taskData = taskManager.taskData;
            }
        }
    }

    save() {
        let taskManager = this.readData();

        if (this.validate(taskManager)) {
            if (this.editID == null) {
                this.add(taskManager);
            } else {
                this.update(this.editID, taskManager);
            }
        }

        this.tableList();
        this.cancel();
    }

    delete(id) {
        if (confirm('Do you want to delete the task with ID ' + id + ' ? ')) {
            let tbody = document.getElementById('tbody');
            for (let i = 0; i < this.array.length; i++) {
                if (this.array[i].id == id) {
                    this.array.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }

    prepareEdition(dados) {
        this.editID = dados.id;

        document.getElementById('inputTask').value = dados.taskText;
        document.getElementById('dateTask').value = dados.taskData;

        document.getElementById('btn1').innerText = 'Salvar';
    }
}

var taskManage = new Task();
