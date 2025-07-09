<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  Một framework hiện đại dựa trên <a href="http://nodejs.org" target="_blank">Node.js</a> để xây dựng các ứng dụng phía server hiệu quả và có khả năng mở rộng.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="Phiên bản NPM" />
  </a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Giấy phép" />
  </a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="Lượt tải NPM" />
  </a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank">
    <img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord" />
  </a>
</p>

---

# 📘 Dự án Blog API với NestJS

> Dự án backend được xây dựng bằng **NestJS + TypeORM + PostgreSQL**, hỗ trợ tạo/sửa/xoá bài viết, thêm bài yêu thích, phân trang, xác thực người dùng.

---

## 🚀 Bắt đầu nhanh

### 1. Cài đặt thư viện

```bash
npm install
```

### 2. Cấu hình cơ sở dữ liệu

Chỉnh sửa file `src/ormconfig.ts` với thông tin kết nối PostgreSQL:

```ts
{
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'your_password',
  database: 'your_db_name',
  ...
}
```

### 3. Khởi tạo và chạy migration

```bash
npm run migration:run
```

> Nếu muốn xoá toàn bộ schema:
```bash
npm run db:drop
```

### 4. Khởi động server NestJS

```bash
npm run start:dev
```

---

## 🧪 Kiểm thử

### Chạy unit tests:

```bash
npm run test
```

### Chạy kiểm thử và theo dõi thay đổi:

```bash
npm run test:watch
```

### Xem độ phủ mã (code coverage):

```bash
npm run test:cov
```

---

## ⚙️ Một số lệnh hữu ích khác

| Lệnh | Chức năng |
|------|-----------|
| `npm run build` | Biên dịch TypeScript sang JavaScript |
| `npm run start` | Chạy ở chế độ bình thường |
| `npm run start:prod` | Chạy bản biên dịch production |
| `npm run migration:generate --name=TenMigration` | Tạo migration mới |
| `npm run migration:run` | Chạy các file migration |
| `npm run db:drop` | Xoá toàn bộ schema cơ sở dữ liệu |

---

## 📦 Các thư viện chính

- `@nestjs/core`: Framework chính
- `@nestjs/typeorm`: ORM cho cơ sở dữ liệu
- `class-validator`, `class-transformer`: Kiểm tra dữ liệu đầu vào
- `bcrypt`: Mã hoá mật khẩu
- `jsonwebtoken`: Xác thực JWT
- `pg`: PostgreSQL driver

---

## 📎 Tài nguyên hữu ích

- 📖 Tài liệu chính thức: [https://docs.nestjs.com](https://docs.nestjs.com)
- 🧑‍💬 Hỏi đáp cộng đồng: [Discord NestJS](https://discord.gg/G7Qnnhy)
- 🎥 Khoá học chính thức: [https://courses.nestjs.com](https://courses.nestjs.com)

---

## 📜 Giấy phép

Dự án này sử dụng giấy phép [MIT](https://opensource.org/licenses/MIT).
