/**
 * CPF验证器
 * 验证巴西个人税号的有效性
 */

// 确保validators命名空间存在
window.validators = window.validators || {};

/**
 * 验证CPF号码是否有效
 * @param {string} cpf - 要验证的CPF号码
 * @returns {boolean} 是否有效
 */
window.validators.validateCPF = function(cpf) {
  // 清理输入，只保留数字
  cpf = window.utils.cleanDocumentNumber(cpf);
  
  // 基本验证
  if (!cpf || cpf.length !== 11 || window.utils.hasOnlyRepeatedChars(cpf)) {
    return false;
  }
  
  // 获取前9位数字和两个校验位
  const digits = cpf.substring(0, 9);
  const digit1 = parseInt(cpf.charAt(9), 10);
  const digit2 = parseInt(cpf.charAt(10), 10);
  
  // 计算第一个校验位
  const calculatedDigit1 = calculateCPFCheckDigit(digits);
  
  // 如果第一个校验位不匹配，CPF无效
  if (calculatedDigit1 !== digit1) {
    return false;
  }
  
  // 计算第二个校验位
  const calculatedDigit2 = calculateCPFCheckDigit(digits + calculatedDigit1);
  
  // 返回第二个校验位是否匹配
  return calculatedDigit2 === digit2;
};

/**
 * 计算CPF校验位
 * @param {string} digits - 数字字符串
 * @returns {number} 校验位
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
  return remainder < 2 ? 0 : 11 - remainder;
}
