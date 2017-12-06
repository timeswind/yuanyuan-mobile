import {
  USER_LOGGEDIN,
  USER_LOGGEDOUT,
  USER_LOGIN_FAIL
} from '../constants'

const initialState = {
  isLogin: false,
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
  }

  return state
}
