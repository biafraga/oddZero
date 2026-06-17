# 🎲 ODDZERO

**A odd real das apostas é zero.**
Projeto de conscientização digital que expõe as armadilhas matemáticas e de UX/UI das plataformas de apostas (bets).

---

## 📂 Arquitetura de Pastas

A estrutura do projeto segue o padrão "Flat" para os arquivos raiz, com os recursos de apoio modularizados na pasta `assets`.

```text
ODDZERO/
├── assets/
│   ├── css/
│   │   ├── global.css     # Tokens, Reset, Menu, Footer e classes globais
│   │   └── home.css       # Estilos exclusivos da Landing Page
│   ├── js/
│   │   ├── global.js      # Cursor customizado e Menu Mobile
│   │   └── home.js        # Carrossel, Modais de Cards e Animações RTP
│   └── imagens/           # Fotos, ícones e assets visuais
├── index.html             # Página Inicial
├── simulador.html         # Tela: Simulador de RTP
├── casos-reais.html       # Tela: Casos Reais
├── forum.html             # Tela: Fórum Anônimo
├── ajuda.html             # Tela: Central de Ajuda
└── betblock.html          # Tela: Landing Page do BetBlock