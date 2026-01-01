import crypto from "crypto";
// ここを埋める
import { promises as fs } from "fs";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 鍵を生成する
function generateKey() {
  // 32バイトの暗号論的疑似乱数を生成する
  // ここを埋める
  return crypto.randomBytes(32);
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す。
function encrypt64(text, key) {
  // 16バイトの暗号論的疑似乱数を初期化ベクトル (IV) とする
  // ここを埋める
  const iv = crypto.randomBytes(16);

  // 暗号化とBase64エンコード
  // ここを埋める
  // createCipheriv は アルゴリズム + キー + IV を指定して crypto.Cipher インスタンスを作る
  // キー長は 32 バイト必須
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  // Cipher インスタンスを使って、実際に暗号化を行う
  const encrypted = Buffer.concat([
    // 平文のバッファを暗号化処理に投入(ブロック単位で処理を行う)
    cipher.update(Buffer.from(text, "utf8")),
    // 暗号化の終了処理
    // 最後に残っている未満ブロックに対してPKCS#7 パディングを付けて暗号化し、残りの暗号文を出力
    // これがないと末尾のブロックが出力されないらしい？
    cipher.final(),
  ]);

  // 暗号化したバイナリをテキストに変換
  const encryptedBase64 = encrypted.toString("base64");

  // 暗号文とIVをbase64で返す
  return {
    value: encryptedBase64,
    iv: iv.toString("base64"),
  };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
  // ここを埋める（fs.promisesで鍵を保存）
  const filePath = path.join(__dirname, "key.json");
  const payload = { key: key.toString("base64") };
  await fs.writeFile(filePath, JSON.stringify(payload, null, 2), "utf8");
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
  // ここを埋める（fs.promisesで暗号データを保存）
  const filePath = path.join(__dirname, "encrypt.json");
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

async function readKey() {
  // ここを埋める（return Promise<鍵>）
  const filePath = path.join(__dirname, "key.json");
  const text = await fs.readFile(filePath, "utf8");
  const obj = JSON.parse(text);
  return Buffer.from(obj.key, "base64");
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
  // ここを埋める（return Promise<data>）
  const filePath = path.join(__dirname, "encrypt.json");
  const text = await fs.readFile(filePath, "utf8");
  return JSON.parse(text);
}

// 復号して平文を返す
function decrypt64(data, key) {
  // ここを埋める
  const iv = Buffer.from(data.iv, "base64");
  const encrypted = Buffer.from(data.value, "base64");
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}

// 指定の平文を暗号化とBase64エンコードし、後に復号する一連の処理
(async () => {
  // 平文
  const text = "Hello, World!";

  // 暗号化とBase64エンコード
  const key = generateKey();
  const encryptedData = encrypt64(text, key);

  // 鍵と暗号データをJSONで保存
  await writeKey(key);
  await writeEncrypt64(encryptedData);

  console.log("Encrypted Text (Base64):", encryptedData.value);

  // Base64デコードと復号
  const storedKey = await readKey();
  const storedEncryptedData = await readEncrypt64();
  const decryptedText = decrypt64(storedEncryptedData, storedKey);

  console.log("Decrypted Text:", decryptedText);
})();
