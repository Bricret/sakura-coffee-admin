import  argon2  from "argon2";

export async function IncriptPass( pass: string) {
    try {
        return await argon2.hash(pass);
      } catch (err) {
        throw new Error('Error al incriptar la contrasenia');
      }
}