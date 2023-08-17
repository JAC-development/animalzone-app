import { sign } from 'jsonwebtoken';
// import { serialize } from 'cookie';
import Cookies from 'js-cookie';

export default function login(email, rol) {
  // create a token to save in cookie
  try {
    const token = sign(
      {
        email: email,
        username: 'Cesarin',
        rol: rol,
      },
      process.env.secretKey
    );
    Cookies.set('signIn', token, { expires: 7, secure: true, sameSite: 'None' });
    console.log('login successful');
  } catch (error) {
    console.log(error);
  }
  return rol;
}
