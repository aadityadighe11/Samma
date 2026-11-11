// Turns a failure reason from the server into a line for the screen.
export function failureMessage(reason: string | undefined, kept: string): string {
  switch (reason) {
    case "no_key":
      return "Setup needed: the AI key is missing on the server.";
    case "bad_key":
      return "Setup needed: the AI key was rejected. It may have expired.";
    case "model":
      return "Setup needed: the AI model is not available for this key.";
    case "quota":
      return "The AI quota is used up for now. Wait a minute, then try again.";
    default:
      return `The connection did not hold. ${kept}`;
  }
}
