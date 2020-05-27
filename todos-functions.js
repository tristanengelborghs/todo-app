// Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todoJSON = localStorage.getItem('todos')
    return todoJSON !== null ? JSON.parse(todoJSON) :  []
}

// Save todos to localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove todo from the array
const removeTodo = (id) => {
    const todoIndex = todos.findIndex(function(todo) {
        return todo.id === id
    })

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// change value todo.completed if checkbox changes
const toggleTodo = (id) => {
    const todo = todos.find(function(todo) {
        return todo.id === id
    })

    if (todo !== undefined) {
        todo.completed = !todo.completed
    }
} 

// Render application todos based on filters
const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })
    
    const inclompeteTodos = filteredTodos.filter( (todo) => !todo.completed )

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(inclompeteTodos))

    filteredTodos.forEach( (todo) => {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

// Get the dom elements for a specific note
const generateTodoDOM = (todo) => {
    // creating all elements
    const p = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const button = document.createElement('button')

    //checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    //todo
    todoText.textContent = todo.text

    //button
    button.textContent = 'x'
    button.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    
    //appending to div
    p.appendChild(checkbox)
    p.appendChild(todoText)
    p.appendChild(button)
    return p
}

// Get the dom elements for list summary
const generateSummaryDOM =  (inclompeteTodos) => {
    const todosText = document.createElement('h2')
    todosText.textContent = `You have ${inclompeteTodos.length} things to do`
    return todosText
}

