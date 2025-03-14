/**
 * CNPJ验证器
 * 验证巴西公司税号的有效性
 */

// 确保validators命名空间存在
window.validators = window.validators || {};

/**
 * 验证CNPJ号码是否有效
 * @param {string} cnpj - 要验证的CNPJ号码
 * @returns {boolean} 是否有效
 */
window.validators.validateCNPJ = function(cnpj) {
  // 清理输入，只保留数字
  cnpj = window.utils.cleanDocumentNumber(cnpj);
  
  // 基本验证
  if (!cnpj || cnpj.length !== 14 || window.utils.hasOnlyRepeatedChars(cnpj)) {
    return false;
  }
  
  // 获取前12位数字和两个校验位
  const digits = cnpj.substring(0, 12);
  const digit1 = parseInt(cnpj.charAt(12), 10);
  const digit2 = parseInt(cnpj.charAt(13), 10);
  
  // 计算第一个校验位
  const calculatedDigit1 = calculateCNPJCheckDigit(digits);
  
  // 如果第一个校验位不匹配，CNPJ无效
  if (calculatedDigit1 !== digit1) {
    return false;
  }
  
  // 计算第二个校验位
  const calculatedDigit2 = calculateCNPJCheckDigit(digits + calculatedDigit1);
  
  // 返回第二个校验位是否匹配
  return calculatedDigit2 === digit2;
};

/**
 * 计算CNPJ校验位
 * @param {string} digits - 数字字符串
 * @returns {number} 校验位
 */
function calculateCNPJCheckDigit(digits) {
  let sum = 0;
  let weight = 2;
  
  // 从右向左计算加权和
  for (let i = digits.length - 1; i >= 0; i--) {
    sum += parseInt(digits.charAt(i), 10) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }
  
  // 计算校验位
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}
