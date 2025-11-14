function ensureFields(body, fields = []) {
  const missing = fields.filter((field) => {
    const value = body[field];
    return value === undefined || value === null || value === '';
  });
  return missing;
}

function sanitizeCep(raw) {
  if (!raw) return '';
  return String(raw).replace(/\D/g, '').slice(0, 8);
}

function sanitizePhone(raw) {
  if (!raw) return '';
  return String(raw).replace(/\D/g, '').slice(0, 11);
}

module.exports = {
  ensureFields,
  sanitizeCep,
  sanitizePhone,
};

