export const levels = {
  "ва ол (рус.)": "ваол",
  "фы дж (рус.)": "фыдж",
  "ми ть (рус.)": "мить",
  "еп нр (рус.)": "епнр",
  "ук гш (рус.)": "укгш",
  "чс бю (рус.)": "чсбю",
  "йц щз (рус.)": "йцщз",
  "яэ хъ (рус.)": "яэхъ",
  "df jk (англ.)": "dfjk",
  "as l; (англ.)": "asl;",
  "vb nm (англ.)": "vbnm",
  "tg yh (англ.)": "tgyh",
  "er ui (англ.)": "erui",
  "xc ,. (англ.)": "xc,.",
  "qw op (англ.)": "qwop",
  "z' [] (англ.)": "z'[]",
  "56 78": "5678",
  "34 90": "3490",
  "12 -=": "12-="
};

export const generateLevelText = (levelName, length = 100) => {
  const symbols = levels[levelName] || "ваол";
  let result = '';
  for (let i = 0; i < length; i++) {
    result += symbols[Math.floor(Math.random() * symbols.length)];
  }
  return result;
};