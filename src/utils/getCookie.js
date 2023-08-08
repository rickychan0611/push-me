/**
 * plain js to get cookie when you can't use react hook
 * @param string name of the cookie
 * @returns string
 */
function getCookie(name) {
    if (typeof window !== 'undefined') {
        const a = `; ${document.cookie}`.match(`;\\s*${name}=([^;]+)`);
        const res = a?.[1].replace(/%20/g, " ")
        return res ? res: '';
    }
}

export default getCookie