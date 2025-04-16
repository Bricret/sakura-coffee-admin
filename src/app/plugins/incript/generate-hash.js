const argon2 = require('argon2');

async function generateHash() {
    const password = '123';
    try {
        const hash = await argon2.hash(password);
        console.log('Contraseña original:', password);
        console.log('Hash generado:', hash);
    } catch (error) {
        console.error('Error al generar el hash:', error);
    }
}

generateHash(); 