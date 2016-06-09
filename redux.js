const todo = (state, action) => {
  switch (action.type) {
    case 'AGREGAR_TAREA':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'COMPLETAR_TAREA':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed; !state.completed
      };
    default:
      return state;
  }
};
// Los anteriores reducers se componen en estos:
const todos = (state = [], action) => {
  switch (action.type) {
    case 'AGREGAR_TAREA':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TAREA':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (
  state = 'MOSTRAR_TODAS',
  action
) => {
  switch (action.type) {
    case 'DEFINIR_FILTRO_VISIBILIDAD':
      return action.filter;
    default:
      return state;
  }
};

const { combineReducers } = Redux; // Usando CDN
const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});

// Aquí se combinan todas las demás partes, después se cambian a la helper function combineReducers()
// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(
//       state.todos,
//       action
//     ),
//     visibilityFilter: visibilityFilter(
//       state.visibilityFilter,
//       action
//     )
//   };
// };

const { createStore } = Redux;
const store = createStore(todoApp);

console.log('Estado inicial:');
console.log(store.getState());
console.log('--------------');

console.log('Despachando AGREGAR_TAREA.');
store.dispatch({
  type: 'AGREGAR_TAREA',
  id: 0,
  text: 'Aprender Redux'
});
console.log('Estado actual:');
console.log(store.getState());
console.log('--------------');

console.log('Despachando AGREGAR_TAREA.');
store.dispatch({
  type: 'AGREGAR_TAREA',
  id: 1,
  text: 'Aprender sobre React Native.'
});
console.log('Estado actual:');
console.log(store.getState());
console.log('--------------');

console.log('Despachando COMPLETAR_TAREA.');
store.dispatch({
  type: 'COMPLETAR_TAREA',
  id: 0
});
console.log('Estado actual:');
console.log(store.getState());
console.log('--------------');

console.log('Despachando DEFINIR_FILTRO_VISIBILIDAD');
store.dispatch({
  type: 'DEFINIR_FILTRO_VISIBILIDAD',
  filter: 'MOSTRAR_COMPLETADAS'
});
console.log('Estado actual:');
console.log(store.getState());
console.log('--------------');
