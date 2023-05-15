import React, { useState, useEffect, lazy, Suspense } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { formatTexts } from "../../services/formatTexts"
import { isMobile } from "react-device-detect"
import axios from "axios"

import dayjs from "dayjs"
/* import css */
import "./Contract.scss"
import "bootstrap/dist/css/bootstrap.min.css"
/* import boostrap */
import { Container, Image, Row, Col, Stack, OverlayTrigger, Tooltip } from "react-bootstrap"
/* import mui */
import Checkbox from "@mui/material/Checkbox"
/* import icons */
import { FiLink } from "react-icons/fi"
import { BsFacebook, BsTelegram, BsDiscord, BsTwitter, BsLock, BsUnlock } from "react-icons/bs"
import { AiOutlineSync, AiOutlineStar, AiFillStar } from "react-icons/ai"
import { formatDecimals, formatNumbers } from "../../services/formatNumbers"
import { searchInfoContract, searchBuyAndSell, addTopWallets, addLiquidity, addToptWalletsDiff, addNextUnlock } from "../../store/actions/userActions"
import { SOCKET } from "../../services/environment"
import Loading from "../../components/Loading/Loading"
import { Footer, NavBar } from "../../components/index"
/* import images */
import Statistics from "./parts/Statistics/Statistics"
import gradientImg from "../../images/LogoDisabled.png"
import Eclipse from "../../components/elements/eclipse"
import TarpScore from "../../components/elements/Score"

/* import Components */

const LoadingTables = lazy(() => import("./parts/LoadingTables/LoadingTables"))
const SelectTables = lazy(() => import("./parts/SelectTables/SelectTables"))

