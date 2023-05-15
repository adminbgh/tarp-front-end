/* import all admin actions */
import {
  ADMIN_GET_ALL_SCAM,
  DELETE_COMPARE_TEXT,
  CREATE_COMPARE_TEXT,
  ADMIN_UNCHECK_SCAM,
  ADMIN_MARK_SCAM,
  ADMIN_DELETE_ONE_AUDIT,
  ADMIN_GET_ONE_AUDIT,
  ADMIN_GET_ALL_AUDIT,
  ADMIN_GET_ONE_ADMIN_ANALYSIS,
  ADMIN_GET_LIST_CONTRACT,
  ADMIN_GET_SIMILAR_CONTRACTS,
  ADMIN_ADD_SCAM_CONTRACT,
  ADMIN_DELETE_SCAM_CONTRACT,
  GET_TOTALS_HOME,
  UPDATE_COMPARE_TEXT,
  HONEY_POT_COMPARE,
  GET_ALL_COMPARE_TEXT,
  ADMIN_SECURITY_POINTS,
  ANALISIS_CONTRACT_INFO,
  ADMIN_CLEAR_LIST_CONTRACT
} from "../actions/adminActions"

const initialState = {
  allScams: [],
  listContract: [],
  oneAnalysis: [],
  similarContracts: [],
  allAudits: [],
  oneAudit: [],
  compareTexts: [],
  totalsHome: [],
  honeyPotCompare: [],
  analisisContractInfo: [],
  message: ""
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADMIN_GET_ALL_SCAM:
      return { ...state, allScams: payload }

    case ADMIN_GET_LIST_CONTRACT:
      return { ...state, listContract: payload }

    case ADMIN_GET_ONE_ADMIN_ANALYSIS:
      return { ...state, oneAnalysis: payload }

    case ADMIN_GET_SIMILAR_CONTRACTS:
      return { ...state, similarContracts: payload }

    case ADMIN_GET_ALL_AUDIT:
      return {
        ...state,
        allAudits: payload
      }

    case ADMIN_GET_ONE_AUDIT:
      return {
        ...state,
        oneAudit: payload
      }

    case ADMIN_DELETE_ONE_AUDIT:
      return {
        ...state,
        message: payload
      }

    case ADMIN_MARK_SCAM:
      return {
        ...state,
        message: payload
      }

    case ADMIN_UNCHECK_SCAM:
      return {
        ...state,
        message: payload
      }

    case GET_ALL_COMPARE_TEXT:
      return {
        ...state,
        compareTexts: payload
      }

    case CREATE_COMPARE_TEXT:
      return {
        ...state,
        message: payload
      }

    case DELETE_COMPARE_TEXT:
      return {
        ...state,
        message: payload
      }

    case ADMIN_SECURITY_POINTS:
      return {
        ...state,
        message: payload
      }

    case ADMIN_ADD_SCAM_CONTRACT:
      return {
        ...state,
        message: payload
      }

    case ADMIN_DELETE_SCAM_CONTRACT:
      return {
        ...state,
        message: payload
      }

    case UPDATE_COMPARE_TEXT:
      return {
        ...state,
        message: payload
      }

    case GET_TOTALS_HOME:
      return {
        ...state,
        totalsHome: payload
      }

    case HONEY_POT_COMPARE:
      return {
        ...state,
        honeyPotCompare: payload
      }

    case ANALISIS_CONTRACT_INFO:
      return {
        ...state,
        analisisContractInfo: payload
      }

    case ADMIN_CLEAR_LIST_CONTRACT:
      return {
        ...state,
        listContract: []
      }

    default:
      return state
  }
}
