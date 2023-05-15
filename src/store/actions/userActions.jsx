/* eslint-disable no-console */
/* eslint-disable consistent-return */
import axios from "axios"

import authHeader from "../../services/auth-header"

export const SEARCH_CONTRACT = "SEARCH_CONTRACT"
export const SEARCH_INFO_CONTRACT = "SEARCH_INFO_CONTRACT"
export const SEARCH_BUY_AND_SELL = "SEARCH_BUY_AND_SELL"
export const ADD_TOP_WALLETS = "ADD_TOP_WALLETS"
export const ADD_TOP_WALLETS_API = "ADD_TOP_WALLETS_API"
export const SETNULL_INFO_CONTRACT = "SETNULL_INFO_CONTRACT"
export const CHECK_CONTRACT = "CHECK_CONTRACT"
export const HOME_DATA = "HOME_DATA"
export const SHOW_LOGIN = "SHOW_LOGIN"
export const SHOW_SIGNUP = "SHOW_SIGNUP"
export const SIGN_UP = "SIGN_UP"
export const SIGN_IN = "SIGN_IN"
export const USER_ACCOUNT_ACTIVATION = "USER_ACCOUNT_ACTIVATION"
export const SEND_RECOVERY_PASSWORD = "SEND_RECOVERY_PASSWORD"
export const EMAIL_USER_CHANGE = "EMAIL_USER_CHANGE"
export const CHECK_RESET_CODE = "CHECK_RESET_CODE"
export const RECOVER_PASSWORD = "RECOVER_PASSWORD"
export const ADD_TO_MONITORING = "ADD_TO_MONITORING"
export const GET_MONITORING = "GET_MONITORING"
export const REMOVE_TO_MONITORING = "REMOVE_TO_MONITORING"
export const GET_SUSPICIOUS = "GET_SUSPICIOUS"
export const ADD_TO_SUSPICIOUS = "ADD_TO_SUSPICIOUS"
export const REMOVE_TO_SUSPICIOUS = "REMOVE_TO_SUSPICIOUS"
export const RESEND_ACTIVATION_CODE = "RESEND_ACTIVATION_CODE"
export const ADD_LIQUIDITY = "ADD_LIQUIDITY"
export const CREATE_AUDITH = "CREATE_AUDITH"
export const ADMIN_LOGIN = "ADMIN_LOGIN"
export const ADD_TOP_WALLETS_DIFF = "ADD_TOP_WALLETS_DIFF"
export const ADD_TOP_WALLETS_DIFF_API = "ADD_TOP_WALLETS_DIFF_API"
export const SHOW_SECURITY = "SHOW_SECURITY"
export const SHOW_FORM_CONTACT = "SHOW_FORM_CONTACT"
export const SEND_CONTACT_FORM = "SEND_CONTACT_FORM"
export const ADD_LIQUIDITY_EVENT = "ADD_LIQUIDITY_EVENT"

const baseURL = import.meta.env.VITE_APP_API_URL

// setting Authorization header
axios.defaults.headers.common.Authorization = authHeader()

const http = axios.create({
  baseURL
})

const user = JSON.parse(localStorage.getItem("user"))

