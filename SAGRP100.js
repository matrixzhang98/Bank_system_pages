import React, {
  useEffect,
  useState,
  Fragment
} from "react";
import './SAGRP100.scss';

// redux hook(結合hook用法, 簡化程式碼, useDispatch=action.xxx, useSelector=props.xxx)
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../actions/actions';

import SAGRP100Container from "./SAGRP100Container";
// import { baseAPI, isError } from '../../public/api/base/baseService';
// import { len } from '../../public/utils/judgment/judgment';
// import {chalkError, chalkSuccess} from '../../../tools/config/chalkConfig';
// Data
import SAGRP100Data from './SAGRP100.json';
import SAGRP100Detail from "./SAGRP100Detail";

/** 
 * @txnID SAGRP100
 * @txnName 登入紀錄查詢
 * @module 系統管理
 * @depiction 
 * */ 
const SAGRP100 = (props) => {

  const dispatch = useDispatch();
  const isLogin = useSelector(state=>state.isLogin.bool);
  const [data, setData] = useState(SAGRP100Data.data);
  const [detail, setDetail] = useState(SAGRP100Data.detail);
  const [search, setSearch] = useState(SAGRP100Data.search);

  const updateSearchResults = (updatedSearchResults) => {
    // setSearchResults(updatedSearchResults); // 更新父组件中的搜索结果数组
  };

  const updateDetail = (updatedDetail) => {
    setDetail(updatedDetail); // Update the detail state with the new data
  };

  const init = () => {
      console.log("SAGRP100:\n", JSON.stringify(data))
  }
  
  useEffect(() => {
    init()
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' })
    return () => {
        // componentWillUnmount
    }
  },[isLogin]);
  
  return (
    <Fragment>
      <SAGRP100Container
        data={data}
        detail={detail}
        search={search}
        updateDetail={updateDetail}
        updateSearchResults={updateSearchResults}
      />

      {/* <SAGRP100Search
        searchResults={searchResults}
        setSearchResults={updateSearchResults} // 将函数作为属性传递给子组件
        // 其他属性...
      /> */}

      {/* <SAGRP100Detail
        data={data}
        detail={detail}
        search={search}
        updateDetail={updateDetail}
      /> */}

      {/* <SAGRP100Query
        anchor={"right"}
        isOpen={isOpenFilter}
        setOpen={setOpenFilter}
        filterOptions={filterOptions} // 傳遞篩選條件狀態
      /> */}

    </Fragment>
  );
};
export default SAGRP100;
