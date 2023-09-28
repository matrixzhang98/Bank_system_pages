import React, { 
  useEffect,
  useState,
  Fragment,
  lazy,
  Suspense
} from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";

// redux hook(結合hook用法, 簡化程式碼, useDispatch=action.xxx, useSelector=props.xxx)
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../actions/actions';

import uuid from "uuid";

/** 
 * @類別 共用(public) 
 * **/
import Gateway from "../public/components/Gateway/Gateway";
import AlertMessager from "../public/components/AlertMessager/AlertMessager"; // 確認訊息
import FPFPG100 from "./FPFPG100/FPFPG100"; // 首頁
import NotFoundPage from "./NotFoundPage/NotFoundPage";    
import Initial from "./Initial/Initial";
import Login from "./Login/Login";
import MainNav from "../public/components/MainNav/MainNav";
import KV from "../public/components/KV/KV";
import SideNav from "../public/components/SideNav/SideNav";
import MarqueeAlert from "./MarqueeAlert/MarqueeAlert";
import ErrorPage from "./ErrorPage/ErrorPage";
import ConfirmAlert from '../public/components/ConfirmAlert/ConfirmAlert';
import { routePath } from "../public/utils/window/location";
import Loader from "./Loader/Loader";
/** 
 * @類別 單一功能(txn) 
 * **/
// [首頁或其他]
const CMFPG310RankAOA = lazy(() => import("./CMFPG310RankAOA/CMFPG310RankAOA")); // 業績追蹤: 甲組全行理專成績
const CMFPG310RankAOB = lazy(() => import("./CMFPG310RankAOB/CMFPG310RankAOB")); // 業績追蹤: 乙組全行理專成績
const CMFPG310RankPRODSelf = lazy(() => import("./CMFPG310RankPRODSelf/CMFPG310RankPRODSelf")); // 業績追蹤: 個人熱銷商品排行
const CMFPG310RankPRODAll = lazy(() => import("./CMFPG310RankPRODAll/CMFPG310RankPRODAll")); // 業績追蹤: 全行熱銷商品排行
const CMFPG310RankCustPay = lazy(() => import("./CMFPG310RankCustPay/CMFPG310RankCustPay")); // 業績追蹤: 客戶貢獻度
const CMFPG310RankCustTrad = lazy(() => import("./CMFPG310RankCustTrad/CMFPG310RankCustTrad")); // 業績追蹤: 客戶交易次數
const CMADM001 = lazy(() => import("./CMADM001/CMADM001")); // [系統] 登入紀錄查詢
const CMMGR006 = lazy(() => import("./CMMGR006/CMMGR006")); // 參數種類設定
const CMMGR009 = lazy(() => import("./CMMGR009/CMMGR009")); // 參數內容維護
const CHSAM120 = lazy(() => import('./CHSAM120/CHSAM120')); // 互動記錄管理
const CHSAM121 = lazy(() => import('./CHSAM121/CHSAM121')); // 過路客互動記錄登打
const CMBBD120 = lazy(() => import('./CMBBD120/CMBBD120')); // 公布欄
const CMMGR004 = lazy(() => import('./CMMGR004/CMMGR004')); // 排程設定
const CMMGR005 = lazy(() => import('./CMMGR005/CMMGR005')); // 排程監控
const CMMGR007 = lazy(() => import('./CMMGR007/CMMGR007')); // 排程JOB維護
const CMMGR008 = lazy(() => import('./CMMGR008/CMMGR008')); // 操作記錄查詢
const CMMGR010 = lazy(() => import('./CMMGR010/CMMGR010')); // FTP Server連線設定
const CMMGR011 = lazy(() => import('./CMMGR011/CMMGR011')); // 功能權限管理
const CMMGR012 = lazy(() => import('./CMMGR012/CMMGR012'));   // 權限異動查詢
const CMMGR013 = lazy(() => import('./CMMGR013/CMMGR013'));   // 角色權限查詢
const CMMGR014 = lazy(() => import('./CMMGR014/CMMGR014'));   // FTP傳輸設定
const CMMGR021 = lazy(() => import('./CMMGR021/CMMGR021'));   // 系統Log下載
const CMBTH002 = lazy(() => import('./CMBTH002/CMBTH002'));   // 批次檢核設定

