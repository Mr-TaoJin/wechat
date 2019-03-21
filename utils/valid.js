export default {
  check_required(input) //验证是否必填
  {
    if (typeof input == 'undefined' || input == undefined || input == '' || input == null) {
      return false;
    }
    else {
      return true;
    }
  },
  check_mobile(input) //验证手机号码
  {
    if ((/^(1(([35][0-9])|(47)|[8][0-9]|[7][0-9]))\d{8}$/.test(input))) {
      return true;
    } else {
      return false;
    }
  },
  check_email(input) //验证邮箱
  {
    if ((/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(input))) {
      return true;
    } else {
      return false;
    }
  },
  //验证系统、短信验证码验证
  system_verify: function (input) {
    if (input.length != 4) {
      return false;
    } else {
      return true;
    }
  },
  //验证字母加数据
  check_text: function (input) {
    if (/^(?=.*[a-z])[a-z0-9]+/ig.test(input)) {
      return true;
    } else {
      return false;
    }
  },
  //包含0的正数
  check_zero_positive: function (input) {
    if ((/^[0-9]+.?[0-9]*$/.test(input)) && input >= 0) {
      return true;
    } else {
      return false;
    }
  },
  //判断字符串是否为url
  check_url: function (str_url) {
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
      + "?(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?" //ftp的user@      
      + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184      
      + "|" // 允许IP和DOMAIN（域名）      
      + "([0-9a-zA-Z_!~*'()-]+\.)*" // 域名- www.      
      + "([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z]\." // 二级域名      
      + "[a-zA-Z]{2,6})" // first level domain- .com or .museum      
      + "(:[0-9]{1,4})?" // 端口- :80      
      + "((/?)|"
      + "(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re = new RegExp(strRegex);
    return re.test(str_url);
  },

}