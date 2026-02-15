# Code Review — CrazyStackNextJs

**Branch:** `claude/code-review-document-fk5Sv`
**Base de comparacao:** `e91a41f` (merge branch 'aula20') → `8333eba` (HEAD)
**Data:** 2026-02-15

---

## Arquivos alterados

| Arquivo | Tipo de mudanca |
|:---|:---|
| `src/app/(pageswithheader)/(home)/page.tsx` | Refatoracao de cookies, error handling, data fetching |
| `src/app/(pageswithheader)/(home)/tweets/page.tsx` | Remocao de `getCookieData` com delay artificial |
| `src/app/(pageswithheader)/appointments/page.tsx` | Mesma refatoracao de cookies |
| `src/shared/api/api.ts` | Troca de `axios.get` por `fetch` nativo no refresh token |
| `src/app/(auth)/login/_components/signin-div.tsx` | Remocao de paragrafo duplicado |
| `package.json` | Bump Next.js 15.2.3 → 15.2.8 |
| `.cursor/rules/*.mdc` (10 arquivos) | Novas regras de Cursor IDE |
| `src/README.md` | Documentacao de estrutura do projeto |

---

## 1. Complexidade

### 1.1 — Waterfall de chamadas sequenciais na home page

**Arquivo:** `src/app/(pageswithheader)/(home)/page.tsx:80-96`

**Severidade:** Alta

As quatro chamadas de API sao feitas em serie (waterfall). Cada uma espera a anterior terminar antes de iniciar. Isso resulta em tempo total = soma de todas as latencias.

```typescript
// PROBLEMA: execucao sequencial — O(soma das latencias)
const popularOwners = await getOwnersPublic(1, cookies, { ... });  // ~200ms
const lastOwners = await getOwnersPublic(1, cookies, { ... });     // ~200ms
const { requests } = await handleRequests(cookies);                 // ~200ms
const { tweets } = await handleTweets(cookies);                     // ~200ms
// Total: ~800ms
```

**Correcao sugerida:**

```typescript
// CORRIGIDO: execucao paralela — O(max das latencias)
const [popularOwners, lastOwners, requestsResult, tweetsResult] =
  await Promise.all([
    getOwnersPublic(1, cookies, { sortBy: "appointmentsTotal", typeSort: "desc" }),
    getOwnersPublic(1, cookies, { sortBy: "createdAt", typeSort: "desc" }),
    handleRequests(cookies),
    handleTweets(cookies),
  ]);
// Total: ~200ms (o mais lento)
```

### 1.2 — `getOwnersPublic` busca 100 itens por pagina

**Arquivo:** `src/slices/belezix/entidades/owner/owner.api.ts`

**Severidade:** Media

O `limitPerPage = 100` esta hardcoded. Se a lista crescer, isso resulta em payloads grandes transferidos do backend e processados no servidor Next.js a cada request. Para a home page, onde so se exibem cards numa lista horizontal, provavelmente 10-20 itens seriam suficientes.

---

## 2. Legibilidade

### 2.1 — Codigo comentado (dead code) em multiplos locais

**Arquivo:** `src/app/(pageswithheader)/(home)/page.tsx:48,62,76,145`

**Severidade:** Media

Ha quatro ocorrencias de `//await clearServerCookies()` comentadas, e a propria funcao `clearServerCookies` esta definida (linhas 16-23) mas nunca e chamada. Isso polui o codigo e gera confusao sobre a intencao: a limpeza de cookies deveria acontecer ou nao?

```typescript
// Funcao definida mas nunca usada
const clearServerCookies = async () => { ... };

// Chamadas comentadas em 4 lugares
//await clearServerCookies();
```

**Acao:** Remover `clearServerCookies` e todos os comentarios associados, ou implementar a logica de fato. Codigo comentado nao e documentacao — e ruido.

### 2.2 — Imports nao utilizados

**Arquivo:** `src/app/(pageswithheader)/(home)/page.tsx:14`

**Severidade:** Baixa

```typescript
import { redirect } from 'next/navigation'; // nunca usado
```

O `redirect` e importado mas nunca chamado em nenhum lugar do arquivo. O import de `cookies` do `next/headers` (linha 13) tambem e desnecessario ja que `getCookies` abstrai esse acesso.

### 2.3 — Indentacao inconsistente

**Arquivo:** `src/app/(pageswithheader)/(home)/page.tsx`

**Severidade:** Baixa

