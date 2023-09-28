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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const SAGRP100Query = (props) => {
  const [area, setArea] = useState(10);
  const [branch, setBranch] = useState(10);
  const [empid, setEmpid] = useState(117299);

  const chgArea = (event) => {
    setArea(event.target.value);
  };
  const chgBrch = (event) => {
    setBranch(event.target.value);
  };
  const chgEmpid = (event) => {
    setEmpid(event.target.value);
  };
  const clearAll = () => {
    setArea('0');
    setBranch('0');
    setEmpid('0');
  };

  // 篩選條件抽屜內容
  const filter = () => (
    <div
      className={"grid-filter"}
      role="presentation"
      // onClick={()=>props.setOpen(false)}
      // onKeyDown={()=>props.setOpen(false)}
    >
      <h1 className="p-4 pl-5">查詢條件<Badge className="ml-2" color="secondary" variant="dot" overlap="rectangular"><SearchIcon/></Badge></h1>
      <Divider className="bg-dark"/>
      <div className="h-100">
          <div className="mt-3 px-5 py-5 d-flex justify-content-between">
              <FormControl variant="outlined" className={"formCtrl-mui pr-3 col-6"}>
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
              <FormControl variant="outlined" className={"formCtrl-mui col-6"}>
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
          </div>
          <div className="px-5 pt-3 pb-5">
              <FormControl variant="outlined" className={"formCtrl-mui"}>
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
                  </Select>
              </FormControl>
          </div>
      </div>
      
      <div className="grid-filter-footer">
        <Divider/>
        <Button 
          className="w-50 bold btn-query" 
          variant="contained" 
          color="primary" 
          onClick={()=>props.setOpen(false)}
        >
          查詢
        </Button>
        <Button 
          className="w-50 bold btn-clear" 
          variant="contained" 
          color="secondary"
		      onClick={clearAll}
        >
          清除
        </Button>
      </div>
    </div>
  );

  useEffect(() => {
    return () => {
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
SAGRP100Query.propTypes = {
  anchor: PropTypes.string,
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
}
export default SAGRP100Query;
  