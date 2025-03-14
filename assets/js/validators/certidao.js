/**
 * Validador de Certidão de Nascimento
 * Valida números de certidão de nascimento no formato brasileiro
 */

(function() {
  'use strict';

  /**
   * Valida um número de certidão de nascimento
   * 
   * @param {string} certidao - Número da certidão a ser validado
   * @return {boolean} true se o número for válido, false caso contrário
   */
  function validateCertidao(certidao) {
    // Remove formatação
    certidao = window.utils.cleanDocumentNumber(certidao);
    
    // Verifica se tem 12 dígitos e não são todos iguais
    if (!certidao || certidao.length !== 12 || window.utils.hasOnlyRepeatedChars(certidao)) {
      return false;
    }
    
    // Separa os dígitos base e os dígitos verificadores
    const baseDigits = certidao.substring(0, 10);
    const providedCheckDigits = certidao.substring(10, 12);
    
    // Calcula os dígitos verificadores esperados
    const calculatedCheckDigits = window.generators.calculateCertidaoCheckDigits(baseDigits);
    
    // Compara os dígitos verificadores
    return providedCheckDigits === calculatedCheckDigits;
  }

  // Expõe a função para o escopo global
  window.validators = window.validators || {};
  window.validators.validateCertidao = validateCertidao;
})();
