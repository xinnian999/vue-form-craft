export default function isRegexString(str: string) {
  const regexMetaCharacters = /[.*+?^${}()|[\]\\]/

  return regexMetaCharacters.test(str)
}
