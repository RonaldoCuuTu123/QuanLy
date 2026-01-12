#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}==================================================${NC}"
echo -e "${BLUE}  🔍 FE-BE Connection Test Script${NC}"
echo -e "${BLUE}==================================================${NC}\n"

# Test 1: Check Backend Server
echo -e "${YELLOW}[1/4] Kiểm tra Backend Server...${NC}"
if curl -s http://localhost:3001 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Backend đang chạy ở http://localhost:3001${NC}"
else
    echo -e "${RED}✗ Backend không phản hồi. Vui lòng chạy: npm start (trong thư mục back-end)${NC}"
fi
echo ""

# Test 2: Check Frontend Server
echo -e "${YELLOW}[2/4] Kiểm tra Frontend Server...${NC}"
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Frontend đang chạy ở http://localhost:5173${NC}"
else
    echo -e "${RED}✗ Frontend không phản hồi. Vui lòng chạy: npm run dev (trong thư mục FE)${NC}"
fi
echo ""

# Test 3: Test Login API
echo -e "${YELLOW}[3/4] Kiểm tra API Login...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin1234", "password": "1234"}')

if echo "$LOGIN_RESPONSE" | grep -q "token"; then
    echo -e "${GREEN}✓ Login API hoạt động${NC}"
    echo "Response: $LOGIN_RESPONSE" | head -c 100
    echo "..."
else
    echo -e "${RED}✗ Login API không hoạt động${NC}"
    echo "Response: $LOGIN_RESPONSE"
fi
echo ""

# Test 4: Test Households API
echo -e "${YELLOW}[4/4] Kiểm tra API Households...${NC}"
HH_RESPONSE=$(curl -s http://localhost:3001/api/households/get-all-households \
  -H "Content-Type: application/json")

if echo "$HH_RESPONSE" | grep -q "HouseholdID\|householdNumber"; then
    echo -e "${GREEN}✓ Households API hoạt động${NC}"
    echo "Response: $HH_RESPONSE" | head -c 100
    echo "..."
else
    echo -e "${RED}✗ Households API không hoạt động${NC}"
    echo "Response: $HH_RESPONSE"
fi
echo ""

echo -e "${BLUE}==================================================${NC}"
echo -e "${BLUE}  ✅ Test hoàn tất!${NC}"
echo -e "${BLUE}==================================================${NC}\n"

echo -e "${YELLOW}📌 Lưu ý:${NC}"
echo "- Nếu tất cả test GREEN ✓, FE-BE có thể kết nối bình thường"
echo "- Nếu có test RED ✗, vui lòng khởi động lại services"
echo "- Xem log chi tiết tại: http://localhost:5173 → DevTools Console"
