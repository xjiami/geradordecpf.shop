/**
 * 主应用逻辑
 * 负责初始化应用、处理UI交互和调用生成器/验证器模块
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
  // 初始化应用
  initApp();
});

/**
 * 初始化应用
 */
function initApp() {
  // 初始化主题（从localStorage读取或默认为亮色）
  initTheme();
  
  // 初始化标签页
  initTabs();
  
  // 初始化生成器按钮
  initGeneratorButtons();
  
  // 初始化复制按钮
  initCopyButtons();
  
  // 初始化社交媒体分享按钮
  initSocialShareButtons();
  
  // 初始化导出功能
  initExportButtons();
  
  // 初始化验证功能
  initValidators();
}

/**
 * 初始化主题
 */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme') || 'light';
  
  // 应用存储的主题
  document.documentElement.setAttribute('data-theme', storedTheme);
  
  // 主题切换事件
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      // 更新主题
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // 更新图标
      const iconElement = themeToggle.querySelector('i');
      if (iconElement) {
        iconElement.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
    });
    
    // 初始化图标状态
    const iconElement = themeToggle.querySelector('i');
    if (iconElement) {
      iconElement.className = storedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
}

/**
 * 初始化标签页功能
 */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 移除所有活动状态
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // 添加当前活动状态
      button.classList.add('active');
      const targetId = button.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/**
 * 初始化生成器按钮
 */
