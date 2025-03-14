/**
 * Título de Eleitor生成器
 * Título de Eleitor是巴西的选民证号码，由12位数字组成
 */

// 确保generators命名空间存在
window.generators = window.generators || {};

/**
 * 生成有效的Título de Eleitor号码
 * @param {boolean} formatted - 是否返回格式化的Título de Eleitor
 * @returns {string} Título de Eleitor号码
 */
window.generators.generateTitulo = function(formatted = false) {
  // 生成8位基础数字
  const baseDigits = window.utils.generateRandomDigits(8);
  
  // 生成2位州代码（01-28）
  const stateCode = generateStateCode();
  
  // 计算校验位
  const checkDigits = calculateTituloCheckDigits(baseDigits + stateCode);
  
  // 完整的Título de Eleitor
  const titulo = baseDigits + stateCode + checkDigits;
  
  // 根据需要返回格式化或未格式化的Título de Eleitor
  return formatted ? window.utils.formatTitulo(titulo) : titulo;
};

/**
 * 生成有效的州代码
 * @returns {string} 州代码
 */
function generateStateCode() {
  // 巴西有效的州代码范围是01-28
  const stateNumber = window.utils.getRandomInt(1, 28);
  return stateNumber.toString().padStart(2, '0');
}

/**
 * 计算Título de Eleitor校验位
 * @param {string} digits - 数字字符串
 * @returns {string} 两位校验位
 */
function calculateTituloCheckDigits(digits) {
  // 计算第一个校验位（针对州代码）
  const firstCheckDigit = calculateTituloFirstCheckDigit(digits);
  
  // 计算第二个校验位（针对基础数字和第一个校验位）
  const secondCheckDigit = calculateTituloSecondCheckDigit(digits, firstCheckDigit);
  
  return firstCheckDigit + secondCheckDigit;
}

/**
 * 计算Título de Eleitor第一个校验位
 * @param {string} digits - 数字字符串
 * @returns {string} 第一个校验位
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
  
  return remainder.toString();
}

/**
 * 计算Título de Eleitor第二个校验位
 * @param {string} digits - 原始数字字符串
 * @param {string} firstCheckDigit - 第一个校验位
 * @returns {string} 第二个校验位
 */
function calculateTituloSecondCheckDigit(digits, firstCheckDigit) {
  const stateCode = digits.substring(8, 10);
  let sum = parseInt(stateCode.charAt(0), 10) * 7 + parseInt(stateCode.charAt(1), 10) * 8;
  sum += parseInt(firstCheckDigit, 10) * 9;
  
  // 计算校验位
  let remainder = sum % 11;
  if (remainder === 10) {
    remainder = 0;
  }
  
  return remainder.toString();
}