export function homeData() {
  return async (dispatch) => {
    try {
      const json = await http.get(`${baseURL}home/data`)
      return dispatch({
        type: HOME_DATA,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      console.log(error)
    }
  }
}

export function showModalLogin(data) {
  return (dispatch) => {
    try {
      return dispatch({
        type: SHOW_LOGIN,
        payload: data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      console.log(error)
    }
  }
}

export function showModalSignUp(data) {
  return (dispatch) => {
    try {
      return dispatch({
        type: SHOW_SIGNUP,
        payload: data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      console.log(error)
    }
  }
}

export function showModalSecurity(data) {
  return (dispatch) => {
    try {
      return dispatch({
        type: SHOW_SECURITY,
        payload: data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      console.log(error)
    }
  }
}

export function showModalContactForm(data) {
  return (dispatch) => {
    try {
      return dispatch({
        type: SHOW_FORM_CONTACT,
        payload: data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      console.log(error)
    }
  }
}

export function searchContract(contract) {
  return async (dispatch) => {
    try {
      return dispatch({
        type: SEARCH_CONTRACT,
        payload: contract
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      console.log(error)
    }
  }
}

export function searchInfoContract(address, network) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}contracts/search-info-contract`, {
        address,
        network
      })

      dispatch({
        type: ADD_TOP_WALLETS_API,
        payload: json?.data?.data?.topWallets
      })

      dispatch({
        type: ADD_TOP_WALLETS_DIFF_API,
        payload: json?.data?.data?.topWalletsDiff
      })

      dispatch({
        type: ADD_LIQUIDITY,
        payload: json?.data?.data?.liquidity
      })
      return dispatch({
        type: SEARCH_INFO_CONTRACT,
        payload: json?.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      console.log(error)
    }
  }
}

export function searchBuyAndSell(address) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}admin/get-buy-and-sell`, {
        address
      })

      dispatch({
        type: SEARCH_BUY_AND_SELL,
        payload: json?.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      console.log(error)
    }
  }
}

export function addTopWallets(data) {
  return async (dispatch) => {
    try {
      return dispatch({
        type: ADD_TOP_WALLETS,
        payload: data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      console.log(error)
    }
  }
}

export function addNextUnlock(data) {
  return async (dispatch) => {
    try {
      return dispatch({
        type: ADD_LIQUIDITY_EVENT,
        payload: data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      console.log(error)
    }
  }
}
export function addToptWalletsDiff(data) {
  return async (dispatch) => {
    try {
      return dispatch({
        type: ADD_TOP_WALLETS_DIFF,
        payload: data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      console.log(error)
    }
  }
}

export function addLiquidity(data) {
  return async (dispatch) => {
    try {
      return dispatch({
        type: ADD_LIQUIDITY,
        payload: data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      console.log(error)
    }
  }
}

export function checkContract(contract) {
  const obj = {
    address: contract
  }
  return async (dispatch) =>
    http
      .post(`${baseURL}contracts/check-contract`, obj)
      .then((json) =>
        dispatch({
          type: CHECK_CONTRACT,
          payload: json.data
        })
      )
      .catch((error) => Promise.reject(error))
}

export function setNullInfoContract() {
  return async (dispatch) => {
    try {
      return dispatch({
        type: SETNULL_INFO_CONTRACT
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      console.log(error)
    }
  }
}

/* ----MONITORING WALLETS---- */ /* ----MONITORING WALLETS---- */ /* ----MONITORING WALLETS---- */
/* ----MONITORING WALLETS---- */ /* ----MONITORING WALLETS---- */ /* ----MONITORING WALLETS---- */
/* ----MONITORING WALLETS---- */ /* ----MONITORING WALLETS---- */ /* ----MONITORING WALLETS---- */
export function addToMonitoring({ address, wallet }) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}user/add-monitoring-wallets`, {
        wallet,
        address
      })
      return dispatch({
        type: ADD_TO_MONITORING,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      console.log(error)
    }
  }
}

export function getMonitoring({ address }) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}user/get-monitoring-wallets`, {
        address
      })
      return dispatch({
        type: GET_MONITORING,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      console.log(error)
    }
  }
}

export function removeToMonitoring(wallet) {
  return async (dispatch) => {
    try {
      const json = await http.delete(`${baseURL}user/delete-monitoring-wallets`, { data: { wallet } })

      return dispatch({
        type: REMOVE_TO_MONITORING,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      console.log(error)
    }
  }
}

/* ----USERS----*/ /* ----USERS----*/ /* ----USERS----*/
/* ----USERS----*/ /* ----USERS----*/ /* ----USERS----*/
/* ----USERS----*/ /* ----USERS----*/ /* ----USERS----*/
/* ----USERS----*/ /* ----USERS----*/ /* ----USERS----*/

/* registro */
export function signUp({ name, lastName, email, password }) {
  const obj = {
    name,
    lastName,
    email,
    password
  }
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}User/sing-up`, obj)
      return dispatch({
        type: SIGN_UP,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      return Promise.reject(error)
    }
  }
}

/* Inicio de sesion */
export function signIn({ email, password }) {
  const obj = {
    email,
    password
  }
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}User/sing-in`, obj)
      const usuario = {
        email: json?.data?.userEmail,
        token: json?.data?.token
      }
      localStorage.setItem("user", JSON.stringify(usuario))
      return dispatch({
        type: SIGN_IN,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      return Promise.reject(error)
    }
  }
}

/* Cambiar email */
export function emailUserChange(data) {
  return async (dispatch) => {
    try {
      return dispatch({
        type: EMAIL_USER_CHANGE,
        payload: data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      return Promise.reject(error)
    }
  }
}

/* verificacion de codigo */
export function userAccountActivation({ email, token }) {
  const obj = {
    email,
    token
  }
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}User/user-account-activation`, obj)
      return dispatch({
        type: USER_ACCOUNT_ACTIVATION,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      return Promise.reject(error)
    }
  }
}

/* verificacion de codigo */
export function resendCodeActivation(email) {
  const obj = {
    email
  }

  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}User/resend-activation-code`, obj)
      return dispatch({
        type: RESEND_ACTIVATION_CODE,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      return Promise.reject(error)
    }
  }
}

/* Enviar codigo cambio de contraseña */
export function sendRecoveryPassword({ email }) {
  const obj = {
    email
  }
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}User/send-recovery-password-code`, obj)
      return dispatch({
        type: SEND_RECOVERY_PASSWORD,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      return Promise.reject(error)
    }
  }
}

/* Verificacion codigo de cambio de contraseña */
export function checkResetCode({ email, token }) {
  const obj = {
    email,
    token
  }
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}User/validate-recovery-password-code`, obj)
      return dispatch({
        type: CHECK_RESET_CODE,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      return Promise.reject(error)
    }
  }
}

/* Verificacion codigo de cambio de contraseña */
export function recoverPassword({ email, password, token }) {
  const obj = {
    email,
    password,
    token
  }
  return async (dispatch) => {
    try {
      const json = await http.put(`${baseURL}User/recover-password`, obj)
      return dispatch({
        type: RECOVER_PASSWORD,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      return Promise.reject(error)
    }
  }
}

/* post create audith */
export function createAudith(data) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}segurity-audit/create-audith`, data)
      return dispatch({
        type: CREATE_AUDITH,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      return Promise.reject(error)
    }
  }
}

/* ADMIN_LOGIN ADMIN_LOGIN ADMIN_LOGIN */
export function adminLogin(user) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}admin/login`, user)
      const usuarioAdmin = {
        email: json?.data?.userEmail,
        token: json?.data?.token
      }
      localStorage.setItem("user", JSON.stringify(usuarioAdmin))
      return dispatch({
        type: ADMIN_LOGIN,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      return Promise.reject(error)
    }
  }
}

export function sendContactForm(data) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}User/contact-form`, data)
      return dispatch({
        type: SEND_CONTACT_FORM,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user && user?.token) {
          window.location.reload(false)
        }
      }
      return Promise.reject(error)
    }
  }
}
