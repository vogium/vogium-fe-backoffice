import React, { useState } from "react";
import { IUser } from "../../../types/IUser";
import Card from "../../../components/Card";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Enum'lar
enum DocumentType {
  IDENTITY = "identity",
  CONTRACT = "contract",
  OTHER = "other",
}

enum DocumentStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

// Interface'ler
interface Document {
  id: string;
  type: DocumentType;
  status: DocumentStatus;
  uploadDate: Date;
  expiryDate?: Date;
  userId: string;
  userName: string;
  fileName: string;
  fileUrl: string;
  rejectionReason?: string;
  description: string;
}

interface DocumentFilter {
  type?: DocumentType;
  status?: DocumentStatus;
}

interface UserDocumentsTabProps {
  userData: IUser;
}

const UserDocumentsTab: React.FC<UserDocumentsTabProps> = ({ userData }) => {
  // State'ler
  const [filters, setFilters] = useState<DocumentFilter>({});
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Mock data
  const mockDocuments: Document[] = [
    {
      id: "1",
      type: DocumentType.IDENTITY,
      status: DocumentStatus.PENDING,
      uploadDate: new Date(),
      userId: userData?.id?.toString() || "",
      userName: userData?.username || "",
      fileName: "kimlik.pdf",
      fileUrl: "https://example.com/kimlik.pdf",
      description: "T.C. Kimlik Kartı",
    },
    {
      id: "2",
      type: DocumentType.CONTRACT,
      status: DocumentStatus.APPROVED,
      uploadDate: new Date("2024-01-15"),
      expiryDate: new Date("2025-12-31"),
      userId: userData?.id?.toString() || "",
      userName: userData?.username || "",
      fileName: "vogger_sozlesmesi.pdf",
      fileUrl: "https://example.com/sozlesme.pdf",
      description: "Vogger Sözleşmesi",
    },
    {
      id: "3",
      type: DocumentType.OTHER,
      status: DocumentStatus.REJECTED,
      uploadDate: new Date("2024-01-10"),
      userId: userData?.id?.toString() || "",
      userName: userData?.username || "",
      fileName: "banka_belgesi.pdf",
      fileUrl: "https://example.com/banka.pdf",
      description: "Banka Hesap Belgesi",
      rejectionReason: "Belge bulanık ve okunaksız.",
    },
  ];

  // Belge işlemleri
  const handleApproveDocument = async (document: Document) => {
    try {
      // API çağrısı yapılacak
      console.log(`Approving document: ${document.id}`);
      showSuccess("Belge başarıyla onaylandı");
    } catch (error) {
      console.error("Error approving document:", error);
    }
  };

  const handleRejectDocument = async (document: Document, reason: string) => {
    try {
      // API çağrısı yapılacak
      console.log(`Rejecting document: ${document.id}, reason: ${reason}`);
      setShowRejectModal(false);
      setRejectionReason("");
    } catch (error) {
      console.error("Error rejecting document:", error);
    }
  };

  // Belge yükleme handler'ı
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Implement file upload logic
      console.log("Uploading file:", file.name);
      showSuccess("Belge başarıyla yüklendi");
    }
  };

  // Başarı mesajı gösterme
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  // Modal bileşenleri
  const DocumentPreviewModal: React.FC<{
    document: Document;
    onClose: () => void;
  }> = ({ document, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Belge Önizleme</h3>
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

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Belge Türü</p>
              <p className="font-medium">
                {document.type === DocumentType.IDENTITY
                  ? "Kimlik Belgesi"
                  : document.type === DocumentType.CONTRACT
                  ? "Sözleşme"
                  : "Diğer"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Durum</p>
              <span
                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${
                    document.status === DocumentStatus.APPROVED
                      ? "bg-green-100 text-green-800"
                      : document.status === DocumentStatus.PENDING
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
              >
                {document.status === DocumentStatus.APPROVED
                  ? "Onaylandı"
                  : document.status === DocumentStatus.PENDING
                  ? "Beklemede"
                  : "Reddedildi"}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Yükleme Tarihi</p>
            <p className="font-medium">
              {format(document.uploadDate, "dd MMMM yyyy", { locale: tr })}
            </p>
          </div>

          {document.expiryDate && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Son Geçerlilik Tarihi</p>
              <p className="font-medium">
                {format(document.expiryDate, "dd MMMM yyyy", { locale: tr })}
              </p>
            </div>
          )}

          <div className="mt-6">
            <iframe
              src={document.fileUrl}
              className="w-full h-96 border rounded-lg"
              title="Document Preview"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => window.open(document.fileUrl, "_blank")}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            İndir
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );

  const RejectModal: React.FC<{
    document: Document;
    onClose: () => void;
    onReject: (reason: string) => void;
  }> = ({ document, onClose, onReject }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Belgeyi Reddet</h3>
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

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Red Nedeni
            </label>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand"
              rows={4}
              placeholder="Belgenin reddedilme nedenini açıklayın..."
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            İptal
          </button>
          <button
            onClick={() => onReject(rejectionReason)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            disabled={!rejectionReason.trim()}
          >
            Reddet
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Başarı Mesajı */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50">
          {successMessage}
        </div>
      )}

      {/* Filtreler ve Yükleme Butonu */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={filters.type || ""}
              onChange={(e) =>
                setFilters({ ...filters, type: e.target.value as DocumentType })
              }
              className="form-select rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand"
            >
              <option value="">Tüm Belge Türleri</option>
              <option value={DocumentType.IDENTITY}>Kimlik Belgesi</option>
              <option value={DocumentType.CONTRACT}>Sözleşme</option>
              <option value={DocumentType.OTHER}>Diğer</option>
            </select>

            <select
              value={filters.status || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  status: e.target.value as DocumentStatus,
                })
              }
              className="form-select rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand"
            >
              <option value="">Tüm Durumlar</option>
              <option value={DocumentStatus.PENDING}>Beklemede</option>
              <option value={DocumentStatus.APPROVED}>Onaylandı</option>
              <option value={DocumentStatus.REJECTED}>Reddedildi</option>
            </select>
          </div>

          {/* Belge Yükleme */}
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="document-upload"
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <label
              htmlFor="document-upload"
              className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark cursor-pointer transition-colors"
            >
              Yeni Belge Yükle
            </label>
          </div>
        </div>
      </Card>

      {/* Belge Listesi */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Belge Türü
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yükleme Tarihi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Geçerlilik
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockDocuments
                .filter(
                  (doc) =>
                    (!filters.type || doc.type === filters.type) &&
                    (!filters.status || doc.status === filters.status)
                )
                .map((document) => (
                  <tr key={document.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {document.type === DocumentType.IDENTITY
                        ? "Kimlik Belgesi"
                        : document.type === DocumentType.CONTRACT
                        ? "Sözleşme"
                        : "Diğer"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${
                            document.status === DocumentStatus.APPROVED
                              ? "bg-green-100 text-green-800"
                              : document.status === DocumentStatus.PENDING
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                      >
                        {document.status === DocumentStatus.APPROVED
                          ? "Onaylandı"
                          : document.status === DocumentStatus.PENDING
                          ? "Beklemede"
                          : "Reddedildi"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(document.uploadDate, "dd MMMM yyyy", {
                        locale: tr,
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {document.expiryDate
                        ? format(document.expiryDate, "dd MMMM yyyy", {
                            locale: tr,
                          })
                        : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => {
                          setSelectedDocument(document);
                          setShowPreviewModal(true);
                        }}
                        className="text-brand hover:text-brand-dark"
                      >
                        Görüntüle
                      </button>
                      {document.status === DocumentStatus.PENDING && (
                        <>
                          <button
                            onClick={() => handleApproveDocument(document)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Onayla
                          </button>
                          <button
                            onClick={() => {
                              setSelectedDocument(document);
                              setShowRejectModal(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reddet
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modaller */}
      {showPreviewModal && selectedDocument && (
        <DocumentPreviewModal
          document={selectedDocument}
          onClose={() => {
            setShowPreviewModal(false);
            setSelectedDocument(null);
          }}
        />
      )}

      {showRejectModal && selectedDocument && (
        <RejectModal
          document={selectedDocument}
          onClose={() => {
            setShowRejectModal(false);
            setSelectedDocument(null);
            setRejectionReason("");
          }}
          onReject={(reason) => handleRejectDocument(selectedDocument, reason)}
        />
      )}
    </div>
  );
};

export default UserDocumentsTab;
