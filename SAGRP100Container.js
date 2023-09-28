// Core
import React, {
  useEffect,
  useState,
  Fragment,
} from "react";
import PropTypes from 'prop-types';
import './SAGRP100.scss';
// redux hook(結合hook用法, 簡化程式碼, useDispatch=action.xxx, useSelector=props.xxx)
import {useDispatch, useSelector} from 'react-redux';
// mui
import Tooltip from '@material-ui/core/Tooltip';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

// 導頁
import { routePath } from "../../public/utils/window/location";
import { useHistory, Link } from 'react-router-dom';
//分頁
import Pagin from "../../public/components/Pagin/Pagin";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import SAGRP100Query from "./SAGRP100Query";
import SAGRP100Add from "./SAGRP100Add";
import SAGRP100Detail from './SAGRP100Detail';
import SAGRP100Search from "./SAGRP100Search";

const SAGRP100Container = (props) => {
  const sysinfo = useSelector(state=>state.sysinfo);
  console.log(sysinfo);
  const history = useHistory()
  const [isFilter, setOpenFilter] = useState(false);
  const [isOpenAdd, openAdd] = useState(false);
  const [editRow, setEditRow] = useState(false); // 存放row
  const [isEdit, setEdit] = useState(false); // 是否在修改中
  const [isDetail, setDetail] = useState(false); // 開啟明細flag
	const [groupRow, setGroupRow] = useState({});
  const [isSearch, setSearch] = useState(false);

  const [grpnme,setGrpnme]=useState([]);
  const [area, setArea] = useState(10);
  const [branch, setBranch] = useState(10);
  const [empid, setEmpid] = useState(117299);
  const [grp,setGrp] = useState(11);

  const data = props.data;
  const [groupName, setGroupName] = useState();
  const[srhcd,setSrhcd]=useState(props.data);
  const[grl,setGrl]=useState([]);//存群組清單

  const [editedGroupNames, setEditedGroupNames] = useState();
 
  const chgArea = (event) => {
    setArea(event.target.value);
  };
  const chgBrch = (event) => {
    setBranch(event.target.value);
  };
  const chgEmpid = (event) => {
    setEmpid(event.target.value);
  };

  const handleSearchAreaChange_c = (event) => {
    
    //從init_Data過濾Data，篩選條件用"或"
    const filteredData = props.data.filter(item =>
      item.AREA_CODE.includes(area) ||
      item.BRANCH_NAME.includes(branch) ||
      item.EMP_ID.includes(empid)
    );
    setSrhcd(filteredData);
  };

  //群組清單處理
  const saveGroupList = (event) => {
    setGrp((prevGroupList) => [...prevGroupList, event]);
  };


  const handleDelete = () => {
    console.info('You clicked the delete icon.');
    setArea('0');
    setBranch('0');
    setEmpid('0');
  };

  const handleDeleteList = (idx) => {
    // 执行删除操作，例如从数据数组中删除特定的元素
    const newData = [...srhcd]; // 创建数据数组的副本
    console.log(idx)
    newData.splice(idx, 1); // 从数组中删除指定索引的元素
    // 更新数据数组
    modify(newData); // 调用 modify 函数更新数据
  };

  const modify = (row) => {
    setSrhcd(row);
  }

  const modifyRow = (row)=> {
    setEdit(true)
    setEditedGroupNames(row.GROUP_NAME)
    setEditRow(row)
  };

  const chgModifyGrp = (event) =>{
    setEditedGroupNames(event.target.value);
  };

  const sendEdit = (idx, row) => {
    // const modifiedRow = {
    //   GROUP_NAME: editedGroupNames,
    // };
    // const dispatch = useDispatch();
    // dispatch(updateRowAction(idx, modifiedRow));
    // setEdit(false);
    // setEditRow(null);
    // setEditedGroupNames(null);
    // Object.keys(srhcd)[idx];
    console.log(idx);
    console.log(srhcd[idx].GROUP_NAME)
    setEdit(false);
    srhcd[idx].GROUP_NAME=editedGroupNames;
  };

  const updateDetail = (updatedDetail) => {
    setDetail(updatedDetail);
  };

  function openDetail(row) {
		setDetail((isOpen) => !isOpen);
		setGroupRow(row);
	}

  function openDetail2(row) {
		setSearch((isOpen) => !isOpen);
		setGroupRow(row);
	}

 

  useEffect(() => {
    return () => {
      // componentWillUnmount
    }
  },[props.data]);

 

  useEffect(() => {
    return () => {
        // componentWillUnmount
    }
  },[sysinfo]);

return (
<Fragment>
      {isDetail ? (
      <SAGRP100Detail 
        detail={props.detail}
        groupRow={groupRow} 
        back={setDetail} />
      )
      : isSearch ? (
      <SAGRP100Search 
        detail={props.detail} 
        // data={props.search}
        data={grpnme}
        groupRow={groupRow}
        back={setSearch}
        area={area}
        search={props.search}
        searchResults={props.search}
        branch={branch}
        empid={empid}
        grp={grp}
        groupName={groupName}
      />
      ):(<div className="p-3 SAGRP100">
          <div className="grid container-fluid p-0" style={{maxHeight:"750px"}}>
            <div className="row">
              <div className="col-12 py-3 pl-4 grid-header">
              {/* <IconButton className="pl-4 backbar" color="default" onClick={()=>history.replace(`${routePath}`)}>
                <ArrowBackIcon className="back-arr"/>
                </IconButton> */}
              <mark className="ml-3 grid-title highLight">自建群組</mark>
              <Tooltip title="新增群組" placement="top" onClick={() => { openAdd(!isOpenAdd); }}>
                <a><PlaylistAddIcon className="ml-2 iconColor" /></a>
              </Tooltip>
              <IconButton className="pl-2" color="default" onClick={()=>{setOpenFilter(!isFilter)}}>
                <Badge color="secondary" variant="dot" overlap="rectangular"><SearchIcon/></Badge>
              </IconButton>
              <div>
                <Chip label="第二區區域中心" className="mx-2 font-weight-bold" deleteIcon={<DoneIcon />} onDelete={handleDelete} variant="outlined" />
                <Chip label="100-西三重分行" className="mr-2 font-weight-bold" deleteIcon={<DoneIcon />} onDelete={handleDelete} variant="outlined" />
                <Chip label="117299" className="mr-2 font-weight-bold" deleteIcon={<DoneIcon />} onDelete={handleDelete} variant="outlined" />
              </div>
            </div>
          </div>          



          <div className="h-100">
            <div className="mt-3 px-5 py-5 d-flex justify-content-between">
    
              <FormControl variant="outlined" className={"formCtrl-mui col-4 pr-3"}>
                <InputLabel id="input-area">區域</InputLabel>
                <Select
                labelId="input-area"
                id="demo-simple-select-outlined"
                value={area}
                onChange={chgArea}
                label="area"
                >
                  <MenuItem value='0'>
                    <em>請選擇</em>
                  </MenuItem>
                  <MenuItem value='1'>第一區區域中心</MenuItem>
                  <MenuItem value='2'>第二區區域中心</MenuItem>
                  <MenuItem value='3'>第三區區域中心</MenuItem>
                </Select>
              </FormControl>
    
              <FormControl variant="outlined" className={"formCtrl-mui col-4 pr-3"}>
                <InputLabel id="input-brch">分行</InputLabel>
                  <Select
                    labelId="input-brch"
                    id="demo-simple-select-outlined"
                    value={branch}
                    onChange={chgBrch}
                    label="branch"
                  >
                    <MenuItem value='0'>
                      <em>請選擇</em>
                    </MenuItem>
                    <MenuItem value='1'>西三重分行</MenuItem>
                    <MenuItem value='2'>東三重分行</MenuItem>
                    <MenuItem value='3'>南三重分行</MenuItem>
                    <MenuItem value='4'>北三重分行</MenuItem>
                  </Select>
              </FormControl>
    
    
      <FormControl variant="outlined" className={"formCtrl-mui col-4 pr-3"}>
        <InputLabel id="input-empid">理財專員</InputLabel>
        <Select
          labelId="input-empid"
          id="demo-simple-select-outlined"
          value={empid}
          onChange={chgEmpid}
          label="empid"
        >
          <MenuItem value='0'>
            <em>請選擇</em>
          </MenuItem>
          <MenuItem value='1'>彭于晏</MenuItem>
          <MenuItem value='2'>黃文奎</MenuItem>
          <MenuItem value='3'>施Ｏ甫</MenuItem>
        </Select>
      </FormControl> 
  </div>
</div>
  <Fragment>
    {!isDetail ? (
      <div className="p-3 SAGRP100">
        
        {/* 三個紅色按鈕 */}
        <div className="row">
          <div className="col-12 py-3 px-4 d-flex justify-content-center">
            <Button 
              className="btn btn-danger mr-2" 
              style={{ color: "white" }}
              onClick={handleSearchAreaChange_c}
            >
              查詢
            </Button>
            <Button 
              className="btn btn-danger mr-2" 
              style={{ color: "white" }}
              onClick={() => { openAdd(!isOpenAdd); }}
            >
              新增
            </Button>
            <Button 
              className="btn btn-danger" 
              style={{ color: "white" }}
              onClick={handleDelete}
              >
              清除
            </Button>
          </div>
        </div>
        
        {/* 資料清單 */}
        <form>
          <div className="row">
            <div className="col-12">
              <div className="table-wrap w-100 pb-3" style={{maxHeight:"500px"}}>
                {/* ... */}
              </div>
            </div>
          </div>
        </form>
        
        {/* 分頁 */}
        <div className="row">
          <div className="col-12 py-3 px-4 d-flex justify-content-end">
            <Pagin onChange={() => {}} 
                   totalSize={3} 
                   totalPage={1}
                   prevBtn={true}
                   nextBtn={true}
            />
          </div>
        </div>
      </div>
    ) : (
      <SAGRP100Detail detail={props.detail} groupRow={groupRow} back={setDetail} />
    )}

    <SAGRP100Query anchor={"right"} isOpen={isFilter} setOpen={setOpenFilter} />
    {/* <SAGRP100Add anchor={"right"} isOpen={isOpenAdd} setOpen={openAdd} /> */}
  </Fragment>

        {/* 資料清單 */}
<form>
  <div className="row">
    <div className="col-12">
      <div className="table-wrap w-100 pb-3" style={{maxHeight:"500px"}}>
        <table className="table table-md table-clear table-bold table-project w-100">
          <thead>
            <tr>
              <th className="text-center" width="10%">功能</th>
              <th className="text-center">分行</th>
              <th className="text-center">理專</th>
              <th className="text-center" width="15%">群組名稱</th>
              <th className="text-center" width="10%"> 檢視客戶</th>
              <th className="text-center" width="10%">加入客戶</th>
              <th className="text-center">最後修改時間</th>
              <th className="text-center">最後修改人員</th>
            </tr>
          </thead>
        <tbody>
          {srhcd?srhcd.map((row, idx)=>
        <tr key={idx}>
          <td className="text-center">
            {
              isEdit&&row===editRow?
              <ButtonGroup variant="text" color="default" aria-label="text secondary button group">
                <Button className="group-btn yes" onClick={()=>sendEdit(idx, row)}>
                  <div className="d-flex flex-column justify-content-center"><CheckIcon/>
                    <span>確定</span>
                  </div>
                </Button>
                <Button className="group-btn no" onClick={()=>setEdit(false)}>
                  <div className="d-flex flex-column justify-content-center"><CloseIcon/>
                    <span>取消</span>
                  </div>
                </Button>
              </ButtonGroup>:
              <ButtonGroup variant="text" color="default" aria-label="text secondary button group">
                <Button className="group-btn edit" onClick={()=>modifyRow(row)}>
                  <div className="d-flex flex-column justify-content-center"><EditIcon/>
                    <span>修改</span>
                  </div>
                </Button>
                <Button className="group-btn del" onClick={() => handleDeleteList(idx)}>
                  <div className="d-flex flex-column justify-content-center"><DeleteForeverIcon/>
                    <span>刪除</span>
                  </div>
                </Button>
              </ButtonGroup>
            }                        
          </td>
          <td className="text-center">{row.TERRITORY}</td>
          <td className="text-center">{row.EMP_ID} - {row.EMP_NAME}</td>
            {!(isEdit&&row===editRow)?
              <td className="text-center">{row.GROUP_NAME}</td>:
              <td className="text-center">
                <input
                  type="text"
                  className="form-control form-input"
                  value={editedGroupNames}
                  onChange={chgModifyGrp}
                />
              </td>
            }

          <td className="text-center">
            <Button color="primary" onClick={()=>openDetail(row, row.GROUP_NAME)}>
              <div className="d-flex flex-column justify-content-center">
                <VisibilityIcon className="mr-1 justify-content-center"/>
                <span>檢視</span>
              </div>
            </Button>
          </td>

          <td className="text-center">
            <Button 
              color="primary" 
              onClick={()=>openDetail2(row, row.GROUP_NAME)}
            >
              <div className="d-flex flex-column justify-content-center">
                <AddCircleIcon className="mr-1 justify-content-center"/>
                  <span>加入</span>
              </div>
            </Button>
          </td>

          <td className="text-center">{moment(new Date(row.LASTUPDATE)).format("YYYY-MM-DD HH:mm:ss")}</td>
          <td className="text-center">{row.LASTUPDATE_EMP}</td>
        </tr>):<Fragment/>}
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
          totalSize={3} 
          totalPage={1}
          prevBtn={true}
          nextBtn={true}
        >
        </Pagin>
      </div>
    </div>
  </div>
</div>)}

    <SAGRP100Query
      anchor={"right"}
      isOpen={isFilter}
      setOpen={setOpenFilter}
    />
    <SAGRP100Add
      anchor={"right"}
      isOpen={isOpenAdd}
      setOpen={openAdd}
      setGroupName={setGroupName}
      setGrl={setGrl}
      grpnme={grpnme}
      setGrpnme={setGrpnme}
    />
</Fragment>
  );
};
SAGRP100Container.propTypes = {
  data: PropTypes.array,
  modify: PropTypes.func,
  detail: PropTypes.array,
  back: PropTypes.func,
  search: PropTypes.array,
}
export default SAGRP100Container;