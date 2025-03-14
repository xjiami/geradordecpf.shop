/**
 * CNH生成器
 * CNH是巴西的驾驶执照号码，由11位数字组成
 */

// 确保generators命名空间存在
window.generators = window.generators || {};

/**
 * 生成有效的CNH号码
 * @param {boolean} formatted - 是否返回格式化的CNH
 * @returns {string} CNH号码
 */
window.generators.generateCNH = function(formatted = false) {
  // 生成前9位随机数字
  const baseDigits = window.utils.generateRandomDigits(9);
  
  // 计算第一个校验位
  const firstCheckDigit = calculateCNHFirstCheckDigit(baseDigits);
  
  // 计算第二个校验位
  const secondCheckDigit = calculateCNHSecondCheckDigit(baseDigits, firstCheckDigit);
  
  // 完整的CNH
  const cnh = baseDigits + firstCheckDigit + secondCheckDigit;
  
  // 根据需要返回格式化或未格式化的CNH
  return formatted ? window.utils.formatCNH(cnh) : cnh;
};

/**
 * 计算CNH第一个校验位
 * @param {string} digits - 数字字符串
 * @returns {string} 第一个校验位
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
  
  return remainder.toString();
}

/**
 * 计算CNH第二个校验位
 * @param {string} digits - 原始数字字符串
 * @param {string} firstCheckDigit - 第一个校验位
 * @returns {string} 第二个校验位
 */
function calculateCNHSecondCheckDigit(digits, firstCheckDigit) {
  const dsc = parseInt(firstCheckDigit, 10);
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
  
  return remainder.toString();
}
