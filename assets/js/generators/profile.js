/**
 * 完整个人资料生成器
 * 生成包含姓名、地址、电话号码、电子邮件和所有相关文档号码的虚拟个人资料
 */

// 姓名数据库
const firstNames = [
    "Ana", "João", "Maria", "Pedro", "Luiza", "Carlos", "Fernanda", "José", "Mariana", "Antônio",
    "Juliana", "Paulo", "Camila", "Lucas", "Aline", "Rafael", "Beatriz", "Gabriel", "Larissa", "Rodrigo",
    "Amanda", "Felipe", "Natália", "Bruno", "Carolina", "Marcelo", "Patrícia", "Thiago", "Vanessa", "Leonardo"
];

const lastNames = [
    "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes",
    "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida", "Lopes", "Soares", "Fernandes", "Vieira", "Barbosa",
    "Rocha", "Dias", "Nascimento", "Andrade", "Moreira", "Nunes", "Marques", "Machado", "Mendes", "Freitas"
];

// 地址数据库
const streets = [
    "Rua das Flores", "Avenida Brasil", "Rua São João", "Avenida Paulista", "Rua da Paz",
    "Avenida Atlântica", "Rua dos Bandeirantes", "Avenida Getúlio Vargas", "Rua Quinze de Novembro",
    "Avenida Rio Branco", "Rua Sete de Setembro", "Avenida Amazonas", "Rua Barão do Rio Branco"
];

const neighborhoods = [
    "Centro", "Jardim América", "Vila Nova", "Boa Vista", "Liberdade", 
    "Bela Vista", "Santa Cecília", "Ipanema", "Copacabana", "Botafogo"
];

const cities = [
    "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Brasília", "Salvador",
    "Fortaleza", "Recife", "Porto Alegre", "Curitiba", "Manaus", "Belém",
    "Goiânia", "Guarulhos", "Campinas", "São Luís", "São Gonçalo", "Maceió"
];

const states = [
    {name: "São Paulo", abbr: "SP"},
    {name: "Rio de Janeiro", abbr: "RJ"},
    {name: "Minas Gerais", abbr: "MG"},
    {name: "Bahia", abbr: "BA"},
    {name: "Rio Grande do Sul", abbr: "RS"},
    {name: "Paraná", abbr: "PR"},
    {name: "Pernambuco", abbr: "PE"},
    {name: "Ceará", abbr: "CE"},
    {name: "Pará", abbr: "PA"},
    {name: "Santa Catarina", abbr: "SC"},
    {name: "Goiás", abbr: "GO"},
    {name: "Maranhão", abbr: "MA"},
    {name: "Amazonas", abbr: "AM"},
    {name: "Espírito Santo", abbr: "ES"},
    {name: "Paraíba", abbr: "PB"},
    {name: "Mato Grosso", abbr: "MT"},
    {name: "Rio Grande do Norte", abbr: "RN"}
];

// 电子邮件域名
const emailDomains = [
    "gmail.com", "hotmail.com", "outlook.com", "yahoo.com.br", "uol.com.br",
    "terra.com.br", "bol.com.br", "ig.com.br", "globo.com", "protonmail.com"
];

// 电话区号
const areaCodes = [
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "22", "24", "27", "28",
    "31", "32", "33", "34", "35", "37", "38", "41", "42", "43", "44", "45", "46", "47",
    "48", "49", "51", "53", "54", "55", "61", "62", "63", "64", "65", "66", "67", "68",
    "69", "71", "73", "74", "75", "77", "79", "81", "82", "83", "84", "85", "86", "87",
    "88", "89", "91", "92", "93", "94", "95", "96", "97", "98", "99"
];

/**
 * 生成随机姓名
 * @returns {Object} 包含名字和姓氏的对象
 */
function generateName() {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    
    return {
        firstName,
        lastName,
        fullName
    };
}

/**
 * 生成随机地址
 * @returns {Object} 包含地址信息的对象
 */
function generateAddress() {
    const street = streets[Math.floor(Math.random() * streets.length)];
    const number = Math.floor(Math.random() * 2000) + 1;
    const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const zipCode = window.utils.generateRandomDigits(8);
    const formattedZipCode = `${zipCode.substring(0, 5)}-${zipCode.substring(5)}`;
    
    return {
        street,
        number,
        neighborhood,
        city,
        state: state.name,
        stateAbbr: state.abbr,
        zipCode: formattedZipCode,
        fullAddress: `${street}, ${number} - ${neighborhood}, ${city} - ${state.abbr}, ${formattedZipCode}`
    };
}

/**
 * 生成随机电子邮件
 * @param {string} firstName - 名字
 * @param {string} lastName - 姓氏
 * @returns {string} 电子邮件地址
 */
function generateEmail(firstName, lastName) {
    const domain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
    const normalizedFirstName = firstName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const normalizedLastName = lastName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    
    const emailFormats = [
        `${normalizedFirstName}.${normalizedLastName}@${domain}`,
        `${normalizedFirstName}${normalizedLastName}@${domain}`,
        `${normalizedFirstName}_${normalizedLastName}@${domain}`,
        `${normalizedFirstName}${Math.floor(Math.random() * 100)}@${domain}`,
        `${normalizedFirstName.charAt(0)}${normalizedLastName}@${domain}`
    ];
    
    return emailFormats[Math.floor(Math.random() * emailFormats.length)];
}

/**
 * 生成随机电话号码
 * @returns {Object} 包含电话号码信息的对象
 */
