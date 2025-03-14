/**
 * RG验证器
 * 验证巴西身份证号码的有效性
 */

// 确保validators命名空间存在
window.validators = window.validators || {};

/**
 * 验证RG号码是否有效
 * @param {string} rg - 要验证的RG号码
 * @returns {boolean} 是否有效
 */
window.validators.validateRG = function(rg) {
  // 清理输入，只保留数字和X（可能的校验位）
  rg = rg.replace(/[^\dX]/gi, '');
  
  // 基本验证
  if (!rg || rg.length !== 9) {
    return false;
  }
  
  // 获取前8位数字和校验位
  const digits = rg.substring(0, 8);
  const providedCheckDigit = rg.charAt(8).toUpperCase();
  
  // 计算校验位
  const calculatedCheckDigit = calculateRGCheckDigit(digits);
  
  // 返回校验位是否匹配
  return calculatedCheckDigit === providedCheckDigit;
};

/**
 * 计算RG校验位
 * @param {string} digits - 数字字符串
 * @returns {string} 校验位
 */
function calculateRGCheckDigit(digits) {
  let sum = 0;
  
  // 计算加权和
  for (let i = 0; i < digits.length; i++) {
    sum += parseInt(digits.charAt(i), 10) * (i + 2);
  }
  
  // 计算校验位
  const remainder = sum % 11;
  const checkDigit = 11 - remainder;
  
  // 如果校验位是10，则用X表示，如果是11，则用0表示
  if (checkDigit === 10) {
    return 'X';
  } else if (checkDigit === 11) {
    return '0';
  } else {
    return checkDigit.toString();
  }
}