function initGeneratorButtons() {
  // CPF生成器
  const generateCpfBtn = document.getElementById('generate-cpf');
  if (generateCpfBtn) {
    generateCpfBtn.addEventListener('click', () => {
      const resultElement = document.getElementById('cpf-result');
      const formatted = document.getElementById('cpf-formatted').checked;
      
      try {
        const cpf = window.generators.generateCPF(formatted);
        if (resultElement) {
          resultElement.textContent = cpf;
        }
      } catch (error) {
        console.error('Error generating CPF:', error);
        if (resultElement) {
          resultElement.textContent = 'Erro ao gerar CPF';
        }
      }
    });
  }
  
  // CNPJ生成器
  const generateCnpjBtn = document.getElementById('generate-cnpj');
  if (generateCnpjBtn) {
    generateCnpjBtn.addEventListener('click', () => {
      const resultElement = document.getElementById('cnpj-result');
      const formatted = document.getElementById('cnpj-formatted').checked;
      
      try {
        const cnpj = window.generators.generateCNPJ(formatted);
        if (resultElement) {
          resultElement.textContent = cnpj;
        }
      } catch (error) {
        console.error('Error generating CNPJ:', error);
        if (resultElement) {
          resultElement.textContent = 'Erro ao gerar CNPJ';
        }
      }
    });
  }
  
  // RG生成器
  const generateRgBtn = document.getElementById('generate-rg');
  if (generateRgBtn) {
    generateRgBtn.addEventListener('click', () => {
      const resultElement = document.getElementById('rg-result');
      const formatted = document.getElementById('rg-formatted').checked;
      
      try {
        const rg = window.generators.generateRG(formatted);
        if (resultElement) {
          resultElement.textContent = rg;
        }
      } catch (error) {
        console.error('Error generating RG:', error);
        if (resultElement) {
          resultElement.textContent = 'Erro ao gerar RG';
        }
      }
    });
  }
  
  // PIS/PASEP生成器
  const generatePisBtn = document.getElementById('generate-pis');
  if (generatePisBtn) {
    generatePisBtn.addEventListener('click', () => {
      const resultElement = document.getElementById('pis-result');
      const formatted = document.getElementById('pis-formatted').checked;
      
      try {
        const pis = window.generators.generatePIS(formatted);
        if (resultElement) {
          resultElement.textContent = pis;
        }
      } catch (error) {
        console.error('Error generating PIS/PASEP:', error);
        if (resultElement) {
          resultElement.textContent = 'Erro ao gerar PIS/PASEP';
        }
      }
    });
  }
  
  // CNH生成器
  const generateCnhBtn = document.getElementById('generate-cnh');
  if (generateCnhBtn) {
    generateCnhBtn.addEventListener('click', () => {
      const resultElement = document.getElementById('cnh-result');
      const formatted = document.getElementById('cnh-formatted').checked;
      
      try {
        const cnh = window.generators.generateCNH(formatted);
        if (resultElement) {
          resultElement.textContent = cnh;
        }
      } catch (error) {
        console.error('Error generating CNH:', error);
        if (resultElement) {
          resultElement.textContent = 'Erro ao gerar CNH';
        }
      }
    });
  }
  
  // Título de Eleitor生成器
  const generateTituloBtn = document.getElementById('generate-titulo');
  if (generateTituloBtn) {
    generateTituloBtn.addEventListener('click', () => {
      const resultElement = document.getElementById('titulo-result');
      const formatted = document.getElementById('titulo-formatted').checked;
      
      try {
        const titulo = window.generators.generateTitulo(formatted);
        if (resultElement) {
          resultElement.textContent = titulo;
        }
      } catch (error) {
        console.error('Error generating Título de Eleitor:', error);
        if (resultElement) {
          resultElement.textContent = 'Erro ao gerar Título de Eleitor';
        }
      }
    });
  }
  
  // Certidão de Nascimento生成器
  const generateCertidaoBtn = document.getElementById('generate-certidao');
  if (generateCertidaoBtn) {
    generateCertidaoBtn.addEventListener('click', () => {
      const resultElement = document.getElementById('certidao-result');
      const formatted = document.getElementById('certidao-formatted').checked;
      
      try {
        const certidao = window.generators.generateCertidao(formatted);
        if (resultElement) {
          resultElement.textContent = certidao;
        }
      } catch (error) {
        console.error('Error generating Certidão de Nascimento:', error);
        if (resultElement) {
          resultElement.textContent = 'Erro ao gerar Certidão de Nascimento';
        }
      }
    });
  }
  
  // Cartão de Crédito生成器
  const generateCartaoBtn = document.getElementById('generate-cartao');
  if (generateCartaoBtn) {
    generateCartaoBtn.addEventListener('click', () => {
      const resultElement = document.getElementById('cartao-result');
      const expiryElement = document.getElementById('cartao-expiry');
      const cvvElement = document.getElementById('cartao-cvv');
      const detailsElement = document.getElementById('cartao-details');
      const copyAllBtn = document.getElementById('copy-cartao-all');
      const formatted = document.getElementById('cartao-formatted').checked;
      const cardType = document.getElementById('cartao-type').value;
      
      try {
        // Gera os dados do cartão (agora retorna um objeto com número, data e CVV)
        const cartaoData = window.generators.generateCartao(cardType, formatted);
        
        // Atualiza os elementos na interface
        if (resultElement) {
          resultElement.textContent = cartaoData.number;
        }
        
        // Mostra e preenche os detalhes adicionais
        if (detailsElement) {
          detailsElement.style.display = 'block';
        }
        
        if (expiryElement) {
          expiryElement.textContent = cartaoData.expiryDate;
        }
        
        if (cvvElement) {
          cvvElement.textContent = cartaoData.cvv;
        }
        
        // Mostra o botão de copiar tudo
        if (copyAllBtn) {
          copyAllBtn.style.display = 'inline-block';
          
          // Armazena todos os dados do cartão para cópia
          const allData = `Número: ${cartaoData.number}\nData de Validade: ${cartaoData.expiryDate}\nCVV: ${cartaoData.cvv}`;
          document.getElementById('cartao-all').textContent = allData;
          document.getElementById('cartao-all').style.display = 'none';
        }
      } catch (error) {
        console.error('Error generating Cartão de Crédito:', error);
        if (resultElement) {
          resultElement.textContent = 'Erro ao gerar Cartão de Crédito';
        }
        
        // Esconde os detalhes em caso de erro
        if (detailsElement) {
          detailsElement.style.display = 'none';
        }
        
        if (copyAllBtn) {
          copyAllBtn.style.display = 'none';
        }
      }
    });
  }
  
  // RENAVAM生成器
  const generateRenavamBtn = document.getElementById('generate-renavam');
  if (generateRenavamBtn) {
    generateRenavamBtn.addEventListener('click', () => {
      const resultElement = document.getElementById('renavam-result');
      const formatted = document.getElementById('renavam-formatted').checked;
      
      try {
        const renavam = window.generators.generateRenavam(formatted);
        if (resultElement) {
          resultElement.textContent = renavam;
        }
      } catch (error) {
        console.error('Error generating RENAVAM:', error);
        if (resultElement) {
          resultElement.textContent = 'Erro ao gerar RENAVAM';
        }
      }
    });
  }
  
  // 个人资料生成器
  const generateProfileBtn = document.getElementById('generate-profile');
  if (generateProfileBtn) {
    generateProfileBtn.addEventListener('click', () => {
      const resultElement = document.getElementById('profile-result');
      const formatted = document.getElementById('profile-formatted').checked;
      
      try {
        // 生成个人资料
        const profile = window.generators.generateProfile(formatted);
        
        if (resultElement) {
          // 将个人资料转换为HTML并显示
          resultElement.innerHTML = window.generators.profileToHTML(profile);
          
          // 存储原始个人资料数据用于导出
          resultElement.dataset.profile = JSON.stringify(profile);
        }
      } catch (error) {
        console.error('Error generating Profile:', error);
        if (resultElement) {
          resultElement.textContent = 'Erro ao gerar Perfil';
        }
      }
    });
  }
  
  // 批量生成按钮
  const bulkGenerateBtn = document.getElementById('bulk-generate');
  if (bulkGenerateBtn) {
    bulkGenerateBtn.addEventListener('click', () => {
      const resultElement = document.getElementById('bulk-result');
      const documentType = document.getElementById('bulk-type').value;
      const count = parseInt(document.getElementById('bulk-count').value, 10) || 5;
      const formatted = document.getElementById('bulk-formatted').checked;
      
      try {
        let results = [];
        
        for (let i = 0; i < count; i++) {
          let result;
          switch (documentType) {
            case 'cpf':
              result = window.generators.generateCPF(formatted);
              break;
            case 'cnpj':
              result = window.generators.generateCNPJ(formatted);
              break;
            case 'rg':
              result = window.generators.generateRG(formatted);
              break;
            case 'pis':
              result = window.generators.generatePIS(formatted);
              break;
            case 'cnh':
              result = window.generators.generateCNH(formatted);
              break;
            case 'titulo':
              result = window.generators.generateTitulo(formatted);
              break;
            case 'certidao':
              result = window.generators.generateCertidao(formatted);
              break;
            case 'cartao':
              result = window.generators.generateCartao(document.getElementById('cartao-type').value, formatted);
              if (typeof result === 'object') {
                result = `Número: ${result.number}, Validade: ${result.expiryDate}, CVV: ${result.cvv}`;
              }
              break;
            case 'renavam':
              result = window.generators.generateRenavam(formatted);
              break;
            case 'profile':
              result = window.generators.generateProfile(formatted);
              break;
            default:
              result = window.generators.generateCPF(formatted);
          }
          results.push(result);
        }
        
        if (resultElement) {
          if (documentType === 'profile') {
            // 将个人资料结果转换为HTML并显示
            const profileHtml = results.map(profile => window.generators.profileToHTML(profile)).join('<hr>');
            resultElement.innerHTML = profileHtml;
            
            // 存储原始个人资料数据用于导出
            resultElement.dataset.profile = JSON.stringify(results);
          } else {
            resultElement.innerHTML = results.join('<br>');
            
            // 存储批量生成的结果，用于导出
            resultElement.dataset.results = JSON.stringify(results);
          }
        }
      } catch (error) {
        console.error('Error generating bulk documents:', error);
        if (resultElement) {
          resultElement.textContent = 'Erro ao gerar documentos';
        }
      }
    });
  }
}

