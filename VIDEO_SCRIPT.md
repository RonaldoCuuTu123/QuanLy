# 🎥 Video Script - FE-BE Connection Setup

## Cảnh 1: Giới thiệu (0:00-0:30)

```
Host: Xin chào! Hôm nay chúng ta sẽ cải thiện kết nối giữa Frontend và Backend.
      Đã tìm thấy 3 lỗi chính trong Frontend, giờ sẽ sửa chữa chúng.
```

**Visual:**
- Hiển thị dashboard màn hình
- Code editor với các file liên quan

---

## Cảnh 2: Backend Setup (0:30-2:00)

```
Host: Trước tiên, chúng ta cần chuẩn bị Backend.
      Mở Terminal và navigate tới thư mục BE.
```

**Demo:**
```bash
cd BE/back-end
npm install
npm start
```

**Visual:**
- Terminal output: "✅ Server đang chạy tại http://localhost:3001"
- Browser: http://localhost:3001 hiển thị JSON response
- Swagger UI: http://localhost:3001/api-docs

**Host:** 
```
Backend đã sẵn sàng! Bây giờ chúng ta sửa Frontend.
```

---

## Cảnh 3: Lỗi #1 - Login Response Handler (2:00-3:30)

```
Host: Lỗi đầu tiên: Login response handler không chính xác.
      Backend trả về { message, token, role, id }
      Nhưng Frontend không xử lý đúng.
```

**Code Show (Before):**
```typescript
// ❌ SAI
const res = await axiosInstance.post('/users/login', { username, password });
return res.data;
```

**Code Show (After):**
```typescript
// ✅ ĐÚNG
return {
  token: res.data.token,
  role: res.data.role,
  id: res.data.id,
  message: res.data.message
};
```

**Location:** `FE/src/services/api.ts` (Line 26-36)

**Host:**
```
Bây giờ response được xử lý đúng cách. Tiếp tới lỗi thứ 2.
```

---

## Cảnh 4: Lỗi #2 - Error Handling (3:30-5:00)

```
Host: Lỗi thứ 2: Thiếu error handling khi login.
      Nếu có lỗi network, user không biết vấn đề là gì.
```

**Code Show:**
```typescript
// ❌ SAI - Error không được log đầy đủ
catch (err: any) {
  setLoginError(err.response?.data?.message || 'Đăng nhập thất bại...');
}

// ✅ ĐÚNG - Log đầy đủ
catch (err: any) {
  const errorMessage = err.response?.data?.message || err.message || 'Đăng nhập thất bại...';
  setLoginError(errorMessage);
  console.error('Login error details:', err);  // Log cho debug
}
```

**Location:** `FE/src/App.tsx` (Line 48-53)

**Demo:**
- Mở DevTools Console
- Thử đăng nhập sai → Xem error log chi tiết
- Giải thích cách debug

**Host:**
```
Bây giờ nếu có lỗi, user sẽ thấy rõ. Lỗi thứ 3 liên quan tới logout.
```

---

## Cảnh 5: Lỗi #3 - Logout Function (5:00-6:30)

```
Host: Lỗi thứ 3: Logout function không nhất quán.
      Sử dụng localStorage.clear() thay vì dùng centralized API function.
```

**Code Show:**
```typescript
// ❌ SAI - localStorage.clear() xóa toàn bộ data
const handleLogout = () => {
  localStorage.clear();
  // ...
}

// ✅ ĐÚNG - Chỉ xóa authentication data
const handleLogout = () => {
  api.logout();  // Sử dụng centralized function
  // ...
}
```

**Location:** `FE/src/App.tsx` (Line 59-67)

**Demo:**
- Xem localStorage trước logout
- Click logout button
- Kiểm tra localStorage sau logout (chỉ xóa cần thiết)

**Host:**
```
Ba lỗi chính đã được sửa! Bây giờ chúng ta test kết nối.
```

---

## Cảnh 6: Frontend Setup (6:30-7:30)

```
Host: Giờ khởi động Frontend.
```

**Demo:**
```bash
cd FE
npm install
npm run dev
```

**Visual:**
- Terminal output: "Local: http://localhost:5173"
- Browser: http://localhost:5173 hiển thị login screen

**Host:**
```
Frontend đã sẵn sàng! Bây giờ thử đăng nhập.
```

---

## Cảnh 7: Test Kết nối (7:30-9:00)

```
Host: Giờ thử đăng nhập để test kết nối FE-BE.
```

**Demo:**
1. Mở http://localhost:5173
2. Nhập username: `admin1234`
3. Nhập password: `1234`
4. Click "Đăng nhập"
5. (Wait for response)
6. ✅ Vào Dashboard thành công!

**DevTools Show:**
- Network tab: POST /api/users/login → 200 OK
- Response: token, role, id
- Console: Không có errors
- localStorage: token, role, userId

