// Supabase Edge Function: delete-account
// ---------------------------------------------------------------------------
// Permanently deletes the *calling* user's own Supabase auth record using the
// service-role key. The service-role key lives ONLY in this server-side
// function's environment (Supabase function secrets) — it is never shipped to
// the browser bundle, never committed, and never exposed to the client.
//
// Security model:
//   1. The client calls this function via `supabase.functions.invoke(...)`,
//      which forwards the signed-in user's JWT in the Authorization header.
//   2. We create a *user-scoped* client from that JWT and call getUser() to
//      resolve WHICH user is making the request. This means a caller can only
//      ever delete THEIR OWN account — the user id is derived from their token,
//      never from request input.
//   3. We then use a separate *service-role* client to perform the actual
//      admin delete.
//
// Deploy:
//   supabase functions deploy delete-account
// Required function secrets (set via `supabase secrets set` or the dashboard):
//   SUPABASE_URL              — auto-injected by the platform
//   SUPABASE_ANON_KEY         — auto-injected by the platform
//   SUPABASE_SERVICE_ROLE_KEY — auto-injected by the platform (server-side only)
//
// NOTE ON CASCADE CLEANUP (flagged for the schema owner):
//   Deleting the auth.users row does NOT automatically remove this user's rows
//   in `user_progress` / `feedback` unless those tables declare
//   `ON DELETE CASCADE` foreign keys referencing auth.users(id). Per the task
//   constraints, cascade/cleanup of user_progress & feedback is intentionally
//   NOT handled here — it is owned by the schema owner. If those FKs do not
//   already cascade, the schema owner should add them (or add cleanup here).

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.108.1";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  // Preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    console.error("[delete-account] missing environment configuration");
    return json({ error: "Server is not configured for account deletion." }, 500);
  }

  // 1. Identify the caller from their forwarded JWT.
  const authHeader = req.headers.get("Authorization") ?? "";
  if (!authHeader.toLowerCase().startsWith("bearer ")) {
    return json({ error: "Not authenticated." }, 401);
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: userData, error: userErr } = await userClient.auth.getUser();
  if (userErr || !userData?.user) {
    return json({ error: "Invalid or expired session." }, 401);
  }
  const userId = userData.user.id;

  // 2. Perform the privileged delete with the service-role client.
  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error: deleteErr } = await adminClient.auth.admin.deleteUser(userId);
  if (deleteErr) {
    console.error("[delete-account] delete failed:", deleteErr.message);
    return json({ error: "Failed to delete account. Please try again." }, 500);
  }

  return json({ success: true });
});
