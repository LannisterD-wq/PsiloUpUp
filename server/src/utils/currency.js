function toCents(value) {
  if (typeof value === 'number') {
    return Math.round(value * 100);
  }
  if (typeof value === 'string') {
    const normalized = value.replace(/\./g, '').replace(',', '.');
    const num = Number(normalized);
    if (Number.isNaN(num)) return 0;
    return Math.round(num * 100);
  }
  return 0;
}

function toReaisString(cents) {
  const value = Number(cents || 0) / 100;
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

module.exports = {
  toCents,
  toReaisString,
};



