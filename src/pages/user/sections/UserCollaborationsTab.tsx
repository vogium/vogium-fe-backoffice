import React, { useState } from "react";
import { IUser } from "../../../types/IUser";
import Card from "../../../components/Card";
import { Table } from "../../../components/table/Table";
import TableShowButton from "../../../components/table/TableShowButton";
import TableDeleteButton from "../../../components/table/TableDeleteButton";
import SuccessButton from "../../../components/buttons/SuccessButton";
import DangerButton from "../../../components/buttons/DangerButton";
import NeutralButton from "../../../components/buttons/NeutralButton";

import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useNotification } from "@refinedev/core";
import { BaseRecord } from "@refinedev/core";
import { IColumn } from "../../../types/ITable";
import usePagination from "../../../hooks/usePagination";

// Enum'lar
enum VoggerStatus {
  ACTIVE = "active",
  PENDING = "pending",
  FROZEN = "frozen",
}

// Interface'ler
interface Vogger extends BaseRecord {
  id: string;
  name: string;
  followerCount: number;
  postCount: number;
  engagementRate: number;
  agencyId: string;
  joinDate: Date;
  status: VoggerStatus;
  profileImage?: string;
}

interface Agency {
  id: string;
  name: string;
  voggerIds: string[];
  creationDate: Date;
}

interface UserCollaborationsTabProps {
  userData: IUser;
}

const UserCollaborationsTab: React.FC<UserCollaborationsTabProps> = ({
  userData,
}) => {
  const { open } = useNotification();
  const [showAddVoggerModal, setShowAddVoggerModal] = useState(false);
  const [selectedVogger, setSelectedVogger] = useState<Vogger | null>(null);
  const paginationInstance = usePagination<Vogger>();

  // Mock data
  const mockVoggers: Vogger[] = [
    {
      id: "1",
      name: "John Doe",
      followerCount: 10000,
      postCount: 150,
      engagementRate: 4.5,
      agencyId: userData?.id?.toString() || "",
      joinDate: new Date("2024-01-01"),
      status: VoggerStatus.ACTIVE,
      profileImage: "https://example.com/profile1.jpg",
    },
    // ... daha fazla mock veri eklenebilir
  ];

  // Table columns
  const columns: IColumn<Vogger>[] = [
    {
      key: "name",
      header: "Vogger",
      render: (record) => (
        <div className="flex items-center space-x-3">
          {record.profileImage && (
            <img
              src={record.profileImage}
              alt={record.name}
              className="w-8 h-8 rounded-full"
            />
          )}
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      key: "followerCount",
      header: "Takipçi",
      render: (record) => {
        return record.followerCount;
      },
    },
    {
      key: "postCount",
      header: "Gönderi",
      render: (record) => record.postCount,
    },
    {
      key: "engagementRate",
      header: "Etkileşim Oranı",
      render: (record) => `%${record.engagementRate?.toFixed(1) || 0}`,
    },
    {
      key: "joinDate",
      header: "Katılım Tarihi",
    },
    {
      key: "status",
      header: "Durum",
      render: (record) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            record.status === VoggerStatus.ACTIVE
              ? "bg-green-100 text-green-800"
              : record.status === VoggerStatus.PENDING
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {record.status === VoggerStatus.ACTIVE
            ? "Aktif"
            : record.status === VoggerStatus.PENDING
            ? "Beklemede"
            : "Dondurulmuş"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "İşlemler",
      render: (record) => (
        <div className="flex items-center gap-2">
          <TableShowButton onClick={() => handleViewVogger(record)} />
          {record?.status === VoggerStatus.PENDING && (
            <SuccessButton
              title="Onayla"
              onClickAction={() => handleApproveVogger(record)}
            />
          )}
          <TableDeleteButton onClick={() => handleRemoveVogger(record)} />
        </div>
      ),
    },
  ];

  // Handler functions
  const handleAddVogger = async (voggerData: Partial<Vogger>) => {
    try {
      // API call will be implemented
      console.log("Adding vogger:", voggerData);
      open?.({
        type: "success",
        message: "Vogger başarıyla eklendi",
      });
      setShowAddVoggerModal(false);
    } catch (error) {
      open?.({
        type: "error",
        message: "Vogger eklenirken bir hata oluştu",
      });
    }
  };

  const handleRemoveVogger = async (vogger: Vogger) => {
    try {
      console.log("Removing vogger:", vogger.id);
      open?.({
        type: "success",
        message: "Vogger başarıyla çıkarıldı",
      });
    } catch (error) {
      open?.({
        type: "error",
        message: "Vogger çıkarılırken bir hata oluştu",
      });
    }
  };

  const handleApproveVogger = async (vogger: Vogger) => {
    try {
      console.log("Approving vogger:", vogger.id);
      open?.({
        type: "success",
        message: "Vogger başarıyla onaylandı",
      });
    } catch (error) {
      open?.({
        type: "error",
        message: "Vogger onaylanırken bir hata oluştu",
      });
    }
  };

  const handleViewVogger = (vogger: Vogger) => {
    setSelectedVogger(vogger);
    // Implement vogger detail view
  };

  // Add Vogger Modal
  const AddVoggerModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Yeni Vogger Ekle</h3>
        {/* Add form fields here */}
        <div className="mt-4 flex justify-end space-x-2">
          <NeutralButton
            title="İptal"
            onClickAction={() => setShowAddVoggerModal(false)}
          />
          <SuccessButton
            title="Ekle"
            onClickAction={() => handleAddVogger({})}
          />
        </div>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Vogger Yönetimi</h2>
        <SuccessButton
          title="Yeni Vogger Ekle"
          onClickAction={() => setShowAddVoggerModal(true)}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-sm text-gray-500">Toplam Vogger</h3>
          <p className="text-2xl font-semibold">{mockVoggers.length}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm text-gray-500">Aktif Vogger</h3>
          <p className="text-2xl font-semibold">
            {mockVoggers.filter((v) => v.status === VoggerStatus.ACTIVE).length}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm text-gray-500">Ortalama Etkileşim</h3>
          <p className="text-2xl font-semibold">
            {`%${(
              mockVoggers.reduce((acc, v) => acc + v.engagementRate, 0) /
              mockVoggers.length
            ).toFixed(1)}`}
          </p>
        </Card>
      </div>

      {/* Voggers Table */}
      <Card className="p-6">
        <Table<Vogger>
          columns={columns}
          rows={mockVoggers}
          disablePagination={true}
          paginationInstance={paginationInstance}
          //   pagination
          //   sorting
          //   filtering
        />
      </Card>

      {/* Modals */}
      {showAddVoggerModal && <AddVoggerModal />}
    </div>
  );
};

export default UserCollaborationsTab;
