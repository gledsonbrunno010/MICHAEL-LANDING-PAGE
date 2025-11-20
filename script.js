/* script.js - JS simples, seguro e robusto */

/*
  Notas sobre analytics (opcional):
  - Se for usar um analytics externo, NÃO cole o script direto no HTML.
  - Em vez disso, coloque a URL segura e carregue condicionalmente:
      loadAnalytics('/meu-endpoint/umami.js', 'website-id');
  - O exemplo abaixo mostra como carregar condicionalmente.
*/

(function () {
  'use strict';

  // Helper: safe selector
  const $ = (sel, ctx = document) => ctx.querySelector(sel);

  // Atualiza ano no footer
  try {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  } catch (e) {
    // Não quebra se algo der errado
    console.error('Erro ao atualizar ano:', e);
  }

  // Menu responsivo (toggle)
  try {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
        if (mainNav.hasAttribute('hidden')) {
          mainNav.removeAttribute('hidden');
        } else {
          mainNav.setAttribute('hidden', '');
        }
      });
    }
  } catch (e) {
    console.error('Erro no menu toggle:', e);
  }

  // Formulário: validação simples e envio via fetch (exemplo)
  try {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const clearBtn = document.getElementById('clearBtn');

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (!form) return;
        form.reset();
        if (status) status.textContent = '';
      });
    }

    if (form) {
      form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        if (!form.checkValidity()) {
          if (status) status.textContent = 'Por favor, preencha todos os campos corretamente.';
          return;
        }

        // Coleta dados de forma segura
        const formData = new FormData(form);
        const payload = {};
        for (const [k, v] of formData.entries()) {
          payload[k] = String(v).trim();
        }

        // Mostrar feedback imediato
        if (status) status.textContent = 'Enviando...';

        // Envio via fetch para endpoint /enviar (server precisa tratar)
        fetch(form.action || '/enviar', {
          method: form.method || 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
          .then((res) => {
            if (!res.ok) throw new Error('Erro no envio');
            return res.json().catch(() => ({})); // tolerância se resposta sem JSON
          })
          .then((data) => {
            if (status) status.textContent = 'Mensagem enviada com sucesso.';
            form.reset();
          })
          .catch((err) => {
            console.error('Erro no envio do formulário:', err);
            if (status) status.textContent = 'Erro ao enviar. Tente novamente mais tarde.';
          });
      });
    }
  } catch (e) {
    console.error('Erro na lógica do formulário:', e);
  }

  // Função para carregar analytics condicionalmente (exemplo seguro)
  window.loadAnalytics = function (url, websiteId) {
    try {
      if (!url || url.includes('%VITE_') || !websiteId) return;
      // respeita Do Not Track
      if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return;

      const s = document.createElement('script');
      s.src = url;
      s.defer = true;
      s.dataset.websiteId = websiteId;
      s.crossOrigin = 'anonymous';
      s.onload = function () { console.log('Analytics carregado'); };
      s.onerror = function () { console.warn('Falha ao carregar analytics'); };
      document.head.appendChild(s);
    } catch (e) {
      console.error('Erro ao carregar analytics:', e);
    }
  };

  // Exemplo de uso (descomentear e trocar os valores reais)
  // window.addEventListener('load', () => {
  //   setTimeout(() => {
  //     loadAnalytics('/analytics/umami.js', 'SEU_WEBSITE_ID');
  //   }, 1200);
  // });

})();
