import crypto from 'crypto';

function hashStringToDigits(project_id) { 
    // Hash the string using the SHA-256 algorithm.
    const hash = crypto.createHash('sha256').update(project_id).digest('hex');
    // Get the string of digit numbers from the hash.
    const digitsString = hash.match(/\d+/g).join('');
    return digitsString;
}

export {hashStringToDigits}