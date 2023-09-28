import React, { 
  useState,
  useEffect,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormGroup, Tooltip } from '@material-ui/core';
import Pagin from "../../public/components/Pagin/Pagin";//分頁
import "react-datepicker/dist/react-datepicker.css";
import SAGRP100Query from "./SAGRP100Query";
import SAGRP100Add from "./SAGRP100Add";
import { TextField } from '@material-ui/core';



const SAGRP100Search = (props) => {
  const sysinfo = useSelector(state=>state.sysinfo);
  console.log(sysinfo);
  const history = useHistory()

  const [isFilter, setOpenFilter] = useState(false);
  const [isOpenAdd, openAdd] = useState(false);
  const [editRow, setEditRow] = useState(false); // 存放row
  const [isEdit, setEdit] = useState(false); // 是否在修改中
  const [isDetail, setDetail] = useState(false); // 開啟明細flag
	const [groupRow, setGroupRow] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [area, setArea] = useState(0);
  const [branch, setBranch] = useState(0);
  const [empid, setEmpid] = useState(0);
  const [grp,setGrp] = useState(0);
  const [phonenumber,setPhonenumber]=useState();
  const [customerID,setCustomerID]=useState();
  const [customerName,setCustomerName]=useState();
  const [customerphone,setCustomerPhone]=useState();
  const [search,setSearch]=useState();
  const [workItem,setWorkItem]=useState([]);
  const[srhcd,setSrhcd]=useState(props.search);
  
  const handleSearchAreaChange_s = (event) => {
    const filteredData = props.search.filter(item =>
      item.REGION_CODE == (area) ||
      item.BRANCH_CODE == (branch) ||
      item.ROLE_ID == (empid)
      // item.CUSTOMER_ID == (customerID)||
      // item.CUST_NAME == (customerName)||
      // item.PHONE_NUM == (customerphone)
    );
    setSrhcd(filteredData);
  };

  //全選
  const handleRowCheckboxChange = (rowIndex) => {
    const newSearchResults = Array(...srhcd);
    newSearchResults[rowIndex].CHECKED = !newSearchResults[rowIndex].CHECKED; // 切换选中状态
    setSrhcd([...newSearchResults]);// 更新父组件中的搜索结果数组
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
  };

  //動態加入
  // const options = props.data.map((row,item) => ({
  //   value: item.value,
  //   label: item.label,
  // }));
    // const options=[]
    

  //處理全選
  useEffect(() => {
    const updatedSearchResults = srhcd.map(result => ({
      ...result,
      CHECKED: selectAll
    }));
    setSrhcd(updatedSearchResults);
    return () => {
        
    }
  },[selectAll]);

  const chgArea = (event) => {
    setArea(event.target.value);
  };
  const chgBrch = (event) => {
    setBranch(event.target.value);
  };
  const chgEmpid = (event) => {
    console.log(props.data)
    setEmpid(event.target.value);
  };
  const chgGrp = (event) => {
    setGrp(event.target.value);
  };
  const chgPhonenumber = (event) => {
    setPhonenumber(event.target.value);
  };
  const chgCustomerID = (event) => {
    setCustomerID(event.target.value);
  };
  const chgCustomerName = (event) => {
    setCustomerName(event.target.value);
  };
  const chgCustomerPhone = (event) => {
    setCustomerPhone(event.target.value);
  };
  const handleChange = (event) =>{
    const itemName = event.target.name;

    const updatedWorkItem = workItem.includes(itemName)
      ? workItem.filter(item => item !== itemName)
      : [...workItem, itemName];

      setWorkItem(updatedWorkItem);

  };
  const modifyRow = (row)=> {
    setEdit(true)
    setEditRow(row)
  }

  // const testData=[16,17,18]

  const sendEdit = (idx, row) => {
    props.modify(idx, row).then(()=>{
      setEdit(false)
      console.log("sendEdit 伺服器已處理完修改命令 執行切換按鈕")
    })
  }

  const handleExportCSV = () => {

    const csvString = '\uFEFF'+convertToCSV(props.search); // Use the data you want to export
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'exported_data.csv';
    link.click();

    URL.revokeObjectURL(url);
  };

  function openDetail(row) {
		setDetail((isOpen) => !isOpen);
		setGroupRow(row);
	}

  function openDetail2(row) {
		setSearch((isOpen) => !isOpen);
		setGroupRow(row);
	}

  function convertToCSV(data) {
    const csvRows = [];
    const headers = Object.keys(data[0]);
  
    csvRows.push(headers.join(','));
    for (const row of data) {
      const values = headers.map(header => {
        const cellValue = row[header];
        return cellValue === null || cellValue === undefined ? '' : cellValue.toString();
      });
      csvRows.push(values.join(','));
    }
  
    return csvRows.join('\n');
  }
  
  //一鍵清除
  const clearAll = () => {
    setArea('0');
    setBranch('0');
    setEmpid('0');
    setGrp('0');
    setPhonenumber('');
    setCustomerID('');
    setCustomerName('');
    setCustomerPhone('');
    setWorkItem([]);

    const checkboxes = document.querySelectorAll('[name="workItem"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
  };
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

      <div className="p-3">
        <div className="grid container-fluid p-0" style={{maxHeight:"750px"}}>
          <div className="row">
            <div className="col-12 py-3 pl-4 grid-header">
              <IconButton className="pl-2 backbar" color="default" onClick={()=>props.back(false)}>
                <ArrowBackIcon className="back-arr"/>
              </IconButton>
              <mark className="ml-3 grid-title highLight">客戶搜尋</mark>
              <Tooltip title="新增群組" placement="top" onClick={() => { openAdd(!isOpenAdd); }}>
                <a><PlaylistAddIcon className="ml-2 iconColor" /></a>
              </Tooltip>
              <IconButton className="pl-2" color="default" onClick={()=>{setOpenFilter(!isFilter)}}>
                <Badge color="secondary" variant="dot" overlap="rectangular"><SearchIcon/></Badge>
              </IconButton>
            </div>
          </div>

          <div className="h-100">
            <div className="mt-1 mb-1 px-5 py-5 d-flex justify-content-between">
  
              <FormControl variant="outlined" className={"formCtrl-mui col-3 pr-3"}>
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
  
              <FormControl variant="outlined" className={"formCtrl-mui col-3 pr-3"}>
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
  
  
              <FormControl variant="outlined" className={"formCtrl-mui col-3 pr-3"}>
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

              <FormControl variant="outlined" className={"formCtrl-mui col-3 pr-3"}>
                <TextField
                labelId="phonenumber"
                id='phonenumber'
                label="行動電話:"
                InputLabelProps={{ shrink: true }}
                placeholder="請輸入..."
                variant="outlined"
                value={phonenumber}
                onChange={chgPhonenumber}
                />
              </FormControl>

            </div>
          </div>
            <div className="mt-1 mb-1 px-5 py-5 d-flex justify-conten">
              <FormControl variant="outlined" className={"formCtrl-mui col-3 pr-3"}>
                <TextField
                labelId="customerID"
                id='customerID'
                label="客戶ID:"
                InputLabelProps={{ shrink: true }}
                placeholder="請輸入..."
                variant="outlined"
                value={customerID}
                onChange={chgCustomerID}
                />
              </FormControl>

              <FormControl variant="outlined" className={"formCtrl-mui col-3 pr-3"}>
                <TextField
                labelId="customerName"
                id='customerName'
                label="客戶姓名:"
                InputLabelProps={{ shrink: true }}
                placeholder="請輸入..."
                variant="outlined"
                value={customerName}
                onChange={chgCustomerName}
                />
              </FormControl>

              <FormControl variant="outlined" className={"formCtrl-mui col-3 pr-3"}>
                <TextField
                labelId="customerphone"
                id='customerphone'
                label="連絡電話:"
                InputLabelProps={{ shrink: true }}
                placeholder="請輸入..."
                variant="outlined"
                value={customerphone}
                onChange={chgCustomerPhone}
                />
              </FormControl>
            </div>

<div className="h-100">
  <div className="mt-1 mb-1 px-5 py-5 d-flex justify-content-between">
      <FormControl variant="outlined" className={"formCtrl-mui col-3 pr-3"}>
        <InputLabel id="input-grp">群組清單</InputLabel>
        <Select
          labelId="input-grp"
          id="demo-simple-select-outlined"
          value={grp}
          onChange={chgGrp}
          label="grp"
        >
          {/* 下拉选项 */}
          <MenuItem value='0'>
            <em>請選擇</em>
          </MenuItem>
          {/* <MenuItem value='1'>VTB</MenuItem>
          <MenuItem value='2'>VTB+投資</MenuItem>
          <MenuItem value='3'>VIP</MenuItem>
          <MenuItem value='4'>VIP+投資</MenuItem>
          <MenuItem value='5'>人民幣</MenuItem> */}
          {props.data.map((row) => 
            // console.log(1);
            <MenuItem key={row} value={row}>
              {row}
            </MenuItem>
          )}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        className="mx-1"
        color="primary"
        onClick={(event) => props.saveGroupList(event)}//新增的加入按鈕功能
      >
        加入
      </Button>
  </div>
</div>
<div className="mt-1 mb-3 px-5 py-4 d-flex justify-content">
  <div>
    
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend" className="labelStyle">選擇:</FormLabel>
      <FormGroup row aria-label="workItem" name="workItem" value={workItem}>
      <FormControlLabel 
          className="row" 
          value="report" 
          control={
            <Checkbox 
              color="primary"
              checked={workItem.includes("RB001")}
              onChange={handleChange} 
              name="RB001" 
            />
          } 
          label="客戶基本資料與註記" 
        />
      <FormControlLabel 
          className="row" 
          value="report" 
          control={
            <Checkbox 
              color="primary" 
              checked={workItem.includes("RB002")}
              onChange={handleChange} 
              name="RB002" 
            />
          } 
          label="客戶資產餘額" 
        />
      <FormControlLabel 
          className="row" 
          value="report" 
          control={
            <Checkbox 
              color="primary"
              checked={workItem.includes("RB003")}
              onChange={handleChange} 
              name="RB003" 
            />
          } 
          label="客戶存款" 
        />
      <FormControlLabel 
          className="row" 
          value="report" 
          control={
            <Checkbox 
              color="primary"
              checked={workItem.includes("RB004")}
              onChange={handleChange} 
              name="RB004" 
            />
          } 
          label="客戶感興趣商品" 
        />
      <FormControlLabel 
          className="row" 
          value="report" 
          control={
            <Checkbox 
              color="primary"
              checked={workItem.includes("RB005")}
              onChange={handleChange} 
              name="RB005" 
            />
          } 
          label="投資商品承作紀錄" 
        />
      <FormControlLabel 
          className="row" 
          value="report" 
          control={
            <Checkbox 
              color="primary"
              checked={workItem.includes("RB006")}
              onChange={handleChange} 
              name="RB006" 
            />
          } 
          label="基金" 
        />
      <FormControlLabel 
          className="row" 
          value="report" 
          control={
            <Checkbox 
              color="primary"
              checked={workItem.includes("RB007")}
              onChange={handleChange} 
              name="RB007" 
            />
          } 
          label="債券(信託)" 
        />
      <FormControlLabel 
          className="row" 
          value="report" 
          control={
            <Checkbox 
              color="primary"
              checked={workItem.includes("RB008")}
              onChange={handleChange} 
              name="RB008" 
            />
          } 
          label="ETF" 
        />
        <FormControlLabel 
          className="row" 
          value="report" 
          control={
            <Checkbox 
              color="primary"
              checked={workItem.includes("RB009")}
              onChange={handleChange} 
              name="RB009" 
            />
          } 
          label="保險" 
        />
        <FormControlLabel 
          className="row" 
          value="report" 
          control={
            <Checkbox 
              color="primary"
              checked={workItem.includes("RB010")}
              onChange={handleChange} 
              name="RB010" 
            />
          } 
          label="SI" 
        />
        <FormControlLabel 
          className="row" 
          value="report" 
          control={
            <Checkbox 
              color="primary"
              checked={workItem.includes("RB011")}
              onChange={handleChange} 
              name="RB011" 
            />
          } 
          label="DCI" 
        />
        <FormControlLabel 
          className="row" 
          value="report" 
          control={
            <Checkbox 
              color="primary"
              checked={workItem.includes("RB012")}
              onChange={handleChange} 
              name="RB012" 
            />
          } 
          label="信用卡/現金卡/貸款" 
        />
        <FormControlLabel 
          className="row" 
          value="report" 
          control={
            <Checkbox 
              color="primary"
              checked={workItem.includes("RB013")}
              onChange={handleChange} 
              name="RB013" 
            />
          } 
          label="交易憑證" 
        />
        <FormControlLabel 
          className="row" 
          value="report" 
          control={
            <Checkbox 
              color="primary"
              checked={workItem.includes("RB014")}
              onChange={handleChange} 
              name="RB014" 
            />
          } 
          label="債券(保管)" 
        />
      </FormGroup>
    </FormControl>
  </div>
</div>
</div>
      <div className="mt-3 px-10 py-3 d-flex justify-content-center">
	      <td className="text-center">
		      <Button
		      variant="contained"
		      className="mx-1"
		      color="primary"
          onClick={handleSearchAreaChange_s}
		      >
            查詢
          </Button>	
	      </td>
	      <td className="text-center">
		      <Button
		      variant="contained"
		      className="mx-1"
		      color="primary"
		      onClick={clearAll}
		      > 
		        清除
		      </Button>
	      </td>
	      <td className="text-center">
		      <Button
		      variant="contained"
		      className="mx-1"
		      color="primary"
		      onClick={handleExportCSV}
		      >
		        匯出CVS
		      </Button>
	      </td>
      </div>
    </div>

    <form>
      <div className="row">
        <div className="col-12">
          <div className="table-wrap w-100 pb-3" style={{maxHeight:"500px"}}>
            <table className="table table-md table-clear table-bold table-project w-100">
              <thead>
                <tr>
                  <th 
                    className="text-center">
                      <Checkbox 
                        className="check_all"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                      />全選
                  </th>
                  <th className="text-center">區</th>
                  <th className="text-center">分行</th>
                  <th className="text-center">客戶ID</th>
                  <th className="text-center">客戶姓名</th>
                  <th className="text-center">最適優惠等級</th>
                  <th className="text-center">實際等級</th>
                  <th className="text-center">會員等級</th>
                  <th className="text-center">是否為體驗會員</th>
                  <th className="text-center">行動電話</th>
                  <th className="text-center">理專姓名</th>
                </tr>
              </thead>

              <tbody>
               {srhcd?srhcd.map((row, idx)=>
                <tr key={idx}>
                  <td className="text-center">
                    <Checkbox 
                      name="checkbox"
                      checked={row.CHECKED}
                      onChange={() => handleRowCheckboxChange(idx)}
                    />
                  </td>
                  <td className="text-center">{row.REGION}</td>
                  <td className="text-center">{row.BRANCH_NAME}</td>
                  <td className="text-center">{row.CUSTOMER_ID}</td>
                  <td className="text-center">{row.CUST_NAME}</td>
                  <td className="text-center">{row.FAV_LEVEL}</td>
                  <td className="text-center">{row.ACT_LEVEL}</td>
                  <td className="text-center">{row.MEMB_LEVEL}</td>
                  <td className="text-center">{row.EXP_MEMB}</td>
                  <td className="text-center">{row.PHONE_NUM}</td>
                  <td className="text-center">{row.ROLE_NAME}</td>
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
    <div className="row">
      <div className="col-12 py-3 px-4 d-flex justify-content-end">
        <Pagin 
          onChange={()=>{}} 
          totalSize={56} 
          totalPage={5}
          prevBtn={true}
          nextBtn={true}
        ></Pagin>
      </div>
    </div>
    
    <SAGRP100Query
      anchor={"right"}
      isOpen={isFilter}
      setOpen={setOpenFilter}
    />
    <SAGRP100Add
      anchor={"right"}
      isOpen={isOpenAdd}
      setOpen={openAdd}
    />

</Fragment>
  );
};

SAGRP100Search.propTypes = {
  data: PropTypes.array,
  // data: PropTypes.arrayOf(PropTypes.object),
  modify: PropTypes.func,
  detail: PropTypes.array,
  back: PropTypes.func,
  search: PropTypes.array,
  searchResults: PropTypes.array.isRequired,
  setSearchResults: PropTypes.func.isRequired,
  saveGroupList: PropTypes.func,
  groupName:PropTypes.array,
  grp:PropTypes.string,//
};
export default SAGRP100Search;
