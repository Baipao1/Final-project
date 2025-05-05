export default {
    isEmail2: function (s) {
          return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
    },
  isEmail: function (rule, value, callback) {
    let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    if (value && reg.test(value) === false) {
      callback(new Error('Please enter 正确的邮箱'));
    } else {
      callback()
    }
  },
  isEmailNotNull: function (rule, value, callback) {
    let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    if (value && reg.test(value) === false) {
      callback(new Error('Please enter 正确的邮箱'));
    }else if (!value) {
      callback(new Error('Please enter 邮箱'));
    } else {
      callback()
    }
  },
  isMobile2: function (s) {
        return /^1[0-9]{10}$/.test(s);
  },
  isMobile: function (rule, value, callback) {
    let reg = /^1[0-9]{10}$/;
    if (value && reg.test(value) === false) {
      callback(new Error('Please enter 正确的Mobile phone number'));
    } else {
      callback()
    }
  },
  isMobileNotNull: function (rule, value, callback) {
    let reg = /^1[0-9]{10}$/;
    if (value && reg.test(value) === false) {
      callback(new Error('Please enter 正确的Mobile phone number'));
    } else if(!value){
      callback(new Error('Please enter Mobile phone number'));
    } else {
      callback()
    }
  },
  isPhone: function (rule, value, callback) {
    let reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    if (value && reg.test(value) === false) {
      callback(new Error('Please enter 正确的Phone Number号码'));
    } else {
      callback()
    }
  },
  isPhoneNotNull: function (rule, value, callback) {
    let reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    if (value && reg.test(value) === false) {
      callback(new Error('Please enter 正确的Phone Number号码'));
    } else if(!value) {
      callback(new Error('Please enter Phone Number号码'));
    } else {
      callback()
    }
  },
  isURL: function (rule, value, callback) {
    let reg = /^http[s]?:\/\/.*/;
    if (value && reg.test(value) === false) {
      callback(new Error('Please enter 正确的URLaddress'));
    } else {
      callback()
    }
  },
  isURLNotNull: function (rule, value, callback) {
    let reg = /^http[s]?:\/\/.*/;
    if (value && reg.test(value) === false) {
      callback(new Error('Please enter 正确的URLaddress'));
    } else if(!value) {
      callback(new Error('Please enter address'));
    } else {
      callback()
    }
  },
  isNumber: function (rule, value, callback) {
    let reg = /(^-?[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$)|(^$)/;
    if (value && reg.test(value) === false) {
      callback(new Error('Please enter 正确的数字'));
    } else {
      callback()
    }
  },
  isNumberNotNull: function (rule, value, callback) {
    let reg = /(^-?[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$)|(^$)/;
    if (value && reg.test(value) === false) {
      callback(new Error('Please enter 正确的数字'));
    } else if(!value) {
      callback(new Error('Please enter 数字'));
    } else {
      callback()
    }
  },
  isIntNumer: function (rule, value, callback) {
    let reg = /(^-?\d+$)|(^$)/;
    if (value && reg.test(value) === false) {
      callback(new Error('Please enter 正确的整数'));
    } else {
      callback()
    }
  },
  isIntNumerNotNull: function (rule, value, callback) {
    let reg = /(^-?\d+$)|(^$)/;
    if (value && reg.test(value) === false) {
      callback(new Error('Please enter 正确的整数'));
    } else if(!value) {
      callback(new Error('Please enter 整数'));
    } else {
      callback()
    }
  },
  isIdCard: function (rule, value, callback) {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (value && reg.test(value) === false) {
      callback(new Error('Please enter 正确的身份证'));
    } else {
      callback()
    }
  },
  isIdCardNotNull: function (rule, value, callback) {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (value && reg.test(value) === false) {
      callback(new Error('Please enter 正确的身份证'));
    } else if(!value) {
      callback(new Error('Please enter 身份证'));
    } else {
      callback()
    }
  }
}
