# API Reference - Chi tiết các hàm API

## 📑 Mục lục

- [Authentication](#authentication)
- [Households](#households)
- [Residents](#residents)
- [Fee Types](#fee-types)
- [Fee Collections](#fee-collections)
- [Fee Details](#fee-details)
- [Vehicles](#vehicles)
- [Users](#users)

---

## Authentication

### Login

Đăng nhập vào hệ thống.

```typescript
api.login(username: string, password: string)
```

**Parameters:**
- `username` (string): Tên đăng nhập
- `password` (string): Mật khẩu

**Returns:**
```typescript
{
    token: string;
    role: string;
    id: number;
    message: string;
}
```

**Example:**
```typescript
try {
    const response = await api.login('admin1234', '1234');
    console.log('Token:', response.token);
    localStorage.setItem('token', response.token);
} catch (error) {
    console.error('Login failed:', error);
}
```

---

### Logout

Đăng xuất khỏi hệ thống.

```typescript
api.logout()
```

**Side effects:**
- Xóa token khỏi localStorage
- Xóa role khỏi localStorage
- Xóa userId khỏi localStorage

---

## Households

### Get All Households

Lấy danh sách tất cả hộ khẩu.

```typescript
api.getHouseholds(): Promise<Household[]>
```

**Returns:**
```typescript
Household[] = [
    {
        id: "HHA1",
        householdNumber: "A1",
        headName: "Nguyễn Văn A",
        address: "A1",
        street: "Đường La Khê",
        ward: "La Khê",
        district: "Hà Đông",
        members: 4,
        history: []
    },
    // ...
]
```

**Example:**
```typescript
const households = await api.getHouseholds();
console.log(`Tổng số hộ: ${households.length}`);
```

---

### Create Household

Tạo hộ khẩu mới.

```typescript
api.createHousehold(data: {
    householdNumber: string;
    headName: string;
    street?: string;
    ward?: string;
    district?: string;
})
```

**Parameters:**
- `householdNumber`: Số hộ khẩu (bắt buộc)
- `headName`: Tên chủ hộ (bắt buộc)
- `street`: Tên đường (tùy chọn)
- `ward`: Phường/Xã (tùy chọn)
- `district`: Quận/Huyện (tùy chọn)

**Example:**
```typescript
const result = await api.createHousehold({
    householdNumber: "A5",
    headName: "Trần Thị C",
    street: "Đường La Khê",
    ward: "La Khê",
    district: "Hà Đông"
});
```

---

### Update Household

Cập nhật thông tin hộ khẩu.

```typescript
api.updateHousehold(id: string, data: any)
```

**Parameters:**
- `id`: ID hộ khẩu
- `data`: Dữ liệu cập nhật

**Example:**
```typescript
await api.updateHousehold("1", {
    householdNumber: "A1",
    headName: "Nguyễn Văn A (Updated)"
});
```

---

### Delete Household

Xóa hộ khẩu.

```typescript
api.deleteHousehold(id: string)
```

**Example:**
```typescript
await api.deleteHousehold("1");
```

---

## Residents

### Get All Residents

Lấy danh sách tất cả cư dân.

```typescript
api.getResidents(): Promise<Resident[]>
```

**Returns:**
```typescript
Resident[] = [
    {
        id: "R1",
        fullName: "Nguyễn Văn A",
        dob: "1990-01-01",
        gender: Gender.MALE,
        birthPlace: "Hà Nội",
        origin: "Đệm",
        ethnicity: "Kinh",
        job: "Kỹ sư",
        idCardNumber: "001234567890",
        registrationDate: "2023-01-01",
        relationToHead: "Chủ hộ",
        status: ResidentStatus.ACTIVE,
        householdId: "1"
    },
    // ...
]
```

---

### Get Resident By ID

Lấy thông tin cư dân theo ID.

```typescript
api.getResidentById(id: string): Promise<Resident | null>
```

**Example:**
```typescript
const resident = await api.getResidentById("1");
if (resident) {
    console.log(`Cư dân: ${resident.fullName}`);
}
```

---

### Create Resident

Thêm cư dân mới.

```typescript
api.createResident(data: {
    householdId: string;
    fullName: string;
    dob: string;
    gender: Gender;
    birthPlace?: string;
    origin?: string;
    ethnicity?: string;
    job?: string;
    idCardNumber?: string;
    relationToHead: string;
})
```

**Parameters:**
- `householdId`: ID hộ khẩu (bắt buộc)
- `fullName`: Họ và tên (bắt buộc)
- `dob`: Ngày sinh (bắt buộc) - Format: YYYY-MM-DD
- `gender`: Giới tính (bắt buộc) - Gender.MALE hoặc Gender.FEMALE
- `relationToHead`: Mối quan hệ (bắt buộc) - Chủ hộ, Vợ, Chồng, Con, etc.
- `birthPlace`: Nơi sinh (tùy chọn)
- `origin`: Quê quán (tùy chọn)
- `ethnicity`: Dân tộc (tùy chọn) - Mặc định: "Kinh"
- `job`: Nghề nghiệp (tùy chọn)
- `idCardNumber`: Số CMND (tùy chọn)

**Example:**
```typescript
const result = await api.createResident({
    householdId: "1",
    fullName: "Nguyễn Văn B",
    dob: "1995-05-15",
    gender: Gender.MALE,
    relationToHead: "Con",
    birthPlace: "Hà Nội",
    ethnicity: "Kinh"
});
```

---

### Update Resident

Cập nhật thông tin cư dân.

```typescript
api.updateResident(id: string, data: any)
```

**Example:**
```typescript
await api.updateResident("1", {
    fullName: "Nguyễn Văn A (Updated)",
    job: "Giáo viên"
});
```

---

### Delete Resident

Xóa cư dân.

```typescript
api.deleteResident(id: string)
```

---

## Fee Types

### Get All Fee Types

Lấy danh sách loại phí.

```typescript
api.getFeeTypes()
```

**Returns:**
```typescript
[
    {
        FeeTypeID: 1,
        FeeTypeName: "Phí quản lý",
        Description: "Phí quản lý chung",
        Category: "Bắt buộc",
        Scope: "Chung",
        UnitPrice: 50000,
        Unit: "hộ"
    },
    // ...
]
```

---

## Fee Collections

### Get All Fee Collections

Lấy danh sách đợt thu phí.

```typescript
api.getFeeCampaigns(): Promise<FeeCampaign[]>
```

**Returns:**
```typescript
FeeCampaign[] = [
    {
        id: "1",
        name: "Thu phí quý 1/2024",
        type: FeeType.MANDATORY,
        amountPerMonthPerPerson: 50000,
        startDate: "2024-01-01",
        description: "Thu phí quý 1 năm 2024"
    },
    // ...
]
```

---

### Create Fee Collection

Tạo đợt thu phí mới.

```typescript
api.createFeeCampaign(data: {
    name: string;
    type: FeeType;
    amountPerMonthPerPerson?: number;
    startDate: string;
    description?: string;
})
```

**Example:**
```typescript
const result = await api.createFeeCampaign({
    name: "Thu phí quý 2/2024",
    type: FeeType.MANDATORY,
    amountPerMonthPerPerson: 50000,
    startDate: "2024-04-01",
    description: "Thu phí quý 2 năm 2024"
});
```

---

## Fee Details

### Get All Fee Details

Lấy danh sách chi tiết phí (có thể lọc theo collectionId).

```typescript
api.getFeeDetails(collectionId?: string)
```

**Parameters:**
- `collectionId` (tùy chọn): Lọc theo ID đợt thu

**Example:**
```typescript
// Lấy tất cả
const allDetails = await api.getFeeDetails();

// Lọc theo đợt thu
const details = await api.getFeeDetails("1");
```

---

### Get Fee Detail Stats

Lấy thống kê phí cho một đợt thu.

```typescript
api.getFeeDetailStats(collectionId: string)
```

**Returns:**
```typescript
{
    error: false,
    totalHouseholds: 20,
    paidCount: 15,
    unpaidCount: 5,
    totalCollected: 750000,
    totalRemaining: 250000
}
```

**Example:**
```typescript
const stats = await api.getFeeDetailStats("1");
console.log(`Đã thu: ${stats.totalCollected}`);
console.log(`Còn thiếu: ${stats.totalRemaining}`);
```

---

### Create Fee Detail

Thêm chi tiết phí cho một hộ khẩu.

```typescript
api.createFeeDetail(data: {
    collectionId: string;
    householdId: string;
    amount: number;
    paymentMethod: string;
})
```

**Parameters:**
- `collectionId`: ID đợt thu (bắt buộc)
- `householdId`: ID hộ khẩu (bắt buộc)
- `amount`: Số tiền (bắt buộc)
- `paymentMethod`: 'Tiền mặt' hoặc 'Chuyển khoản' (bắt buộc)

**Example:**
```typescript
const result = await api.createFeeDetail({
    collectionId: "1",
    householdId: "1",
    amount: 50000,
    paymentMethod: "Tiền mặt"
});
```

---

### Update Fee Detail

Cập nhật chi tiết phí (thường dùng để cập nhật trạng thái thanh toán).

```typescript
api.updateFeeDetail(id: string, data: any)
```

**Example:**
```typescript
await api.updateFeeDetail("1", {
    PaymentStatus: 'Đã đóng',
    PaymentDate: '2024-01-15'
});
```

---

### Delete Fee Detail

Xóa chi tiết phí.

```typescript
api.deleteFeeDetail(id: string)
```

---

## Vehicles

### Get All Vehicles

Lấy danh sách phương tiện.

```typescript
api.getVehicles()
```

**Returns:**
```typescript
[
    {
        VehicleID: 1,
        HouseholdID: 1,
        VehicleType: "Xe máy",
        LicensePlate: "29K-123456",
        Brand: "Honda",
        Color: "Xanh",
        RegistrationDate: "2023-01-01",
        Status: "Còn hạn đăng ký gửi"
    },
    // ...
]
```

---

### Create Vehicle

Thêm phương tiện mới.

```typescript
api.createVehicle(data: {
    householdId: string;
    vehicleType: string;
    licensePlate: string;
    brand: string;
    color: string;
    registrationDate: string;
})
```

**Example:**
```typescript
const result = await api.createVehicle({
    householdId: "1",
    vehicleType: "Xe máy",
    licensePlate: "29K-123456",
    brand: "Honda",
    color: "Xanh",
    registrationDate: "2024-01-01"
});
```

---

### Delete Vehicle

Xóa phương tiện.

```typescript
api.deleteVehicle(id: string)
```

---

## Users

### Get All Users

Lấy danh sách người dùng.

```typescript
api.getUsers()
```

---

### Create User

Tạo người dùng mới.

```typescript
api.createUser(data: {
    username: string;
    password: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
})
```

**Parameters:**
- `username`: Tên đăng nhập (bắt buộc)
- `password`: Mật khẩu (bắt buộc)
- `fullName`: Họ và tên (bắt buộc)
- `email`: Email (bắt buộc)
- `phoneNumber`: Số điện thoại (bắt buộc)
- `role`: Role - 'Tổ trưởng', 'Tổ phó', 'Thủ quỹ' (bắt buộc)

**Example:**
```typescript
const result = await api.createUser({
    username: "hung2024",
    password: "pass123",
    fullName: "Bùi Văn Hùng",
    email: "hung@example.com",
    phoneNumber: "0912345678",
    role: "Tổ phó"
});
```

---

### Update User

Cập nhật thông tin người dùng.

```typescript
api.updateUser(id: string, data: any)
```

---

### Delete User

Xóa người dùng.

```typescript
api.deleteUser(id: string)
```

---

## Error Handling

Tất cả các hàm API đều có thể throw error. Luôn sử dụng try-catch:

```typescript
try {
    const households = await api.getHouseholds();
    // Xử lý dữ liệu
} catch (error) {
    console.error('Lỗi khi lấy danh sách hộ khẩu:', error);
    // Hiển thị thông báo lỗi cho user
}
```

**Các loại lỗi thường gặp:**
- `401 Unauthorized` - Token không hợp lệ, cần đăng nhập lại
- `403 Forbidden` - Không có quyền truy cập
- `404 Not Found` - Dữ liệu không tồn tại
- `500 Internal Server Error` - Lỗi server

---

**Cập nhật:** 12/01/2026  
Tài liệu này được cập nhật thường xuyên theo các thay đổi API.
