# 🗺️ Hướng Dẫn Sử Dụng Hệ Thống (User Guide)

## 📋 Mục Lục
1. [Khởi động](#khởi-động)
2. [Đăng nhập](#đăng-nhập)
3. [Giao diện chính](#giao-diện-chính)
4. [Hướng dẫn từng chức năng](#hướng-dẫn-từng-chức-năng)
5. [FAQ](#faq)

---

## 🚀 Khởi Động

### Bước 1: Mở 2 Terminal

**Terminal 1 - Backend**
```bash
cd back-end
npm start
# Chờ tới khi thấy: "Server is running at http://localhost:3000"
```

**Terminal 2 - Frontend**
```bash
npm run dev
# Chờ tới khi thấy: "Local:   http://localhost:5173"
```

### Bước 2: Mở Trình Duyệt
- Nhấp vào link hoặc gõ: `http://localhost:5173`

### Bước 3: Bạn sẽ thấy màn hình đăng nhập

```
┌─────────────────────────────────────┐
│  🔐 Hệ thống Quản lý Tổ Dân Phố     │
│     La Khê - Hà Đông                │
├─────────────────────────────────────┤
│ Tên đăng nhập: ___________________  │
│ Mật khẩu:     ___________________  │
│              [ Đăng nhập ]          │
├─────────────────────────────────────┤
│ Demo: admin1234 / 1234              │
└─────────────────────────────────────┘
```

---

## 🔐 Đăng Nhập

### Nhập Thông Tin
| Trường | Giá trị |
|-------|--------|
| 👤 Tên đăng nhập | `admin1234` |
| 🔑 Mật khẩu | `1234` |

### Nhấn "Đăng nhập"

→ Bạn sẽ được đưa đến **Bảng Điều Khiển (Dashboard)**

---

## 🎨 Giao Diện Chính

```
┌────────────────────────────────────────────────────────────┐
│ 🏠 Bảng Điều Khiển                        Nguyễn Bá Tú    │
│ Chào mừng trở lại, Ban quản lý TDP 7                      │
├────────────────────────────────────────────────────────────┤
│                                                            │
│ ┌──────────────┐  ┌─────────────────────────────────────┐ │
│ │ 🏠 Bảng Điều │  │ Thống Kê Nhanh                      │ │
│ │  Khiển      │  ├─────────────────────────────────────┤ │
│ │             │  │ 📊 Tổng hộ: 100                    │ │
│ │ 📋 Hộ Khẩu  │  │ 👥 Cư dân: 450                     │ │
│ │             │  │ 💰 Phí thu: 50,000,000             │ │
│ │ 👥 Nhân     │  │ ✅ Đã thu: 80%                     │ │
│ │  Khẩu       │  │                                    │ │
│ │             │  │ [Xem chi tiết...]                 │ │
│ │ 💳 Thu Phí  │  └─────────────────────────────────────┘ │
│ │             │                                            │
│ │ 📊 Thống Kê │  ┌─────────────────────────────────────┐ │
│ │             │  │ Hoạt Động Gần Đây                  │ │
│ │ [Đăng Xuất] │  ├─────────────────────────────────────┤ │
│ │ [Thu Gọn]   │  │ • Thêm hộ A5: Trần Thị C           │ │
│ │             │  │ • Thanh toán phí: 45 hộ            │ │
│ └──────────────┘  │ • Thêm 12 cư dân mới               │ │
│                    │ • Lập đợt thu phí Q2/2024           │ │
│                    └─────────────────────────────────────┘ │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Các Chế Độ Xem

| Icon | Tên | Mô tả |
|------|-----|--------|
| 🏠 | Bảng Điều Khiển | Xem thông tin tổng quan |
| 📋 | Quản lý Hộ khẩu | Thêm/sửa/xóa hộ khẩu |
| 👥 | Quản lý Nhân khẩu | Quản lý cư dân từng hộ |
| 💳 | Thu phí & Đóng góp | Quản lý thanh toán phí |
| 📊 | Thống kê báo cáo | Xem báo cáo chi tiết |

---

## 📖 Hướng Dẫn Từng Chức Năng

### 1️⃣ Quản Lý Hộ Khẩu

#### Xem Danh Sách
1. Nhấp **"Quản lý Hộ khẩu"** → Bạn sẽ thấy danh sách

```
┌──────────────────────────────────────────────┐
│ Danh Sách Hộ Khẩu                [+ Thêm]   │
├──────────────────────────────────────────────┤
│ # │ Số Hộ │ Chủ Hộ        │ Số Người │ Hành Động│
├──────────────────────────────────────────────┤
│ 1 │ A1    │ Nguyễn Văn A │ 4       │ ✏️ 🗑️  │
│ 2 │ A2    │ Trần Thị B   │ 3       │ ✏️ 🗑️  │
│ 3 │ A3    │ Phạm Văn C   │ 5       │ ✏️ 🗑️  │
└──────────────────────────────────────────────┘
```

#### Thêm Hộ Khẩu Mới
1. Nhấp **[+ Thêm]** → Form mở ra
2. Nhập:
   - Số hộ khẩu: `A5`
   - Tên chủ hộ: `Lê Văn D`
3. Nhấp **[Lưu]**

#### Sửa Thông Tin
1. Nhấp **✏️** (icon sửa) trên dòng hộ khẩu
2. Sửa thông tin
3. Nhấp **[Lưu]**

#### Xóa Hộ Khẩu
1. Nhấp **🗑️** (icon thùng rác)
2. Xác nhận xóa
3. Done! ✅

---

### 2️⃣ Quản Lý Nhân Khẩu (Cư Dân)

#### Xem Danh Sách Cư Dân
1. Nhấp **"Quản lý Nhân khẩu"**
2. Chọn hộ khẩu từ dropdown hoặc xem tất cả

```
┌───────────────────────────────────────────────┐
│ Danh Sách Cư Dân          [+ Thêm Cư Dân]    │
├───────────────────────────────────────────────┤
│ Hộ Khẩu: [A1 ▼]                              │
├───────────────────────────────────────────────┤
│ # │ Họ Tên  │ Ngày Sinh │ Giới Tính │ Mối Quan│
├───────────────────────────────────────────────┤
│ 1 │ Nguyễn│ 1985-01-15│ Nam       │ Chủ hộ │
│   │ Văn A  │           │           │       │
│ 2 │ Trần   │ 1988-05-20│ Nữ        │ Vợ    │
│   │ Thị B  │           │           │       │
└───────────────────────────────────────────────┘
```

#### Thêm Cư Dân Mới
1. Nhấp **[+ Thêm Cư Dân]**
2. Form mở ra:

```
┌──────────────────────────────┐
│ Thêm Cư Dân Mới              │
├──────────────────────────────┤
│ Hộ khẩu:    [A1 ▼]           │
│ Họ và tên:  [_________]      │
│ Ngày sinh:  [1995-01-01]     │
│ Giới tính:  [Nam ▼]          │
│ Mối quan.:  [Con ▼]          │
│ Quê quán:   [_________]      │
│ Dân tộc:    [Kinh ▼]         │
│ Nghề:       [_________]      │
│                              │
│  [Lưu]   [Hủy]              │
└──────────────────────────────┘
```

3. Điền đầy đủ thông tin
4. Nhấp **[Lưu]**

---

### 3️⃣ Thu Phí & Đóng Góp

#### Xem Đợt Thu Phí
1. Nhấp **"Thu phí & Đóng góp"**
2. Xem danh sách các đợt thu hiện tại

```
┌───────────────────────────────────────┐
│ Đợt Thu Phí                [+ Tạo]   │
├───────────────────────────────────────┤
│ # │ Tên Thu Phí  │ Từ Ngày │ Trạng Thái│
├───────────────────────────────────────┤
│ 1 │ Thu phí Q1  │ 01/01 │ Đang thu   │
│ 2 │ Thu phí Q2  │ 01/04 │ Hoàn thành │
└───────────────────────────────────────┘
```

#### Tạo Đợt Thu Phí Mới
1. Nhấp **[+ Tạo]**
2. Nhập:
   - Tên: `Thu phí Q3/2024`
   - Loại: `Bắt buộc`
   - Từ ngày: `01/07/2024`
3. Nhấp **[Tạo]**

#### Xem Chi Tiết Thanh Toán
1. Nhấp vào đợt thu phí
2. Xem danh sách hộ khẩu và trạng thái thanh toán

```
┌──────────────────────────────────────┐
│ Chi Tiết Thu Phí Q1/2024             │
├──────────────────────────────────────┤
│ Thống kê:                            │
│ • Tổng hộ: 100                      │
│ • Đã đóng: 80 (80%)                 │
│ • Chưa đóng: 20 (20%)               │
│ • Tổng thu: 40,000,000              │
│ • Còn nợ: 10,000,000                │
├──────────────────────────────────────┤
│ # │ Hộ Khẩu │ Số Tiền │ Trạng Thái  │
├──────────────────────────────────────┤
│ 1 │ A1      │ 500K    │ ✅ Đã đóng  │
│ 2 │ A2      │ 500K    │ ⏳ Chưa đóng│
└──────────────────────────────────────┘
```

#### Cập Nhật Thanh Toán
1. Nhấp vào dòng hộ khẩu
2. Chọn "Đánh dấu đã đóng" hoặc "Cập nhật thanh toán"
3. Xác nhận

---

### 4️⃣ Thống Kê & Báo Cáo

#### Xem Báo Cáo
1. Nhấp **"Thống kê báo cáo"**
2. Xem các biểu đồ và số liệu

```
┌────────────────────────────────────────┐
│ Báo Cáo Hệ Thống                       │
├────────────────────────────────────────┤
│                                        │
│ 📊 Thống Kê Hộ Khẩu                   │
│ ┌─────────────────┐                   │
│ │ Tổng số hộ: 100│                   │
│ │ Có xe: 45       │                   │
│ │ Không xe: 55    │                   │
│ └─────────────────┘                   │
│                                        │
│ 👥 Thống Kê Cư Dân                    │
│ ┌──────────────────┐                  │
│ │ Tổng: 450       │                  │
│ │ Nam: 230 (51%)  │                  │
│ │ Nữ: 220 (49%)   │                  │
│ └──────────────────┘                  │
│                                        │
│ 💰 Thống Kê Phí                       │
│ ┌──────────────────┐                  │
│ │ Tổng: 50M       │                  │
│ │ Đã thu: 40M     │                  │
│ │ Nợ: 10M         │                  │
│ └──────────────────┘                  │
│                                        │
└────────────────────────────────────────┘
```

---

## ❓ FAQ

### Q: Tôi quên mật khẩu phải làm sao?
**A:** Liên hệ quản trị viên để cấp lại mật khẩu.

### Q: Làm sao để thêm người dùng mới?
**A:** Chỉ quản trị viên mới có quyền thêm. Liên hệ admin.

### Q: Dữ liệu được lưu ở đâu?
**A:** Dữ liệu lưu trên máy chủ (Backend Database). Bạn tắt app hay tắt máy tính dữ liệu vẫn có.

### Q: Làm sao để backup dữ liệu?
**A:** Liên hệ quản trị viên để backup database.

### Q: Tôi có thể đôi lúc không đăng nhập được?
**A:** Kiểm tra:
- Backend có chạy không? (Mở terminal Backend, chạy `npm start`)
- Internet kết nối bình thường không?
- Thử refresh trang (F5)

### Q: Làm sao để in báo cáo?
**A:** Dùng chức năng Print của trình duyệt (Ctrl+P hoặc Cmd+P)

### Q: Có thể xóa hộ khẩu mà có cư dân không?
**A:** Không, phải xóa hết cư dân trước rồi mới xóa hộ khẩu.

### Q: Tại sao thêm cư dân không được?
**A:** Kiểm tra:
- Bạn đã chọn hộ khẩu chưa?
- Điền đầy đủ thông tin bắt buộc?
- Xem console (F12) có lỗi gì không?

### Q: Có thể sửa thông tin hộ khẩu sau khi tạo không?
**A:** Có, nhấp vào icon sửa (✏️) để thay đổi.

---

## 🎯 Các Tác Vụ Thường Gặp

### Tác Vụ 1: Lập Đợt Thu Phí Mới
```
1. Thu phí & Đóng góp → [+ Tạo]
2. Nhập tên đợt thu: "Thu phí Q4/2024"
3. Chọn loại: "Bắt buộc"
4. Nhập từ ngày: "2024-10-01"
5. Nhấp [Tạo]
6. Thu phí sẽ được tạo cho tất cả hộ khẩu
```

### Tác Vụ 2: Cập Nhật Thanh Toán
```
1. Thu phí & Đóng góp → Chọn đợt thu
2. Tìm hộ khẩu trong danh sách
3. Nhấp vào dòng hộ khẩu
4. Chọn "Đánh dấu đã đóng"
5. Ngày thanh toán tự động cập nhật
6. Xác nhận
```

### Tác Vụ 3: Thêm Người Vào Hộ
```
1. Quản lý Nhân khẩu → Chọn hộ khẩu
2. Nhấp [+ Thêm Cư Dân]
3. Điền thông tin: Họ tên, ngày sinh, mối quan hệ
4. Nhấp [Lưu]
5. Cư dân mới được thêm vào hộ
```

---

## 📞 Cần Giúp?

- **Gặp lỗi?** → Xem mục **FAQ** ở trên
- **Cần hướng dẫn?** → Xem **Hướng dẫn từng chức năng**
- **Không thể đăng nhập?** → Khởi động lại Backend
- **Dữ liệu không hiển thị?** → Refresh trang (F5)
- **Vẫn không giải quyết được?** → Liên hệ quản trị viên

---

**📝 Phiên bản: 1.0**  
**🗓️ Cập nhật: 12/01/2026**  
**✅ Trạng thái: Hoàn thành**

🎉 **Chúc bạn sử dụng hệ thống vui vẻ!** 🎉
