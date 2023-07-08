const initialState = {
    username: localStorage.getItem('username'),
    id: localStorage.getItem('id'),
    password : localStorage.getItem('password'),
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    error: ''
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return  state
      case 'LOGIN_FAILURE':
        return {
            username: '',
            id: '',
            password : '',
            isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
            error: action.payload.error
        };
      case 'LOGOUT':
        return {
            username: '',
            id: '',
            password : '',
            isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
            error: ''
        }
      default:
        return state
    }
  };
  
  export default authReducer;
  