**Host:**
```
Tuyệt vời! FE-BE đã kết nối thành công!
Giờ chúng ta verify các tính năng khác.
```

---

## Cảnh 8: Feature Verification (9:00-11:00)

```
Host: Kiểm tra các tính năng khác.
```

**Demo 1: Quản lý Hộ khẩu**
```
1. Click "Quản lý Hộ khẩu" menu
2. Xem danh sách hộ khẩu tải từ Backend
3. Tạo hộ khẩu mới
4. Sửa hộ khẩu
5. Xóa hộ khẩu
✅ Tất cả hoạt động!
```

**Demo 2: Quản lý Cư dân**
```
1. Click "Quản lý Cư dân"
2. Tạo cư dân mới
3. Sửa/Xóa
✅ Hoạt động!
```

**Demo 3: Thống kê**
```
1. Click "Thống kê"
2. Xem dữ liệu từ Backend
✅ Hoạt động!
```

**Host:**
```
Giao diện FE vẫn giữ nguyên, tất cả tính năng hoạt động bình thường.
```

---

## Cảnh 9: Test Script (11:00-12:00)

```
Host: Tôi cũng tạo test script để bạn kiểm tra kết nối dễ dàng.
```

**Demo (Windows):**
```powershell
.\test_connection.ps1
```

**Output:**
```
[1/4] Kiểm tra Backend Server... ✓
[2/4] Kiểm tra Frontend Server... ✓
[3/4] Kiểm tra API Login... ✓
[4/4] Kiểm tra API Households... ✓
```

**Host:**
```
Chỉ một câu lệnh, bạn có thể kiểm tra toàn bộ kết nối!
```

---

## Cảnh 10: Documentation (12:00-12:30)

```
Host: Tôi cũng chuẩn bị các file tài liệu:
```

**Files:**
1. `FE_BE_SETUP.md` - Hướng dẫn chi tiết
2. `FE_BE_CONNECTION_FIX.md` - Báo cáo sửa chữa
3. `CHECKLIST.md` - Danh sách kiểm tra
4. `README_FE_BE.md` - File này

**Host:**
```
Tất cả tài liệu đều chi tiết và dễ theo dõi.
```

---

## Cảnh 11: Kết luận (12:30-13:00)

```
Host: Tóm tắt:

✅ Sửa 3 lỗi chính trong Frontend:
   1. Login response handler
   2. Error handling
   3. Logout function

✅ Giao diện FE không thay đổi
✅ Chức năng FE vẫn hoạt động bình thường
✅ FE-BE kết nối thành công

Backend không cần sửa, đã hoàn hảo!

Bạn có thể bắt đầu sử dụng hệ thống ngay!
```

**Visual:**
- Dashboard screenshot
- Các tính năng hoạt động

---

## Cảnh 12: Call to Action (13:00-13:30)

```
Host: Nếu bạn thấy hữu ích, vui lòng:
      - Like video này
      - Subscribe channel
      - Để bình luận nếu có câu hỏi

Cảm ơn đã xem!
```

**End Screen:**
- Subscribe button animation
- Related videos suggestions

---

## 📊 Timeline Summary

| Thời gian | Nội dung |
|-----------|---------|
| 0:00-0:30 | Giới thiệu |
| 0:30-2:00 | Backend setup |
| 2:00-3:30 | Lỗi #1 fix |
| 3:30-5:00 | Lỗi #2 fix |
| 5:00-6:30 | Lỗi #3 fix |
| 6:30-7:30 | Frontend setup |
| 7:30-9:00 | Test kết nối |
| 9:00-11:00 | Feature verification |
| 11:00-12:00 | Test script demo |
| 12:00-12:30 | Documentation |
| 12:30-13:00 | Kết luận |
| 13:00-13:30 | Call to action |

**Total: ~13 minutes**

---

## 🎬 Shooting Tips

1. **Code Highlighting:**
   - Highlight modified lines với màu vàng/xanh
   - Zoom vào code khi giải thích

2. **Terminal:**
   - Tăng font size để dễ đọc
   - Scroll chậm để người xem theo dõi

3. **Browser:**
   - DevTools mở to
   - Network tab rõ ràng
   - Console errors hiển thị rõ

4. **Transitions:**
   - Fade transition giữa scenes
   - Text overlays khi giải thích

5. **Audio:**
   - Nói chậm, rõ ràng
   - Background music nhẹ
   - Sound effect khi demo thành công

---

## 📝 Voiceover Script (Tiếng Việt)

[Xem phần Cảnh 1-12 ở trên]

---

**Video Length:** ~13 minutes  
**Format:** HD 1080p  
**Platform:** YouTube, Vimeo  
**Audience:** Developers, Students  
**Difficulty:** Intermediate
