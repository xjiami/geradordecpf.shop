/**
 * Validador de Cartão de Crédito
 * Valida números de cartão de crédito usando o algoritmo de Luhn
 */

(function() {
  'use strict';

  /**
   * Valida um número de cartão de crédito
   * 
   * @param {string} cardNumber - Número do cartão a ser validado
   * @return {boolean} true se o número for válido, false caso contrário
   */
  function validateCartao(cardNumber) {
    // Remove formatação
    cardNumber = window.utils.cleanDocumentNumber(cardNumber);
    
    // Verifica se tem pelo menos 13 dígitos e no máximo 19 dígitos
    if (!cardNumber || cardNumber.length < 13 || cardNumber.length > 19 || window.utils.hasOnlyRepeatedChars(cardNumber)) {
      return false;
    }
    
    // Valida usando o algoritmo de Luhn
    return validateLuhn(cardNumber);
  }

  /**
   * Valida um número usando o algoritmo de Luhn (Mod 10)
   * 
   * @param {string} digits - Dígitos a serem validados
   * @return {boolean} true se o número for válido, false caso contrário
   */
  function validateLuhn(digits) {
    let sum = 0;
    let alternate = false;
    
    // Percorre os dígitos da direita para a esquerda
    for (let i = digits.length - 1; i >= 0; i--) {
      let n = parseInt(digits.charAt(i), 10);
      
      if (alternate) {
        n *= 2;
        if (n > 9) {
          n = (n % 10) + 1;
        }
      }
      
      sum += n;
      alternate = !alternate;
    }
    
    // O número é válido se a soma for múltiplo de 10
    return (sum % 10 === 0);
  }

  // Expõe as funções para o escopo global
  window.validators = window.validators || {};
  window.validators.validateCartao = validateCartao;
  window.validators.validateLuhn = validateLuhn;
})();
