/**
 * Gerador de Cartão de Crédito
 * Gera números de cartão de crédito válidos usando o algoritmo de Luhn
 */

(function() {
  'use strict';

  // Prefixos comuns de cartões de crédito
  const CARD_PREFIXES = {
    visa: ['4'],
    mastercard: ['51', '52', '53', '54', '55'],
    amex: ['34', '37'],
    elo: ['401178', '401179', '431274', '438935', '451416', '457393', '457631', '457632', '504175', '627780', '636297', '636368'],
    hipercard: ['606282'],
    generic: ['']
  };

  // Comprimentos de cartões de crédito por bandeira
  const CARD_LENGTHS = {
    visa: 16,
    mastercard: 16,
    amex: 15,
    elo: 16,
    hipercard: 16,
    generic: 16
  };

  /**
   * Gera um número de cartão de crédito válido
   * 
   * @param {string} cardType - Tipo de cartão (visa, mastercard, amex, elo, hipercard, generic)
   * @param {boolean} formatted - Se true, retorna o número formatado
   * @return {object} Objeto com número do cartão, data de validade e CVV
   */
  function generateCartao(cardType = 'generic', formatted = false) {
    // Se o tipo de cartão não for válido, usa o genérico
    if (!CARD_PREFIXES[cardType]) {
      cardType = 'generic';
    }
    
    // Seleciona um prefixo aleatório para o tipo de cartão
    const prefixes = CARD_PREFIXES[cardType];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    
    // Determina o comprimento do cartão
    const length = CARD_LENGTHS[cardType];
    
    // Gera os dígitos aleatórios para completar o cartão
    let cardNumber = prefix;
    const randomDigitsLength = length - prefix.length - 1; // -1 para o dígito verificador
    
    cardNumber += window.utils.generateRandomDigits(randomDigitsLength);
    
    // Calcula o dígito verificador usando o algoritmo de Luhn
    const checkDigit = calculateLuhnCheckDigit(cardNumber);
    
    // Adiciona o dígito verificador ao número do cartão
    cardNumber += checkDigit;
    
    // Gera data de validade (MM/AA)
    const expiryDate = generateExpiryDate();
    
    // Gera CVV (3 dígitos, 4 para AMEX)
    const cvv = generateCVV(cardType);
    
    // Retorna objeto com todas as informações
    return {
      number: formatted ? window.utils.formatCartao(cardNumber, cardType) : cardNumber,
      expiryDate: expiryDate,
      cvv: cvv,
      type: cardType
    };
  }

  /**
   * Gera uma data de validade aleatória para cartão de crédito
   * Entre o mês atual e 5 anos no futuro
   * 
   * @return {string} Data de validade no formato MM/AA
   */
  function generateExpiryDate() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() retorna 0-11
    const currentYear = currentDate.getFullYear();
    
    // Gera um ano aleatório entre o atual e 5 anos à frente
    const yearOffset = Math.floor(Math.random() * 5); // 0 a 4 anos
    const year = currentYear + yearOffset;
    
    // Se for o ano atual, o mês deve ser maior ou igual ao atual
    let month;
    if (year === currentYear) {
      month = currentMonth + Math.floor(Math.random() * (12 - currentMonth + 1));
    } else {
      month = 1 + Math.floor(Math.random() * 12); // 1-12
    }
    
    // Formata o mês e o ano
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedYear = (year % 100).toString().padStart(2, '0');
    
    return `${formattedMonth}/${formattedYear}`;
  }

  /**
   * Gera um código de segurança (CVV) para cartão de crédito
   * 
   * @param {string} cardType - Tipo de cartão
   * @return {string} Código CVV (3 dígitos, 4 para AMEX)
   */
  function generateCVV(cardType) {
    // AMEX usa CVV de 4 dígitos, outros cartões usam 3 dígitos
    const cvvLength = cardType === 'amex' ? 4 : 3;
    return window.utils.generateRandomDigits(cvvLength);
  }

  /**
   * Calcula o dígito verificador usando o algoritmo de Luhn
   * 
   * @param {string} digits - Os dígitos do cartão sem o dígito verificador
   * @return {string} Dígito verificador
   */
  function calculateLuhnCheckDigit(digits) {
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
    
    // Calcula o dígito verificador
    const checkDigit = (10 - (sum % 10)) % 10;
    
    return String(checkDigit);
  }

  /**
   * Identifica a bandeira do cartão com base no número
   * 
   * @param {string} cardNumber - Número do cartão
   * @return {string} Bandeira do cartão (visa, mastercard, amex, elo, hipercard, desconhecido)
   */
  function identifyCardType(cardNumber) {
    // Remove espaços e traços
    cardNumber = cardNumber.replace(/[\s-]/g, '');
    
    // Verifica cada bandeira
    if (/^4/.test(cardNumber)) return 'visa';
    if (/^(5[1-5])/.test(cardNumber)) return 'mastercard';
    if (/^(34|37)/.test(cardNumber)) return 'amex';
    if (/^(401178|401179|431274|438935|451416|457393|457631|457632|504175|627780|636297|636368)/.test(cardNumber)) return 'elo';
    if (/^606282/.test(cardNumber)) return 'hipercard';
    
    return 'desconhecido';
  }

  // Expõe as funções para o escopo global
  window.generators = window.generators || {};
  window.generators.generateCartao = generateCartao;
  window.generators.calculateLuhnCheckDigit = calculateLuhnCheckDigit;
  window.generators.identifyCardType = identifyCardType;
  window.generators.generateExpiryDate = generateExpiryDate;
  window.generators.generateCVV = generateCVV;
})();
