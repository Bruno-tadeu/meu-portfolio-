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

    /* ---------- 2) Validação do formulário ---------- */
  function mensagemDeErro(campo) {
    var estado = campo.validity;

    if (estado.valueMissing) {
      return campo.tagName === "SELECT"
        ? "Selecione uma opção."
        : "Preencha este campo.";
    }
    if (estado.typeMismatch) {
      return "Informe um e-mail válido, como voce@exemplo.com.";
    }
    if (estado.tooShort) {
      return "Digite pelo menos " + campo.minLength + " caracteres.";
    }
    if (estado.patternMismatch) {
      return "Formato inválido. Use apenas números, parênteses, hífen e espaços.";
    }
    return "Valor inválido.";
  }

  function mostrarErro(campo, texto) {
    var caixa = campo.closest(".campo");
    var idErro = "erro-" + campo.id;
    var erro = document.getElementById(idErro);

    if (!erro) {
      erro = document.createElement("p");
      erro.id = idErro;
      erro.className = "erro-campo";
      caixa.appendChild(erro);
    }

    erro.textContent = texto;
    caixa.classList.add("campo--erro");
    campo.setAttribute("aria-invalid", "true");
    campo.setAttribute("aria-describedby", idErro);
  }

  function limparErro(campo) {
    var caixa = campo.closest(".campo");
    var erro = document.getElementById("erro-" + campo.id);

    if (erro) {
      erro.remove();
    }
    caixa.classList.remove("campo--erro");
    campo.removeAttribute("aria-invalid");
    campo.removeAttribute("aria-describedby");
  }

  function mostrarFeedback(painel, tipo, texto) {
    painel.className = "feedback feedback--" + tipo;
    painel.textContent = texto;
  }

  function iniciarFormulario() {
    var form = document.querySelector(".form-grid");
    var painel = document.getElementById("feedback-form");
    if (!form || !painel) {
      return;
    }

    form.addEventListener("submit", function (evento) {
      evento.preventDefault();

      var invalidos = [];

      Array.prototype.forEach.call(form.elements, function (campo) {
        if (!campo.willValidate || !campo.closest(".campo")) {
          return;
        }
        if (campo.checkValidity()) {
          limparErro(campo);
        } else {
          mostrarErro(campo, mensagemDeErro(campo));
          invalidos.push(campo);
        }
      });

      if (invalidos.length > 0) {
        mostrarFeedback(
          painel,
          "erro",
          "Existem " + invalidos.length + " campo(s) com problema. " +
            "Corrija os itens destacados e envie novamente."
        );
        invalidos[0].focus();
        return;
      }

      var nome = form.elements["nome"].value.trim();
      form.reset();
      mostrarFeedback(
        painel,
        "sucesso",
        "Formulário válido! Obrigado pelo contato, " + nome + "."
      );
    });

    form.addEventListener("input", function (evento) {
      var campo = evento.target;
      if (campo.closest(".campo--erro")) {
        limparErro(campo);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    iniciarTema();
    iniciarFormulario();
  });
})();