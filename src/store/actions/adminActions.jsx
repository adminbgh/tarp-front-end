/* eslint-disable*/
import axios from "axios"
import authHeader from "../../services/auth-header"

export const ADMIN_GET_ALL_SCAM = "ADMIN_GET_ALL_SCAM"
export const ADMIN_ADD_SCAM_CONTRACT = "ADMIN_ADD_SCAM_CONTRACT"
export const ADMIN_DELETE_SCAM_CONTRACT = "ADMIN_DELETE_SCAM_CONTRACT"
export const ADMIN_ANALYSIS = "ADMIN_ANALYSIS"
export const ADMIN_UPDATE_ANALYSIS = "ADMIN_UPDATE_ANALYSIS"
export const ADMIN_GET_ONE_ADMIN_ANALYSIS = "ADMIN_GET_ONE_ADMIN_ANALYSIS"
export const ADMIN_GET_LIST_CONTRACT = "ADMIN_GET_LIST_CONTRACT"
export const ADMIN_SECURITY_POINTS = "ADMIN_SECURITY_POINTS"
export const ADMIN_MARK_SPAM = "ADMIN_MARK_SPAM"
export const ADMIN_GET_SIMILAR_CONTRACTS = "ADMIN_GET_SIMILAR_CONTRACTS"
export const ADMIN_GET_ALL_AUDIT = "ADMIN_GET_ALL_AUDIT"
export const ADMIN_GET_ONE_AUDIT = "ADMIN_GET_ONE_AUDIT"
export const ADMIN_DELETE_ONE_AUDIT = "ADMIN_DELETE_ONE_AUDIT"
export const ADMIN_MARK_SCAM = "ADMIN_MARK_SCAM"
export const ADMIN_UNCHECK_SCAM = "ADMIN_UNCHECK_SCAM"
export const GET_ALL_COMPARE_TEXT = "GET_ALL_COMPARE_TEXT"
export const CREATE_COMPARE_TEXT = "CREATE_COMPARE_TEXT"
export const DELETE_COMPARE_TEXT = "DELETE_COMPARE_TEXT"
export const GET_TOTALS_HOME = "GET_TOTALS_HOME"
export const UPDATE_COMPARE_TEXT = "UPDATE_COMPARE_TEXT"
export const HONEY_POT_COMPARE = "HONEY_POT_COMPARE"
export const ANALISIS_CONTRACT_INFO = "ANALISIS_CONTRACT_INFO"
export const ADMIN_DELETE_COMPLETE_CONTRACT = "ADMIN_DELETE_COMPLETE_CONTRACT"
export const ADMIN_CLEAR_LIST_CONTRACT = "ADMIN_CLEAR_LIST_CONTRACT"

const baseURL = import.meta.env.VITE_APP_API_URL

// setting Authorization header
axios.defaults.headers.common.Authorization = authHeader()

const http = axios.create({
  baseURL
})

const user = JSON.parse(localStorage.getItem("user"))

/* ----GET SCAMS---- */ /* ----GET SCAMS---- */

export function adminGetAllScam() {
  return async (dispatch) => {
    try {
      const json = await http.get(`${baseURL}admin/get-all-scam`)
      return dispatch({
        type: ADMIN_GET_ALL_SCAM,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error?.response?.data)
    }
  }
}

/* -----SECURITY POINTS---- */ /* -----SECURITY POINTS---- */

export function adminSecurityPoints({ address, points }) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}admin/segurity-points`, {
        address,
        points
      })
      return dispatch({
        type: ADMIN_SECURITY_POINTS,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error?.response?.data)
    }
  }
}

/* -----ADD SCAMS CONTRACT---- */ /* -----ADD SCAMS CONTRACT---- */

export function adminAddScamsContract(scamAddres) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}admin/add-scam-contract`, scamAddres)
      return dispatch({
        type: ADMIN_ADD_SCAM_CONTRACT,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error?.response?.data)
    }
  }
}

/* DELETE SCAMS CONTRACT */

export function adminDeleteScamContract(address) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}admin/delete-scam-contract`, {
        address
      })
      return dispatch({
        type: ADMIN_DELETE_SCAM_CONTRACT,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error?.response?.data)
    }
  }
}

/* DELETE SCAMS CONTRACT */

export function adminDeleteCompleteContract(address) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}admin/delete-complete-contract`, {
        address
      })
      return dispatch({
        type: ADMIN_DELETE_COMPLETE_CONTRACT,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error?.response?.data)
    }
  }
}

/* ADMIN ANALYSIS */

export function adminAnalysis(data) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}admin/create-admin-analysis`, data)
      return dispatch({
        type: ADMIN_ANALYSIS,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      return Promise.reject(error)
    }
  }
}

/* UPDATE ANALYSIS */

export function adminUpdateAnalysis(data) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}admin/update-admin-analysis`, data)
      return dispatch({
        type: ADMIN_UPDATE_ANALYSIS,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      return Promise.reject(error)
    }
  }
}

/* GET ONE ANALYSIS */

