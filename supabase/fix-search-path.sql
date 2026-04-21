-- ═══════════════════════════════════════════════════════════════
-- Security Fix: Set search_path for trigger functions
-- Fixes: "Function has a role mutable search_path" warning
-- ═══════════════════════════════════════════════════════════════

-- Drop and recreate with secure search_path
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
SET search_path = ''       -- Lock search_path to prevent hijacking
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Verify all triggers still work (they reference the function by name)
-- No need to recreate triggers, just the function body is updated
