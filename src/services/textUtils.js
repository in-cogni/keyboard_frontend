// Удалить первые N символов из строки (как в C#)
export const deleteSymbol = (str, quantity) => {
  return str.substring(quantity);
};

export const handleText = (text, symbols) => {
  let filtered = '';
  for (let i = 0; i < text.length; i++) {
    if (symbols.includes(text[i])) {
      filtered += text[i];
    }
  }
  filtered = filtered.trim();
  filtered = filtered.replace(/\s+/g, ' ');
  return filtered;
};

export const generateString = (symbolsForNeed, length = 100) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * symbolsForNeed.length);
    result += symbolsForNeed[randomIndex];
  }
  return result;
};

export const symbolsForNeed = "ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮЁйцукенгшщзхъфывапролджэячсмитьбюёQWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm{[}]:;\"\'\\|/<,>.? 0123456789-=";

// Спецсимволы для проверки регистра (как _chars в C#)
export const specialChars = new Set(['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', ':', '"', '|', '<', '>', '?', '*', ';', '/', '\\']);