/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * Mobile phone number
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * Phone Number号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URLaddress
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 匹配数字，可以yes小数，不可以yes负数,可以为空
 * @param {*} s 
 */
export function isNumber(s){
  return  /(^-?[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$)|(^$)/.test(s);
}
/**
 * 匹配整数，可以为空
 * @param {*} s 
 */
export function isIntNumer(s){
  return  /(^-?\d+$)|(^$)/.test(s);
}
/**
 * 身份证校验
 */
export function checkIdCard(idcard) {
  const regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!regIdCard.test(idcard)) {
      return false;
  } else {
      return true;
  }
}