/**
 * 初始化复制按钮
 */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement && targetElement.textContent) {
        // 创建临时文本区域
        const textarea = document.createElement('textarea');
        textarea.value = targetElement.textContent;
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
          // 执行复制
          document.execCommand('copy');
          
          // 显示成功提示
          button.classList.add('btn-success');
          const originalText = button.textContent;
          button.textContent = 'Copiado!';
          
          // 3秒后恢复按钮状态
          setTimeout(() => {
            button.classList.remove('btn-success');
            button.textContent = originalText;
          }, 3000);
        } catch (err) {
          console.error('Failed to copy text:', err);
        } finally {
          document.body.removeChild(textarea);
        }
      }
    });
  });
}

/**
 * 初始化社交媒体分享按钮
 */
function initSocialShareButtons() {
  const socialButtons = document.querySelectorAll('.btn-social');
  
  socialButtons.forEach(button => {
    button.addEventListener('click', () => {
      const platform = button.getAttribute('data-platform');
      const targetId = button.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement && targetElement.textContent) {
        const text = `Documento brasileiro gerado pelo Gerador NV: ${targetElement.textContent}`;
        const url = window.location.href;
        
        // 使用工具函数分享到社交媒体
        window.utils.shareToSocial(platform, text, url);
      }
    });
  });
}

