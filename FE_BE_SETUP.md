# 🚀 Hướng dẫn Kết nối FE - BE

## ✅ Các sửa chữa đã thực hiện

### Backend (BE)
- ✔️ CORS đã được cấu hình đúng với `origin: '*'`
- ✔️ JWT Secret đã được cấu hình trong `.env`
- ✔️ Server chạy trên port `3001`
- ✔️ API routes đúng: `/api/users/login`, `/api/households/*`, `/api/residents/*`, etc.

### Frontend (FE)
- ✔️ API URL cấu hình: `http://localhost:3001/api`
- ✔️ Login response handler đã được fix
- ✔️ Response interceptor xử lý 401 errors
- ✔️ Request interceptor thêm JWT token vào headers

---

## 📋 Yêu cầu

- **Node.js** v16+ 
- **npm** hoặc **yarn**
- **MySQL** 5.7+ (database phải có sẵn)

---

## 🔧 Cài đặt & Chạy

### 1. Setup Backend

```bash
# Vào thư mục BE
cd d:\Dmini\Dowload\New_Project_Final\BE\back-end

# Cài đặt dependencies
npm install

# Kiểm tra file .env
# Đảm bảo DB_HOST, DB_USER, DB_PASSWORD, DB_NAME đúng

# Chạy migration database (nếu cần)
# mysql -u root -p < ../database/finalDB1.sql

# Khởi động server
npm start
# hoặc
npm run dev
```

**Output mong đợi:**
```
==================================================
✅ Server đang chạy tại http://localhost:3001
📚 Swagger UI: http://localhost:3001/api-docs
🔧 Môi trường: development
🔓 CORS: Enabled (*)
🛡️  CSP: Disabled
==================================================
```

### 2. Setup Frontend

```bash
# Mở terminal mới
cd d:\Dmini\Dowload\New_Project_Final\FE

# Cài đặt dependencies
npm install

# Khởi động dev server
npm run dev
# hoặc
npm run build  # Để build production
```

**Output mong đợi:**
```
Local:   http://localhost:5173/
```

---

## 🧪 Kiểm tra Kết nối

### 1. Test Backend API

```bash
# Mở Browser hoặc Postman, test endpoint:
curl -X POST http://localhost:3001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin1234", "password": "1234"}'

# Response mong đợi:
# {
#   "message": "Login successful",
#   "token": "eyJhbGciOiJIUzI1NiIs...",
#   "role": "Tổ trưởng",
#   "id": 1
# }
```

### 2. Test Swagger UI

- Truy cập: `http://localhost:3001/api-docs`
- Test các endpoints trực tiếp từ Swagger

### 3. Test Frontend Login

1. Mở `http://localhost:5173/` trong browser
2. Đăng nhập với:
   - Username: `admin1234`
   - Password: `1234`
3. Nếu thành công, bạn sẽ thấy Dashboard
4. Mở **DevTools (F12)** → **Console** để xem logs

---

## 🐛 Troubleshooting

### ❌ Frontend không kết nối được Backend

**Triệu chứng:** `Không thể tải dữ liệu từ server`

**Giải pháp:**
1. Kiểm tra Backend có đang chạy: `http://localhost:3001`
2. Mở DevTools Console để xem chi tiết error
3. Kiểm tra CORS headers trong Response:
   ```
   Access-Control-Allow-Origin: *
   ```
4. Kiểm tra port không bị chiếm:
   ```bash
   # Windows
   netstat -ano | findstr :3001
   netstat -ano | findstr :5173
   ```

### ❌ Lỗi 404 Not Found

**Triệu chứng:** `404 - Route not found`

**Giải pháp:**
1. Kiểm tra endpoint trong `api.ts`:
   - `http://localhost:3001/api/users/login` ✔️
   - `http://localhost:3001/api/households/get-all-households` ✔️
2. Kiểm tra routes được mount đúng trong `index.js`

### ❌ Lỗi 500 Internal Server Error

**Triệu chứng:** `500 - Internal Server Error`

**Giải pháp:**
1. Kiểm tra MySQL connection:
   ```bash
   mysql -u root -p
   ```
2. Kiểm tra database `Quan_ly_thu_phi` tồn tại
3. Xem logs Backend để debug

### ❌ JWT Token Error

**Triệu chứng:** `401 - Unauthorized`

**Giải pháp:**
1. Đăng nhập lại để lấy token mới
2. Kiểm tra `.env` có `JWT_SECRET` không
3. Xóa localStorage và refresh page

---

## 📚 API Endpoints (Common)

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/users/login` | Đăng nhập |
| GET | `/api/users/get-all-user` | Lấy danh sách users |
| GET | `/api/households/get-all-households` | Lấy danh sách hộ khẩu |
| POST | `/api/households/create-household` | Tạo hộ khẩu |
| GET | `/api/residents/get-all-residents` | Lấy danh sách cư dân |
| POST | `/api/residents/create-resident` | Tạo cư dân |

🔍 Xem chi tiết tất cả endpoints: `http://localhost:3001/api-docs`

---

## 💡 Tips

- Sử dụng Vite DevTools extension cho React debugging
- Sử dụng Postman/Insomnia để test API trực tiếp
- Kiểm tra Network tab trong DevTools để xem request/response
- Xem Backend logs trong terminal khi debug

---

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra console logs (FE) và terminal logs (BE)
2. Xóa `node_modules` và chạy `npm install` lại
3. Kiểm tra Database connection
4. Khởi động lại cả 2 services