O arquivo mistura indentacao de 2 e 3 espacos. Compare:

```typescript
async function getParsedCookies() {
   const cookies = await getCookies();    // 3 espacos
   if (!cookies) {
     return null;                         // 5 espacos
  }                                       // 2 espacos
  const parsedCookies = parseCookies(cookies);  // 2 espacos
```

Isso indica falta de formatacao automatica (Prettier/ESLint fix). Recomendacao: rodar o formatter no arquivo inteiro.

### 2.4 — `return null` em Server Component

**Arquivo:** `src/app/(pageswithheader)/(home)/page.tsx:77`

**Severidade:** Alta

```typescript
if (!cookies) {
  return null;  // pagina em branco — nenhum feedback ao usuario
}
```

Se o usuario nao tiver cookies (nao autenticado), a pagina retorna `null`, renderizando uma tela completamente em branco sem nenhum feedback. Deveria redirecionar para login ou mostrar conteudo publico.

O mesmo problema ocorre no `catch` na linha 144-146:

```typescript
} catch (error: any) {
  //await clearServerCookies();
  // retorno implicito undefined — tela em branco
}
```

### 2.5 — Fragment desnecessario

**Arquivo:** `src/app/(pageswithheader)/(home)/page.tsx:99,143`

**Severidade:** Baixa

```tsx
return (
  <>
    <main>...</main>
  </>
);
```

O `<>...</>` (Fragment) ao redor de um unico elemento `<main>` e redundante.

---

## 3. Repeticao de Codigo

### 3.1 — `getParsedCookies` duplicada em 3 arquivos

**Severidade:** Alta

A mesma funcao `getParsedCookies` esta definida em 3 arquivos diferentes com implementacoes ligeiramente divergentes:

| Arquivo | Implementacao |
|:---|:---|
| `(home)/page.tsx:25-35` | Usa `getCookies()` do utilitario compartilhado |
| `tweets/page.tsx:14-26` | Usa `(await cookies()).getAll()` diretamente |
| `appointments/page.tsx:69-81` | Usa `(await cookies()).getAll()` diretamente |

Duas versoes usam `cookies()` do `next/headers` diretamente, enquanto a home page usa o wrapper `getCookies()`. Todas fazem a mesma coisa. Isso ja foi parcialmente resolvido com `src/shared/libs/utils/cookies.ts`, mas a refatoracao ficou incompleta.

**Correcao sugerida:** Criar uma unica funcao `getParsedCookies` exportada de `@/shared/libs/utils/cookies`:

```typescript
// src/shared/libs/utils/cookies.ts
import { cookies } from "next/headers";
import { parseCookies } from "./parseCookies";

export async function getCookies() { ... } // ja existe

export async function getParsedCookies() {
  const cookieStore = await getCookies();
  if (!cookieStore) return null;
  const parsed = parseCookies(cookieStore);
  if (!parsed?.["belezixclient.token"]) return null;
  return parsed;
}
```

### 3.2 — `handleTweets` duplicada

**Severidade:** Media

`handleTweets` existe em `(home)/page.tsx:53-65` e `tweets/page.tsx:28-39` com logica quase identica. Deveria ser extraida para um modulo compartilhado ou colocada junto da API layer em `tweet.api.ts`.

---

## 4. Performance

### 4.1 — Nenhum Suspense boundary ou streaming

**Arquivo:** `src/app/(pageswithheader)/(home)/page.tsx`

**Severidade:** Alta

A home page faz 4 chamadas de API e bloqueia a renderizacao completa ate que todas terminem. Nao ha uso de `<Suspense>` com streaming do Next.js. O usuario ve uma tela em branco ate que tudo carregue.

**Correcao sugerida:** Separar em componentes async com Suspense:

```tsx
export default async function Page() {
  const cookies = await getParsedCookies();
  if (!cookies) return redirect('/login');

  return (
    <main>
      <Suspense fallback={<AppointmentsSkeleton />}>
        <AppointmentsSection cookies={cookies} />
      </Suspense>
      <Suspense fallback={<FeedSkeleton />}>
        <TweetFeedSection cookies={cookies} />
      </Suspense>
    </main>
  );
}
```

### 4.2 — Remocao do delay artificial de 1000ms — positivo

**Arquivos:** `tweets/page.tsx`, `appointments/page.tsx`

A antiga funcao `getCookieData` continha um `setTimeout` de 1 segundo completamente desnecessario:

