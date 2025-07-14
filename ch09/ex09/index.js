// SRPを満たさないコード
// Userクラスが「データの保持」「保存処理」「メール送信」の3つの責任を持ってしまっている。
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  saveToDatabase() {
    // データベースにユーザを保存する処理
  }

  sendEmail(message) {
    // ユーザにメールを送信する処理
  }
}

// SRPを満たすコード
// 役割ごとにクラスを定義している
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class UserRepository {
  save(user) {
    // ユーザをデータベースに保存
  }
}

class EmailService {
  sendEmail(user, message) {
    // ユーザにメールを送信
  }
}
