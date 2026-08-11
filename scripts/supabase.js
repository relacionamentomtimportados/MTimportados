// scripts/supabase.js

const SUPABASE_URL = 'https://ndpgaqoiuocduxhjjerg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_3ud2vwKCaHzCg_1lKo56rA_wJZmm8WR';

let supabaseClient = null;

// ==========================================
// MOCK SUPABASE IMPLEMENTATION (For Local Testing without DB)
// Automatically used if keys are not changed.
// ==========================================
const MOCK_TABLE_KEYS = {
  products: 'arome_catalog_override',
  brands: 'mt_brands',
  reviews: 'mt_reviews'
};

function mockReadTable(table) {
  const key = MOCK_TABLE_KEYS[table];
  if (!key) return [];
  if (table === 'brands') {
    const data = JSON.parse(localStorage.getItem(key) || '["Maison Alhambra", "Lattafa", "Armaf", "MT Importados"]');
    return data.map(b => ({ name: b }));
  }
  return JSON.parse(localStorage.getItem(key) || '[]');
}

function mockWriteTable(table, data) {
  const key = MOCK_TABLE_KEYS[table];
  if (!key) return;
  if (table === 'brands') {
    localStorage.setItem(key, JSON.stringify(data.map(b => b.name)));
    return;
  }
  localStorage.setItem(key, JSON.stringify(data));
}

// Minimal thenable query builder mimicking the parts of the supabase-js
// query API this project actually uses: select().eq().order(), update().eq(),
// delete().eq(), insert().
function createMockQueryBuilder(table) {
  let mode = 'select';
  let payload = null;
  const filters = [];
  let orderBy = null;

  const builder = {
    eq(column, value) {
      filters.push([column, value]);
      return builder;
    },
    order(column, opts) {
      orderBy = { column, ascending: !(opts && opts.ascending === false) };
      return builder;
    },
    then(onResolve, onReject) {
      return execute().then(onResolve, onReject);
    }
  };

  async function execute() {
    let data = mockReadTable(table);

    if (mode === 'insert') {
      data = [...data, ...payload];
      mockWriteTable(table, data);
      return { data: payload, error: null };
    }

    if (mode === 'update') {
      data = data.map(item => {
        const matches = filters.every(([col, val]) => item[col] === val);
        return matches ? { ...item, ...payload } : item;
      });
      mockWriteTable(table, data);
      return { data: null, error: null };
    }

    if (mode === 'delete') {
      data = data.filter(item => !filters.every(([col, val]) => item[col] === val));
      mockWriteTable(table, data);
      return { data: null, error: null };
    }

    // select
    filters.forEach(([col, val]) => {
      data = data.filter(item => item[col] === val);
    });
    if (orderBy) {
      data = [...data].sort((a, b) => {
        if (a[orderBy.column] === b[orderBy.column]) return 0;
        const dir = a[orderBy.column] > b[orderBy.column] ? 1 : -1;
        return orderBy.ascending ? dir : -dir;
      });
    }
    return { data, error: null };
  }

  return {
    select() {
      mode = 'select';
      return builder;
    },
    insert(records) {
      mode = 'insert';
      payload = records;
      return builder;
    },
    update(updates) {
      mode = 'update';
      payload = updates;
      return builder;
    },
    delete() {
      mode = 'delete';
      return builder;
    }
  };
}

class MockSupabaseClient {
  constructor() {
    this.auth = {
      onAuthStateChange: (cb) => {
        setTimeout(() => cb('SIGNED_IN', { user: { email: 'mtimportados@gmail.com' } }), 100);
      },
      getSession: async () => {
        const loggedIn = localStorage.getItem('mock_admin_logged_in');
        return { data: { session: loggedIn ? { user: { email: 'mtimportados@gmail.com' } } : null } };
      },
      signInWithPassword: async ({ email, password }) => {
        if (email === 'mtimportados@gmail.com' && password === '123456') {
          localStorage.setItem('mock_admin_logged_in', 'true');
          return { data: { user: { email } }, error: null };
        }
        return { data: null, error: { message: 'Invalid login credentials' } };
      },
      signOut: async () => {
        localStorage.removeItem('mock_admin_logged_in');
      }
    };

    this.storage = {
      from: (bucket) => ({
        upload: async (path, file) => {
          // Fake file upload by generating a local object URL or converting to base64
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              // We'll store the base64 string in localStorage to simulate an uploaded image
              const fakeUrl = e.target.result;
              resolve({ data: { path: fakeUrl }, error: null });
            };
            reader.readAsDataURL(file);
          });
        },
        getPublicUrl: (path) => {
          // Since our mock upload returns a base64 data URL as path, we just return it
          return { data: { publicUrl: path } };
        }
      })
    };
  }

  from(table) {
    return createMockQueryBuilder(table);
  }
}

try {
  if (SUPABASE_URL.includes('sua-url-do-supabase')) {
    console.warn("Using Mock Supabase Client. Please add your real keys to scripts/supabase.js.");
    supabaseClient = new MockSupabaseClient();
    window.supabaseClient = supabaseClient;
  } else if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    window.supabaseClient = supabaseClient;
  }
} catch (error) {
  console.error("Failed to initialize Supabase:", error);
}
