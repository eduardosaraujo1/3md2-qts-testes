// Configuração padrão do sistema
let systemConfig = {
  appearance: {
    theme: "light",
    primaryColor: "#667eea",
    compactMode: false,
  },
  system: {
    cacheEnabled: true,
    rateLimit: 100,
    verboseLogs: false,
  },
  users: {
    userRegistration: true,
    twoFactorAuth: false,
    sessionTimeout: 24,
  },
  notifications: {
    email: "admin@sistema.com",
    pushNotifications: true,
    reportFrequency: "weekly",
  },
  lastUpdated: new Date().toISOString(),
};

// Elementos do DOM
const elements = {
  themeSelect: document.getElementById("theme-select"),
  primaryColor: document.getElementById("primary-color"),
  compactMode: document.getElementById("compact-mode"),
  cacheEnabled: document.getElementById("cache-enabled"),
  rateLimit: document.getElementById("rate-limit"),
  verboseLogs: document.getElementById("verbose-logs"),
  userRegistration: document.getElementById("user-registration"),
  twoFactorAuth: document.getElementById("two-factor-auth"),
  sessionTimeout: document.getElementById("session-timeout"),
  notificationEmail: document.getElementById("notification-email"),
  pushNotifications: document.getElementById("push-notifications"),
  reportFrequency: document.getElementById("report-frequency"),
  jsonPreview: document.getElementById("json-preview"),
  cacheStatus: document.getElementById("cache-status"),
  notification: document.getElementById("notification"),
};

// Inicializar interface
function initializeInterface() {
  loadConfigurationToForm();
  updateJsonPreview();

  // Event listeners para atualização em tempo real
  Object.values(elements).forEach((element) => {
    if (element && element.addEventListener) {
      element.addEventListener("change", updateJsonPreview);
      element.addEventListener("input", updateJsonPreview);
    }
  });

  // Atualizar status do cache quando o toggle mudar
  elements.cacheEnabled.addEventListener("change", updateCacheStatus);
}

// Carregar configuração nos campos do formulário
function loadConfigurationToForm() {
  elements.themeSelect.value = systemConfig.appearance.theme;
  elements.primaryColor.value = systemConfig.appearance.primaryColor;
  elements.compactMode.checked = systemConfig.appearance.compactMode;

  elements.cacheEnabled.checked = systemConfig.system.cacheEnabled;
  elements.rateLimit.value = systemConfig.system.rateLimit;
  elements.verboseLogs.checked = systemConfig.system.verboseLogs;

  elements.userRegistration.checked = systemConfig.users.userRegistration;
  elements.twoFactorAuth.checked = systemConfig.users.twoFactorAuth;
  elements.sessionTimeout.value = systemConfig.users.sessionTimeout;

  elements.notificationEmail.value = systemConfig.notifications.email;
  elements.pushNotifications.checked =
    systemConfig.notifications.pushNotifications;
  elements.reportFrequency.value = systemConfig.notifications.reportFrequency;
}

// Coletar dados do formulário
function collectFormData() {
  return {
    appearance: {
      theme: elements.themeSelect.value,
      primaryColor: elements.primaryColor.value,
      compactMode: elements.compactMode.checked,
    },
    system: {
      cacheEnabled: elements.cacheEnabled.checked,
      rateLimit: parseInt(elements.rateLimit.value),
      verboseLogs: elements.verboseLogs.checked,
    },
    users: {
      userRegistration: elements.userRegistration.checked,
      twoFactorAuth: elements.twoFactorAuth.checked,
      sessionTimeout: parseInt(elements.sessionTimeout.value),
    },
    notifications: {
      email: elements.notificationEmail.value,
      pushNotifications: elements.pushNotifications.checked,
      reportFrequency: elements.reportFrequency.value,
    },
    lastUpdated: new Date().toISOString(),
  };
}

// Atualizar preview JSON
function updateJsonPreview() {
  const currentConfig = collectFormData();
  elements.jsonPreview.textContent = JSON.stringify(currentConfig, null, 2);
}

// Atualizar status do cache
function updateCacheStatus() {
  const isEnabled = elements.cacheEnabled.checked;
  elements.cacheStatus.className = `status-indicator ${
    isEnabled ? "status-active" : "status-inactive"
  }`;
  elements.cacheStatus.innerHTML = `<span>●</span> ${
    isEnabled ? "Ativo" : "Inativo"
  }`;
}

// Mostrar notificação
function showNotification(message, type = "success") {
  elements.notification.textContent = message;
  elements.notification.className = `notification ${type}`;
  elements.notification.classList.add("show");

  setTimeout(() => {
    elements.notification.classList.remove("show");
  }, 3000);
}

// Salvar configuração
function saveConfiguration() {
  systemConfig = collectFormData();
  showNotification("✅ Configurações salvas com sucesso!", "success");
  console.log("Configuração salva:", systemConfig);
}

// Recarregar configuração
function loadConfiguration() {
  loadConfigurationToForm();
  updateJsonPreview();
  updateCacheStatus();
  showNotification("🔄 Configurações recarregadas!", "success");
}

// Exportar configuração como JSON
function exportConfiguration() {
  const currentConfig = collectFormData();
  const dataStr = JSON.stringify(currentConfig, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(dataBlob);
  link.download = `config-${new Date().toISOString().split("T")[0]}.json`;
  link.click();

  showNotification("📤 Configuração exportada!", "success");
}

// Resetar para configuração padrão
function resetConfiguration() {
  if (
    confirm(
      "Tem certeza que deseja resetar todas as configurações para os valores padrão?"
    )
  ) {
    systemConfig = {
      appearance: {
        theme: "light",
        primaryColor: "#667eea",
        compactMode: false,
      },
      system: {
        cacheEnabled: true,
        rateLimit: 100,
        verboseLogs: false,
      },
      users: {
        userRegistration: true,
        twoFactorAuth: false,
        sessionTimeout: 24,
      },
      notifications: {
        email: "admin@sistema.com",
        pushNotifications: true,
        reportFrequency: "weekly",
      },
      lastUpdated: new Date().toISOString(),
    };

    loadConfigurationToForm();
    updateJsonPreview();
    updateCacheStatus();
    showNotification("🔄 Configurações resetadas para o padrão!", "success");
  }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", initializeInterface);

// Simular mudanças de status do sistema (para demonstração)
setInterval(() => {
  const statuses = document.querySelectorAll(
    ".status-indicator:not(#cache-status)"
  );
  statuses.forEach((status) => {
    if (Math.random() < 0.1) {
      // 10% chance de mudança
      const isActive = status.classList.contains("status-active");
      status.className = `status-indicator ${
        isActive ? "status-inactive" : "status-active"
      }`;
      status.innerHTML = `<span>●</span> ${isActive ? "Offline" : "Online"}`;
    }
  });
}, 5000);
