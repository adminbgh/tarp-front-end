import {
  CREATE_AUDITH,
  SEARCH_INFO_CONTRACT,
  ADD_LIQUIDITY,
  ADD_TOP_WALLETS_API,
  GET_MONITORING,
  ADD_TOP_WALLETS,
  RESEND_ACTIVATION_CODE,
  RECOVER_PASSWORD,
  SEARCH_CONTRACT,
  SETNULL_INFO_CONTRACT,
  CHECK_CONTRACT,
  ADD_TO_MONITORING,
  REMOVE_TO_MONITORING,
  HOME_DATA,
  SIGN_UP,
  USER_ACCOUNT_ACTIVATION,
  SIGN_IN,
  EMAIL_USER_CHANGE,
  CHECK_RESET_CODE,
  SEND_RECOVERY_PASSWORD,
  ADMIN_LOGIN,
  ADD_TOP_WALLETS_DIFF,
  ADD_TOP_WALLETS_DIFF_API,
  SEARCH_BUY_AND_SELL,
  SHOW_LOGIN,
  SHOW_SECURITY,
  SHOW_FORM_CONTACT,
  SHOW_SIGNUP,
  ADD_LIQUIDITY_EVENT
} from "../actions/userActions"

const initialState = {
  showModalLogin: false,
  showModalSignUp: false,
  showSecurity: false,
  showFormContact: false,
  contract: "",
  homeData: "",
  infoContract: {},
  buyAndSell: [],
  topWallets: [],
  topWalletsDiff: [],
  checkContract: {},
  monitoringList: [],
  supiciousList: [],
  signUp: [],
  userLogged: [],
  userActivation: [],
  LiquidityLocked: [],
  lockDate: [],
  userEmail: "",
  message: ""
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HOME_DATA:
      return { ...state, homeData: payload }
    case SHOW_LOGIN:
      return { ...state, showModalLogin: payload }

    case SHOW_SIGNUP:
      return { ...state, showModalSignUp: payload }

    case SHOW_SECURITY:
      return { ...state, showSecurity: payload }

    case SHOW_FORM_CONTACT:
      return { ...state, showFormContact: payload }

    case SEARCH_CONTRACT:
      return { ...state, contract: payload }

    case SEARCH_INFO_CONTRACT:
      return { ...state, infoContract: payload }

    case SEARCH_BUY_AND_SELL:
      return { ...state, buyAndSell: payload }

    case ADD_TOP_WALLETS:
      return { ...state, topWallets: payload }

    case ADD_TOP_WALLETS_API:
      return { ...state, topWallets: payload }

    case ADD_TOP_WALLETS_DIFF:
      return { ...state, topWalletsDiff: payload }

    case ADD_TOP_WALLETS_DIFF_API:
      return { ...state, topWalletsDiff: payload }

    case ADD_LIQUIDITY:
      return { ...state, LiquidityLocked: payload }

    case SETNULL_INFO_CONTRACT:
      return { ...state, infoContract: payload }

    case CHECK_CONTRACT:
      return { ...state, checkContract: payload }

    case ADD_TO_MONITORING:
      return {
        ...state,
        message: payload
      }

    case GET_MONITORING:
      return {
        ...state,
        monitoringList: payload
      }

    case REMOVE_TO_MONITORING:
      return {
        ...state,
        message: payload
      }

    case SIGN_UP:
      return {
        ...state,
        signUp: payload,
        userEmail: payload?.user
      }

    case SIGN_IN:
      localStorage.setItem("user", JSON.stringify(payload))
      return {
        ...state,
        userLogged: payload,
        showModalLogin: false,
        showModalSignUp: false
      }

    case ADMIN_LOGIN:
      return {
        ...state,
        userLogged: payload
      }

    case EMAIL_USER_CHANGE:
      return {
        ...state,
        userEmail: payload
      }

    case USER_ACCOUNT_ACTIVATION:
      return {
        ...state,
        userActivation: payload
      }

    case RESEND_ACTIVATION_CODE:
      return {
        ...state,
        message: payload
      }

    case CHECK_RESET_CODE:
      return {
        ...state,
        userActivation: payload
      }

    case SEND_RECOVERY_PASSWORD:
      return {
        ...state,
        signUp: payload
      }

    case RECOVER_PASSWORD:
      return {
        ...state,
        message: payload
      }

    case CREATE_AUDITH:
      return {
        ...state,
        message: payload
      }

    case ADD_LIQUIDITY_EVENT:
      return {
        ...state,
        lockDate: payload,
        infoContract: {
          ...state.infoContract,
          ...data,
          nextUnlockEvent: payload
        }
      }

    default:
      return state
  }
}
