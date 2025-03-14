/**
 * CNPJ生成器
 * CNPJ是巴西的公司税号，由14位数字组成
 */

// 确保generators命名空间存在
window.generators = window.generators || {};

/**
 * 生成有效的CNPJ号码
 * @param {boolean} formatted - 是否返回格式化的CNPJ
 * @returns {string} CNPJ号码
 */
window.generators.generateCNPJ = function(formatted = false) {
  // 生成前12位随机数字
  const baseDigits = window.utils.generateRandomDigits(8) + '0001'; // 后四位通常是0001表示总部
  
  // 计算第一个校验位
  const firstCheckDigit = calculateCNPJCheckDigit(baseDigits);
  
  // 计算第二个校验位
  const secondCheckDigit = calculateCNPJCheckDigit(baseDigits + firstCheckDigit);
  
  // 完整的CNPJ
  const cnpj = baseDigits + firstCheckDigit + secondCheckDigit;
  
  // 根据需要返回格式化或未格式化的CNPJ
  return formatted ? window.utils.formatCNPJ(cnpj) : cnpj;
};

/**
 * 计算CNPJ校验位
 * @param {string} digits - 数字字符串
 * @returns {string} 校验位
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
  return (remainder < 2 ? 0 : 11 - remainder).toString();
}
