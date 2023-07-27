import bcrypt from 'bcryptjs';

export const encryptPassword = (hash) => {
  bcrypt.hash(hash, 10, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      return res;
    }
  });
};
