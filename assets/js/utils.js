/**
 * 工具函数
 * 提供各种辅助功能
 */

// 工具函数命名空间
window.utils = {
  /**
   * 生成指定范围内的随机整数
   * @param {number} min - 最小值（包含）
   * @param {number} max - 最大值（包含）
   * @returns {number} 随机整数
   */
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  /**
   * 生成指定长度的随机数字字符串
   * @param {number} length - 字符串长度
   * @returns {string} 随机数字字符串
   */
  generateRandomDigits(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += this.getRandomInt(0, 9).toString();
    }
    return result;
  },
  
  /**
   * 计算校验位
   * 用于CPF、CNPJ等文档的校验位计算
   * @param {string} digits - 数字字符串
   * @param {number[]} weights - 权重数组
   * @returns {number} 校验位
   */
  calculateCheckDigit(digits, weights) {
    let sum = 0;
    
    for (let i = 0; i < digits.length; i++) {
      sum += parseInt(digits.charAt(i), 10) * weights[i];
    }
    
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  },
  
  /**
   * 格式化CPF号码
   * 格式: XXX.XXX.XXX-XX
   * @param {string} cpf - 未格式化的CPF
   * @returns {string} 格式化的CPF
   */
  formatCPF(cpf) {
    if (!cpf || cpf.length !== 11) {
      return cpf;
    }
    
    return `${cpf.substr(0, 3)}.${cpf.substr(3, 3)}.${cpf.substr(6, 3)}-${cpf.substr(9, 2)}`;
  },
  
  /**
   * 格式化CNPJ号码
   * 格式: XX.XXX.XXX/XXXX-XX
   * @param {string} cnpj - 未格式化的CNPJ
   * @returns {string} 格式化的CNPJ
   */
  formatCNPJ(cnpj) {
    if (!cnpj || cnpj.length !== 14) {
      return cnpj;
    }
    
    return `${cnpj.substr(0, 2)}.${cnpj.substr(2, 3)}.${cnpj.substr(5, 3)}/${cnpj.substr(8, 4)}-${cnpj.substr(12, 2)}`;
  },
  
  /**
   * 格式化RG号码
   * 格式: XX.XXX.XXX-X
   * @param {string} rg - 未格式化的RG
   * @returns {string} 格式化的RG
   */
  formatRG(rg) {
    if (!rg || rg.length !== 9) {
      return rg;
    }
    
    return `${rg.substr(0, 2)}.${rg.substr(2, 3)}.${rg.substr(5, 3)}-${rg.substr(8, 1)}`;
  },
  
  /**
   * 格式化PIS/PASEP号码
   * 格式: XXX.XXXXX.XX-X
   * @param {string} pis - 未格式化的PIS/PASEP
   * @returns {string} 格式化的PIS/PASEP
   */
  formatPIS(pis) {
    if (!pis || pis.length !== 11) {
      return pis;
    }
    
    return `${pis.substr(0, 3)}.${pis.substr(3, 5)}.${pis.substr(8, 2)}-${pis.substr(10, 1)}`;
  },
  
  /**
   * 格式化CNH号码
   * 格式: XXXXXXXXXXX (无格式)
   * @param {string} cnh - 未格式化的CNH
   * @returns {string} 格式化的CNH
   */
  formatCNH(cnh) {
    // CNH通常不使用特殊格式，但为了一致性保留此函数
    return cnh;
  },
  
  /**
   * 格式化Título de Eleitor号码
   * 格式: XXXX.XXXX.XXXX
   * @param {string} titulo - 未格式化的Título de Eleitor
   * @returns {string} 格式化的Título de Eleitor
   */
  formatTitulo(titulo) {
    if (!titulo || titulo.length !== 12) return titulo;
    
    // Formato: XXXX.XXXX.XXXX
    return `${titulo.substring(0, 4)}.${titulo.substring(4, 8)}.${titulo.substring(8, 12)}`;
  },
  
  /**
   * 格式化Certidão de Nascimento号码
   * 格式: XXXXXXXXXX-XX
   * @param {string} certidao - 未格式化的Certidão de Nascimento
   * @returns {string} 格式化的Certidão de Nascimento
   */
  formatCertidao(certidao) {
    if (!certidao || certidao.length !== 12) return certidao;
    
    // Formato: XXXXXXXXXX-XX
    return `${certidao.substring(0, 10)}-${certidao.substring(10, 12)}`;
  },
  
  /**
   * 格式化Cartão de Crédito号码
   * 格式: XXXX XXXX XXXX XXXX
   * @param {string} cardNumber - 未格式化的Cartão de Crédito
   * @param {string} cardType - 卡类型 (visa, mastercard, amex, etc.)
   * @returns {string} 格式化的Cartão de Crédito
   */
  formatCartao(cardNumber, cardType) {
    if (!cardNumber) return cardNumber;
    
    // American Express tem formato diferente: XXXX XXXXXX XXXXX
    if (cardType === 'amex') {
      return `${cardNumber.substring(0, 4)} ${cardNumber.substring(4, 10)} ${cardNumber.substring(10)}`;
    }
    
    // Outros cartões: XXXX XXXX XXXX XXXX
    let formatted = '';
    for (let i = 0; i < cardNumber.length; i += 4) {
      formatted += cardNumber.substring(i, i + 4) + ' ';
    }
    return formatted.trim();
  },
  
  /**
   * 格式化RENAVAM号码
   * 格式: XXXXX-XXXXXX
   * @param {string} renavam - 未格式化的RENAVAM
   * @returns {string} 格式化的RENAVAM
   */
  formatRenavam(renavam) {
    if (!renavam || renavam.length !== 11) return renavam;
    
    // Formato: XXXXX-XXXXXX
    return `${renavam.substring(0, 5)}-${renavam.substring(5)}`;
  },
  
  /**
   * 移除文档号码中的非数字字符
   * @param {string} document - 文档号码
   * @returns {string} 只包含数字的文档号码
   */
  cleanDocumentNumber(document) {
    return document.replace(/\D/g, '');
  },
  
  /**
   * 检查字符串是否只包含相同的字符
   * 用于验证文档号码
   * @param {string} str - 要检查的字符串
   * @returns {boolean} 是否只包含相同的字符
   */
  hasOnlyRepeatedChars(str) {
    return /^(.)\1+$/.test(str);
  },
  
  /**
   * 分享到社交媒体
   * @param {string} platform - 社交媒体平台
   * @param {string} text - 要分享的文本
   * @param {string} url - 要分享的URL
   */
  shareToSocial(platform, text, url) {
    let shareUrl = '';
    
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        console.error('Unsupported social media platform');
        return;
    }
    
    // 打开分享窗口
    window.open(shareUrl, '_blank', 'width=600,height=400');
  },
  
  /**
   * 导出数据为CSV文件
   * @param {string[]} data - 要导出的数据数组
   * @param {string} filename - 文件名
   */
  exportToCSV(data, filename) {
    const csvContent = 'data:text/csv;charset=utf-8,' + data.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
