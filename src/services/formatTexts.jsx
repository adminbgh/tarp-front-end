function formatTexts(text, characters) {
  if (text?.length > characters) {
    return text?.substring(0, characters) + "..."
  }
  return text
}

export { formatTexts }
