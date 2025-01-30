import React, { useState } from "react";
import { IUser } from "../../../types/IUser";
import { BasicStatCard } from "../../../components/charts/BasicStatCard";
import { PieChart } from "../../../components/charts/PieChart";
import Card from "../../../components/Card";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AccountingSummary {
  totalIncome: number;
  pendingIncome: number;
  totalExpense: number;
  pendingExpense: number;
  incomeDistribution: {
    subscriptionIncome: number;
    collaborationIncome: number;
    campaignIncome: number;
    otherIncome: number;
  };
  expenseDistribution: {
    subscriptionExpense: number;
    membershipExpense: number;
    campaignExpense: number;
    otherExpense: number;
  };
}

// Mock data - Bu kısım API'den gelecek
const mockAccountingData: AccountingSummary = {
  totalIncome: 15000,
  pendingIncome: 2000,
  totalExpense: 8000,
  pendingExpense: 1000,
  incomeDistribution: {
    subscriptionIncome: 5000,
    collaborationIncome: 4000,
    campaignIncome: 3000,
    otherIncome: 3000,
  },
  expenseDistribution: {
    subscriptionExpense: 3000,
    membershipExpense: 2000,
    campaignExpense: 2000,
    otherExpense: 1000,
  },
};

interface UserAccountingTabProps {
  userData: IUser;
}

// Enum'lar için
enum DateRangeType {
  LAST_7_DAYS = "last7Days",
  LAST_30_DAYS = "last30Days",
  CUSTOM = "custom",
}

enum TransactionStatus {
  COMPLETED = "completed",
  PENDING = "pending",
  CANCELLED = "cancelled",
}

// TransactionType enum'unu ekleyelim
enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

// Yeni interface'ler
interface TransactionReceipt {
  id: string;
  transactionId: string;
  receiptNumber: string;
  issueDate: Date;
  details: {
    companyName: string;
    taxNumber?: string;
    address?: string;
  };
  items: {
    description: string;
    amount: number;
    tax?: number;
  }[];
  total: number;
  taxTotal: number;
  grandTotal: number;
}

