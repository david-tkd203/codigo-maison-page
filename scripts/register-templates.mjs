/**
 * Registra automáticamente las plantillas MJML compiladas como templates de EmailJS.
 *
 * Uso:
 *   EMAILJS_PRIVATE_KEY=xxx node scripts/register-templates.mjs
 *
 * También podés crear un .env en /scripts con EMAILJS_PRIVATE_KEY=xxx
 */

const EMAILJS_API = 'https://api.emailjs.com/api/v1';
const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

if (!PRIVATE_KEY) {
  console.error('❌ Falta EMAILJS_PRIVATE_KEY. Pasala como variable de entorno.');
  console.error('   EMAILJS_PRIVATE_KEY=xxx node scripts/register-templates.mjs');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${PRIVATE_KEY}`,
};

async function api(method, path, body) {
  const res = await fetch(`${EMAILJS_API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  // 201 Created no body, 200 sí
  try { return await res.json(); } catch { return null; }
}

async function getAllTemplates() {
  const { templates } = await api('GET', '/templates');
  return templates;
}

async function findTemplateId(templates, name) {
  const found = templates.find((t) => t.name === name);
  return found ? found.template_id : null;
}

async function upsertTemplate(name, subject, toEmail, htmlPath, variables) {
  const fs = await import('fs');
  const content = fs.readFileSync(new URL(htmlPath, import.meta.url), 'utf-8');

  const existing = await getAllTemplates();
  const existingId = await findTemplateId(existing, name);

  const payload = {
    name,
    subject,
    content,
    toEmail,
    variables,
  };

  if (existingId) {
    console.log(`  ↻ Actualizando "${name}" (ID: ${existingId})...`);
    await api('PUT', `/templates/${existingId}`, payload);
    console.log(`  ✓ "${name}" actualizado. ID: ${existingId}`);
    return existingId;
  } else {
    console.log(`  ✚ Creando "${name}"...`);
    await api('POST', '/templates', payload);
    // Obtener el ID recién creado
    const all = await getAllTemplates();
    const created = all.find((t) => t.name === name);
    const id = created ? created.template_id : 'unknown';
    console.log(`  ✓ "${name}" creado. ID: ${id}`);
    return id;
  }
}

async function main() {
  console.log('━━━ Registrando templates en EmailJS ━━━\n');

  const templateTeam = await upsertTemplate(
    'lead-notification',
    'Nuevo Lead Capturado — {{name}} de {{company}}',
    'contact@codigomaison.com',
    '../emails/dist/lead-notification.html',
    ['name', 'company', 'sector', 'whatsapp', 'email', 'projectType', 'budget', 'message'],
  );

  const templateClient = await upsertTemplate(
    'auto-reply',
    '¡Gracias por contactarnos, {{name}}!',
    '{{email}}',
    '../emails/dist/auto-reply.html',
    ['name', 'company', 'projectType', 'message', 'email'],
  );

  console.log('\n━━━ Resumen ━━━');
  console.log(`  VITE_EMAILJS_TEMPLATE_TEAM=${templateTeam}`);
  console.log(`  VITE_EMAILJS_TEMPLATE_CLIENT=${templateClient}`);
  console.log('\n✅ Templates registrados correctamente.');
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