```typescript
// REMOVIDO (bom!)
return new Promise((resolve) =>
  setTimeout(() => { resolve(cookieData); }, 1000)
);
```

Essa remocao e uma melhoria direta de performance. Positivo.

### 4.3 — Troca de axios por fetch no refresh token — parcialmente positiva

**Arquivo:** `src/shared/api/api.ts:41-57`

A troca de `api.get()` (axios) por `fetch()` nativo para o endpoint `/account/refresh` elimina dependencia circular (o interceptor do axios chamava o proprio axios). Isso resolve um problema real. Porem a implementacao adicionou complexidade com `.then()` chains que poderiam ser simplificadas com async/await.

### 4.4 — `.cursor/rules/` nao esta no `.gitignore`

**Severidade:** Baixa

Os 10 arquivos `.mdc` de regras do Cursor foram commitados no repositorio. Esses arquivos sao configuracao pessoal de IDE e deveriam estar no `.gitignore` (ou num `.gitignore` global), similar ao `.vscode/settings.json`. Se a equipe concordar em compartilha-los, tudo bem — mas isso deve ser uma decisao explicita.

---

## 5. Re-renders

### 5.1 — Vazamento de cookies para Client Component

**Arquivo:** `src/app/(pageswithheader)/appointments/page.tsx:64`

**Severidade:** Critica (tambem e issue de seguranca — ver secao 6)

```tsx
<AppointmentsList
  cookies={cookies}  // objeto com tokens de autenticacao passado ao client
/>
```

O objeto `cookies` contendo `belezixclient.token` e `belezixclient.refreshToken` e serializado e enviado ao client como prop de um Client Component. Isso significa que:

1. Os tokens aparecem no HTML enviado ao browser (payload do RSC)
2. Qualquer mudanca no objeto cookies no servidor causaria re-render do AppointmentsList inteiro
3. E uma vulnerabilidade de seguranca (detalhada na secao 6)

**Correcao:** Nao passar cookies para Client Components. Se o client precisa fazer requests autenticados, use cookies HttpOnly ou um endpoint de API interno.

### 5.2 — Type assertion `as any` no TweetList

**Arquivo:** `src/app/(pageswithheader)/(home)/page.tsx:136`

**Severidade:** Baixa

```tsx
<TweetList initialTweets={tweets as any} countTweets={countTweets} />
```

O `as any` mascara incompatibilidades de tipo entre o que a API retorna e o que o componente espera. Isso nao causa re-renders diretamente, mas impede que o compilador detecte problemas de referencia instavel ou mudancas de tipo que poderiam causar re-renders inesperados.

---

## 6. Seguranca

### 6.1 — CRITICO: Tokens de autenticacao expostos ao client

**Arquivo:** `src/app/(pageswithheader)/appointments/page.tsx:64`

**Severidade:** Critica

O objeto `cookies` contendo access token e refresh token e passado como prop para `<AppointmentsList>`, um Client Component. Isso expoe os tokens no payload HTML/RSC enviado ao browser, tornando-os acessiveis via:

- View Source
- DevTools Network tab (RSC payload)
- Qualquer XSS que consiga ler o DOM

**Impacto:** Um atacante com XSS pode extrair o refresh token (validade de 30 dias) e manter acesso persistente a conta da vitima.

**Correcao:** Remover a passagem de cookies para o Client Component. Buscar dados no servidor e passar apenas os dados necessarios.

### 6.2 — CRITICO: Refresh token via GET request

**Arquivo:** `src/shared/api/api.ts:41-47`

**Severidade:** Alta

