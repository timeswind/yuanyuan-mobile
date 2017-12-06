export const DEVELOP_API_SERVER = 'http://127.0.0.1:8080'
// export const DEVELOP_API_SERVER = 'https://yuanyuan.io/api'
export const PRODUCTION_API_SERVER = 'https://yuanyuan.io/api'
export const API_SERVER = __DEV__ ? DEVELOP_API_SERVER : PRODUCTION_API_SERVER
