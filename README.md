# Portfólio pessoal — CP3

Site pessoal estático com 5 páginas em HTML5 semântico, CSS3 responsivo e
JavaScript, versionado no GitHub e publicado com HTTPS.

## Estrutura

```
index.html        — página inicial
curriculo.html     — formação, experiência (tabela) e habilidades
formulario.html    — formulário de contato com validação
multimidia.html    — vídeo/áudio + iframe de mapa
graficos.html       — canvas desenhado via JavaScript + SVG estilizado
css/estilos.css    — folha de estilos externa única
js/scripts.js      — JavaScript do site (tema e formulário)
img_mp3_mp4/        — imagens e mídia do site
.gitignore          — arquivos que não entram no repositório
```

## Feature JavaScript: tema claro/escuro (localStorage)

**O que faz:** o botão "Mudar para tema claro/escuro", presente no cabeçalho de
todas as páginas, alterna entre o tema escuro (padrão) e o claro. A escolha é
lembrada nas próximas visitas e vale para as 5 páginas.

**Como testar:**
1. Abra qualquer página e clique no botão do cabeçalho — as cores mudam.
2. Recarregue a página (F5): o tema escolhido continua aplicado.
3. Navegue para outra página pelo menu: o mesmo tema é mantido.
4. No DevTools, abra Application → Local Storage e veja a chave `portfolio-tema`.

**Dados persistidos (localStorage):**
- `portfolio-tema`: valor `light` ou `dark`.

## Formulário com validação

Em `formulario.html`, ao enviar, o JavaScript valida os campos e mostra as
mensagens na própria página (sem `alert`): cada campo inválido recebe uma
mensagem abaixo dele, e um painel de resumo informa o resultado. Quando tudo
está correto, aparece a mensagem de sucesso. Os dados do formulário não são
salvos nem enviados a nenhum servidor.

## Como visualizar

Abra `index.html` diretamente no navegador — não é necessário servidor.