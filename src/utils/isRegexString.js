export default function isRegexString(str) {
  const regexMetaCharacters = /[.*+?^${}()|[\]\\]/

  return regexMetaCharacters.test(str)
}
