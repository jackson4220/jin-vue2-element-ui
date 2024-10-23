/**
 * @description 判读是否为外链
 * @param path
 * @returns {boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:|\/\/)/.test(path)
}

/**
 * @description 校验密码是否小于6位
 * @param value
 * @returns {boolean}
 */
export function isPassword(value) {
  return value.length >= 6
}

/**
 * @description 判断是否为数字
 * @param value
 * @returns {boolean}
 */
export function isNumber(value) {
  //   const reg = /^[0-9]*$/
  const reg = /^-?\d+(\.\d+)?$/ // 正负整数或者小数
  return reg.test(value)
}

/**
 * @description 校验数据基本类型并返回原始数据,支持数字、布尔、字符串
 * @param value
 * @param defaultV 默认值
 * @returns {object}
 */
export function getOriValue(value, defaultV = '') {
  if (value === null) return defaultV
  if (typeof value === 'object') {
    return value
  }
  if (typeof +value === 'bigint') {
    return value
  }

  const flag = value === 'true' || value === 'false'
  const res = isNumber(value) ? +value : flag ? value === 'true' : value

  if (res === undefined || res === '') {
    return defaultV
  }

  return res
}

/**
 * @description 判断是否是名称
 * @param value
 * @returns {boolean}
 */
export function isName(value) {
  const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
  return reg.test(value)
}

/**
 * @description 判断是否为IP
 * @param ip
 * @returns {boolean}
 */
export function isIP(ip) {
  const reg =
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip)
}

/**
 * @description 判断是否是传统网站
 * @param url
 * @returns {boolean}
 */
export function isUrl(url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @description 判断是否是小写字母
 * @param value
 * @returns {boolean}
 */
export function isLowerCase(value) {
  const reg = /^[a-z]+$/
  return reg.test(value)
}

/**
 * @description 判断是否是大写字母
 * @param value
 * @returns {boolean}
 */
export function isUpperCase(value) {
  const reg = /^[A-Z]+$/
  return reg.test(value)
}

/**
 * @description 判断是否是大写字母开头
 * @param value
 * @returns {boolean}
 */
export function isAlphabets(value) {
  const reg = /^[A-Za-z]+$/
  return reg.test(value)
}

/**
 * @description 判断是否是字符串
 * @param value
 * @returns {boolean}
 */
export function isString(value) {
  return typeof value === 'string' || value instanceof String
}

/**
 * @description 判断是否是数组
 * @param arg
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * @description 判断是否是端口号
 * @param value
 * @returns {boolean}
 */
export function isPort(value) {
  const reg =
    /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
  return reg.test(value)
}

/**
 * @description 判断是否是手机号
 * @param value
 * @returns {boolean}
 */
export function isPhone(value) {
  const reg = /^1\d{10}$/
  return reg.test(value)
}

/**
 * @description 判断是否是身份证号(第二代)
 * @param value
 * @returns {boolean}
 */
export function isIdCard(value) {
  const reg =
    /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return reg.test(value)
}

/**
 * @description 判断是否是邮箱
 * @param value
 * @returns {boolean}
 */
export function isEmail(value) {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  return reg.test(value)
}

/**
 * @description 判断是否中文
 * @param value
 * @returns {boolean}
 */
export function isChina(value) {
  const reg = /^[\u4E00-\u9FA5]{2,4}$/
  return reg.test(value)
}

/**
 * @description 判断是否为空
 * @param value
 * @returns {boolean}
 */
export function isBlank(value) {
  return (
    value === null ||
    false ||
    value === '' ||
    value.trim() === '' ||
    value.toLocaleLowerCase().trim() === 'null'
  )
}

/**
 * @description 判断是否为固话
 * @param value
 * @returns {boolean}
 */
export function isTel(value) {
  const reg =
    /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})([- ])?)?([0-9]{7,8})(([- 转])*([0-9]{1,4}))?$/
  return reg.test(value)
}

/**
 * @description 判断是否为数字且最多两位小数
 * @param value
 * @returns {boolean}
 */
export function isNum(value) {
  const reg = /^\d+(\.\d{1,2})?$/
  return reg.test(value)
}

/**
 * @description 判断是否为数字且最多两位小数，包含负数
 * @param value
 * @returns {boolean}
 */
export function isFloatNum(value) {
  const reg = /^[+-]?\d+(\.\d{1,2})?$/
  return reg.test(value)
}

/**
 * @description 判断是否为json
 * @param value
 * @returns {boolean}
 */
export function isJson(value) {
  if (typeof value === 'string') {
    const obj = JSON.parse(value)
    return !!(typeof obj === 'object' && obj)
  }
  return false
}

/**
 * 账号验证
 * @param rule
 * @param value
 * @param callback
 */
