export const login = (name, id) => {
    return (dispatch) => {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          username: name,
          id : id,
          isLoggedIn: true
        }
      });
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('username', name);
      localStorage.setItem('id', id);
  
      // 로그인 요청이 실패하면 실패 메시지를 Redux Store에 저장합니다.
      // dispatch({
      //   type: 'LOGIN_FAILURE',
      //   payload: {
      //     error: '로그인에 실패했습니다.'
      //   }
      // });
    };
  };
  
  export const logout = () => {
    // 로그아웃 시 로그인 상태를 Redux Store에서 제거하고, 로컬 스토리지에서도 제거합니다.
    localStorage.setItem('isLoggedIn', false);
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    return {
      type: 'LOGOUT'
    };
  };