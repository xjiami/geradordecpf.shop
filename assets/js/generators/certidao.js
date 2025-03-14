/**
 * Gerador de Certidão de Nascimento
 * Gera números de certidão de nascimento no formato brasileiro
 */

(function() {
  'use strict';

  /**
   * Gera um número de certidão de nascimento válido
   * Formato: XXXXXXXXXX-XX
   * 
   * @param {boolean} formatted - Se true, retorna o número formatado
   * @return {string} Número de certidão de nascimento
   */
  function generateCertidao(formatted = false) {
    // Gera 10 dígitos aleatórios para o número base
    const baseDigits = window.utils.generateRandomDigits(10);
    
    // Calcula os dígitos verificadores (2 dígitos)
    const checkDigits = calculateCertidaoCheckDigits(baseDigits);
    
    // Monta o número completo
    const certidao = baseDigits + checkDigits;
    
    // Retorna formatado ou não conforme solicitado
    return formatted ? window.utils.formatCertidao(certidao) : certidao;
  }

  /**
   * Calcula os dígitos verificadores da certidão de nascimento
   * 
   * @param {string} digits - Os 10 dígitos base da certidão
   * @return {string} Dígitos verificadores (2 dígitos)
   */
  function calculateCertidaoCheckDigits(digits) {
    // Primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(digits.charAt(i), 10) * (12 - i);
    }
    
    let firstCheckDigit = 11 - (sum % 11);
    if (firstCheckDigit > 9) firstCheckDigit = 0;
    
    // Segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(digits.charAt(i), 10) * (13 - i);
    }
    sum += firstCheckDigit * 2;
    
    let secondCheckDigit = 11 - (sum % 11);
    if (secondCheckDigit > 9) secondCheckDigit = 0;
    
    return String(firstCheckDigit) + String(secondCheckDigit);
  }

  // Expõe as funções para o escopo global
  window.generators = window.generators || {};
  window.generators.generateCertidao = generateCertidao;
  window.generators.calculateCertidaoCheckDigits = calculateCertidaoCheckDigits;
})();
