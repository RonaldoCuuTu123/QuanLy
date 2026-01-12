# Hướng dẫn Khởi động Nhanh (Quick Start)

## 📋 Yêu cầu hệ thống

- Node.js v16+ 
- npm hoặc yarn
- MySQL/MariaDB (cho Backend)

## 🚀 Bước 1: Chuẩn bị Backend

```bash
# Clone hoặc navigate đến thư mục backend
cd back-end

# Cài đặt dependencies
npm install

# Cấu hình file .env
# Tạo file .env với các biến sau:
# PORT=3000
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=
# DB_NAME=ktpm_database

# Khởi động server
npm start
# Hoặc development mode:
npm run dev
```

**Backend sẽ chạy tại:** `http://localhost:3000`

## 🚀 Bước 2: Chuẩn bị Frontend

```bash
# Navigate đến thư mục frontend
cd ../src

# Cài đặt dependencies
npm install

# Khởi động development server
npm run dev
# Hoặc
npm start
```

**Frontend sẽ chạy tại:** `http://localhost:5173` (hoặc port khác nếu 5173 đang dùng)

## 🔐 Đăng nhập

Mở trình duyệt và truy cập frontend URL.

**Thông tin đăng nhập mặc định:**
- 👤 Username: `admin1234`
- 🔑 Password: `1234`
- 👔 Role: `Tổ trưởng`

## ✅ Kiểm tra kết nối

### Kiểm tra Backend:
```bash
# Mở terminal và test API
curl http://localhost:3000/

# Kết quả mong đợi:
# { "data": "API is running..." }
```

### Kiểm tra kết nối trong Frontend:
1. Mở Developer Console (F12)
2. Đăng nhập thành công
3. Kiểm tra Network tab xem các request được gửi đúng

## 🎯 Các chức năng chính

| Chức năng | Endpoint | Trạng thái |
|----------|----------|----------|
| Đăng nhập | POST `/api/users/login` | ✅ |
| Quản lý Hộ khẩu | `/api/households/*` | ✅ |
| Quản lý Cư dân | `/api/residents/*` | ✅ |
| Quản lý Phí | `/api/fee-detail/*` | ✅ |
| Quản lý Phương tiện | `/api/vehicle/*` | ✅ |
| Quản lý Người dùng | `/api/users/*` | ✅ |

## 🐛 Troubleshooting

### Lỗi: "Cannot connect to server"

**Giải pháp:**
1. Kiểm tra Backend đang chạy: `npm start`
2. Kiểm tra port 3000 có bị chiếm dụng
3. Kiểm tra CORS settings trong Backend

### Lỗi: "Đăng nhập thất bại"

**Giải pháp:**
1. Xác nhận DB đã khởi tạo: `npm start` (lần đầu sẽ tạo tables)
2. Kiểm tra thông tin đăng nhập: `admin1234` / `1234`
3. Xem logs Backend để tìm lỗi chi tiết

### Dữ liệu không hiển thị

**Giải pháp:**
1. Mở F12 → Network tab
2. Kiểm tra các API request
3. Xem Response data format
4. Đảm bảo data mapping đúng trong `api.ts`

## 📚 Tài liệu thêm

- Xem `FRONTEND_BACKEND_CONNECTION.md` để hiểu chi tiết về API
- Xem Backend repo: https://github.com/RonaldoCuuTu123/KTPM_Project/tree/BE_12/1

## 🎓 Các tác vụ thường gặp

### Thêm hộ khẩu mới

```typescript
const result = await api.createHousehold({
    householdNumber: "A1",
    headName: "Nguyễn Văn A",
    street: "Đường La Khê",
    ward: "La Khê",
    district: "Hà Đông"
});
```

### Thêm cư dân

```typescript
const result = await api.createResident({
    householdId: "1",
    fullName: "Nguyễn Văn B",
    dob: "1990-01-01",
    gender: Gender.MALE,
    relationToHead: "Con"
});
```

### Lấy danh sách thanh toán

```typescript
const payments = await api.getPayments();
// Lọc theo hộ khẩu
const householdPayments = payments.filter(p => p.householdId === householdId);
```

## 🔄 Workflow Phát triển

```
1. Backend chạy → API ready
2. Frontend fetch data → Parse response
3. Hiển thị UI → User interact
4. CRUD operations → Update DB
5. Hiển thị kết quả
```

## 🌟 Tips

- 💾 Dữ liệu được lưu tại Backend → refresh page vẫn có dữ liệu
- 🔐 Token được lưu tại localStorage → auto-login nếu token còn hạn
- 🌐 CORS đã được cấu hình → không cần proxy
- 📱 Responsive design → hoạt động trên mobile

---

**Cập nhật:** 12/01/2026  
Hãy làm theo các bước này để bắt đầu phát triển! 🚀
