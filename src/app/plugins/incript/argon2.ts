import  argon2  from "argon2";

export async function IncriptPass( pass: string ) {
    try {
        return await argon2.hash(pass);
      } catch (err) {
        throw new Error('Error al incriptar la contrasenia');
      }
}

export async function ComparePass( pass: string, hash: string ) {
    try {
        const verifyPass = await argon2.verify(hash, pass);
        return verifyPass;
      } catch (err) {
        throw new Error('Contraseña incorrecta, intente de nuevo');
      }
}