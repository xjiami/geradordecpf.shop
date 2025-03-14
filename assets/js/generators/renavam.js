/**
 * Gerador de RENAVAM
 * Gera números de RENAVAM (Registro Nacional de Veículos Automotores) válidos
 */

(function() {
  'use strict';

  /**
   * Gera um número de RENAVAM válido
   * 
   * @param {boolean} formatted - Se true, retorna o número formatado
   * @return {string} Número de RENAVAM
   */
  function generateRenavam(formatted = false) {
    // Gera 10 dígitos aleatórios para o número base
    const baseDigits = window.utils.generateRandomDigits(10);
    
    // Calcula o dígito verificador
    const checkDigit = calculateRenavamCheckDigit(baseDigits);
    
    // Monta o número completo
    const renavam = baseDigits + checkDigit;
    
    // Retorna formatado ou não conforme solicitado
    return formatted ? window.utils.formatRenavam(renavam) : renavam;
  }

  /**
   * Calcula o dígito verificador do RENAVAM
   * 
   * @param {string} digits - Os 10 dígitos base do RENAVAM
   * @return {string} Dígito verificador
   */
  function calculateRenavamCheckDigit(digits) {
    // Pesos para o cálculo do dígito verificador
    const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(digits.charAt(i), 10) * weights[i];
    }
    
    const remainder = sum % 11;
    let checkDigit = 11 - remainder;
    
    // Se o resultado for 10 ou 11, o dígito verificador é 0
    if (checkDigit >= 10) {
      checkDigit = 0;
    }
    
    return String(checkDigit);
  }

  // Expõe as funções para o escopo global
  window.generators = window.generators || {};
  window.generators.generateRenavam = generateRenavam;
  window.generators.calculateRenavamCheckDigit = calculateRenavamCheckDigit;
})();
