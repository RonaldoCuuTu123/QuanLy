import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, Search, CheckCircle2, AlertCircle, Calendar, Wallet, Download } from 'lucide-react';
import { Household, FeeCampaign, Payment, FeeType } from '@/types';
import { api } from '@/services/api';

interface FeeManagerProps {
  households: Household[];
  fees: FeeCampaign[];
  payments: Payment[];
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
  setFees: React.Dispatch<React.SetStateAction<FeeCampaign[]>>;
}

const FeeManager: React.FC<FeeManagerProps> = ({ households, fees, payments, setPayments, setFees }) => {
  const [selectedCampaign, setSelectedCampaign] = useState<FeeCampaign | null>(fees[0] || null);
  const [isCollecting, setIsCollecting] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Trạng thái mở modal tạo đợt thu
  const [selectedHouseholdId, setSelectedHouseholdId] = useState('');
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // Tránh duplicate requests
  const [error, setError] = useState<string | null>(null);

  const campaignPayments = payments.filter(p => p.campaignId === selectedCampaign?.id);
  const paidHouseholdIds = new Set(campaignPayments.map(p => p.householdId));
  const totalAmountCollected = campaignPayments.reduce((acc, p) => acc + p.amount, 0);

  // Hàm tính phí bắt buộc (6.000đ/tháng/người x 12 tháng)
  const calculateMandatoryFee = (hId: string) => {
    if (!selectedCampaign || selectedCampaign.type !== FeeType.MANDATORY) return 0;
    const h = households.find(x => x.id === hId);
    if (!h) return 0;
    return 6000 * 12 * (h.members?.length || 0);
  };

  // --- XỬ LÝ THU PHÍ ---
  const handleCollect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaign || !selectedHouseholdId) return;

    try {
      setIsLoading(true);
      setError(null);

      const paymentData = {
        householdId: selectedHouseholdId,
        campaignId: selectedCampaign.id,
        amount: amount,
        paymentDate: new Date().toISOString().split('T')[0],
        collectorName: 'Nguyễn Văn Cường'
      };

      await api.createPayment(paymentData);

      // Cập nhật lại danh sách thanh toán từ Server
      const updatedPayments = await api.getPayments();
      setPayments(updatedPayments);

      setIsCollecting(false);
      setSelectedHouseholdId('');
      setAmount(0);
      alert('Thu phí thành công!');
    } catch (err) {
      console.error('Lỗi thu phí:', err);
      alert('Có lỗi xảy ra khi thu phí. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- XỬ LÝ TẠO ĐỢT THU MỚI ---
  const handleCreateCampaign = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Tránh duplicate requests
    if (isCreating) {
      return;
    }

    const formData = new FormData(e.currentTarget);
    try {
      setIsCreating(true);
      setIsLoading(true);
      setError(null);

      const data = {
        name: formData.get('name') as string,
        type: formData.get('type') as unknown as FeeType,
        amount: Number(formData.get('amount')) || 0,
        startDate: formData.get('startDate') as string,
        description: formData.get('description') as string,
      };

      const response = await api.createFeeCampaign(data);
      console.log("Kết quả từ server:", response); // Kiểm tra kết quả thành công

      // Refresh danh sách đợt thu
      const updatedFees = await api.getFeeCampaigns();
      setFees(updatedFees);
      
      // Đóng modal và reset form
      setIsCreateModalOpen(false);
      setError(null);
      (e.target as HTMLFormElement).reset();
      
      alert('Tạo đợt thu thành công!');
    } catch (err: any) {
      // SỬA Ở ĐÂY: Log chi tiết lỗi từ Server trả về
      console.error('Lỗi tạo đợt thu:', err);
      if (err.response) {
        const errorData = err.response.data;
        const errorMessage = errorData?.message || errorData?.details || 'Dữ liệu không hợp lệ';
        console.error('Dữ liệu lỗi từ Server:', errorData);
        setError(errorMessage);
        alert(`Lỗi Server: ${errorMessage}`);
      } else if (err.request) {
        console.error('Không nhận được response từ server');
        setError('Không thể kết nối tới Server');
        alert('Không thể kết nối tới Server. Vui lòng kiểm tra lại.');
      } else {
        console.error('Lỗi kết nối:', err.message);
        setError(err.message);
        alert(`Lỗi: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
      setIsCreating(false);
    }
  };
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Đợt vận động
          </h3>
          <div className="space-y-2">
            {fees.map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedCampaign(f)}
                className={`w-full p-4 rounded-xl text-left border transition-all duration-200 ${selectedCampaign?.id === f.id
                  ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/10'
                  : 'bg-white border-slate-200 hover:border-blue-200'
                  }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${f.type === FeeType.MANDATORY ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                    }`}>
                    {f.type}
                  </span>
                  <span className="text-xs text-slate-400">{f.startDate}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm">{f.name}</h4>
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all font-semibold text-sm"
          >
            <Plus className="w-4 h-4" />
            Tạo đợt thu mới
          </button>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {selectedCampaign && (
            <>
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-3xl text-white shadow-xl shadow-blue-600/20 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedCampaign.name}</h2>
                    <p className="text-blue-100 mb-6 max-w-md">{selectedCampaign.description}</p>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-xs text-blue-200 uppercase font-bold tracking-wider mb-1">Đã thu</p>
                        <p className="text-3xl font-bold">{totalAmountCollected.toLocaleString()} đ</p>
                      </div>
                      <div className="w-px h-12 bg-white/20"></div>
                      <div>
                        <p className="text-xs text-blue-200 uppercase font-bold tracking-wider mb-1">Hộ đã nộp</p>
                        <p className="text-3xl font-bold">{paidHouseholdIds.size} / {households.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsCollecting(true)}
                      className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
                    >
                      Ghi nhận nộp tiền
                    </button>
                    <button className="p-3 bg-blue-700 hover:bg-blue-600 rounded-xl transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Wallet className="w-48 h-48" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                  <h4 className="font-bold text-slate-700">Chi tiết các hộ</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left bg-slate-50/50">
                        <th className="px-6 py-4 font-semibold text-slate-500">Chủ hộ</th>
                        <th className="px-6 py-4 font-semibold text-slate-500">Địa chỉ</th>
                        <th className="px-6 py-4 font-semibold text-slate-500">Trạng thái</th>
                        <th className="px-6 py-4 font-semibold text-slate-500">Số tiền</th>
                        <th className="px-6 py-4 font-semibold text-slate-500">Ngày nộp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {households.map(h => {
                        const payment = campaignPayments.find(p => p.householdId === h.id);
                        return (
                          <tr key={h.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-800">{h.headName}</td>
                            <td className="px-6 py-4 text-slate-500">{h.address}</td>
                            <td className="px-6 py-4">
                              {payment ? (
                                <span className="flex items-center gap-1.5 text-green-600 font-semibold">
                                  <CheckCircle2 className="w-4 h-4" /> Đã nộp
                                </span>
                              ) : (
                                <span className="flex items-center gap-1.5 text-slate-400">
                                  <AlertCircle className="w-4 h-4" /> Chưa nộp
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 font-mono font-bold text-slate-700">
                              {payment ? payment.amount.toLocaleString() : '0'} đ
                            </td>
                            <td className="px-6 py-4 text-slate-500">
                              {payment ? payment.paymentDate : '-'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* --- MODAL THU PHÍ --- */}
      {isCollecting && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Thu phí: {selectedCampaign?.name}</h3>
              <button onClick={() => setIsCollecting(false)} className="p-2 hover:bg-slate-200 rounded-lg">
                <Plus className="w-5 h-5 text-slate-500 rotate-45" />
              </button>
            </div>
            <form onSubmit={handleCollect} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hộ gia đình nộp</label>
                <select
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl"
                  value={selectedHouseholdId}
                  onChange={(e) => {
                    const hId = e.target.value;
                    setSelectedHouseholdId(hId);
                    if (selectedCampaign?.type === FeeType.MANDATORY) {
                      setAmount(calculateMandatoryFee(hId));
                    }
                  }}
                >
                  <option value="">Chọn hộ...</option>
                  {households.filter(h => !paidHouseholdIds.has(h.id)).map(h => (
                    <option key={h.id} value={h.id}>{h.headName} - {h.address}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Số tiền (VNĐ)</label>
                <input
                  type="number"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl font-bold"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  readOnly={selectedCampaign?.type === FeeType.MANDATORY}
                />
              </div>
              <div className="pt-4 space-y-3">
                <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
                  {isLoading ? 'Đang xử lý...' : 'Xác nhận thu tiền'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL TẠO ĐỢT THU MỚI --- */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Tạo đợt thu mới</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-lg">
                <Plus className="w-5 h-5 text-slate-500 rotate-45" />
              </button>
            </div>
            <form onSubmit={handleCreateCampaign} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tên đợt thu</label>
                <input name="name" required className="w-full px-4 py-3 border rounded-xl" placeholder="VD: Quỹ vắc xin 2024" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Loại phí</label>
                <select name="type" className="w-full px-4 py-3 border rounded-xl">
                  <option value={FeeType.VOLUNTARY}>Tự nguyện</option>
                  <option value={FeeType.MANDATORY}>Bắt buộc</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Số tiền mặc định (nếu có)</label>
                <input name="amount" type="number" className="w-full px-4 py-3 border rounded-xl" placeholder="0" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ngày bắt đầu</label>
                <input name="startDate" type="date" required className="w-full px-4 py-3 border rounded-xl" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mô tả</label>
                <textarea name="description" className="w-full px-4 py-3 border rounded-xl" rows={2}></textarea>
              </div>
              <button type="submit" disabled={isLoading || isCreating} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading || isCreating ? 'Đang tạo...' : 'Xác nhận tạo đợt thu'}
              </button>
              {error && (
                <div className="text-red-600 text-sm mt-2 bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeManager;