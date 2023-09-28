// Core
import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';

// mui
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MailIcon from '@material-ui/icons/Mail';
import Tooltip from '@material-ui/core/Tooltip';

//分頁
import Pagin from '../../public/components/Pagin/Pagin';
import { CheckBoxOutlined } from '@material-ui/icons';

const SAGRP100Detail = (props) => {

  const [selectAll, setSelectAll] = useState(false);
  const [searchResults, setSearchResults] = useState(props.detail);

  const updateDetail = (updatedDetail) => {
    props.updateDetail(updatedDetail); // Call the updateDetail function passed through props
  };


  //單選
  const handleRowCheckboxChange_d = (rowIndex) => {
    // console.log(searchResults);
    const newSearchResults = Array(...searchResults); // 创建搜索结果数组的副本
    newSearchResults[rowIndex].CHECKED = !newSearchResults[rowIndex].CHECKED; // 切换选中状态
    setSearchResults([...newSearchResults]);// 更新父组件中的搜索结果数组
  };

  const handleSelectAllChange_d = () => {
    setSelectAll(!selectAll);
  };

  //處理全選
  useEffect(() => {
    const updatedSearchResults = searchResults.map(result => ({
      ...result,
      CHECKED: selectAll
    }));
    setSearchResults(updatedSearchResults);
    return () => {
        
    }
  },[selectAll]);


  useEffect(() => {
    return () => {
        // componentWillUnmount
    }
  },[]);

  return (
    <Fragment>
      <div className="p-3">
        <div className="grid container-fluid p-0" style={{maxHeight:"750px"}}>
          <div className="row">
            <div className="col-12 py-3 pl-4 grid-header">
              <IconButton className="pl-2 backbar" color="default" onClick={()=>props.back(false)}>
                <ArrowBackIcon className="back-arr"/>
              </IconButton>
              <mark className="ml-3 grid-title highLight">理專自建客群</mark>
              <Tooltip title="將勾選客戶從群組中移除" placement="top">
                <a><DeleteForeverIcon className="ml-2 iconColor" /></a>
              </Tooltip>
              <Tooltip title="發送行銷電子郵件" placement="top">
                <a><MailIcon className="ml-2 iconColor" /></a>
              </Tooltip> 
              <div>	
                <Chip label={props.groupRow.BRANCH_ID+'-'+props.groupRow.BRANCH_NAME} className="mx-2 font-weight-bold" deleteIcon={<DoneIcon />} onDelete={()=>{}} variant="outlined" />
                <Chip label={props.groupRow.EMP_ID+'-'+props.groupRow.EMP_NAME} className="mx-2 font-weight-bold" deleteIcon={<DoneIcon />} onDelete={()=>{}} variant="outlined" />
                <Chip label={props.groupRow.GROUP_NAME} className="mx-2 font-weight-bold" deleteIcon={<DoneIcon />} onDelete={()=>{}} variant="outlined" />
              </div>
            </div>
          </div>
          {/* 資料清單 */}
          <form>
            <div className="row">
                <div className="col-12">
                  <div className="table-wrap w-100 pb-3" style={{maxHeight:"500px"}}>
                      <table className="table table-md table-clear table-bold table-project w-100">
                        <thead>
                          <tr>
                            <th className="text-center" width="10%">
                              <Checkbox 
                                className="check_all"
                                checked={selectAll}
                                onChange={handleSelectAllChange_d}
                              /> 
                              全選
                            </th>
                            <th className="text-center">客戶ID</th>
                            <th className="text-center">客戶姓名</th>
                            <th className="text-center">資產等級</th>
                            <th className="text-center">貴賓等級</th>
                            <th className="text-center">生日</th>
                            <th className="text-center">資產總餘額(折台)</th>
                            <th className="text-center">基金損益(報酬率)</th>
                            <th className="text-center">E-Mail</th>
                            <th className="text-center">最後一次聯絡時間</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults?searchResults.map((row, idx)=>
                            <tr key={idx}>
                              <td className="text-center">
                                <Checkbox 
                                  name="checkbox"
                                  checked={row.CHECKED}
                                  onChange={() => handleRowCheckboxChange_d(idx)}
                                />
                            </td>
                            <td className="text-center">{row.CUST_ID}</td>
                            <td className="text-center">{row.CUST_NAME}</td>
                            <td className="text-center">{row.ASSET_LEVEL}</td>
                            <td className="text-center">{row.VIP_LEVEL}</td>
                            <td className="text-center">{row.BIRTHDAY}</td>
                            <td className="text-right">{row.ASSET_TWD}</td>
                            <td className="text-right">{row.FUND_PROFIT}</td>
                            <td className="text-right">{row.E_MAIL}</td>
                            <td className="text-right">{row.LATEST_CONTACT}</td>
                          {/* </tr>):<Fragment/>} */}
                          </tr>):(<tr>
                          <td colSpan="11" className="text-center">
                            No search results.
                          </td>
                        </tr>)}
                        </tbody>
                    </table>
                  </div>
                </div>
            </div>
          </form>
          {/* 分頁 */}
          <div className="row">
              <div className="col-12 py-3 px-4 d-flex justify-content-end">
                  <Pagin onChange={()=>{}} 
                          totalSize={56} 
                          totalPage={5}
                          prevBtn={true}
                          nextBtn={true}
                  ></Pagin>
              </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
SAGRP100Detail.propTypes = {
	detail: PropTypes.array,
	groupRow: PropTypes.object,
	back: PropTypes.func,
  search: PropTypes.array,
  updateDetail: PropTypes.func,
  searchResults: PropTypes.array.isRequired,
  setSearchResults: PropTypes.func.isRequired,
}
export default SAGRP100Detail;
