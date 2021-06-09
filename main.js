`use strict`;
{
  const inputBox = document.getElementById('input-todo');
  const addButton = document.getElementById('add-button');
  const addTaskTarget = document.getElementById('addTask-target');
  const todos = [];

  addButton.addEventListener('click', () => {
    const todo = {
      id: todos.length,
      comment: inputBox.value,
      status: '作業中',
    };
    inputBox.focus();
    if (inputBox.value === '') {
      console.log('タスクを入力してください！');
      return;
    }
    todos.push(todo);
    inputBox.value = '';
    radioChange();
  });

  const showTodos = (selecttodos) => {
    addTaskTarget.textContent = '';
    selecttodos.forEach((todo) => {
      const tableRecord = document.createElement('tr');
      addTaskTarget.appendChild(tableRecord);
      const tableId = document.createElement('td');
      const tableComment = document.createElement('td');
      const tableStatus = document.createElement('td');
      const tableAction = document.createElement('td');

      tableId.textContent = todo.id;
      tableComment.textContent = todo.comment;
      tableRecord.appendChild(tableId);
      tableRecord.appendChild(tableComment);
      tableRecord.appendChild(tableStatus);
      tableRecord.appendChild(tableAction);

      tableStatus.appendChild(createStatusButton(todo));
      tableAction.appendChild(createDeleteButton(todo.id));
    });
  };

  const createStatusButton = (todo) => {
    const statusButton = document.createElement('button');
    statusButton.innerText = todo.status;
    statusButton.addEventListener('click', () => {
      if (todo.status === '作業中') {
        todo.status = '完了';
      } else {
        todo.status = '作業中';
      }
      showTodos(todos);
      console.log(todos);
    });
    return statusButton;
  };

  const createDeleteButton = (index) => {
    const createdeletebutton = document.createElement('button');
    createdeletebutton.textContent = '削除';
    createdeletebutton.addEventListener('click', () => {
      todos.splice(index, 1);
      showTodos(todos);
      todos.reduce((Idnum, todo) => (todo.id = Idnum + 1), -1);
      showTodos(todos);
    });
    return createdeletebutton;
  };

  function radioChange() {
    const radio1_1 = document.getElementById('radio-all-select');
    const radio1_2 = document.getElementById('adio-working-select');
    const radio1_3 = document.getElementById('radio-done-select');

    if (radio1_1.checked) {
      todos.slice();
      return showTodos(todos);
    } else if (radio1_2.checked) {
      let filterdoing = todos.filter((todo) => {
        return todo.status === '作業中';
      });
      return showTodos(filterdoing);
    } else if (radio1_3.checked) {
      let filterdone = todos.filter((todo) => {
        return todo.status === '完了';
      });
      return showTodos(filterdone);
    }
  }
}