function generatePhone() {
    const areaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)];
    const isMobile = Math.random() > 0.3; // 70%的概率生成手机号
    
    let prefix = isMobile ? "9" : "";
    const number = window.utils.generateRandomDigits(isMobile ? 8 : 8);
    
    const fullNumber = `${areaCode}${prefix}${number}`;
    const formattedNumber = isMobile 
        ? `(${areaCode}) ${prefix}${number.substring(0, 4)}-${number.substring(4)}`
        : `(${areaCode}) ${number.substring(0, 4)}-${number.substring(4)}`;
    
    return {
        areaCode,
        number: `${prefix}${number}`,
        fullNumber,
        formattedNumber,
        isMobile
    };
}

/**
 * 生成随机出生日期
 * @param {number} minAge - 最小年龄
 * @param {number} maxAge - 最大年龄
 * @returns {Object} 包含出生日期信息的对象
 */
function generateBirthDate(minAge = 18, maxAge = 80) {
    const today = new Date();
    const minYear = today.getFullYear() - maxAge;
    const maxYear = today.getFullYear() - minAge;
    
    const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
    const month = Math.floor(Math.random() * 12);
    const maxDay = new Date(year, month + 1, 0).getDate();
    const day = Math.floor(Math.random() * maxDay) + 1;
    
    const birthDate = new Date(year, month, day);
    
    const formattedDate = `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
    
    return {
        date: birthDate,
        day,
        month: month + 1,
        year,
        formattedDate,
        age: today.getFullYear() - year - (today.getMonth() < month || (today.getMonth() === month && today.getDate() < day) ? 1 : 0)
    };
}

/**
 * 生成完整个人资料
 * @param {boolean} formatted - 是否格式化文档号码
 * @returns {Object} 完整的个人资料对象
 */
function generateProfile(formatted = true) {
    const name = generateName();
    const birthDate = generateBirthDate();
    const address = generateAddress();
    const phone = generatePhone();
    const email = generateEmail(name.firstName, name.lastName);
    
    // 生成各种文档
    const cpf = window.generators.generateCPF(formatted);
    const rg = window.generators.generateRG(formatted);
    const cnh = window.generators.generateCNH(formatted);
    const pis = window.generators.generatePIS(formatted);
    const titulo = window.generators.generateTitulo(formatted);
    
    // 生成信用卡信息
    const cardInfo = window.generators.generateCartao(formatted);
    const cardParts = cardInfo.split(' | ');
    const cardNumber = cardParts[0];
    const cardExpiry = cardParts[1];
    const cardCVV = cardParts[2];
    
    return {
        name,
        birthDate,
        address,
        phone,
        email,
        documents: {
            cpf,
            rg,
            cnh,
            pis,
            titulo
        },
        card: {
            number: cardNumber,
            expiry: cardExpiry,
            cvv: cardCVV
        }
    };
}

/**
 * 将个人资料转换为格式化的HTML
 * @param {Object} profile - 个人资料对象
 * @returns {string} 格式化的HTML
 */
function profileToHTML(profile) {
    return `
    <div class="profile-container">
        <h4>${profile.name.fullName}</h4>
        <div class="profile-section">
            <p><strong>Data de Nascimento:</strong> ${profile.birthDate.formattedDate} (${profile.birthDate.age} anos)</p>
            <p><strong>Endereço:</strong> ${profile.address.fullAddress}</p>
            <p><strong>Telefone:</strong> ${profile.phone.formattedNumber}</p>
            <p><strong>Email:</strong> ${profile.email}</p>
        </div>
        <div class="profile-section">
            <p><strong>CPF:</strong> ${profile.documents.cpf}</p>
            <p><strong>RG:</strong> ${profile.documents.rg}</p>
            <p><strong>CNH:</strong> ${profile.documents.cnh}</p>
            <p><strong>PIS/PASEP:</strong> ${profile.documents.pis}</p>
            <p><strong>Título de Eleitor:</strong> ${profile.documents.titulo}</p>
        </div>
        <div class="profile-section">
            <p><strong>Cartão de Crédito:</strong> ${profile.card.number}</p>
            <p><strong>Validade:</strong> ${profile.card.expiry}</p>
            <p><strong>CVV:</strong> ${profile.card.cvv}</p>
        </div>
    </div>
    `;
}

/**
 * 将个人资料转换为CSV格式的行
 * @param {Object} profile - 个人资料对象
 * @returns {string} CSV格式的行
 */
function profileToCSV(profile) {
    const fields = [
        profile.name.fullName,
        profile.birthDate.formattedDate,
        profile.address.fullAddress,
        profile.phone.formattedNumber,
        profile.email,
        profile.documents.cpf,
        profile.documents.rg,
        profile.documents.cnh,
        profile.documents.pis,
        profile.documents.titulo,
        profile.card.number,
        profile.card.expiry,
        profile.card.cvv
    ];
    
    // 转义CSV字段中的逗号和引号
    return fields.map(field => {
        if (field.includes(',') || field.includes('"')) {
            return `"${field.replace(/"/g, '""')}"`;
        }
        return field;
    }).join(',');
}

/**
 * 将个人资料转换为JSON格式
 * @param {Object} profile - 个人资料对象
 * @returns {string} JSON格式的字符串
 */
function profileToJSON(profile) {
    return JSON.stringify(profile, null, 2);
}

// 导出函数
window.generators = window.generators || {};
window.generators.generateProfile = generateProfile;
window.generators.profileToHTML = profileToHTML;
window.generators.profileToCSV = profileToCSV;
window.generators.profileToJSON = profileToJSON;
