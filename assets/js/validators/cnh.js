/**
 * CNH验证器
 * 验证巴西驾驶执照号码的有效性
 */

// 确保validators命名空间存在
window.validators = window.validators || {};

/**
 * 验证CNH号码是否有效
 * @param {string} cnh - 要验证的CNH号码
 * @returns {boolean} 是否有效
 */
window.validators.validateCNH = function(cnh) {
  // 清理输入，只保留数字
  cnh = window.utils.cleanDocumentNumber(cnh);
  
  // 基本验证
  if (!cnh || cnh.length !== 11 || window.utils.hasOnlyRepeatedChars(cnh)) {
    return false;
  }
  
  // 获取前9位数字和两个校验位
  const digits = cnh.substring(0, 9);
  const digit1 = parseInt(cnh.charAt(9), 10);
  const digit2 = parseInt(cnh.charAt(10), 10);
  
  // 计算第一个校验位
  const calculatedDigit1 = calculateCNHFirstCheckDigit(digits);
  
  // 如果第一个校验位不匹配，CNH无效
  if (calculatedDigit1 !== digit1) {
    return false;
  }
  
  // 计算第二个校验位
  const calculatedDigit2 = calculateCNHSecondCheckDigit(digits, calculatedDigit1);
  
  // 返回第二个校验位是否匹配
  return calculatedDigit2 === digit2;
};

/**
 * 计算CNH第一个校验位
 * @param {string} digits - 数字字符串
 * @returns {number} 第一个校验位
 */
function calculateCNHFirstCheckDigit(digits) {
  let sum = 0;
  let factor = 9;
  
  // 计算加权和
  for (let i = 0; i < digits.length; i++) {
    sum += parseInt(digits.charAt(i), 10) * factor;
    factor--;
  }
  
  // 计算校验位
  let remainder = sum % 11;
  if (remainder === 10) {
    remainder = 0;
  }
  
  return remainder;
}

/**
 * 计算CNH第二个校验位
 * @param {string} digits - 原始数字字符串
 * @param {number} firstCheckDigit - 第一个校验位
 * @returns {number} 第二个校验位
 */
function calculateCNHSecondCheckDigit(digits, firstCheckDigit) {
  const dsc = firstCheckDigit;
  let sum = dsc * 2;
  let factor = 1;
  
  // 计算加权和
  for (let i = 0; i < digits.length; i++) {
    sum += parseInt(digits.charAt(i), 10) * factor;
    factor++;
  }
  
  // 计算校验位
  let remainder = sum % 11;
  if (remainder === 10) {
    remainder = 0;
  }
  
  return remainder;
}
