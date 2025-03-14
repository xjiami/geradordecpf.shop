/**
 * Validador de RENAVAM
 * Valida números de RENAVAM (Registro Nacional de Veículos Automotores)
 */

(function() {
  'use strict';

  /**
   * Valida um número de RENAVAM
   * 
   * @param {string} renavam - Número do RENAVAM a ser validado
   * @return {boolean} true se o número for válido, false caso contrário
   */
  function validateRenavam(renavam) {
    // Remove formatação
    renavam = window.utils.cleanDocumentNumber(renavam);
    
    // Verifica se tem 11 dígitos e não são todos iguais
    if (!renavam || renavam.length !== 11 || window.utils.hasOnlyRepeatedChars(renavam)) {
      return false;
    }
    
    // Separa os dígitos base e o dígito verificador
    const baseDigits = renavam.substring(0, 10);
    const providedCheckDigit = renavam.charAt(10);
    
    // Calcula o dígito verificador esperado
    const calculatedCheckDigit = window.generators.calculateRenavamCheckDigit(baseDigits);
    
    // Compara o dígito verificador
    return providedCheckDigit === calculatedCheckDigit;
  }

  // Expõe a função para o escopo global
  window.validators = window.validators || {};
  window.validators.validateRenavam = validateRenavam;
})();
