# FE-BE Connection Test Script for Windows

Write-Host "=================================================="
Write-Host "  🔍 FE-BE Connection Test Script (Windows)" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Check Backend Server
Write-Host "[1/4] Kiểm tra Backend Server..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✓ Backend đang chạy ở http://localhost:3001" -ForegroundColor Green
    }
}
catch {
    Write-Host "✗ Backend không phản hồi. Vui lòng chạy: npm start (trong thư mục back-end)" -ForegroundColor Red
}
Write-Host ""

# Test 2: Check Frontend Server
Write-Host "[2/4] Kiểm tra Frontend Server..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✓ Frontend đang chạy ở http://localhost:5173" -ForegroundColor Green
    }
}
catch {
    Write-Host "✗ Frontend không phản hồi. Vui lòng chạy: npm run dev (trong thư mục FE)" -ForegroundColor Red
}
Write-Host ""

# Test 3: Test Login API
Write-Host "[3/4] Kiểm tra API Login..." -ForegroundColor Yellow
try {
    $loginPayload = @{
        username = "admin1234"
        password = "1234"
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/users/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $loginPayload `
        -UseBasicParsing `
        -TimeoutSec 5

    $responseBody = $response.Content | ConvertFrom-Json
    if ($responseBody.token) {
        Write-Host "✓ Login API hoạt động" -ForegroundColor Green
        Write-Host "  Token: $($responseBody.token.Substring(0, 30))..."
        Write-Host "  Role: $($responseBody.role)"
    }
    else {
        Write-Host "✗ Login API không trả về token" -ForegroundColor Red
        Write-Host "  Response: $($response.Content)" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "✗ Login API lỗi: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 4: Test Households API
Write-Host "[4/4] Kiểm tra API Households..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/households/get-all-households" `
        -Method GET `
        -ContentType "application/json" `
        -UseBasicParsing `
        -TimeoutSec 5

    $responseBody = $response.Content
    if ($responseBody -match "HouseholdID|householdNumber") {
        Write-Host "✓ Households API hoạt động" -ForegroundColor Green
        $count = ($responseBody | ConvertFrom-Json).Count
        Write-Host "  Số hộ khẩu: $count"
    }
    else {
        Write-Host "✗ Households API không trả về dữ liệu" -ForegroundColor Red
        Write-Host "  Response: $($responseBody.Substring(0, 100))" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "✗ Households API lỗi: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "=================================================="
Write-Host "  ✅ Test hoàn tất!" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📌 Lưu ý:" -ForegroundColor Yellow
Write-Host "- Nếu tất cả test GREEN ✓, FE-BE có thể kết nối bình thường"
Write-Host "- Nếu có test RED ✗, vui lòng khởi động lại services"
Write-Host "- Xem log chi tiết tại: http://localhost:5173 → DevTools Console (F12)"
Write-Host ""
Write-Host "🚀 Bước tiếp theo:"
Write-Host "  1. Mở http://localhost:5173 trong trình duyệt"
Write-Host "  2. Đăng nhập với username: admin1234, password: 1234"
Write-Host "  3. Nếu đăng nhập thành công, FE-BE đã kết nối đúng!"
