const bcrypt = require('bcrypt');

async function testBcrypt() {
  const enteredPassword = "Akshaya@04"; // Password you are entering in login
  const storedHash = "$2b$10$QAoYaV744iQDuiymh/DnL.aQONwjJCSr3D96R2XfpD/g.mVIgQygm"; // Password stored in DB

  const isMatch = await bcrypt.compare(enteredPassword, storedHash);
  console.log("Password Match Test:", isMatch);
}

testBcrypt();
