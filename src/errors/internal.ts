export interface InternalError {
  message: string | object;
  status: number;
  internalCode: string;
}

export const createInternalError = (
  status: number,
  internalCode: string,
): (message: string | object) => InternalError => {
  return (message: string | object): InternalError => ({
    message,
    status,
    internalCode,
  });
};

export const isInternalError = (error: unknown): error is InternalError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "internalCode" in error &&
    "message" in error &&
    "status" in error
  );
};
