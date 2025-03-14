/**
 * RG生成器
 * RG是巴西的身份证号码，通常由9位数字组成
 */

// 确保generators命名空间存在
window.generators = window.generators || {};

/**
 * 生成有效的RG号码
 * @param {boolean} formatted - 是否返回格式化的RG
 * @returns {string} RG号码
 */
window.generators.generateRG = function(formatted = false) {
  // 生成前8位随机数字
  const baseDigits = window.utils.generateRandomDigits(8);
  
  // 计算校验位
  const checkDigit = calculateRGCheckDigit(baseDigits);
  
  // 完整的RG
  const rg = baseDigits + checkDigit;
  
  // 根据需要返回格式化或未格式化的RG
  return formatted ? window.utils.formatRG(rg) : rg;
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
