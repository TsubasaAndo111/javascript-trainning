export function isEmailAddress(email) {
    if (typeof email !== "string") return false;

    // localとdomainの文字数制限
    const MAX_LOCAL_PART_LENGTH = 64;
    const MAX_DOMAIN_LENGTH = 252;

    // 禁止文字とピリオドが連続して続くケース
    const forbiddenChars = /(?:[()<>\[\]:;@\\",\s]|\.{2,})/;

    // localとdomainに分割(@が2つ以上あればエラー)
    const parts = email.split("@");
    if (parts.length !== 2) return false;

    const [local, domain] = parts;

    if (
        !local || !domain ||
        local.length > MAX_LOCAL_PART_LENGTH ||
        domain.length > MAX_DOMAIN_LENGTH ||
        local.startsWith(".") ||
        local.endsWith(".") ||
        domain.startsWith(".") ||
        domain.endsWith(".") ||
        forbiddenChars.test(local) ||
        forbiddenChars.test(domain)
    ) {
        return false;
    }

    // 許可される local-part の文字（ドット以外）
    const reg = /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~.]+$/;

    if (!reg.test(local) || !reg.test(domain)) {
        return false;
    }

    return true;
}