export function adminGetOneAnalysis(address) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}admin/get-one-admin-analysis`, {
        address
      })
      return dispatch({
        type: ADMIN_GET_ONE_ADMIN_ANALYSIS,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error)
    }
  }
}

/* GET LIST CONTRACT */

export function adminGetListContract(filter) {
  return async (dispatch) => {
    try {
      const json = await http.get(`${baseURL}admin/get-list-contracts/${filter}`)

      return dispatch({
        type: ADMIN_GET_LIST_CONTRACT,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error)
    }
  }
}

/* CLEAR LIST CONTRACT */

export function adminClearListContract() {
  return async (dispatch) => {
    try {
      return dispatch({
        type: ADMIN_CLEAR_LIST_CONTRACT
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error)
    }
  }
}

/* ADMIN GET SIMILAR CONTRACT */

export function adminGetSimilarContracts(address) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}admin/get-similar-contracts`, {
        address
      })
      return dispatch({
        type: ADMIN_GET_SIMILAR_CONTRACTS,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error)
    }
  }
}

/* ADMIN GET ALL AUDIT */
export function adminGetAllAudits() {
  return async (dispatch) => {
    try {
      const json = await http.get(`${baseURL}segurity-audit/get-all-audits`)
      return dispatch({
        type: ADMIN_GET_ALL_AUDIT,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      return dispatch({
        type: ADMIN_GET_ALL_AUDIT,
        payload: error?.response?.data?.audits
      })
    }
  }
}

/* ADMIN GET ONE AUDIT */
export function adminGetOneAudits(id) {
  return async (dispatch) => {
    try {
      const json = await http.get(`${baseURL}segurity-audit/get-one-audit/${id}`)
      return dispatch({
        type: ADMIN_GET_ONE_AUDIT,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error)
    }
  }
}
/* ADMIN DELETE ONE AUDIT */
export function adminDeleteOneAudits(id) {
  return async (dispatch) => {
    try {
      const json = await http.delete(`${baseURL}segurity-audit/delete-audit/${id}`)
      return dispatch({
        type: ADMIN_DELETE_ONE_AUDIT,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error)
    }
  }
}

/* ADMIN MARK SCAM */
export function adminMarkScam(address) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}admin/mark-contract-scam`, {
        address
      })
      return dispatch({
        type: ADMIN_MARK_SCAM,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error)
    }
  }
}

/* ADMIN UNCHENCK SCAM */
export function adminUnCheckScam(address) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}admin/uncheck-contract-scam`, {
        address
      })
      return dispatch({
        type: ADMIN_UNCHECK_SCAM,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error)
    }
  }
}

/* CREATE COMPARE TEXT */
export function adminGetCompareTexts(textCompare) {
  return async (dispatch) => {
    try {
      const json = await http.get(`${baseURL}admin/get-all-compare-text`, textCompare)

      return dispatch({
        type: GET_ALL_COMPARE_TEXT,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error)
    }
  }
}

/* CREATE COMPARE TEXT */
export function adminCreateCompareText(textCompare) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}admin/create-compare-text`, textCompare)

      return dispatch({
        type: CREATE_COMPARE_TEXT,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error)
    }
  }
}

/* DELETE COMPARE TEXT */
export function adminDeleteCompareText(id) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}admin/delete-compare-text`, {
        id
      })

      return dispatch({
        type: DELETE_COMPARE_TEXT,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error)
    }
  }
}

/* DELETE COMPARE TEXT */
export function adminGetTotalsHome() {
  return async (dispatch) => {
    try {
      const json = await http.get(`${baseURL}admin/total-admin-info`)

      return dispatch({
        type: GET_TOTALS_HOME,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error)
    }
  }
}

/* DELETE COMPARE TEXT */
export function adminUpdateCompareText(formUpdate) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}admin/update-compare-text`, formUpdate)

      return dispatch({
        type: UPDATE_COMPARE_TEXT,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error)
    }
  }
}

/* HONEY POT COMPARE */
export function adminHoneyPotCompare(address) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}admin/honey-pot-compare`, { address })

      return dispatch({
        type: HONEY_POT_COMPARE,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error)
    }
  }
}

/* ANALISIS CONTRACT INFO */
export function adminAnalisisContractInfo(address) {
  return async (dispatch) => {
    try {
      const json = await http.post(`${baseURL}admin/analisis-contract-info/`, { address })

      return dispatch({
        type: ANALISIS_CONTRACT_INFO,
        payload: json.data
      })
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error)
    }
  }
}

export function changeAutoApproval() {
  return async () => {
    try {
      const json = await http.get(`${baseURL}admin/switch-autocomplete`)

      return json
    } catch (error) {
      if (error?.response?.data?.message == "you do not have administrator permissions" || error?.response?.data?.message == "Unauthorized" || error?.response?.data?.message == "error in invalid json web token") {
        localStorage.removeItem("user")
        if (user || user?.token) {
          window.location.reload()
        }
      }
      console.log(error)
    }
  }
}
