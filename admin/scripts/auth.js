// admin/scripts/auth.js

class AdminAuth {
  constructor() {
    this.user = null;
    this.init();
  }

  async init() {
    // Listen for auth state changes
    window.supabaseClient.auth.onAuthStateChange((event, session) => {
      if (session) {
        this.user = session.user;
        this.showDashboard();
      } else {
        this.user = null;
        this.showLogin();
      }
    });

    // Check initial session
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    if (session) {
      this.user = session.user;
      this.showDashboard();
    } else {
      this.showLogin();
    }

    this.bindEvents();
  }

  bindEvents() {
    const loginForm = document.getElementById('admin-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorDiv = document.getElementById('login-error');
        
        errorDiv.textContent = 'Autenticando...';
        
        // Use Supabase signInWithPassword
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
          email: email,
          password: password
        });

        if (error) {
          errorDiv.textContent = 'Erro no login. Verifique as credenciais.';
        } else {
          errorDiv.textContent = '';
        }
      });
    }
  }

  async logout() {
    await window.supabaseClient.auth.signOut();
    this.showLogin();
  }

  showLogin() {
    const loginContainer = document.getElementById('login-container');
    const dashboard = document.getElementById('admin-dashboard');
    if (loginContainer) loginContainer.style.display = 'block';
    if (dashboard) dashboard.style.display = 'none';
  }

  showDashboard() {
    const loginContainer = document.getElementById('login-container');
    const dashboard = document.getElementById('admin-dashboard');
    if (loginContainer) loginContainer.style.display = 'none';
    if (dashboard) {
      dashboard.style.display = 'block';
      // Re-render admin things if needed
      if (window.adminManager && typeof window.adminManager.init === 'function') {
        window.adminManager.init();
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.adminAuth = new AdminAuth();
});
