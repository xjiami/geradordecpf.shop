/**
 * 导出工具函数
 * 提供各种数据导出格式
 */

window.exportTools = {
    /**
     * 导出数据为CSV文件
     * @param {Array} data - 要导出的数据数组
     * @param {string} filename - 文件名
     * @param {Array} headers - 可选的CSV标题行
     */
    exportToCSV(data, filename, headers = []) {
        let csvContent = '';
        
        // 添加标题行
        if (headers && headers.length > 0) {
            csvContent += headers.join(',') + '\n';
        }
        
        // 添加数据行
        csvContent += data.join('\n');
        
        // 创建Blob并下载
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        this.downloadFile(blob, filename);
    },
    
    /**
     * 导出数据为Excel文件
     * 注意：这是一个简单的实现，生成的是CSV文件但使用.xlsx扩展名
     * 浏览器会将其作为Excel文件打开
     * @param {Array} data - 要导出的数据数组
     * @param {string} filename - 文件名
     * @param {Array} headers - 可选的Excel标题行
     */
    exportToExcel(data, filename, headers = []) {
        let csvContent = '';
        
        // 添加标题行
        if (headers && headers.length > 0) {
            csvContent += headers.join(',') + '\n';
        }
        
        // 添加数据行
        csvContent += data.join('\n');
        
        // 确保文件名有正确的扩展名
        if (!filename.endsWith('.xlsx')) {
            filename += '.xlsx';
        }
        
        // 创建Blob并下载
        const blob = new Blob([csvContent], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;' });
        this.downloadFile(blob, filename);
    },
    
    /**
     * 导出数据为JSON文件
     * @param {Object|Array} data - 要导出的数据对象或数组
     * @param {string} filename - 文件名
     */
    exportToJSON(data, filename) {
        const jsonContent = JSON.stringify(data, null, 2);
        
        // 确保文件名有正确的扩展名
        if (!filename.endsWith('.json')) {
            filename += '.json';
        }
        
        // 创建Blob并下载
        const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
        this.downloadFile(blob, filename);
    },
    
    /**
     * 导出数据为文本文件
     * @param {string|Array} data - 要导出的文本数据或数组
     * @param {string} filename - 文件名
     */
    exportToText(data, filename) {
        let textContent = Array.isArray(data) ? data.join('\n') : data;
        
        // 确保文件名有正确的扩展名
        if (!filename.endsWith('.txt')) {
            filename += '.txt';
        }
        
        // 创建Blob并下载
        const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' });
        this.downloadFile(blob, filename);
    },
    
    /**
     * 下载Blob数据为文件
     * @param {Blob} blob - 要下载的Blob数据
     * @param {string} filename - 文件名
     */
    downloadFile(blob, filename) {
        // 创建下载链接
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        // 设置链接属性
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        // 添加到文档，点击并移除
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 释放URL对象
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 100);
    },
    
    /**
     * 生成CSV标题行
     * @param {string} documentType - 文档类型
     * @returns {Array} 标题行数组
     */
    getCSVHeaders(documentType) {
        switch (documentType) {
            case 'profile':
                return [
                    'Nome Completo',
                    'Data de Nascimento',
                    'Endereço',
                    'Telefone',
                    'Email',
                    'CPF',
                    'RG',
                    'CNH',
                    'PIS/PASEP',
                    'Título de Eleitor',
                    'Cartão de Crédito',
                    'Validade',
                    'CVV'
                ];
            case 'cpf':
                return ['CPF'];
            case 'cnpj':
                return ['CNPJ'];
            case 'rg':
                return ['RG'];
            case 'pis':
                return ['PIS/PASEP'];
            case 'cnh':
                return ['CNH'];
            case 'titulo':
                return ['Título de Eleitor'];
            case 'certidao':
                return ['Certidão de Nascimento'];
            case 'cartao':
                return ['Número do Cartão', 'Validade', 'CVV'];
            case 'renavam':
                return ['RENAVAM'];
            default:
                return [];
        }
    }
};
