export const catchError = (error: unknown): string => {
  return error instanceof Error ? error.message : "";
};
