// Validate ingredient request body
export const validateIngredientBody = (body: unknown): boolean => {
  if (!body || typeof body !== "object") {
    return false;
  }

  const { name, characteristics } = body as Record<string, unknown>;

  return (
    typeof name === "string" &&
    name.trim().length > 0 &&
    typeof characteristics === "string" &&
    characteristics.trim().length > 0
  );
};

// Validate ingredient ID
export const validateIngredientId = (id: unknown): boolean => {
  return (
    typeof id === "string" &&
    /^[1-9]\d*$/.test(id) &&
    Number.isSafeInteger(Number(id)) &&
    Number(id) <= 2147483647
  );
};