/**
 * PIS/PASEP验证器
 * 验证巴西社会保险号码的有效性
 */

// 确保validators命名空间存在
window.validators = window.validators || {};

/**
 * 验证PIS/PASEP号码是否有效
 * @param {string} pis - 要验证的PIS/PASEP号码
 * @returns {boolean} 是否有效
 */
window.validators.validatePIS = function(pis) {
  // 清理输入，只保留数字
  pis = window.utils.cleanDocumentNumber(pis);
  
  // 基本验证
  if (!pis || pis.length !== 11 || window.utils.hasOnlyRepeatedChars(pis)) {
    return false;
  }
  
  // 获取前10位数字和校验位
  const digits = pis.substring(0, 10);
  const digit = parseInt(pis.charAt(10), 10);
  
  // 计算校验位
  const calculatedDigit = calculatePISCheckDigit(digits);
  
  // 返回校验位是否匹配
  return calculatedDigit === digit;
};

/**
 * 计算PIS/PASEP校验位
 * @param {string} digits - 数字字符串
 * @returns {number} 校验位
 */
function calculatePISCheckDigit(digits) {
  // PIS/PASEP的权重
  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  
  let sum = 0;
  
  // 计算加权和
  for (let i = 0; i < digits.length; i++) {
    sum += parseInt(digits.charAt(i), 10) * weights[i];
  }
  
  // 计算校验位
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}
