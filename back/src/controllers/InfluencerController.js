const { InfluencerApplication } = require('../models')
const { ensureFields } = require('../utils/validation')

async function apply(req, res) {
  const required = ensureFields(req.body, [
    'name',
    'whatsapp',
    'email',
    'instagram',
    'followers',
    'story',
  ])
  if (required.length) {
    return res.status(400).json({ error: `Campos obrigatórios: ${required.join(', ')}` })
  }
  try {
    const app = await InfluencerApplication.create({
      name: String(req.body.name).trim(),
      whatsapp: String(req.body.whatsapp).trim(),
      email: String(req.body.email).trim(),
      instagram: String(req.body.instagram).trim(),
      followers: Number(req.body.followers) || 0,
      story: String(req.body.story).trim(),
    })
    return res.status(201).json({ id: app.id })
  } catch (e) {
    return res.status(500).json({ error: 'Falha ao registrar inscrição.' })
  }
}

module.exports = { apply }