/**
 * 初始化导出按钮
 */
function initExportButtons() {
  // CSV导出按钮
  const exportCsvBtn = document.getElementById('export-csv');
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      const resultElement = document.getElementById('bulk-result');
      
      if (resultElement && resultElement.dataset.results) {
        try {
          const results = JSON.parse(resultElement.dataset.results);
          const documentType = document.getElementById('bulk-type').value;
          const headers = window.exportTools.getCSVHeaders(documentType);
          
          // 使用导出工具导出为CSV
          window.exportTools.exportToCSV(
            results, 
            `${documentType}_${new Date().toISOString().slice(0, 10)}.csv`,
            headers
          );
        } catch (error) {
          console.error('Error exporting to CSV:', error);
        }
      }
    });
  }
  
  // Excel导出按钮
  const exportExcelBtn = document.getElementById('export-excel');
  if (exportExcelBtn) {
    exportExcelBtn.addEventListener('click', () => {
      const resultElement = document.getElementById('bulk-result');
      
      if (resultElement && resultElement.dataset.results) {
        try {
          const results = JSON.parse(resultElement.dataset.results);
          const documentType = document.getElementById('bulk-type').value;
          const headers = window.exportTools.getCSVHeaders(documentType);
          
          // 使用导出工具导出为Excel
          window.exportTools.exportToExcel(
            results, 
            `${documentType}_${new Date().toISOString().slice(0, 10)}.xlsx`,
            headers
          );
        } catch (error) {
          console.error('Error exporting to Excel:', error);
        }
      }
    });
  }
  
  // JSON导出按钮
  const exportJsonBtn = document.getElementById('export-json');
  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', () => {
      const resultElement = document.getElementById('bulk-result');
      
      if (resultElement && resultElement.dataset.results) {
        try {
          const results = JSON.parse(resultElement.dataset.results);
          const documentType = document.getElementById('bulk-type').value;
          
          // 如果是个人资料，需要特殊处理
          if (documentType === 'profile') {
            // 将结果数组转换为对象数组
            const profileObjects = results.map(item => {
              // 假设每个项目都是HTML字符串，需要提取原始对象
              // 这里我们使用存储在自定义属性中的原始数据
              return JSON.parse(item);
            });
            
            window.exportTools.exportToJSON(profileObjects, `${documentType}_${new Date().toISOString().slice(0, 10)}.json`);
          } else {
            // 其他文档类型直接导出
            window.exportTools.exportToJSON(results, `${documentType}_${new Date().toISOString().slice(0, 10)}.json`);
          }
        } catch (error) {
          console.error('Error exporting to JSON:', error);
        }
      }
    });
  }
  
  // 文本导出按钮
  const exportTxtBtn = document.getElementById('export-txt');
  if (exportTxtBtn) {
    exportTxtBtn.addEventListener('click', () => {
      const resultElement = document.getElementById('bulk-result');
      
      if (resultElement && resultElement.dataset.results) {
        try {
          const results = JSON.parse(resultElement.dataset.results);
          const documentType = document.getElementById('bulk-type').value;
          
          // 使用导出工具导出为文本
          window.exportTools.exportToText(results, `${documentType}_${new Date().toISOString().slice(0, 10)}.txt`);
        } catch (error) {
          console.error('Error exporting to TXT:', error);
        }
      }
    });
  }
  
  // 个人资料CSV导出按钮
  const exportProfileCsvBtn = document.getElementById('export-profile-csv');
  if (exportProfileCsvBtn) {
    exportProfileCsvBtn.addEventListener('click', () => {
      const resultElement = document.getElementById('profile-result');
      
      if (resultElement && resultElement.dataset.profile) {
        try {
          const profile = JSON.parse(resultElement.dataset.profile);
          const headers = window.exportTools.getCSVHeaders('profile');
          const csvData = [window.generators.profileToCSV(profile)];
          
          // 使用导出工具导出为CSV
          window.exportTools.exportToCSV(
            csvData, 
            `profile_${new Date().toISOString().slice(0, 10)}.csv`,
            headers
          );
        } catch (error) {
          console.error('Error exporting profile to CSV:', error);
        }
      }
    });
  }
  
  // 个人资料JSON导出按钮
  const exportProfileJsonBtn = document.getElementById('export-profile-json');
  if (exportProfileJsonBtn) {
    exportProfileJsonBtn.addEventListener('click', () => {
      const resultElement = document.getElementById('profile-result');
      
      if (resultElement && resultElement.dataset.profile) {
        try {
          const profile = JSON.parse(resultElement.dataset.profile);
          
          // 使用导出工具导出为JSON
          window.exportTools.exportToJSON(profile, `profile_${new Date().toISOString().slice(0, 10)}.json`);
        } catch (error) {
          console.error('Error exporting profile to JSON:', error);
        }
      }
    });
  }
}

