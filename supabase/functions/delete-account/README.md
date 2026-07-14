# `delete-account` Edge Function

Permanently deletes the **calling** user's own Supabase auth record, server-side,
using the service-role key. The service-role key never leaves the server — it is
not in the client bundle, not in `VITE_` env vars, and not committed to git.

## How it's called

From the client (`AuthContext.deleteAccount`):

```ts
await supabase.functions.invoke("delete-account", { method: "POST" });
```

`functions.invoke` forwards the signed-in user's JWT automatically. The function
derives the user id from that token, so a caller can only ever delete their own
account.

## Deploy

```bash
# One-time: link your project
supabase link --project-ref <your-project-ref>

# Deploy the function
supabase functions deploy delete-account
```

## Required secrets

`SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` are
auto-injected into deployed Edge Functions by the Supabase platform — no manual
setup is needed for production.

For local `supabase functions serve`, provide them via a local (git-ignored)
env file or `supabase secrets set`.

## ⚠️ Cascade cleanup (owned by the schema owner)

Deleting the `auth.users` row does **not** automatically remove this user's rows
in `user_progress` / `feedback` unless those tables declare
`ON DELETE CASCADE` foreign keys referencing `auth.users(id)`.

Per the current task constraints, cleanup of `user_progress` / `feedback` is
**intentionally not** performed here — it belongs to the schema owner. If the
FKs do not already cascade, the schema owner should add them (or add explicit
cleanup to this function).
