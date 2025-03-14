/**
 * PIS/PASEP生成器
 * PIS/PASEP是巴西的社会保险号码，由11位数字组成
 */

// 确保generators命名空间存在
window.generators = window.generators || {};

/**
 * 生成有效的PIS/PASEP号码
 * @param {boolean} formatted - 是否返回格式化的PIS/PASEP
 * @returns {string} PIS/PASEP号码
 */
window.generators.generatePIS = function(formatted = false) {
  // 生成前10位随机数字
  const baseDigits = window.utils.generateRandomDigits(10);
  
  // 计算校验位
  const checkDigit = calculatePISCheckDigit(baseDigits);
  
  // 完整的PIS/PASEP
  const pis = baseDigits + checkDigit;
  
  // 根据需要返回格式化或未格式化的PIS/PASEP
  return formatted ? window.utils.formatPIS(pis) : pis;
};

/**
 * 计算PIS/PASEP校验位
 * @param {string} digits - 数字字符串
 * @returns {string} 校验位
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
  return (remainder < 2 ? 0 : 11 - remainder).toString();
}
