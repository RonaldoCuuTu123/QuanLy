# ✅ Checklist - FE-BE Connection Setup

## 📋 Chuẩn bị (Preparation)

- [ ] Node.js đã cài đặt (v16+)
- [ ] MySQL đang chạy
- [ ] Database `Quan_ly_thu_phi` tồn tại
- [ ] Port 3001 và 5173 không bị chiếm

---

## 🔧 Backend Setup

### Installation
- [ ] Mở Terminal/PowerShell
- [ ] `cd BE/back-end`
- [ ] `npm install`

### Configuration
- [ ] Kiểm tra file `.env`:
  ```
  DB_HOST="127.0.0.1"
  DB_USER="root"
  DB_PASSWORD="admin"
  DB_NAME="Quan_ly_thu_phi"
  DB_PORT="3306"
  JWT_SECRET="key_123"
  ```
- [ ] Tất cả giá trị đúng với hệ thống của bạn

### Run Server
- [ ] Chạy: `npm start` hoặc `npm run dev`
- [ ] Xem output: `✅ Server đang chạy tại http://localhost:3001`
- [ ] Mở Browser: http://localhost:3001 (thấy JSON response)
- [ ] Kiểm tra Swagger: http://localhost:3001/api-docs

---

## 🎨 Frontend Setup

### Installation
- [ ] Mở Terminal mới (giữ Backend chạy)
- [ ] `cd FE`
- [ ] `npm install`

### Configuration
- [ ] Kiểm tra file `src/services/api.ts`:
  ```typescript
  const API_URL = 'http://localhost:3001/api'; // ✅ Đúng
  ```

### Run Server
- [ ] Chạy: `npm run dev`
- [ ] Xem output: `Local: http://localhost:5173`
- [ ] Mở Browser: http://localhost:5173

---

## 🧪 Test Kết nối

### Test 1: Direct API Call
- [ ] Mở Postman hoặc Terminal
- [ ] POST: `http://localhost:3001/api/users/login`
- [ ] Body: `{"username": "admin1234", "password": "1234"}`
- [ ] Response: `{ "message": "Login successful", "token": "...", "role": "...", "id": ... }`
- [ ] ✅ Nếu thành công, Backend API OK

### Test 2: Frontend Login
- [ ] Mở http://localhost:5173 trong Browser
- [ ] Nhập username: `admin1234`
- [ ] Nhập password: `1234`
- [ ] Nhấn "Đăng nhập" (Login)
- [ ] ✅ Nếu vào Dashboard, FE-BE kết nối đúng!

### Test 3: DevTools Console
- [ ] Mở DevTools: `F12` hoặc `Ctrl+Shift+I`
- [ ] Tab "Console"
- [ ] Không có lỗi đỏ/nguy hiểm
- [ ] ✅ All clear

### Test 4: Network Monitoring
- [ ] Mở DevTools → Network tab
- [ ] Refresh page: `F5`
- [ ] Kiểm tra request tới `/api/*`
- [ ] Status code: `200` ✅ (không 404 hoặc 500)

---

## 📊 Verify Features

Sau khi kết nối thành công, kiểm tra các tính năng:

### Authentication
- [ ] Đăng nhập với `admin1234/1234` → Thành công
- [ ] Xem localStorage: `token`, `role`, `userId` có giá trị
- [ ] Đăng xuất → Xóa localStorage
- [ ] Logout xong, redirect về login screen

### Dashboard
- [ ] Hiển thị thông tin từ Backend
- [ ] Không có lỗi kết nối

### Households Manager
- [ ] Tải danh sách hộ khẩu từ API
- [ ] Có thể tạo hộ khẩu mới
- [ ] Có thể sửa/xóa hộ khẩu

### Resident Manager
- [ ] Tải danh sách cư dân từ API
- [ ] Có thể tạo cư dân mới

### Fee Manager
- [ ] Tải danh sách thu phí từ API

### Statistics
- [ ] Hiển thị dữ liệu thống kê từ Backend

---

## 🐛 Troubleshooting Checklist

### ❌ "Cannot connect to Backend"
- [ ] Kiểm tra Backend đang chạy: `http://localhost:3001`
- [ ] Kiểm tra terminal Backend không có error
- [ ] Kiểm tra MySQL đang chạy
- [ ] Kiểm tra port 3001 không bị chiếm: `netstat -ano | findstr :3001`
- [ ] Restart Backend server

### ❌ "404 Not Found"
- [ ] Kiểm tra endpoint đúng trong `api.ts`
- [ ] Kiểm tra routes được mount trong `index.js`
- [ ] Kiểm tra method đúng (GET/POST/PUT/DELETE)

### ❌ "401 Unauthorized"
- [ ] Đăng nhập lại
- [ ] Xóa localStorage: `localStorage.clear()`
- [ ] Refresh page: `Ctrl+Shift+R` (hard refresh)
- [ ] Kiểm tra JWT_SECRET trong `.env`

### ❌ "500 Internal Server Error"
- [ ] Xem Backend console logs
- [ ] Kiểm tra Database connection
- [ ] Kiểm tra SQL queries có lỗi không
- [ ] Xem `.env` có missing values không

### ❌ CORS Error
- [ ] Kiểm tra Backend CORS cấu hình: `origin: '*'`
- [ ] Response headers có `Access-Control-Allow-Origin: *`
- [ ] Restart Backend server

---

## 📝 Important Notes

- [ ] **Frontend giao diện & chức năng KHÔNG thay đổi** ✅
- [ ] **Chỉ sửa các vấn đề kết nối** ✅
- [ ] **JWT Token được lưu trong localStorage** 🔐
- [ ] **Tất cả API calls đều cần Token (ngoại trừ /login)** 🔑
- [ ] **Backend port là 3001** 📌
- [ ] **Frontend port là 5173** 📌

---

## 🎉 Success Criteria

Dự án được coi là **hoàn tất** khi:

✅ Backend chạy tại `http://localhost:3001`  
✅ Frontend chạy tại `http://localhost:5173`  
✅ Có thể đăng nhập tại Frontend  
✅ Có thể lấy dữ liệu từ Backend  
✅ Không có CORS errors  
✅ Giao diện & chức năng giữ nguyên  
✅ DevTools Console không có errors đỏ  

---

## 📞 Quick Reference

| Item | Value |
|------|-------|
| Backend URL | http://localhost:3001 |
| API Base | http://localhost:3001/api |
| Frontend URL | http://localhost:5173 |
| Swagger Docs | http://localhost:3001/api-docs |
| Default User | admin1234 / 1234 |
| Database | Quan_ly_thu_phi |
| JWT Secret | key_123 (in .env) |

---

**Last Updated:** 12/01/2026  
**Status:** ✅ Ready to Test
