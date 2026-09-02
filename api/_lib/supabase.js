// api/_lib/supabase.js
// Minimal server-side Supabase REST helper for the serverless functions.
// Uses the SERVICE ROLE key (never the public anon key) — this key bypasses
// Row Level Security, which is exactly why it must only ever be read from
// process.env here and NEVER sent to the browser or committed to the repo.

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function assertConfigured() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error(
      'Supabase não configurado no servidor: defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY nas variáveis de ambiente da Vercel.'
    );
  }
}

async function request(path, options = {}) {
  assertConfigured();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Supabase ${options.method || 'GET'} ${path} falhou (${res.status}): ${text}`);
  }

  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// Insert one or more rows. Returns the inserted row(s).
async function sbInsert(table, rows) {
  const data = await request(table, {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(rows)
  });
  return data;
}

// Update rows matching a simple column=value filter.
async function sbUpdate(table, filterColumn, filterValue, updates) {
  const data = await request(`${table}?${filterColumn}=eq.${encodeURIComponent(filterValue)}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(updates)
  });
  return data;
}

// Select rows matching a simple column=value filter (or all rows if omitted).
async function sbSelect(table, filterColumn, filterValue, select = '*') {
  const query = filterColumn
    ? `${table}?select=${select}&${filterColumn}=eq.${encodeURIComponent(filterValue)}`
    : `${table}?select=${select}`;
  return request(query, { method: 'GET' });
}

module.exports = { sbInsert, sbUpdate, sbSelect };