function Contract() {
  const [textHeader, setTextHeader] = useState("But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley ")
  const [expandText, setExpandText] = useState(false)
  const [showSecurity, setShowSecurity] = useState(false)
  const [showLogInRequest, setShowLogInRequest] = useState(false)
  const [loadingInfo, setLoadingInfo] = useState(false)

  /* dispatch */
  const dispatch = useDispatch()
  const contract = useSelector((state) => state?.user?.contract)
  const checkContract = useSelector((state) => state?.user?.checkContract)
  const infoContract = useSelector((state) => state?.user?.infoContract)
  const topWallets = useSelector((state) => state?.user?.topWallets)
  const adminAnalysis = useSelector((state) => state?.user?.infoContract?.data?.adminAnalysis)
  const liquidityLocked = useSelector((state) => state?.user?.LiquidityLocked)

  const [logoImg, setLogoImg] = useState(infoContract?.data?.img)
  /* ----useEffect---- */ /* ----useEffect---- */ /* ----useEffect---- */

  useEffect(() => {
    dispatch(searchInfoContract(contract, checkContract?.network))
  }, [contract])

  /* SOCKET TOP WALLETS */
  useEffect(() => {
    SOCKET.on(`${contract?.toLowerCase()}-wallets`, (data) => {
      dispatch(addTopWallets(data))
    })

    SOCKET.on(`${contract?.toLowerCase()}-liquidity-event`, (data) => {
      dispatch(addNextUnlock(data))
    })

    SOCKET.on(`${contract?.toLowerCase()}-auto-analysis`, () => {
      /*    setLoadingInfo(true) */
      setTimeout(() => {
        setLoadingInfo(false)
        window.location.reload(false)
      }, 5000)
    })

    return () => {
      SOCKET.removeAllListeners(`${contract?.toLowerCase()}-wallets`)
      SOCKET.removeAllListeners(`${contract?.toLowerCase()}-liquidity-event`)
      SOCKET.removeAllListeners(`${contract?.toLowerCase()}-auto-analysis`)
    }
  }, [contract])

  /* SOCKET LIQUIDITY */
  useEffect(() => {
    SOCKET.on(`${contract?.toLowerCase()}-liquidity`, (data) => {
      dispatch(addLiquidity(data))
    })

    return () => {
      SOCKET.removeAllListeners(`${contract?.toLowerCase()}-liquidity`)
    }
  }, [])

  /* SOCKET TOPWALLETS DIFF */
  useEffect(() => {
    SOCKET.on(`${contract?.toLowerCase()}-contracts-wallets-diff`, (data) => {
      dispatch(addToptWalletsDiff(data))
    })

    return () => {
      SOCKET.removeAllListeners(`${contract?.toLowerCase()}-contracts-wallets-diff`)
    }
  }, [])

  const navigate = useNavigate()

  const navigateHome = () => {
    navigate("/")
  }

  useEffect(() => {
    if (!contract) {
      navigateHome()
    }
  }, [])

  const SocialMedia = ({ link, icon }) => (
    <a href={link} target="_blank" rel="noreferrer">
      {icon}
    </a>
  )

  if (infoContract?.data !== undefined) {
    return (
      <Suspense fallback={<Loading />}>
        <Eclipse styles={{ top: "50vh", left: "-30%", width: "50%", height: "50%" }} />
        <Eclipse styles={{ top: "25vh", right: "-30%", width: "50%", height: "50%" }} className={isMobile ? "hidden" : "null"} />
        <NavBar showSecurity={showSecurity} showLogInRequest={showLogInRequest} setShowLogInRequest={setShowLogInRequest} setShowSecurity={setShowSecurity} />
        <Container fluid className="Contract_Container">
          {/* Information */}
          <Container fluid>
            <Container>
              <Row className="Contract_Row__Infomation">
                {/* Logo de la cryptomoneda */}
                <Col sm={12} md={12} xl={6}>
                  <div className="Contract_InformacionLogo">
                    <div className="InformacionLogo_Imagen_Container">
                      <Image
                        loading="lazy"
                        width="50px"
                        height="50px"
                        src={infoContract?.data?.img}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null // prevents looping
                          currentTarget.src = gradientImg
                        }}
                      />
                    </div>
                    <h3 id="NameCrypto">{infoContract?.data?.tokenName}</h3>
                    <div className="Contract_Information_Button_DNL">
                      <p>{infoContract?.data?.tokenSymbol}</p>
                    </div>

                    {/* ADD TO FAVORITE */}
                    {/* ADD TO FAVORITE */}

                    <br />
                    <br />
                    <Col sm={12} md={12} xl={12}>
                      <div className="Contract_Information_Button_Container">
                        {
                          <Stack direction="horizontal" gap={3}>
                            <a href={infoContract?.data?.socialNetworks?.website} target="_blank" id="LinkCrypto" rel="noreferrer">
                              {infoContract?.data?.socialNetworks?.website ? <FiLink id="IconLink" /> : null}
                              {infoContract?.data?.socialNetworks?.website}
                            </a>
                          </Stack>
                        }
                      </div>
                    </Col>
                  </div>
                </Col>
                <Col className="Container_Col_PriceCrypto" sm={12} md={12} xl={3}>
                  <div className="ContainerPriceCrypto">
                    <h3 id="PriceCrypto">${infoContract?.data?.price?.toFixed(2) && infoContract?.data?.price?.toFixed(2) < 1 ? infoContract?.data?.price?.toFixed(9) : infoContract?.data?.price?.toFixed(2) ? infoContract?.data?.price?.toFixed(2) : "0"}</h3>
                  </div>

                  <div className={Math.sign(infoContract?.data?.difVolume) === -1 ? "Contract_Information_PorcentajeNegative" : "Contract_Information_PorcentajePositive"}>
                    <p>{infoContract?.data?.difVolume?.toFixed(2) ? infoContract?.data?.difVolume?.toFixed(2) : "0"}% 24h</p>
                  </div>

                  <br />
                  <p>{infoContract?.data?.tokenSymbol}</p>
                </Col>
                <Col className="Container_Col_PriceCryptoTwo" sm={12} md={12} xl={3}>
                  <div className="ContainerPriceCrypto">
                    <h3 id="PriceCrypto">{infoContract?.data?.holders?.toString().replace(/\./g, ",")}</h3>
                  </div>
                  <p># Holders</p>
                </Col>
              </Row>

              <Row className="Container_Row_ContratIDS">
                <Col sm lg xl={8}>
                  <Stack direction="horizontal" gap={3}>
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-top">
                          Copy to <strong>Clipboard</strong>.
                        </Tooltip>
                      }
                    >
                      <div>
                        <CopyToClipboard key={infoContract?.data?.address} text={infoContract?.data?.address}>
                          <div className="Stack_Buttons ContractId">
                            <p>
                              {infoContract?.data?.address?.substring(0, 8)}
                              ...
                              {infoContract?.data?.address?.substring(34, 50)}
                            </p>
                            <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M3.59131 4.2041H4.43213V2.59082C4.43213 2.20801 4.53239 1.91406 4.73291 1.70898C4.93343 1.49935 5.23193 1.39453 5.62842 1.39453H8.73193V5.12695C8.73193 5.49609 8.81852 5.76497 8.9917 5.93359C9.16943 6.10221 9.43604 6.18652 9.7915 6.18652H13.2573V12.2158C13.2573 12.6032 13.1548 12.8994 12.9497 13.1045C12.7492 13.3096 12.453 13.4121 12.061 13.4121H10.5845V14.2529H12.1089C12.7697 14.2529 13.2664 14.0843 13.5991 13.7471C13.9364 13.4053 14.105 12.9017 14.105 12.2363V6.43262C14.105 6.10905 14.0617 5.83105 13.9751 5.59863C13.8931 5.36165 13.745 5.13379 13.5308 4.91504L9.77783 1.12793C9.57275 0.913737 9.35173 0.765625 9.11475 0.683594C8.88232 0.597005 8.62028 0.553711 8.32861 0.553711H5.5874C4.9266 0.553711 4.42757 0.724609 4.09033 1.06641C3.75765 1.40365 3.59131 1.90495 3.59131 2.57031V4.2041ZM9.49756 5.02441V1.87305L13.0112 5.4209H9.89404C9.75277 5.4209 9.65023 5.39128 9.58643 5.33203C9.52718 5.26823 9.49756 5.16569 9.49756 5.02441ZM0.275879 15.5518C0.275879 16.2171 0.44222 16.7184 0.774902 17.0557C1.11214 17.3929 1.61117 17.5615 2.27197 17.5615H8.79346C9.45426 17.5615 9.95101 17.3929 10.2837 17.0557C10.6209 16.7184 10.7896 16.2171 10.7896 15.5518V10.001C10.7896 9.75944 10.7736 9.55436 10.7417 9.38574C10.7144 9.21712 10.6619 9.06445 10.5845 8.92773C10.507 8.78646 10.3908 8.63835 10.2358 8.4834L6.22314 4.42285C6.00439 4.19499 5.78792 4.04688 5.57373 3.97852C5.3641 3.9056 5.09521 3.86914 4.76709 3.86914H2.27197C1.61117 3.86914 1.11214 4.04004 0.774902 4.38184C0.44222 4.71908 0.275879 5.2181 0.275879 5.87891V15.5518ZM1.1167 15.5312V5.89258C1.1167 5.51888 1.21696 5.22949 1.41748 5.02441C1.618 4.81478 1.9165 4.70996 2.31299 4.70996H4.81494V8.8252C4.81494 9.21257 4.91064 9.50195 5.10205 9.69336C5.29801 9.88021 5.58285 9.97363 5.95654 9.97363H9.94873V15.5312C9.94873 15.9186 9.84619 16.2126 9.64111 16.4131C9.44059 16.6182 9.14437 16.7207 8.75244 16.7207H2.30615C1.91423 16.7207 1.618 16.6182 1.41748 16.4131C1.21696 16.2126 1.1167 15.9186 1.1167 15.5312ZM6.05225 9.18066C5.89274 9.18066 5.77881 9.14648 5.71045 9.07812C5.64209 9.00977 5.60791 8.89583 5.60791 8.73633V4.96973L9.77783 9.18066H6.05225Z"
                                fill="#B6B6B6"
                              />
                            </svg>
                          </div>
                        </CopyToClipboard>
                      </div>
                    </OverlayTrigger>

                    <div className={"Stack_Buttons"}>
                      <b>{infoContract?.data?.renounced ? "RENOUNCED CONTRACT" : "NOT RENOUNCED CONTRACT"}</b>
                    </div>
                    <TarpScore score={adminAnalysis?.totalScore?.score} />
                  </Stack>
                </Col>
                <Col sm lg xl={4}>
                  <Stack direction="horizontal" className="StackSocialButtons" gap={3}>
                    <div className="SocialMediaButtons">
                      {infoContract?.data?.socialNetworks?.facebook && <SocialMedia link={`https://www.facebook.com/${infoContract?.data?.socialNetworks?.facebook}`} icon={<BsFacebook />} />}
                      {infoContract?.data?.socialNetworks?.telegram && <SocialMedia link={infoContract?.data?.socialNetworks?.telegram} icon={<BsTelegram />} />}
                      {infoContract?.data?.socialNetworks?.discord && <SocialMedia link={infoContract?.data?.socialNetworks?.discord} icon={<BsDiscord />} />}
                      {infoContract?.data?.socialNetworks?.twitter && <SocialMedia link={`https://twitter.com/${infoContract?.data?.socialNetworks?.twitter}`} icon={<BsTwitter />} />}
                    </div>
                  </Stack>
                </Col>
                <Col sm={12} md={12} className={infoContract?.data?.description ? "containerTextHeader" : "hidden"}>
                  <p>
                    {!expandText ? formatTexts(infoContract?.data?.description, 150) : infoContract?.data?.description}
                    {!expandText ? (
                      <span className={infoContract?.data?.description?.length < 150 ? "hidden" : "null"} onClick={() => setExpandText(true)}>
                        Learn more
                      </span>
                    ) : (
                      <span onClick={() => setExpandText(false)}>Occult</span>
                    )}
                  </p>
                </Col>
              </Row>
            </Container>
            {/* -----STATISTICS---- -----STATISTICS---- */}
            <Container fluid="md" className="Contract_Container_Statistics">
              <Row className="Contract_Row_Statistics">
                <Statistics
                  title="Locked liquidity"
                  icon={<BsLock />}
                  data={
                    liquidityLocked?.totalLiquidityLockedUSD?.toFixed(2) != "undefined" && liquidityLocked?.totalLiquidityLockedUSD?.toFixed(2) < 1 && liquidityLocked?.totalLiquidityLockedUSD != 0
                      ? "$" + formatDecimals(liquidityLocked?.totalLiquidityLockedUSD?.toFixed(9))
                      : liquidityLocked?.totalLiquidityLockedUSD?.toFixed(2) && liquidityLocked?.totalLiquidityLockedUSD != 0
                      ? "$" + formatDecimals(liquidityLocked?.totalLiquidityLockedUSD?.toFixed(2))
                      : "$0.00"
                  }
                  subData={`${liquidityLocked?.percentage?.toFixed(2)}%`}
                  button={liquidityLocked?.sourceOfData}
                  network={infoContract?.data?.network}
                  tokenAddress={infoContract?.data?.address}
                  lpToken={liquidityLocked?.markets?.length >= 1 && liquidityLocked?.markets[0]?.address}
                />
                <Statistics title="Circulating supply" icon={<AiOutlineSync />} data={formatNumbers(infoContract?.data?.availableSupply?.toFixed(2))} subData={`Total supply: ${formatNumbers(infoContract?.data?.totalSupply)}`} tokenSymbol={infoContract?.data?.tokenSymbol} />
                <Statistics
                  title="Next unlock event"
                  icon={<BsUnlock />}
                  data={infoContract?.data?.nextUnlockEvent?.unlockDate ? dayjs(infoContract?.data?.nextUnlockEvent?.unlockDate * 1000).format("YYYY/MM/DD") : "0000/00/00"}
                  tokenSymbol={infoContract?.data?.tokenSymbol}
                  subData={` Locked:
				  ${infoContract?.data?.nextUnlockEvent?.lockDate ? dayjs(infoContract?.data?.nextUnlockEvent?.lockDate * 1000).format("YYYY/MM/DD") : "0000/00/00"} - Unlocks:
				  ${infoContract?.data?.nextUnlockEvent?.unlockDate ? dayjs(infoContract?.data?.nextUnlockEvent?.unlockDate * 1000).format("YYYY/MM/DD") : "0000/00/00"}`}
                  tokenAddress={infoContract?.data?.address}
                  lpToken={liquidityLocked?.markets?.length >= 1 && liquidityLocked?.markets[0]?.address}
                  button={liquidityLocked?.sourceOfData}
                  network={infoContract?.data?.network}
                />
              </Row>
            </Container>
          </Container>

          {!loadingInfo && topWallets?.length > 0 ? (
            <Container className="containerContract">
              <SelectTables setShowSecurity={setShowSecurity} />
            </Container>
          ) : (
            <LoadingTables />
          )}
        </Container>
        <Footer />
      </Suspense>
    )
  }
  return <Loading />
}
export default Contract
