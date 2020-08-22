export const initialState = {
  dataNavers: [],
  showModal: false,
  naverSelect: {}
}

export function reducer(state, action) {
  switch (action.type) {
    case "setState":
      return {...state,  [action.payload.nested]: action.payload.value };
    case "deleteState":
      const remove = state.dataNavers.filter(item => item.id !== action.payload.value)
      return {...state,  [action.payload.nested]: remove};
    default:
      return state
    }
  }