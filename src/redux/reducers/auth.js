import {
  USER_LOGGEDIN,
  USER_LOGGEDOUT
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
}

export default function update(state = initialState, action) {
  if(action.type === USER_LOGGEDIN) {
    console.log(action.data)
    return Object.assign({}, state, {
      isLogin: true,
      email: action.data.email,
      id: action.data.id,
      name: action.data.name,
      role: action.data.role,
      permissions: action.data.permissions,
      school: action.data.school,
      token: action.data.token
    })
  } else if(action.type === USER_LOGGEDOUT) {
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
      verifyEmailStatus: ""
    })
  }
  
  return state
}
