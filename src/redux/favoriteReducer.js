
const initialValue = [];

export function favoriteReducer(state=initialValue,action){
    switch(action.type){
        case 'ADD_VALUE':return [...state,action.payload]
        case 'CHANGE_FAVOURITES':return [...state.map((obj)=>{
 return obj.id===action.payload.id ? action.payload : obj
        })]
        case 'DELETE_FAVOURITES':return state.length >1 ? state.filter(item=>item.id!=action.payload):initialValue

    }
    return state
}