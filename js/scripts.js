/* =========================================================
   SCRIPTS.JS — Portfólio pessoal (CP3)
   1) Tema claro/escuro persistido em localStorage (todas as páginas)
   2) Validação do formulário com feedback na tela (formulario.html)
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 1) Tema claro/escuro ---------- */
  var CHAVE_TEMA = "portfolio-tema";

  function lerTema() {
    try {
      return localStorage.getItem(CHAVE_TEMA);
    } catch (erro) {
      return null;
    }
  }

  function salvarTema(tema) {
    try {
      localStorage.setItem(CHAVE_TEMA, tema);
    } catch (erro) {
      /* localStorage indisponível: o tema vale só nesta visita */
    }
  }

  function aplicarTema(tema) {
    document.documentElement.setAttribute("data-theme", tema);

    var botao = document.querySelector(".botao-tema");
    if (botao) {
      botao.textContent =
        tema === "light" ? "Mudar para tema escuro" : "Mudar para tema claro";
    }
  }

  function iniciarTema() {
    var botao = document.querySelector(".botao-tema");
    if (!botao) {
      return;
    }

    aplicarTema(document.documentElement.getAttribute("data-theme"));

    botao.addEventListener("click", function () {
      var atual = document.documentElement.getAttribute("data-theme");
      var novo = atual === "light" ? "dark" : "light";
      aplicarTema(novo);
      salvarTema(novo);
    });
  }

  /* Aplica o tema salvo já no carregamento, antes de a página aparecer */
  document.documentElement.setAttribute(
    "data-theme",
    lerTema() === "light" ? "light" : "dark"
  );

  /* ---------- 2) Validação do formulário (Etapa 4) ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    iniciarTema();
  });
})();