```typescript
fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/refresh`, {
  method: 'GET',
  headers: {
    'refreshtoken': refreshToken,
  }
})
```

Problemas:

1. **GET para operacao com side-effect**: O refresh de token gera novos tokens (mutacao). Deveria ser POST/PUT.
2. **Token em header customizado sem prefixo**: O header `refreshtoken` nao segue convencoes (`X-Refresh-Token` ou uso do body em POST).
3. **GET requests podem ser logados**: Proxies, load balancers, e CDNs frequentemente logam URLs e headers de GET requests, potencialmente expondo o refresh token em logs de infraestrutura.
4. **Content-Type desnecessario**: `Content-Type: application/json` em um GET sem body e semanticamente incorreto e pode causar CORS preflight desnecessario.

### 6.3 — Cookie com `maxAge` de 30 dias para access token

**Arquivo:** `src/shared/api/api.ts:60-63`

**Severidade:** Alta

```typescript
setCookie(undefined, "belezixclient.token", token, {
  maxAge: 60 * 60 * 24 * 30, // 30 days
  path: "/",
});
```

Access tokens deveriam ter vida curta (15 min a 1 hora). Um token valido por 30 dias que e roubado concede acesso prolongado sem necessidade de refresh. Alem disso:

- Nao ha flag `httpOnly: true` — o token e acessivel via JavaScript
- Nao ha flag `secure: true` — o token pode ser enviado via HTTP sem TLS
- Nao ha flag `sameSite` — vulneravel a CSRF

### 6.4 — `signOut` invertido: so executa no servidor

**Arquivo:** `src/shared/api/api.ts:81-83,101-103`

**Severidade:** Media

```typescript
if (typeof window === "undefined") {
  signOut();  // so executa no servidor
}
```

A condicao `typeof window === "undefined"` faz com que `signOut` so execute em ambiente servidor. No browser (onde o usuario realmente precisa ser deslogado), nada acontece. A logica provavelmente deveria ser inversa, ou executar em ambos os ambientes.

### 6.5 — Variáveis mutaveis compartilhadas em nivel de modulo (race condition)

**Arquivo:** `src/shared/api/api.ts:4-5`

**Severidade:** Media

```typescript
let isRefreshing = false;
let failedRequestsQueue: any = [];
```

Em ambiente SSR (Next.js), o modulo e compartilhado entre requests de diferentes usuarios. Isso significa:

- Um request de **usuario A** pode setar `isRefreshing = true`
- Um request de **usuario B** entra no interceptor e ve `isRefreshing === true`, adicionando seu request a `failedRequestsQueue` do **usuario A**
- Quando o refresh do usuario A completa, os requests do usuario B sao retentados com o **token do usuario A**

**Impacto:** Potencial vazamento de sessao entre usuarios em ambientes com concorrencia.

**Correcao:** Mover o estado de refresh para dentro da closure de `setupAPIClient`, de modo que cada instancia tenha seu proprio estado.

### 6.6 — Uso extensivo de `any`

**Arquivos:** Todos os arquivos alterados

**Severidade:** Media

```typescript
async function handleRequests(cookies: any) { ... }
async function handleTweets(cookies: any) { ... }
export function setupAPIClient(ctx = undefined) { ... }
let failedRequestsQueue: any = [];
```

O uso de `any` desabilita toda verificacao de tipo, permitindo que dados malformados passem sem deteccao. Em contexto de seguranca, isso impede que o compilador detecte usos inseguros de dados nao validados.

---

## Resumo de Acoes

| Prioridade | Acao | Arquivos |
|:---|:---|:---|
| **P0 — Critica** | Remover passagem de cookies para Client Components | `appointments/page.tsx` |
| **P0 — Critica** | Corrigir race condition nas variaveis de modulo do interceptor | `api.ts` |
| **P1 — Alta** | Paralelizar chamadas de API com `Promise.all` | `(home)/page.tsx` |
| **P1 — Alta** | Adicionar flags de seguranca nos cookies (`httpOnly`, `secure`, `sameSite`) | `api.ts` |
| **P1 — Alta** | Trocar refresh token endpoint de GET para POST | `api.ts` |
| **P1 — Alta** | Tratar caso de usuario nao autenticado (redirect ao inves de `return null`) | `(home)/page.tsx` |
| **P2 — Media** | Extrair `getParsedCookies` para modulo compartilhado | `cookies.ts` |
| **P2 — Media** | Extrair `handleTweets` duplicado | `(home)/page.tsx`, `tweets/page.tsx` |
| **P2 — Media** | Remover dead code (`clearServerCookies`, comentarios, imports nao usados) | `(home)/page.tsx` |
| **P2 — Media** | Corrigir logica invertida do `signOut` | `api.ts` |
| **P3 — Baixa** | Adicionar `<Suspense>` boundaries com streaming | `(home)/page.tsx` |
| **P3 — Baixa** | Corrigir indentacao inconsistente | `(home)/page.tsx` |
| **P3 — Baixa** | Remover Fragment desnecessario | `(home)/page.tsx` |
| **P3 — Baixa** | Adicionar `.cursor/rules/` ao `.gitignore` (se nao for compartilhado intencionalmente) | `.gitignore` |
| **P3 — Baixa** | Substituir `as any` por tipos corretos | `(home)/page.tsx` |
