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

function sanitizeCpf(raw) {
  if (!raw) return '';
  return String(raw).replace(/\D/g, '').slice(0, 11);
}

function isStrongPassword(pwd) {
  if (!pwd || typeof pwd !== 'string') return false;
  if (pwd.length < 6) return false;
  if (!/[A-Z]/.test(pwd)) return false;
  if (!/\d/.test(pwd)) return false;
  return true;
}

module.exports = {
  ensureFields,
  sanitizeCep,
  sanitizePhone,
  sanitizeCpf,
  isStrongPassword,
};