// Mevcut Transaction interface'ini genişletelim
interface Transaction {
  id: string;
  type: string;
  transactionType: TransactionType;
  amount: number;
  date: Date;
  status: TransactionStatus;
  description?: string;
  category: string;
  paymentMethod?: string;
  reference?: string;
  receipt?: TransactionReceipt;
  canApprove?: boolean;
  approvalType?: "payment" | "income";
}

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const UserAccountingTab: React.FC<UserAccountingTabProps> = ({ userData }) => {
  // State tanımlamaları
  const [dateRangeType, setDateRangeType] = useState<DateRangeType>(
    DateRangeType.LAST_7_DAYS
  );
  const [customDateRange, setCustomDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] =
    useState<TransactionReceipt | null>(null);

  const incomeData = [
    mockAccountingData.incomeDistribution.subscriptionIncome,
    mockAccountingData.incomeDistribution.collaborationIncome,
    mockAccountingData.incomeDistribution.campaignIncome,
    mockAccountingData.incomeDistribution.otherIncome,
  ];

  const incomeLabels = [
    "Abonelik Gelirleri",
    "İşbirliği Gelirleri",
    "Kampanya Gelirleri",
    "Diğer Gelirler",
  ];

  const expenseData = [
    mockAccountingData.expenseDistribution.subscriptionExpense,
    mockAccountingData.expenseDistribution.membershipExpense,
    mockAccountingData.expenseDistribution.campaignExpense,
    mockAccountingData.expenseDistribution.otherExpense,
  ];

  const expenseLabels = [
    "Abonelik Giderleri",
    "Üyelik Giderleri",
    "Kampanya Giderleri",
    "Diğer Giderler",
  ];

  // Mock transactions data
  const mockTransactions: Transaction[] = [
    {
      id: "1",
      type: "İşbirliği Geliri",
      transactionType: TransactionType.INCOME,
      amount: 1000,
      date: new Date("2024-12-20"),
      status: TransactionStatus.PENDING,
      description: "XYZ Markası İşbirliği Kampanyası",
      category: "İşbirliği",
      paymentMethod: "Banka Transferi",
      reference: "REF123456",
    },
    {
      id: "2",
      type: "Abonelik Geliri",
      transactionType: TransactionType.INCOME,
      amount: 500,
      date: new Date("2024-12-19"),
      status: TransactionStatus.COMPLETED,
      description: "Premium Üyelik Ödemesi",
      category: "Abonelik",
      paymentMethod: "Kredi Kartı",
      reference: "SUB789012",
    },
    // ... Daha fazla mock veri eklenebilir
  ];

  // Tarih aralığı değişikliği için handler
  const handleDateRangeChange = (type: DateRangeType) => {
    setDateRangeType(type);
    if (type !== DateRangeType.CUSTOM) {
      setCustomDateRange({ startDate: null, endDate: null });
    }
  };

  // Pasta grafik tıklama handler'ı
  const handlePieChartClick = (category: string) => {
    setSelectedCategory(category);
  };

  // İşlem onaylama handler'ı
  const handleTransactionApproval = async (transaction: Transaction) => {
    try {
      // API çağrısı yapılacak
      console.log(`Approving transaction: ${transaction.id}`);
      // Başarılı onay sonrası UI güncelleme
      // TODO: Implement API call
    } catch (error) {
      console.error("Error approving transaction:", error);
    }
  };

  // Makbuz görüntüleme ve indirme handler'ı
  const handleViewReceipt = (receipt: TransactionReceipt) => {
    setSelectedReceipt(receipt);
    setShowReceiptModal(true);
  };

  // İşlem detayı görüntüleme için modal komponenti
  const TransactionDetailModal: React.FC<{
    transaction: Transaction;
    onClose: () => void;
  }> = ({ transaction, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h3 className="text-xl font-semibold">
            İşlem Detayı
            <span
              className={`ml-2 text-sm px-2 py-1 rounded-full ${
                transaction.transactionType === TransactionType.INCOME
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {transaction.transactionType === TransactionType.INCOME
                ? "Gelir"
                : "Gider"}
            </span>
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Ana Detaylar */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Tür</p>
              <p className="font-medium">{transaction.type}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Kategori</p>
              <p className="font-medium">{transaction.category}</p>
            </div>
          </div>

          {/* Tutar ve Durum */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Tutar</p>
              <p className="font-medium text-lg">
                {transaction.amount.toLocaleString("tr-TR")} TL
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Durum</p>
              <span
                className={`px-2 py-1 inline-flex text-sm font-semibold rounded-full ${
                  transaction.status === TransactionStatus.COMPLETED
                    ? "bg-green-100 text-green-800"
                    : transaction.status === TransactionStatus.PENDING
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {transaction.status === TransactionStatus.COMPLETED
                  ? "Tamamlandı"
                  : transaction.status === TransactionStatus.PENDING
                  ? "Beklemede"
                  : "İptal Edildi"}
              </span>
            </div>
          </div>

          {/* Tarih ve Ödeme Yöntemi */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Tarih</p>
              <p className="font-medium">
                {format(transaction.date, "dd MMMM yyyy", { locale: tr })}
              </p>
            </div>
            {transaction.paymentMethod && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Ödeme Yöntemi</p>
                <p className="font-medium">{transaction.paymentMethod}</p>
              </div>
            )}
          </div>

          {/* Açıklama */}
          {transaction.description && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Açıklama</p>
              <p className="font-medium">{transaction.description}</p>
            </div>
          )}

          {/* Referans Numarası */}
          {transaction.reference && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Referans No</p>
              <p className="font-medium font-mono">{transaction.reference}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t flex justify-between">
          <div className="flex gap-2">
            {transaction.canApprove && (
              <button
                onClick={() => handleTransactionApproval(transaction)}
                className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark transition-colors"
              >
                {transaction.approvalType === "payment"
                  ? "Ödemeyi Onayla"
                  : "Geliri Onayla"}
              </button>
            )}
            {transaction.receipt && (
              <button
                onClick={() => handleViewReceipt(transaction.receipt!)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Makbuzu Görüntüle
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );

  // Makbuz Modal Komponenti
  const ReceiptModal: React.FC<{
    receipt: TransactionReceipt;
    onClose: () => void;
    onDownload: () => void;
  }> = ({ receipt, onClose, onDownload }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Makbuz</h3>
          <div className="flex gap-2">
            <button
              onClick={onDownload}
              className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark transition-colors"
            >
              İndir
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
          {/* Makbuz Başlığı */}
          <div className="border-b pb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Makbuz No</p>
                <p className="font-medium">{receipt.receiptNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tarih</p>
                <p className="font-medium">
                  {format(receipt.issueDate, "dd MMMM yyyy", { locale: tr })}
                </p>
              </div>
            </div>
          </div>

          {/* Firma Bilgileri */}
          <div className="border-b pb-4">
            <h4 className="font-medium mb-2">Firma Bilgileri</h4>
            <div className="space-y-2">
              <p>{receipt.details.companyName}</p>
              {receipt.details.taxNumber && (
                <p className="text-sm text-gray-600">
                  Vergi No: {receipt.details.taxNumber}
                </p>
              )}
              {receipt.details.address && (
                <p className="text-sm text-gray-600">
                  {receipt.details.address}
                </p>
              )}
            </div>
          </div>

          {/* İşlem Detayları */}
          <div>
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="py-2">Açıklama</th>
                  <th className="py-2 text-right">Tutar</th>
                  {receipt.items.some((item) => item.tax !== undefined) && (
                    <th className="py-2 text-right">KDV</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {receipt.items.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2">{item.description}</td>
                    <td className="py-2 text-right">
                      {item.amount.toLocaleString("tr-TR")} TL
                    </td>
                    {item.tax !== undefined && (
                      <td className="py-2 text-right">
                        {item.tax.toLocaleString("tr-TR")} TL
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t">
                <tr>
                  <td className="py-2 font-medium">Toplam</td>
                  <td colSpan={2} className="py-2 text-right font-medium">
                    {receipt.grandTotal.toLocaleString("tr-TR")} TL
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Zaman Aralığı Seçimi */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-4">
            <select
              value={dateRangeType}
              onChange={(e) =>
                handleDateRangeChange(e.target.value as DateRangeType)
              }
              className="form-select rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value={DateRangeType.LAST_7_DAYS}>Son 7 Gün</option>
              <option value={DateRangeType.LAST_30_DAYS}>Son 30 Gün</option>
              <option value={DateRangeType.CUSTOM}>Özel Tarih Aralığı</option>
            </select>
          </div>

          {dateRangeType === DateRangeType.CUSTOM && (
            <div className="flex items-center space-x-4">
              <DatePicker
                selected={customDateRange.startDate}
                onChange={(date) =>
                  setCustomDateRange({ ...customDateRange, startDate: date })
                }
                selectsStart
                startDate={customDateRange.startDate}
                endDate={customDateRange.endDate}
                dateFormat="dd/MM/yyyy"
                placeholderText="Başlangıç Tarihi"
                className="form-input rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <DatePicker
                selected={customDateRange.endDate}
                onChange={(date) =>
                  setCustomDateRange({ ...customDateRange, endDate: date })
                }
                selectsEnd
                startDate={customDateRange.startDate}
                endDate={customDateRange.endDate}
                dateFormat="dd/MM/yyyy"
                placeholderText="Bitiş Tarihi"
                className="form-input rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Üst Özet Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <BasicStatCard
          title="Toplam Gelir"
          value={mockAccountingData.totalIncome}
          isIncreased={true}
          iconSrc="/icons/income.svg"
        />
        <BasicStatCard
          title="Bekleyen Gelirler"
          value={mockAccountingData.pendingIncome}
          isIncreased={false}
          iconSrc="/icons/pending-income.svg"
        />
        <BasicStatCard
          title="Toplam Gider"
          value={mockAccountingData.totalExpense}
          isIncreased={false}
          iconSrc="/icons/expense.svg"
        />
        <BasicStatCard
          title="Bekleyen Ödemeler"
          value={mockAccountingData.pendingExpense}
          isIncreased={false}
          iconSrc="/icons/pending-expense.svg"
        />
      </div>

      {/* Grafikler ve Listeler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sol Kolon - Gelir ve Gider Dağılımı */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Gelir Dağılımı</h3>
            <PieChart
              data={incomeData}
              labels={incomeLabels}
              label="Gelir Dağılımı"
              height={300}
              onClick={handlePieChartClick}
            />
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Gider Dağılımı</h3>
            <PieChart
              data={expenseData}
              labels={expenseLabels}
              label="Gider Dağılımı"
              height={300}
              onClick={handlePieChartClick}
            />
          </Card>
        </div>

        {/* Sağ Kolon - Bekleyen İşlemler */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Bekleyen Gelirler</h3>
            <div className="space-y-4">
              {/* Bekleyen Gelirler Listesi */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlem
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tutar
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Mock veri */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Abonelik Geliri
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">1.000 TL</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Beklemede
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Bekleyen Ödemeler</h3>
            <div className="space-y-4">
              {/* Bekleyen Ödemeler Listesi */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlem
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tutar
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Mock veri */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Üyelik Ödemesi
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">500 TL</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Beklemede
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* İşlem Detayları Tablosu */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Tüm İşlemler</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tür
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tutar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.amount} TL
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(transaction.date, "dd MMMM yyyy", { locale: tr })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${
                          transaction.status === TransactionStatus.COMPLETED
                            ? "bg-green-100 text-green-800"
                            : transaction.status === TransactionStatus.PENDING
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {transaction.status === TransactionStatus.COMPLETED
                        ? "Tamamlandı"
                        : transaction.status === TransactionStatus.PENDING
                        ? "Beklemede"
                        : "İptal Edildi"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedTransaction(transaction)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Detay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* İşlem Detay Modalı */}
      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}

      {/* Kategori detayları */}
      {selectedCategory && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">
            {selectedCategory} Detayları
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* ... Tablo içeriği ... */}
            </table>
          </div>
        </Card>
      )}

      {/* Makbuz Modal */}
      {showReceiptModal && selectedReceipt && (
        <ReceiptModal
          receipt={selectedReceipt}
          onClose={() => setShowReceiptModal(false)}
          onDownload={() => {
            // TODO: Implement download functionality
            console.log("Downloading receipt:", selectedReceipt.receiptNumber);
          }}
        />
      )}
    </div>
  );
};

export default UserAccountingTab;
