export const arrayBufferToBase64=(buffer)=> {
    let binary = '';
    let bytes = [].slice.call(new Uint8Array(buffer));
    
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};