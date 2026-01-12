# Tài liệu Kết nối Frontend với Backend

## Tổng quan

Dự án đã được cập nhật để hoàn thiện kết nối với Backend được phát triển tại branch `BE_12/1` của repository `https://github.com/RonaldoCuuTu123/KTPM_Project`.

## Thay đổi chính

### 1. **Cập nhật API Service** (`src/services/api.ts`)

#### Điều chỉnh đầu cuối (Endpoints) và Tên trường dữ liệu

Backend sử dụng các tên trường khác nhau so với dự kiến ban đầu:

| Chức năng | Endpoint Backend | Điểm thay đổi |
|----------|-----------------|--------------|
| Households | `/api/households/*` | `RoomNumber` thay vì `HouseholdNumber`, `DateOfBirth` thay vì `DOB` |
| Residents | `/api/residents/*` | `Sex` (Nam/Nữ), `DateOfBirth`, `ResidencyStatus`, `Occupation` |
| Fee Types | `/api/fee-type/*` | Mới thêm - quản lý loại phí |
| Fee Collections | `/api/fee-collection/*` | Đợt thu phí với `FeeTypeID` |
| Fee Details | `/api/fee-detail/*` | Chi tiết phí theo từng hộ khẩu |
| Vehicles | `/api/vehicle/*` | Mới thêm - quản lý phương tiện |
| Users | `/api/users/*` | Bao gồm Login endpoint |

#### Các API mới được thêm vào:

```typescript
// Authentication
api.login(username, password) 
api.logout()

// Fee Management (mới)
api.getFeeTypes()
api.getFeeDetails(collectionId?)
api.getFeeDetailStats(collectionId)
api.createFeeDetail(data)
api.updateFeeDetail(id, data)
api.deleteFeeDetail(id)

// Vehicle Management (mới)
api.getVehicles()
api.createVehicle(data)
api.deleteVehicle(id)

// User Management (mới)
api.getUsers()
api.createUser(data)
api.updateUser(id, data)
api.deleteUser(id)

// Resident enhancements
api.getResidentById(id)
```

#### Interceptor cho JWT Token

Đã thêm interceptor để tự động thêm JWT token vào header của mỗi request:

```typescript
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
```

### 2. **Thêm LoginScreen Component** (`src/components/LoginScreen.tsx`)

Tạo màn hình đăng nhập hoàn chỉnh với:

- **Giao diện hiện đại** với gradient colors
- **Xử lý lỗi** với hiển thị thông báo chi tiết
- **Tài khoản demo** mặc định: `admin1234` / `1234`
- **Lưu trữ token** trong localStorage khi đăng nhập thành công
- **Loading state** khi đang xử lý đăng nhập

**Tài khoản mặc định từ Backend:**
- Username: `admin1234`
- Password: `1234`
- Role: `Tổ trưởng`

### 3. **Cập nhật App.tsx**

Thêm quản lý authentication:

```typescript
// Kiểm tra token từ localStorage khi khởi động
const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
});

// Nếu chưa đăng nhập, hiển thị LoginScreen
if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
}

// Logout functionality
const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
    // Reset dữ liệu
};
```

**Các thay đổi giao diện:**
- Thêm nút "Đăng xuất" (LogOut) vào sidebar
- Hiển thị role người dùng từ localStorage
- Gọi API fetch dữ liệu chỉ khi đã đăng nhập

## Cách sử dụng

### 1. **Đảm bảo Backend đang chạy**

```bash
# Backend phải chạy trên port 3000
# Terminal Backend:
npm install
npm start
# Hoặc npm run dev
```

Backend mặc định sẽ nghe trên `http://localhost:3000`

### 2. **Chạy Frontend**

```bash
# Terminal Frontend:
npm install
npm run dev
# Hoặc npm start (tùy cấu hình)
```

### 3. **Đăng nhập**

1. Nhập username: `admin1234`
2. Nhập password: `1234`
3. Nhấn "Đăng nhập"

## Quy ước dữ liệu giữa Frontend và Backend

### Household (Hộ khẩu)

**Backend Response:**
```json
{
    "HouseholdID": 1,
    "RoomNumber": "A1",
    "Type": "Đơn",
    "HouseholdHead": "Nguyễn Văn A",
    "Members": 4,
    "HasVehicle": true,
    "Notes": ""
}
```

**Frontend Mapping:**
```typescript
{
    id: "HHA1",
    householdNumber: "A1",
    headName: "Nguyễn Văn A",
    members: 4,
    // ...
}
```

### Resident (Cư dân)

**Backend Fields:**
- `ResidentID`: ID định danh
- `HouseholdID`: ID hộ khẩu
- `FullName`: Họ và tên
- `DateOfBirth`: Ngày sinh
- `Sex`: 'Nam' hoặc 'Nữ'
- `Relationship`: Mối quan hệ (Chủ hộ, Vợ, Chồng, Con, etc.)
- `PhoneNumber`: Số điện thoại
- `EducationLevel`: Trình độ học vấn
- `Occupation`: Nghề nghiệp
- `ResidencyStatus`: Trạng thái (Thường trú, Tạm trú, Tạm vắng, Đã chuyển đi)
- `RegistrationDate`: Ngày đăng ký

### Fee Management (Quản lý phí)

**FeeType (Loại phí):**
- `FeeTypeID`: ID loại phí
- `FeeTypeName`: Tên loại phí
- `Category`: 'Bắt buộc' hoặc 'Tự nguyện'
- `Scope`: 'Chung' hoặc 'Riêng'
- `UnitPrice`: Giá theo đơn vị
- `Unit`: Đơn vị (người, hộ, etc.)

**FeeCollection (Đợt thu phí):**
- `CollectionID`: ID đợt thu
- `FeeTypeID`: ID loại phí
- `CollectionName`: Tên đợt thu
- `StartDate`: Ngày bắt đầu
- `EndDate`: Ngày kết thúc
- `TotalAmount`: Tổng tiền
- `Status`: 'Đang thu', 'Hoàn thành', 'Kết thúc'

**FeeDetail (Chi tiết phí):**
- `FeeDetailID`: ID chi tiết
- `CollectionID`: ID đợt thu
- `HouseholdID`: ID hộ khẩu
- `Amount`: Số tiền
- `PaymentDate`: Ngày thanh toán
- `PaymentMethod`: 'Tiền mặt' hoặc 'Chuyển khoản'
- `PaymentStatus`: 'Chưa đóng' hoặc 'Đã đóng'

### Vehicle (Phương tiện)

**Backend Fields:**
- `VehicleID`: ID phương tiện
- `HouseholdID`: ID hộ khẩu
- `VehicleType`: 'Xe máy' hoặc 'Ô tô'
- `LicensePlate`: Biển số
- `Brand`: Hãng sản xuất
- `Color`: Màu sắc
- `RegistrationDate`: Ngày đăng ký
- `Status`: Trạng thái

## Lỗi thường gặp và cách khắc phục

### 1. **CORS Error**

**Lỗi:** `Access to XMLHttpRequest blocked by CORS`

**Giải pháp:**
- Backend đã được cấu hình CORS tại `index.js`
- Đảm bảo Backend đang chạy trên `http://localhost:3000`
- Nếu vẫn lỗi, kiểm tra middleware CORS trong `back-end/index.js`

### 2. **Connection Refused (ERR_CONNECTION_REFUSED)**

**Lỗi:** `http://localhost:3000/ ... ERR_CONNECTION_REFUSED`

**Giải pháp:**
- Backend không được khởi động
- Chạy lệnh: `npm start` trong thư mục backend
- Kiểm tra PORT: Backend chạy trên port 3000

### 3. **Authentication Failed**

**Lỗi:** Không thể đăng nhập sau khi nhập username/password

**Kiểm tra:**
- Đảm bảo database đã được khởi tạo
- Người dùng mặc định được tạo bởi `createDefaultUser()` tại startup
- Kiểm tra thông tin đăng nhập: `admin1234` / `1234`

### 4. **Invalid Field Names**

**Lỗi:** Dữ liệu không hiển thị đúng

**Giải pháp:**
- Kiểm tra lại tên trường trong API response mapping
- Xem lại bảng so sánh giữa Backend và Frontend ở phần "Quy ước dữ liệu"

## Cách mở rộng API

### Thêm endpoint mới

1. **Thêm function trong `src/services/api.ts`:**

```typescript
api.myNewFunction: async (data: any) => {
    try {
        const res = await axiosInstance.post('/path/to/endpoint', {
            // Map dữ liệu FE sang BE format
        });
        return res.data;
    } catch (error) {
        console.error('Lỗi gọi API:', error);
        throw error;
    }
}
```

2. **Sử dụng trong Component:**

```typescript
try {
    const result = await api.myNewFunction(data);
    // Xử lý kết quả
} catch (error) {
    // Xử lý lỗi
}
```

## Các file đã cập nhật

1. ✅ `src/services/api.ts` - Hoàn thiện tất cả API calls
2. ✅ `src/components/LoginScreen.tsx` - Tạo mới màn hình đăng nhập
3. ✅ `src/App.tsx` - Thêm authentication flow

## Lưu ý quan trọng

1. **Token trong localStorage:**
   - Token được lưu tự động sau khi đăng nhập thành công
   - Token được gửi cùng mỗi request
   - Token sẽ bị xóa khi đăng xuất

2. **Dữ liệu người dùng:**
   - Role được lưu từ response login
   - UserID được lưu để sử dụng trong các API sau

3. **Format dữ liệu:**
   - Backend trả về dữ liệu trong format `{ error: false, data: [...] }`
   - Frontend phải xử lý cấu trúc này đúng cách

## Tiếp theo (Nâng cao)

- [ ] Thêm error boundary components
- [ ] Implement refresh token logic
- [ ] Thêm role-based access control (RBAC)
- [ ] Caching dữ liệu với React Query hoặc SWR
- [ ] Implement real-time updates với WebSocket
- [ ] Thêm unit tests cho API layer
- [ ] Validation form hoàn thiện

---

**Ngày cập nhật:** 12/01/2026  
**Trạng thái:** Hoàn thành kết nối cơ bản
