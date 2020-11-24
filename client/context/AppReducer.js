export default (state,action)=>{
    switch (action.type) {
        case 'REGISTER_USER':
            return {
                ...state,
                message:action.payload
            }

        case 'GET_USERS':
            return {
                ...state,
                users:action.payload
            }

        case 'SIGN_IN':
            return {
                ...state,
                message:action.payload.message,
                token:action.payload.token,
                user:action.payload.user
            }
        case 'ERROR':
            return {
                ...state,
                error: action.payload
            }

        case 'CREATE_ARTICLE':
            return {
                ...state,
                message:action.payload.message
            }

        case 'GET_ALL_ARTICLES':
            return {
                ...state,
                articles:action.payload
            }

        case 'GET_SINGLE_ARTICLE':
            return {
                ...state,
                article:action.payload
            }

        case 'UPDATE_ARTICLE':
            return {
                ...state,
                article:action.payload.article,
                message:action.payload.message
            }

        case 'DELETE_ARTICLE':
            return {
                ...state,
                message:action.payload
            }
            
        case 'SET_NULL':
            return {
                ...state,
                error:action.payload,
                message:action.payload
            }


        default:
            return state
    }
}