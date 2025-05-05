export function isAuth(tableName, key) {
  let role = localStorage.getItem("UserTableName");
  let menus = [{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-link","buttons":["add","查看","modification ","delete"],"menu":"user","menuJump":"列表","tableName":"yonghu"}],"menu":"User Management"},{"child":[{"appFrontIcon":"cuIcon-send","buttons":["add","查看","modification ","delete"],"menu":"Commodity classification","menuJump":"列表","tableName":"shangpinfenlei"}],"menu":"Commodity classification management"},{"child":[{"appFrontIcon":"cuIcon-present","buttons":["add","查看","modification ","delete","View comments"],"menu":"Commodity information","menuJump":"列表","tableName":"shangpinxinxi"}],"menu":"Commodity Information Management"},{"child":[{"appFrontIcon":"cuIcon-pay","buttons":["add","查看","modification ","delete"],"menu":"Carousel image Management","tableName":"config"},{"appFrontIcon":"cuIcon-vipcard","buttons":["add","查看","modification ","delete"],"menu":"News","tableName":"news"}],"menu":"System Management"},{"child":[{"appFrontIcon":"cuIcon-time","buttons":["查看","delete","物流"],"menu":"DispatchedOrder","tableName":"orders/Dispatched"},{"appFrontIcon":"cuIcon-camera","buttons":["查看","delete","发货"],"menu":"PaidOrder","tableName":"orders/Paid"},{"appFrontIcon":"cuIcon-rank","buttons":["查看","delete","品销量","日销额","月销额","年销额"],"menu":"CompletedOrder","tableName":"orders/Completed"},{"appFrontIcon":"cuIcon-copy","buttons":["查看","delete"],"menu":"RefundedOrder","tableName":"orders/Refunded"}],"menu":"OrderManagement"}],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-link","buttons":["查看"],"menu":"Commodity information列表","menuJump":"列表","tableName":"shangpinxinxi"}],"menu":"Commodity information模块"}],"hasBackLogin":"yes","hasBackRegister":"no","hasFrontLogin":"no","hasFrontRegister":"no","roleName":"管理员","tableName":"users"},{"backMenu":[],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-link","buttons":["查看"],"menu":"Commodity information列表","menuJump":"列表","tableName":"shangpinxinxi"}],"menu":"Commodity information模块"}],"hasBackLogin":"no","hasBackRegister":"no","hasFrontLogin":"yes","hasFrontRegister":"yes","roleName":"user","tableName":"yonghu"}];
  for(let i=0;i<menus.length;i++){
    if(menus[i].tableName==role){
      for(let j=0;j<menus[i].frontMenu.length;j++){
          for(let k=0;k<menus[i].frontMenu[j].child.length;k++){
            if(tableName==menus[i].frontMenu[j].child[k].tableName){
              let buttons = menus[i].frontMenu[j].child[k].buttons.join(',');
              return buttons.indexOf(key) !== -1 || false
            }
          }
      }
    }
  }
  return false;
}

/**
 *  * 获取当前时间（yyyy-MM-dd hh:mm:ss）
 *   */
export function getCurDateTime() {
    let currentTime = new Date(),
    year = currentTime.getFullYear(),
    month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1,
    day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate(),
    hour = currentTime.getHours(),
    minute = currentTime.getMinutes(),
    second = currentTime.getSeconds();
    return year + "-" + month + "-" + day + " " +hour +":" +minute+":"+second;
}

/**
 *  * 获取当前日期（yyyy-MM-dd）
 *   */
export function getCurDate() {
    let currentTime = new Date(),
    year = currentTime.getFullYear(),
    month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1,
    day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate();
    return year + "-" + month + "-" + day;
}
