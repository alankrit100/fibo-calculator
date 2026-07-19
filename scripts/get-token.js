/**
 * One-time Fyers Access Token Generator
 *
 * Usage:
 *   1. Copy .env.example → .env, fill in FYERS_APP_ID and FYERS_SECRET_ID
 *   2. Run: node scripts/get-token.js
 *   3. Open the printed URL in your browser
 *   4. Login with Fyers and authorize the app
 *   5. Copy the auth_code from the redirect URL
 *   6. Paste it back here
 *   7. Copy the access_token into .env as FYERS_ACCESS_TOKEN
 */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const readline = require("readline");
const fyers = require("fyers-api-v3").fyersModel;

const appId = process.env.FYERS_APP_ID;
const secretKey = process.env.FYERS_SECRET_ID;
const redirectUri = "https://api.fyers.in/api/v3/token";

if (!appId || !secretKey) {
  console.error("\n❌ Missing FYERS_APP_ID or FYERS_SECRET_ID in .env\n");
  console.log("Add these to your .env file:");
  console.log("  FYERS_APP_ID=TVDRNZ8FVK-100");
  console.log("  FYERS_SECRET_ID=<your_secret_id>\n");
  process.exit(1);
}

const fy = new fyers();
fy.setAppId(appId);
fy.setRedirectUrl(redirectUri);
const authUrl = fy.generateAuthCode();

console.log("\n🔗 Step 1: Open this URL in your browser:");
console.log(`\n  ${authUrl}\n`);
console.log("📝 Step 2: Login with Fyers and authorize the app");
console.log("📝 Step 3: After authorization, the URL bar will show:");
console.log("    https://api.fyers.in/api/v3/token?auth_code=XXXX&...");
console.log("📝 Step 4: Copy the auth_code value from that URL\n");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("✏️  Paste the auth_code here: ", async (authCode) => {
  rl.close();
  const code = authCode.trim();

  if (!code) {
    console.error("\n❌ No auth_code provided\n");
    process.exit(1);
  }

  console.log("\n⏳ Exchanging auth_code for access_token...\n");

  fy.generate_access_token({
    client_id: appId,
    secret_key: secretKey,
    auth_code: code,
  })
    .then((response) => {
      if (response.s !== "ok") {
        console.error(`\n❌ Error: ${response.message || "Token exchange failed"}\n`);
        process.exit(1);
      }
      console.log("✅ Success! Add this to your .env file:\n");
      console.log(`  FYERS_ACCESS_TOKEN=${response.access_token}\n`);
      console.log("Then restart the server.\n");
    })
    .catch((err) => {
      console.error(`\n❌ Error: ${err.message}\n`);
      process.exit(1);
    });
});
