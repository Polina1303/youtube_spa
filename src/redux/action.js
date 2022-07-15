import { ADD_VALUE, CHANGE_FAVOURITES ,DELETE_FAVOURITES} from "../components/constans/constans"

export const login = (type, payload) => {
  return {
    type,
    payload,
  }
}

export const password = (type, payload) => {
  return {
    type,
    payload,
  }
}


export const favoritesAction = (data) => {
  console.log('action', data)
  return ({
    type: ADD_VALUE,
    payload: {
      'id': data.id,
      'login': data.user,
      'request': data.request,
      'title': data.name,
      'sort': data.sort,
      'maxVideos': data.maxVideos,
    }
  })
}

export const changeFavorites = (data) => {
  console.log('action2')
  return ({
    type: CHANGE_FAVOURITES,
    payload: {
      'id': data.id,
      'login': data.user,
      'request': data.request,
      'title': data.title,
      'sort': data.sort,
      'maxVideos': data.maxVideos,
    }
  })
}

export const deleteFavourites=(id)=>{
  return{
    type:DELETE_FAVOURITES,
    payload:id
  }
}