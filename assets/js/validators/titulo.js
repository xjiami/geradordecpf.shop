/**
 * Título de Eleitor验证器
 * 验证巴西选民证号码的有效性
 */

// 确保validators命名空间存在
window.validators = window.validators || {};

/**
 * 验证Título de Eleitor号码是否有效
 * @param {string} titulo - 要验证的Título de Eleitor号码
 * @returns {boolean} 是否有效
 */
window.validators.validateTitulo = function(titulo) {
  // 清理输入，只保留数字
  titulo = window.utils.cleanDocumentNumber(titulo);
  
  // 基本验证
  if (!titulo || titulo.length !== 12) {
    return false;
  }
  
  // 获取基础数字、州代码和校验位
  const baseDigits = titulo.substring(0, 8);
  const stateCode = titulo.substring(8, 10);
  const digit1 = parseInt(titulo.charAt(10), 10);
  const digit2 = parseInt(titulo.charAt(11), 10);
  
  // 验证州代码（01-28）
  const stateCodeNum = parseInt(stateCode, 10);
  if (stateCodeNum < 1 || stateCodeNum > 28) {
    return false;
  }
  
  // 计算第一个校验位
  const calculatedDigit1 = calculateTituloFirstCheckDigit(baseDigits + stateCode);
  
  // 如果第一个校验位不匹配，Título无效
  if (calculatedDigit1 !== digit1) {
    return false;
  }
  
  // 计算第二个校验位
  const calculatedDigit2 = calculateTituloSecondCheckDigit(stateCode, calculatedDigit1);
  
  // 返回第二个校验位是否匹配
  return calculatedDigit2 === digit2;
};

/**
 * 计算Título de Eleitor第一个校验位
 * @param {string} digits - 数字字符串
 * @returns {number} 第一个校验位
 */
function calculateTituloFirstCheckDigit(digits) {
  let sum = 0;
  
  // 计算前8位的加权和
  for (let i = 0; i < 8; i++) {
    sum += parseInt(digits.charAt(i), 10) * (i + 2);
  }
  
  // 计算州代码的加权和
  const stateCode = digits.substring(8, 10);
  sum += parseInt(stateCode.charAt(0), 10) * 9 + parseInt(stateCode.charAt(1), 10) * 10;
  
  // 计算校验位
  let remainder = sum % 11;
  if (remainder === 10) {
    remainder = 0;
  }
  
  return remainder;
}

/**
 * 计算Título de Eleitor第二个校验位
 * @param {string} stateCode - 州代码
 * @param {number} firstCheckDigit - 第一个校验位
 * @returns {number} 第二个校验位
 */
function calculateTituloSecondCheckDigit(stateCode, firstCheckDigit) {
  let sum = parseInt(stateCode.charAt(0), 10) * 7 + parseInt(stateCode.charAt(1), 10) * 8;
  sum += firstCheckDigit * 9;
  
  // 计算校验位
  let remainder = sum % 11;
  if (remainder === 10) {
    remainder = 0;
  }
  
  return remainder;
}