/**
 * 初始化验证功能
 */
function initValidators() {
  const validateForm = document.getElementById('validate-form');
  
  if (validateForm) {
    validateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const documentType = document.getElementById('validate-type').value;
      const documentNumber = document.getElementById('validate-number').value.trim();
      const resultElement = document.getElementById('validate-result');
      
      if (!documentNumber) {
        if (resultElement) {
          resultElement.innerHTML = '<span class="text-danger">Por favor, digite o número do documento</span>';
        }
        return;
      }
      
      try {
        let isValid = false;
        
        switch (documentType) {
          case 'cpf':
            isValid = window.validators.validateCPF(documentNumber);
            break;
          case 'cnpj':
            isValid = window.validators.validateCNPJ(documentNumber);
            break;
          case 'rg':
            isValid = window.validators.validateRG(documentNumber);
            break;
          case 'pis':
            isValid = window.validators.validatePIS(documentNumber);
            break;
          case 'cnh':
            isValid = window.validators.validateCNH(documentNumber);
            break;
          case 'titulo':
            isValid = window.validators.validateTitulo(documentNumber);
            break;
          case 'certidao':
            isValid = window.validators.validateCertidao(documentNumber);
            break;
          case 'cartao':
            isValid = window.validators.validateCartao(documentNumber);
            break;
          case 'renavam':
            isValid = window.validators.validateRenavam(documentNumber);
            break;
          default:
            isValid = window.validators.validateCPF(documentNumber);
        }
        
        if (resultElement) {
          if (isValid) {
            resultElement.innerHTML = '<span class="text-success">✓ Documento válido</span>';
          } else {
            resultElement.innerHTML = '<span class="text-danger">✗ Documento inválido</span>';
          }
        }
      } catch (error) {
        console.error('Error validating document:', error);
        if (resultElement) {
          resultElement.innerHTML = '<span class="text-danger">Erro ao validar o documento</span>';
        }
      }
    });
  }
}

// 导出全局命名空间
window.app = {
  initApp,
  initTheme,
  initTabs,
  initGeneratorButtons,
  initCopyButtons,
  initSocialShareButtons,
  initExportButtons,
  initValidators
};
