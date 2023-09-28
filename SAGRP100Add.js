// Core
import React, {
  useEffect,
  useState,
  Fragment,
} from "react";
import PropTypes from 'prop-types';

// mui
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';



const SAGRP100Add = (props) => {
  

  const [inputGrpName,setInputGrpName]=useState();

  const init=()=>{
    setInputGrpName("");

  }
  const chgInputGrpName = (event) =>{
    console.log(props.grpnme)
    setInputGrpName(event.target.value);
  }
  // 篩選條件抽屜內容
  const filter = () => (
    <div
      className={"grid-filter"}
      role="presentation"
      // onClick={()=>props.setOpen(false)}
      // onKeyDown={()=>props.setOpen(false)}
    >
      <h1 className="p-4 pl-5">新增群組<Badge className="ml-2" color="secondary" variant="dot" overlap="rectangular"><SearchIcon/></Badge></h1>
      <Divider className="bg-dark"/>
      <div className="h-100">
          <div className="px-5 pt-3 pb-5">
            <div className="d-flex flex-column col-10 p-0 pr-3">
              <div>
                <label className="input-title">群組名稱</label>
              </div>
              <div>
                <input
                  type="text"
                  className="form-control form-input"
                  maxLength="15"
                  // value={props.groupName}
                  value={inputGrpName}
                  onChange={chgInputGrpName}//前面Input value後面取得值
                  //按下確定後
                />
              </div>
              <div>請輸入群組名稱，上限15字</div>
            </div>
          </div>
      </div>
      
      <div className="grid-filter-footer">
        <Divider />
        <Button 
          className="w-50 bold btn-query" 
          variant="contained" 
          color="primary" 
          // onClick={()=>props.setOpen(false)}
          onClick={()=>{props.setGrl(props.grpnme);props.setOpen(false);props.setGrpnme([...props.grpnme,inputGrpName])}}//要修改
        >
          確定
        </Button>
        <Button className="w-50 bold btn-clear" variant="contained" color="secondary" onClick={()=>props.setOpen(false)}>取消</Button>
      </div>
    </div>
  );

  useEffect(() => {
    return () => {
      init();
      // componentWillUnmount
    }
  },[props]);

  return (
    <Fragment>
      <SwipeableDrawer
        anchor={"right"}
        open={props.isOpen}
        onClose={()=>props.setOpen(false)}
        onOpen={()=>props.setOpen(true)}
      >
        {filter("right")}
      </SwipeableDrawer>
    </Fragment>
  );
};
SAGRP100Add.propTypes = {
  anchor: PropTypes.string,
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
  setGroupName:PropTypes.func,
  setGrl:PropTypes.func,
  setGrpnme:PropTypes.func,
  grpnme:PropTypes.array,
}
export default SAGRP100Add;
  