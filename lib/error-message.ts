
export const getErrorMsg = (error: unknown) => {
  let errorMsg = "An error occurred";
  if (error instanceof Error) {
    errorMsg = error.message;
  } else if (typeof error === "string") {
    errorMsg = error;
  }

  return errorMsg;
}