const SAGRP100 = lazy(() => import('./SAGRP100/SAGRP100'));   // 自建群組

//[申請作業]
const CMMGR130 = lazy(() => import('./CMMGR130/CMMGR130'));   // 快速連結外部網站維護
const CMFPG910 = lazy(() => import('./CMFPG910/CMFPG910'));   // 快速連結外部網站
// [組織/人員管理]
const CMMGR000 = lazy(() => import('./CMMGR000/CMMGR000'));   // 資料查詢
const CMMGR110 = lazy(() => import('./CMMGR110/CMMGR110'));   // 跑馬燈維護
const CMORG101 = lazy(() => import('./CMORG101/CMORG101'));   // 組織層級查詢維護
const CMORG102 = lazy(() => import('./CMORG102/CMORG102'));   // 角色群組設定
const CMORG103 = lazy(() => import('./CMORG103/CMORG103'));   // 組織類型設定
const CMORG104 = lazy(() => import('./CMORG104/CMORG104'));   // 代理人設定
const CMORG105 = lazy(() => import('./CMORG105/CMORG105'));   // 人員權限異動申請
const CMORG106 = lazy(() => import('./CMORG106/CMORG106'));   // 教育訓練時數查詢與維護
const CMORG107 = lazy(() => import('./CMORG107/CMORG107'));   // 理財組長可檢視分行設定
const CMORG108 = lazy(() => import('./CMORG108/CMORG108'));   // 銷售資格查詢
const CMORG109 = lazy(() => import('./CMORG109/CMORG109'));   // 銷售資格維護
const CMORG110 = lazy(() => import('./CMORG110/CMORG110'));   // 理專就任卸任維護與查詢
const CMORG810 = lazy(() => import('./CMORG810/CMORG810'));   // 活動課程查詢
const CMORG111 = lazy(() => import('./CMORG111/CMORG111'));   // 行員(行內/行外)證照查詢
const CMORG112 = lazy(() => import('./CMORG112/CMORG112'));   // 理財業務人員保密協定
const CMORG113 = lazy(() => import('./CMORG113/CMORG113'));   // 分行裁撤或合併
// [商品]
const FPPDM100 = lazy(() => import('./FPPDM100/FPPDM100'));   // 商品總覽
const FPCFG101 = lazy(() => import('./FPCFG101/FPCFG101'));   // 市場分類對照表
const FPCFG102 = lazy(() => import('./FPCFG102/FPCFG102'));   // 商品分類對照表管理
const CMDMS210 = lazy(() => import('./CMDMS210/CMDMS210'));   // 文件庫
// [報表]
const RSBSD01 = lazy(() => import('./RSBSD01/RSBSD01'));      // 
const RSBSD02 = lazy(() => import('./RSBSD02/RSBSD02'));      // 理專與客戶網路交易關聯戶
const RSBAM100 = lazy(() => import('./RSBAM100/RSBAM100'));    // 理專業績統計表(日報表/月報表)
const RSFRM101 = lazy(() => import('./RSFRM101/RSFRM101'));    // 高風險客戶與基金庫存月報表
const RSFRM102 = lazy(() => import('./RSFRM102/RSFRM102'));    // 高風險客戶基金交易明細表
const RSFRM103 = lazy(() => import('./RSFRM103/RSFRM103'));    // 客戶投資逾總風險投資比率監控表
const RSFRM104 = lazy(() => import('./RSFRM104/RSFRM104'));    // 資產大額異動之客戶名單
const RSBAM200 = lazy(() => import('./RSBAM200/RSBAM200'));    // 各項業績統計表
const RSFRM201 = lazy(() => import('./RSFRM201/RSFRM201'));    // KYC承作方式統計表
const RSFRM202 = lazy(() => import('./RSFRM202/RSFRM202'));    // 風險屬性重測統計表
const RSFRM203 = lazy(() => import('./RSFRM203/RSFRM203'));    // 風險屬性統計表
const RSFRM204 = lazy(() => import('./RSFRM204/RSFRM204'));    // 理專經營客戶統計表
const RSFRM205 = lazy(() => import('./RSFRM205/RSFRM205'));    // 理專經營客戶統計表
const RSBAM300 = lazy(() => import('./RSBAM300/RSBAM300'));    // 壽險業績速報
const RSFRM301 = lazy(() => import('./RSFRM301/RSFRM301'));    // 積極型屬性比率統計查詢月報表
const RSFRM302 = lazy(() => import('./RSFRM302/RSFRM302'));    // 高齡積極型屬性比率統計查詢月報表
const RSBAM400 = lazy(() => import('./RSBAM400/RSBAM400'));    // 業務貢獻日月統計表資料匯入
const RSFRM401 = lazy(() => import('./RSFRM401/RSFRM401'));    // email控管查詢
const RSFRM402 = lazy(() => import('./RSFRM402/RSFRM402'));    // email控管查詢
const RSBAM500 = lazy(() => import('./RSBAM500/RSBAM500'));    // 短期交易名單處理紀錄查詢
const RSFRM501 = lazy(() => import('./RSFRM501/RSFRM501'));    // 短線進出客戶名單查詢
const RSFRM502 = lazy(() => import('./RSFRM502/RSFRM502'));    // 短線進出客戶名單查詢
const RSFRB001 = lazy(() => import('./RSFRB001/RSFRB001'));    // 風險屬性資料變更備查簿
const RSFRB002 = lazy(() => import('./RSFRB002/RSFRB002'));    // 專業投資人申請、變更及註銷備查簿
const RSFRB003 = lazy(() => import('./RSFRB003/RSFRB003'));    // 理財業務往來申請/註銷備查簿
const RSFRB004 = lazy(() => import('./RSFRB004/RSFRB004'));    // 客戶移轉紀錄備查簿
const RSFRB007 = lazy(() => import('./RSFRB007/RSFRB007'));    // 備查簿整批列印功能
const RSPDM100 = lazy(() => import('./RSPDM100/RSPDM100'));    // 各項商品明細
const RSPDM200 = lazy(() => import('./RSPDM200/RSPDM200'));    // 商品交易明細查詢
const RSCRM100 = lazy(() => import('./RSCRM100/RSCRM100'));    // 分行客戶資產統計表
const RSCRM200 = lazy(() => import('./RSCRM200/RSCRM200'));    // 定存到期名單查詢
const RSCRM300 = lazy(() => import('./RSCRM300/RSCRM300'));    // 客戶是否同意行銷紀錄
const RSFRB005 = lazy(() => import('./RSFRB005/RSFRB005'));    // 客戶資料變更備查簿
const RSFRB006 = lazy(() => import('./RSFRB006/RSFRB006'));    // 臨櫃申請經管客戶備查簿
const RSMGT310 = lazy(() => import('./RSMGT310/RSMGT310'));    // 貴賓戶資產成長度
const RSMGT320 = lazy(() => import('./RSMGT320/RSMGT320'));    // 銷售資格及證照取得

