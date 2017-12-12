import {
  USER_LOGGEDIN,
  USER_LOGGEDOUT,
  USER_LOGIN_FAIL,
  USER_SET_AVATAR
} from '../constants'

const initialState = {
  isLogin: false,
  avatar: "",
  school: "",
  token: "",
  id: "",
  name: "",
  email: "",
  role: "",
  permissions: [],
  emailVerified: true,
  verifyEmailStatus: "",
  loginError: null
}

export default function update(state = initialState, action) {
  if (action.type === USER_LOGGEDIN) {
    return Object.assign({}, state, {
      isLogin: true,
      email: action.data.email,
      avatar: action.data.avatar,
      id: action.data.id,
      name: action.data.name,
      role: action.data.role,
      permissions: action.data.permissions,
      school: action.data.school,
      token: action.data.token,
      loginError: null
    })
  } else if (action.type === USER_LOGGEDOUT) {
    return Object.assign({}, state, {
      isLogin: false,
      school: "",
      avatar: "",
      token: "",
      id: "",
      name: "",
      email: "",
      role: "",
      permissions: [],
      emailVerified: false,
      verifyEmailStatus: "",
      loginError: null
    })
  } else if (action.type === USER_LOGIN_FAIL) {
    const loginErrorResponse = action.data
    if ('error' in loginErrorResponse.data) {
      return Object.assign({}, state, {
        loginError: loginErrorResponse.data.error
      })
    }
  } else if(action.type === USER_SET_AVATAR) {
    return Object.assign({}, state, {
      avatar: action.avatar
    })
  }
  return state
}
