/**
 * Script para atualizar ícones para Font Awesome
 * Substitui os ícones de emoji por ícones modernos do Font Awesome
 */

document.addEventListener('DOMContentLoaded', () => {
  // Atualiza os ícones de cópia
  const copyIcons = document.querySelectorAll('.copy-icon');
  copyIcons.forEach(icon => {
    icon.className = 'fas fa-copy';
    icon.textContent = '';
  });
  
  // Atualiza os ícones de redes sociais
  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach(icon => {
    const parentButton = icon.closest('button');
    if (parentButton) {
      const platform = parentButton.getAttribute('data-platform');
      
      switch (platform) {
        case 'whatsapp':
          icon.className = 'fab fa-whatsapp';
          break;
        case 'telegram':
          icon.className = 'fab fa-telegram-plane';
          break;
        case 'twitter':
          icon.className = 'fab fa-twitter';
          break;
        default:
          icon.className = 'fas fa-share-alt';
      }
      
      icon.textContent = '';
    }
  });
  
  // Atualiza ícones de exportação
  const exportButtons = document.querySelectorAll('.export-btn');
  exportButtons.forEach(button => {
    const iconElement = button.querySelector('i');
    if (iconElement) {
      iconElement.className = 'fas fa-file-export';
      iconElement.textContent = '';
    }
  });
  
  // Atualiza ícones de tema
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const iconElement = themeToggle.querySelector('i');
    if (iconElement) {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      iconElement.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      iconElement.textContent = '';
    }
  }
  
  // Atualiza ícones de validação
  const validateButtons = document.querySelectorAll('.validate-btn');
  validateButtons.forEach(button => {
    const iconElement = button.querySelector('i');
    if (iconElement) {
      iconElement.className = 'fas fa-check-circle';
      iconElement.textContent = '';
    }
  });
});