export const valiAccount = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入您的账号名!'))
  } else if (!/^[\w\\?@]{4,30}$/.test(value)) {
    callback(new Error('账号只能由4-30位数字或字母组成!'))
  } else {
    callback()
  }
}

/**
 * 密码验证
 * @param rule
 * @param value
 * @param callback
 */
export const valiPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入正确的密码!'))
  } else if (value.length < 12) {
    callback(new Error('密码长度不能小于8!'))
  } else if (value.length > 30) {
    callback(new Error('密码长度不能大于20!'))
  } else if (
    !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]([\w\\?@*!#$%+-]){12,30}$/.test(
      value
    )
  ) {
    callback(new Error('密码长度12-30位且必须包含字母和数字!'))
  } else {
    callback()
  }
}

/**
 * 验证内容  允许为空，空都由️required去验证
 * @param rule
 * @param value
 * @param callback
 */
export const valiContent = (rule, value, callback) => {
  if (value) {
    // eslint-disable-next-line
    if (!/^(?!\<|\>){2,200}/.test(value)) {
      callback(new Error('至少2个字符，并且不允许有特殊字符!'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

export const valiEnOrNum = (rule, value, callback) => {
  if (!/^[A-Za-z0-9]+$/.test(value)) {
    return callback(new Error('请输入英文或数字'))
  } else {
    callback()
  }
}

/**
 * 手机号验证
 * @param rule
 * @param value
 * @param callback
 */
export const valiPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入手机号码'))
  } else if (!/^1[3456789]\d{9}$/.test(value)) {
    callback(new Error('请正确的输入手机号码!'))
  } else {
    callback()
  }
}

/**
 * @description 价格校验
 * @param value
 * @returns {boolean}
 */
export const valiMoneyNoFloat = (rule, value, callback) => {
  if (!value) {
    if (value === 0) {
      return callback(new Error('不能为0'))
    } else {
      callback()
    }
  } else {
    if (!/^\d+(\.\d{1,2})?$/.test(value)) {
      return callback(new Error('请输入数字,小数最多保留两位!'))
    } else {
      callback()
    }
  }
}

/**
 * 验证人名、项目名， 允许为空，空都由️required去验证
 * @param rule
 * @param value
 * @param callback
 */
export const valiName = (rule, value, callback) => {
  if (value) {
    if (
      !/^[\u3400-\u4dbf\u4e00-\u9fa5\uFE30-\uFFA00-9a-zA-Z_\-\s]{1,80}$/.test(
        value
      )
    ) {
      callback(new Error('1-80个字符，并且不允许有特殊字符!'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

/**
 * 邮箱验证
 * @param rule
 * @param value
 * @param callback
 */
export const valiEmail = (rule, value, callback) => {
  if (
    // eslint-disable-next-line
    !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
  ) {
    callback(new Error('请正确的输入邮箱!'))
  } else {
    callback()
  }
}

/**
 * 不能是空并且一定是数字
 * @param rule
 * @param value
 * @param callback
 * @returns {*}
 */
export const valiNoEmptyNumber = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('不能为空'))
  } else {
    if (!/^(0|[1-9][0-9]*)$/.test(value)) {
      return callback(new Error('请输入数字'))
    } else {
      callback()
    }
  }
}

export const valiMoneyArea = (rule, value, callback) => {
  if (value === '') {
    return callback(new Error('不能为空'))
  } else {
    if (value <= 0) {
      return callback(new Error('面积大于等于0'))
    } else {
      if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        return callback(new Error('请输入正数,小数最多保留两位!'))
      } else {
        callback()
      }
    }
  }
}

// 验证-100-0-100之间的数  （小数最多保留多位）
export const valiNumberFloat = (rule, value, callback) => {
  if (value === '') {
    return callback(new Error('不能为空'))
  } else {
    if (value >= 100 || value <= -100) {
      return callback(new Error('请输入-100到100之间的数'))
    } else if (!/^\d+(\.\d{1,1000})?$/.test(Math.abs(value))) {
      return callback(new Error('请输入数字'))
    } else {
      callback()
    }
  }
}

export const valiMoneyNoEmpty = (rule, value, callback) => {
  if (value === '') {
    return callback(new Error('不能为空'))
  } else {
    if (value && value.toString().split('.')[0].length > 8) {
      return callback(new Error('金额正数部分最大限制8位数'))
    } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
      return callback(new Error('请输入正数,小数最多保留两位!'))
    } else {
      callback()
    }
  }
}

export const valiNumber = (rule, value, callback) => {
  if (value === '' || value === null) {
    callback()
  } else {
    if (!/^(0|[1-9][0-9]*)$/.test(value)) {
      return callback(new Error('请输入正整数'))
    } else {
      callback()
    }
  }
}
