// Fetch existing todos from localStorage
const getSavedTodos = function () {
    const todoJSON = localStorage.getItem('todos')

    if (todoJSON !== null) {
        return JSON.parse(todoJSON)
    } else {
        return []
    }

}

// Save todos to localStorage
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Render application todos based on filters
const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })
    
    const inclompeteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(inclompeteTodos))

    filteredTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

// Get the dom elements for a specific note
const generateTodoDOM = function (todo) {
    const p = document.createElement('div')

    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const button = document.createElement('button')

    checkbox.setAttribute('type', 'checkbox')
    todoText.textContent = todo.text
    button.textContent = 'x'

    p.appendChild(checkbox)
    p.appendChild(todoText)
    p.appendChild(button)
    return p
}

// Get the dom elements for list summary
const generateSummaryDOM = function (inclompeteTodos) {
    const todosText = document.createElement('h2')
    todosText.textContent = `You have ${inclompeteTodos.length} things to do`
    return todosText
}

const generateFunction = function () {
    console.log('noise')
}

