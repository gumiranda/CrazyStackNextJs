# Estrutura de Pastas - Crazy Stack Next.js

Esta documentação descreve a organização e propósito de cada diretório dentro da pasta `src` do projeto.

## Estrutura

```
src/
├── app/            # Contém as páginas e rotas da aplicação Next.js
├── application/    # Lógica de aplicação e casos de uso
├── components/     # Componentes React reutilizáveis
├── config/        # Configurações do projeto
├── hooks/         # Custom hooks React
├── lib/           # Bibliotecas e utilitários
├── services/      # Serviços externos e integrações com APIs
├── shared/        # Recursos compartilhados (tipos, constantes, etc.)
└── slices/        # Redux slices para gerenciamento de estado
```

## Detalhamento das Pastas

### `app/`
- Diretório principal do Next.js 13+
- Contém as páginas e rotas da aplicação
- Implementa o sistema de roteamento baseado em arquivos
- Layout e componentes específicos de página

### `application/`
- Contém a lógica de negócio da aplicação
- Casos de uso
- Regras de negócio
- Orquestradores de serviços

### `components/`
- Componentes React reutilizáveis
- Componentes de UI
- Componentes de layout
- Componentes de formulário
- Componentes específicos de domínio

### `config/`
- Configurações do projeto
- Variáveis de ambiente
- Configurações de tema
- Configurações de API
- Outras configurações globais

### `hooks/`
- Custom hooks React
- Lógica reutilizável entre componentes
- Abstrações de comportamentos comuns

### `lib/`
- Utilitários e helpers
- Funções auxiliares
- Integrações com bibliotecas
- Código de infraestrutura

### `services/`
- Implementações de serviços externos
- Chamadas de API
- Integrações com serviços de terceiros
- Camada de acesso a dados

### `shared/`
- Recursos compartilhados entre diferentes partes da aplicação
- Tipos TypeScript
- Constantes
- Enums
- Interfaces comuns
- Utilitários compartilhados

### `slices/`
- Redux slices para gerenciamento de estado
- Reducers
- Actions
- Selectors
- Estado global da aplicação

## Boas Práticas

1. Mantenha os componentes o mais desacoplados possível
2. Siga o princípio de responsabilidade única
3. Utilize importações absolutas a partir da pasta `src/`
4. Mantenha a coesão dos módulos
5. Documente alterações significativas na estrutura
6. Evite dependências circulares entre módulos

## Convenções de Nomenclatura

- Use PascalCase para componentes React
- Use camelCase para hooks, funções e variáveis
- Use kebab-case para nomes de arquivos de páginas no Next.js
- Adicione sufixo `.type.ts` para arquivos de tipos
- Adicione sufixo `.test.ts(x)` para arquivos de teste 