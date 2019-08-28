function deepFreeze(o) {
    Object.freeze(o);

    Object.getOwnPropertyNames(o).forEach(function (prop) {
        if (o.hasOwnProperty(prop) && o[prop] !== null && (typeof o[prop] === "object" || typeof o[prop] === "function") && !Object.isFrozen(o[prop])) {
            deepFreeze(o[prop]);
        }
    });

    return o;
};






const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            }
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
}

const visibilityFilter = (
    state = 'SHOW_ALL',
    action
) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const { combineReducers } = Redux;
const todoApp = combineReducers({
    todos,
    visibilityFilter
});

/* const todoApp = (state = {}, action) => {
    return {
        todos: todos(
            state.todos,
            action
        ),
        visibilityFilter: visibilityFilter(
            state.visibilityFilter,
            action
        )
    }
} */

const showState = () => {
    console.log('State:');
    console.log(store.getState());
    console.log('-------------------------');
};

const { createStore } = Redux;
const store = createStore(todoApp);

showState();

console.log('Adding TODO');
store.dispatch({
    type: 'ADD_TODO',
    id: 0,
    text: "Learn Redux"
});
showState();

console.log('Adding TODO');
store.dispatch({
    type: 'ADD_TODO',
    id: 1,
    text: "Go Shopping"
});
showState();

console.log('TOGGLE_TODO');
store.dispatch({
    type: 'TOGGLE_TODO',
    id: 1
});
showState();

console.log('COMPLETED');
store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED'
})
showState();