const App = () => {
  
    const [once, setOnce] = useState(true)
    const [isNavOpen, setIsNavOpen] = useState(true);
    const isNav = useSelector(state=>state.openNav)
    const isLogin = useSelector(state=>state.isLogin.bool)
  
    const route = (
      <Switch>
        <Route exact path={`${routePath}SAGRP100`} component={SAGRP100} />


        <Route exact path={`${routePath}RSMGT320`} component={RSMGT320} />
        <Route exact path={`${routePath}RSMGT310`} component={RSMGT310} />
        <Route exact path={`${routePath}RSCRM300`} component={RSCRM300} />
        <Route exact path={`${routePath}RSCRM200`} component={RSCRM200} />
        <Route exact path={`${routePath}RSCRM100`} component={RSCRM100} />
        <Route exact path={`${routePath}RSPDM100`} component={RSPDM100} />
        <Route exact path={`${routePath}RSPDM200`} component={RSPDM200} />
        <Route exact path={`${routePath}RSBAM500`} component={RSBAM500} />
        <Route exact path={`${routePath}RSFRM501`} component={RSFRM501} />
        <Route exact path={`${routePath}RSFRM502`} component={RSFRM502} />
        <Route exact path={`${routePath}RSBAM400`} component={RSBAM400} />
        <Route exact path={`${routePath}RSFRM401`} component={RSFRM401} />
        <Route exact path={`${routePath}RSFRM402`} component={RSFRM402} />
        <Route exact path={`${routePath}RSBAM300`} component={RSBAM300} />
        <Route exact path={`${routePath}RSBAM200`} component={RSBAM200} />
        <Route exact path={`${routePath}RSFRM201`} component={RSFRM201} />
        <Route exact path={`${routePath}RSFRM202`} component={RSFRM202} />
        <Route exact path={`${routePath}RSFRM203`} component={RSFRM203} />
        <Route exact path={`${routePath}RSFRM204`} component={RSFRM204} />
        <Route exact path={`${routePath}RSFRM205`} component={RSFRM205} />
        <Route exact path={`${routePath}RSFRM301`} component={RSFRM301} />
        <Route exact path={`${routePath}RSFRM302`} component={RSFRM302} />
        <Route exact path={`${routePath}RSFRB001`} component={RSFRB001} />
        <Route exact path={`${routePath}RSFRB002`} component={RSFRB002} />
        <Route exact path={`${routePath}RSFRB003`} component={RSFRB003} />
        <Route exact path={`${routePath}RSFRB004`} component={RSFRB004} />
        <Route exact path={`${routePath}RSFRB007`} component={RSFRB007} />
        <Route exact path={`${routePath}RSBAM100`} component={RSBAM100} />
        <Route exact path={`${routePath}RSFRM101`} component={RSFRM101} />
        <Route exact path={`${routePath}RSFRM102`} component={RSFRM102} />
        <Route exact path={`${routePath}RSFRM103`} component={RSFRM103} />
        <Route exact path={`${routePath}RSFRM104`} component={RSFRM104} />
        <Route exact path={`${routePath}RSFRB005`} component={RSFRB005} />
        <Route exact path={`${routePath}RSFRB006`} component={RSFRB006} />
        <Route exact path={`${routePath}RSBSD01`} component={RSBSD01} />
        <Route exact path={`${routePath}RSBSD02`} component={RSBSD02} />
        <Route exact path={`${routePath}FPPDM100`} component={FPPDM100} />
        <Route exact path={`${routePath}FPCFG101`} component={FPCFG101} />
        <Route exact path={`${routePath}FPCFG102`} component={FPCFG102} />
        <Route exact path={`${routePath}CMDMS210`} component={CMDMS210} />
        <Route exact path={`${routePath}CMORG810`} component={CMORG810} />
        <Route exact path={`${routePath}CMORG101`} component={CMORG101} />
        <Route exact path={`${routePath}CMORG102`} component={CMORG102} />
        <Route exact path={`${routePath}CMORG103`} component={CMORG103} />
        <Route exact path={`${routePath}CMORG104`} component={CMORG104} />
        <Route exact path={`${routePath}CMORG105`} component={CMORG105} />
        <Route exact path={`${routePath}CMORG106`} component={CMORG106} />
        <Route exact path={`${routePath}CMORG107`} component={CMORG107} />
        <Route exact path={`${routePath}CMORG108`} component={CMORG108} />
        <Route exact path={`${routePath}CMORG109`} component={CMORG109} />
        <Route exact path={`${routePath}CMORG110`} component={CMORG110} />
        <Route exact path={`${routePath}CMORG111`} component={CMORG111} />
        <Route exact path={`${routePath}CMORG112`} component={CMORG112} />
        <Route exact path={`${routePath}CMORG113`} component={CMORG113} />
        <Route exact path={`${routePath}CMMGR000`} component={CMMGR000} />
        <Route exact path={`${routePath}CMMGR004`} component={CMMGR004} />
        <Route exact path={`${routePath}CMMGR005`} component={CMMGR005} />
        <Route exact path={`${routePath}CMMGR007`} component={CMMGR007} />
        <Route exact path={`${routePath}CMMGR008`} component={CMMGR008} />
        <Route exact path={`${routePath}CMMGR009`} component={CMMGR009} />
        <Route exact path={`${routePath}CMMGR010`} component={CMMGR010} />
        <Route exact path={`${routePath}CMMGR011`} component={CMMGR011} />
        <Route exact path={`${routePath}CMMGR012`} component={CMMGR012} />
        <Route exact path={`${routePath}CMMGR013`} component={CMMGR013} />
        <Route exact path={`${routePath}CMMGR014`} component={CMMGR014} />
        <Route exact path={`${routePath}CMMGR021`} component={CMMGR021} />
        <Route exact path={`${routePath}CMBTH002`} component={CMBTH002} />
        <Route exact path={`${routePath}CMMGR130`} component={CMMGR130} /> 
        <Route exact path={`${routePath}CMMGR110`} component={CMMGR110} />
        <Route exact path={`${routePath}CMMGR006`} component={CMMGR006} />
        <Route exact path={`${routePath}CMADM001`} component={CMADM001} /> 
        <Route exact path={`${routePath}CMBBD120`} component={CMBBD120} /> 
        <Route exact path={`${routePath}CHSAM120`} component={CHSAM120} />
        <Route exact path={`${routePath}CHSAM121`} component={CHSAM121} />
        <Route exact path={`${routePath}CMFPG310RankAOA`} component={CMFPG310RankAOA} />
        <Route exact path={`${routePath}CMFPG310RankAOB`} component={CMFPG310RankAOB} />
        <Route exact path={`${routePath}CMFPG310RankPRODSelf`} component={CMFPG310RankPRODSelf} />
        <Route exact path={`${routePath}CMFPG310RankPRODAll`} component={CMFPG310RankPRODAll} />
        <Route exact path={`${routePath}CMFPG310RankCustPay`} component={CMFPG310RankCustPay} />
        <Route exact path={`${routePath}CMFPG310RankCustTrad`} component={CMFPG310RankCustTrad} />
        <Route exact path={`${routePath}`} component={FPFPG100} />
        <Route exact path={`${routePath}Error`} component={ErrorPage} />
        <Route component={NotFoundPage} />
      </Switch>
    );

    const init = () => {
      console.log("[App.js]init: ", isNav.bool)
      setOnce(false);
      // token
      let _uuid = uuid.v4();
      sessionStorage.setItem('ApplicationID', _uuid);
    }
  
    // 初始化
    if(once)init();
    // 監聽功能選單
    useEffect(() => {
      // componentDidMount
      console.log("[App.js]isNavOpen(isNav.bool): ", isNav.bool)
      setIsNavOpen(isNav.bool)
    },[isNav]);
    // 監聽登入狀態
    useEffect(() => {
      // componentDidMount
      console.log("[App.js]isLogin: ", isLogin)
    },[isLogin]);
  
    return (
      <Suspense fallback={<div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}><div className="m-auto bold font-size-4 loader"/></div>}>
        <KV></KV>
        {/* 抽屜選單 */}
        {isLogin?<SideNav/>:<Fragment/>}
        {/* 功能頁面 */}
        <div className={`wrap ${isNavOpen===true?"nav-lg":"nav-sm"}`} style={{animationDuration:"500ms"}}>
          {isLogin?
            <Fragment>
              <MainNav/>
              <MarqueeAlert/>
              <div className="sub-wrap" style={{display:isLogin?"block":"none"}}>
                {route}
              </div>
            </Fragment>
          :<Fragment/>}
          {/** 登入 */}
          <Login/>
          {/* <Footer></Footer> */}
        </div>
        {/** 初始化 */}
        <Initial/>
        <Gateway/>
        {/** 系統訊息 */}
        <AlertMessager/>
        {/** Loader */}
        <Loader/>
        {/** 錯誤訊息跳窗 */}
        <ConfirmAlert/>
      </Suspense>
    );
}
App.propTypes = {
  children: PropTypes.element
};
export default hot(module)(App);
  