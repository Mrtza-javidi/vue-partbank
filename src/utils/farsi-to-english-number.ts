export function convertFarsiToEnglishNumbers(text: string): string {
  if (!text || typeof text !== "string") {
    return "ورودی باید از نوع string باشد";
  }
  return text.replace(/[\u06F0-\u06F9]/g, (char) => {
    return String.fromCharCode(char.charCodeAt(0) - 1728);
  });
}
