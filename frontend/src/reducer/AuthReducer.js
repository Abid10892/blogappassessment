export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        name: action.payload.name,
        username: action.payload.username,
        id: action.payload.id,
      };

    case "LOGOUT":
      return {
        name: null,
        username: null,
        id: null,
        accessToken: sessionStorage.removeItem("accessToken"),
      };

    default:
      break;
  }
};
