import axios from 'axios';
import { Household, Resident, FeeCampaign, Payment, Gender, ResidentStatus, FeeType } from '@/types';

// Kết nối với Backend chạy trên port 3001
const API_URL = 'http://localhost:3001/api';

// Tạo instance axios với config mặc định
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm JWT token từ localStorage vào headers nếu có
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor để xử lý lỗi
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired hoặc invalid
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const api = {
  // --- AUTHENTICATION (MỚI) ---
  login: async (username: string, password: string) => {
    try {
      // Gọi endpoint login ở UserController
      const res = await axiosInstance.post('/users/login', { username, password });
      // BE trả về { message, token, role, id }, chúng ta chuẩn hóa lại
      return {
        token: res.data.token,
        role: res.data.role,
        id: res.data.id,
        message: res.data.message
      };
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  },

  // --- HOUSEHOLD ---
  getHouseholds: async (): Promise<Household[]> => {
    try {
      const res = await axiosInstance.get('/households/get-all-households');
      // Handle BE error response trong 200 status
      if (res.data && res.data.error) {
        console.error('BE Error:', res.data.message);
        return []; // Trả về mảng rỗng nếu BE có lỗi
      }
      return (res.data || []).map((item: any) => ({
        id: item.HouseholdID || item.id || `HH${Date.now()}`,
        householdNumber: item.HouseholdNumber || item.householdNumber || '',
        headName: item.HouseholdHead || item.headName || '',
        address: (item.Street && item.Ward && item.District)
          ? `${item.Street}, ${item.Ward}, ${item.District}`
          : item.address || '',
        street: item.Street || item.street || '',
        ward: item.Ward || item.ward || 'La Khê',
        district: item.District || item.district || 'Hà Đông',
        members: Array.isArray(item.Members) ? item.Members : [],
        history: item.history || []
      }));
    } catch (error) {
      console.error('Lỗi lấy danh sách hộ khẩu:', error);
      return []; // Trả về mảng rỗng thay vì throw error
    }
  },

  createHousehold: async (data: {
    householdNumber: string;
    headName: string;
    street?: string;
    ward?: string;
    district?: string;
  }) => {
    try {
      const payload = {
        HouseholdNumber: data.householdNumber,
        HouseholdHead: data.headName,
        Street: data.street || '',
        Ward: data.ward || 'La Khê',
        District: data.district || 'Hà Đông',
        Members: 0
      };
      const res = await axiosInstance.post('/households/create-household', payload);
      return res.data;
    } catch (error) {
      console.error('Lỗi tạo hộ khẩu:', error);
      throw error;
    }
  },

  updateHousehold: async (id: string, data: any) => {
    try {
      const payload = {
        HouseholdNumber: data.householdNumber || data.HouseholdNumber,
        HouseholdHead: data.headName || data.HouseholdHead,
        Street: data.street || data.Street,
        Ward: data.ward || data.Ward,
        District: data.district || data.District,
        Members: data.Members || 0
      };
      const res = await axiosInstance.put(`/households/update-household/${id}`, payload);
      return res.data;
    } catch (error) {
      console.error('Lỗi cập nhật hộ khẩu:', error);
      throw error;
    }
  },

  deleteHousehold: async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/households/delete-household/${id}`);
      return res.data;
    } catch (error) {
      console.error('Lỗi xóa hộ khẩu:', error);
      throw error;
    }
  },

  // --- RESIDENT ---
  getResidents: async (): Promise<Resident[]> => {
    try {
      const res = await axiosInstance.get('/residents/get-all-residents');
      if (res.data && res.data.error) {
        console.error('BE Error:', res.data.message);
        return [];
      }
      return (res.data || []).map((item: any) => ({
        id: item.ResidentID || item.id || `R${Date.now()}`,
        fullName: item.FullName || '',
        dob: item.DateOfBirth || item.DOB || '',
        gender: (item.Sex === 'Nam') ? Gender.MALE : Gender.FEMALE,
        birthPlace: item.PlaceOfBirth || item.BirthPlace || '',
        origin: item.Hometown || item.Origin || '',
        ethnicity: item.Ethnicity || 'Kinh',
        job: item.Occupation || item.Job || '',
        idCardNumber: item.IDCardNumber || item.IdentityCard || '',
        registrationDate: item.RegistrationDate || new Date().toISOString().split('T')[0],
        relationToHead: item.Relationship || 'Chủ hộ',
        status: ResidentStatus.ACTIVE,
        householdId: item.HouseholdID || ''
      }));
    } catch (error) {
      console.error('Lỗi lấy danh sách cư dân:', error);
      return [];
    }
  },

  getResidentById: async (id: string): Promise<Resident | null> => {
    try {
      const res = await axiosInstance.get(`/residents/get-resident-by-id/${id}`);
      const item = res.data.resident || res.data;
      return {
        id: item.ResidentID || id,
        fullName: item.FullName || '',
        dob: item.DateOfBirth || item.DOB || '',
        gender: (item.Sex === 'Nam') ? Gender.MALE : Gender.FEMALE,
        birthPlace: item.PlaceOfBirth || item.BirthPlace || '',
        origin: item.Hometown || item.Origin || '',
        ethnicity: item.Ethnicity || 'Kinh',
        job: item.Occupation || item.Job || '',
        idCardNumber: item.IDCardNumber || item.IdentityCard || '',
        registrationDate: item.RegistrationDate || new Date().toISOString().split('T')[0],
        relationToHead: item.Relationship || 'Chủ hộ',
        status: ResidentStatus.ACTIVE,
        householdId: item.HouseholdID || ''
      };
    } catch (error) {
      console.error('Lỗi lấy thông tin cư dân:', error);
      return null;
    }
  },

  createResident: async (data: {
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
  }) => {
    try {
      const payload = {
        HouseholdID: data.householdId,
        FullName: data.fullName,
        DateOfBirth: data.dob,
        Sex: data.gender === Gender.MALE ? 'Nam' : 'Nữ',
        PlaceOfBirth: data.birthPlace || '',
        Hometown: data.origin || '',
        Ethnicity: data.ethnicity || 'Kinh',
        Occupation: data.job || '',
        IDCardNumber: data.idCardNumber || '',
        Relationship: data.relationToHead,
        RegistrationDate: new Date().toISOString().split('T')[0]
      };
      const res = await axiosInstance.post('/residents/create-resident', payload);
      return res.data;
    } catch (error) {
      console.error('Lỗi tạo cư dân:', error);
      throw error;
    }
  },

  updateResident: async (id: string, data: any) => {
    try {
      const payload = {
        FullName: data.fullName || data.FullName,
        DOB: data.dob || data.DOB,
        Sex: data.gender === Gender.MALE ? 'Nam' : 'Nữ' || data.Sex,
        BirthPlace: data.birthPlace || data.BirthPlace,
        Origin: data.origin || data.Origin,
        Ethnicity: data.ethnicity || data.Ethnicity,
        Job: data.job || data.Job,
        IdentityCard: data.idCardNumber || data.IdentityCard,
        Relationship: data.relationToHead || data.Relationship
      };
      const res = await axiosInstance.put(`/residents/update-resident/${id}`, payload);
      return res.data;
    } catch (error) {
      console.error('Lỗi cập nhật cư dân:', error);
      throw error;
    }
  },

  deleteResident: async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/residents/delete-resident/${id}`);
      return res.data;
    } catch (error) {
      console.error('Lỗi xóa cư dân:', error);
      throw error;
    }
  },

  // --- FEE TYPE ---
  getFeeTypes: async () => {
    try {
      const res = await axiosInstance.get('/fee-type/get-all-fee-type');
      return res.data.feeTypes || [];
    } catch (error) {
      console.error('Lỗi lấy danh sách loại phí:', error);
      throw error;
    }
  },

  // --- FEE COLLECTION (Đợt thu phí) ---
  getFeeCampaigns: async (): Promise<FeeCampaign[]> => {
    try {
      const res = await axiosInstance.get('/fee-collection/get-all-collection');
      if (res.data && res.data.error) {
        console.error('BE Error:', res.data.message);
        return [];
      }
      return (res.data || []).map((item: any) => ({
        id: item.CollectionID || item.id,
        name: item.CollectionName || '',
        type: item.Type === 'Bắt buộc' ? FeeType.MANDATORY : FeeType.VOLUNTARY,
        amount: item.Amount || 0,
        amountPerMonthPerPerson: item.AmountPerMonth || 0,
        startDate: item.StartDate || '',
        endDate: item.EndDate || '',
        description: item.Description || '',
        status: item.Status || 'Hoạt động'
      }));
    } catch (error) {
      console.error('Lỗi lấy danh sách đợt thu:', error);
      return [];
    }
  },

  createFeeCampaign: async (data: {
    name: string;
    type: FeeType;
    amount?: number;
    amountPerMonthPerPerson?: number;
    startDate: string;
    endDate?: string;
    description?: string;
  }) => {
    try {
      const payload = {
        CollectionName: data.name,
        Type: data.type === FeeType.MANDATORY ? 'Bắt buộc' : 'Tự nguyện',
        Amount: data.amount || 0,
        AmountPerMonth: data.amountPerMonthPerPerson || 0,
        StartDate: data.startDate,
        EndDate: data.endDate || '',
        Description: data.description || ''
      };
      const res = await axiosInstance.post('/fee-collection/create-collection', payload);
      return res.data;
    } catch (error) {
      console.error('Lỗi tạo đợt thu:', error);
      throw error;
    }
  },

  // --- FEE DETAIL (Chi tiết phí) ---
  getFeeDetails: async (collectionId?: string) => {
    try {
      const url = collectionId
        ? `/fee-detail/get-all-fee-detail?feeCollectionId=${collectionId}`
        : '/fee-detail/get-all-fee-detail';
      const res = await axiosInstance.get(url);
      return res.data.feeDetails || [];
    } catch (error) {
      console.error('Lỗi lấy chi tiết phí:', error);
      throw error;
    }
  },

  getFeeDetailStats: async (collectionId: string) => {
    try {
      const res = await axiosInstance.get(`/fee-detail/stats/${collectionId}`);
      return res.data;
    } catch (error) {
      console.error('Lỗi lấy thống kê phí:', error);
      throw error;
    }
  },

  createFeeDetail: async (data: {
    collectionId: string;
    householdId: string;
    amount: number;
    paymentMethod: string;
  }) => {
    try {
      const payload = {
        CollectionID: data.collectionId,
        HouseholdID: data.householdId,
        Amount: data.amount,
        PaymentMethod: data.paymentMethod,
        PaymentStatus: 'Chưa đóng'
      };
      const res = await axiosInstance.post('/fee-detail/create-fee-detail', payload);
      return res.data;
    } catch (error) {
      console.error('Lỗi tạo chi tiết phí:', error);
      throw error;
    }
  },

  updateFeeDetail: async (id: string, data: any) => {
    try {
      const res = await axiosInstance.put(`/fee-detail/update-fee-detail/${id}`, data);
      return res.data;
    } catch (error) {
      console.error('Lỗi cập nhật chi tiết phí:', error);
      throw error;
    }
  },

  deleteFeeDetail: async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/fee-detail/delete-fee-detail/${id}`);
      return res.data;
    } catch (error) {
      console.error('Lỗi xóa chi tiết phí:', error);
      throw error;
    }
  },

  // --- PAYMENT (Thanh toán) ---
  getPayments: async (): Promise<Payment[]> => {
    try {
      const res = await axiosInstance.get('/payment/get-all-payment');
      if (res.data && res.data.error) {
        console.error('BE Error:', res.data.message);
        return [];
      }
      return (res.data || []).map((item: any) => ({
        id: item.PaymentID || item.id,
        householdId: item.HouseholdID || '',
        campaignId: item.CollectionID || '',
        amount: item.Amount || 0,
        paymentDate: item.PaymentDate || '',
        collectorName: item.CollectorName || '',
        status: item.Status || 'Hoàn thành'
      }));
    } catch (error) {
      console.error('Lỗi lấy danh sách thanh toán:', error);
      return [];
    }
  },

  createPayment: async (data: {
    householdId: string;
    campaignId: string;
    amount: number;
    paymentDate: string;
    collectorName: string;
    paymentMethod?: string;
  }) => {
    try {
      const payload = {
        HouseholdID: data.householdId,
        CollectionID: data.campaignId,
        Amount: data.amount,
        PaymentDate: data.paymentDate,
        CollectorName: data.collectorName
      };
      const res = await axiosInstance.post('/payment/create-payment', payload);
      return res.data;
    } catch (error) {
      console.error('Lỗi tạo thanh toán:', error);
      throw error;
    }
  },

  // --- VEHICLE (Phương tiện) ---
  getVehicles: async () => {
    try {
      const res = await axiosInstance.get('/vehicle/get-all-vehicle');
      return res.data.vehicles || [];
    } catch (error) {
      console.error('Lỗi lấy danh sách phương tiện:', error);
      throw error;
    }
  },

  createVehicle: async (data: {
    householdId: string;
    vehicleType: string;
    licensePlate: string;
    brand: string;
    color: string;
    registrationDate: string;
  }) => {
    try {
      const payload = {
        HouseholdID: data.householdId,
        VehicleType: data.vehicleType,
        LicensePlate: data.licensePlate,
        Brand: data.brand,
        Color: data.color,
        RegistrationDate: data.registrationDate,
        Status: 'Còn hạn đăng ký gửi'
      };
      const res = await axiosInstance.post('/vehicle/create-vehicle', payload);
      return res.data;
    } catch (error) {
      console.error('Lỗi tạo phương tiện:', error);
      throw error;
    }
  },

  deleteVehicle: async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/vehicle/delete-vehicle/${id}`);
      return res.data;
    } catch (error) {
      console.error('Lỗi xóa phương tiện:', error);
      throw error;
    }
  },

  // --- USERS (Người dùng) ---
  getUsers: async () => {
    try {
      const res = await axiosInstance.get('/users/get-all-user');
      return res.data.users || [];
    } catch (error) {
      console.error('Lỗi lấy danh sách người dùng:', error);
      throw error;
    }
  },

  createUser: async (data: {
    username: string;
    password: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
  }) => {
    try {
      const payload = {
        Username: data.username,
        Password: data.password,
        FullName: data.fullName,
        Email: data.email,
        PhoneNumber: data.phoneNumber,
        Role: data.role
      };
      const res = await axiosInstance.post('/users/create-user', payload);
      return res.data;
    } catch (error) {
      console.error('Lỗi tạo người dùng:', error);
      throw error;
    }
  },

  updateUser: async (id: string, data: any) => {
    try {
      const res = await axiosInstance.put(`/users/update-user/${id}`, data);
      return res.data;
    } catch (error) {
      console.error('Lỗi cập nhật người dùng:', error);
      throw error;
    }
  },

  deleteUser: async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/users/delete-user/${id}`);
      return res.data;
    } catch (error) {
      console.error('Lỗi xóa người dùng:', error);
      throw error;
    }
  }
};
