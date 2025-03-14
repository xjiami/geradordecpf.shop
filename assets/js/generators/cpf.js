/**
 * CPF生成器
 * CPF是巴西的个人税号，由11位数字组成
 */

// 确保generators命名空间存在
window.generators = window.generators || {};

/**
 * 生成有效的CPF号码
 * @param {boolean} formatted - 是否返回格式化的CPF
 * @returns {string} CPF号码
 */
window.generators.generateCPF = function(formatted = false) {
  // 生成前9位随机数字
  const baseDigits = window.utils.generateRandomDigits(9);
  
  // 计算第一个校验位
  const firstCheckDigit = calculateCPFCheckDigit(baseDigits);
  
  // 计算第二个校验位
  const secondCheckDigit = calculateCPFCheckDigit(baseDigits + firstCheckDigit);
  
  // 完整的CPF
  const cpf = baseDigits + firstCheckDigit + secondCheckDigit;
  
  // 根据需要返回格式化或未格式化的CPF
  return formatted ? window.utils.formatCPF(cpf) : cpf;
};

/**
 * 计算CPF校验位
 * @param {string} digits - 数字字符串
 * @returns {string} 校验位
 */
function calculateCPFCheckDigit(digits) {
  let sum = 0;
  let weight = digits.length + 1;
  
  // 计算加权和
  for (let i = 0; i < digits.length; i++) {
    sum += parseInt(digits.charAt(i), 10) * weight;
    weight--;
  }
  
  // 计算校验位
  const remainder = sum % 11;
  return (remainder < 2 ? 0 : 11 - remainder).toString();
}
