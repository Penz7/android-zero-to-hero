# Security Fixes — Supabase

## Fix 1: Function Search Path Mutable
Run in Supabase SQL Editor:

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

## Fix 2: Leaked Password Protection
Enable in Supabase Dashboard:
1. Dashboard → Authentication → Settings
2. Find "Leaked Password Protection"
3. Toggle ON

This checks passwords against HaveIBeenPwned.org on signup/password change.
