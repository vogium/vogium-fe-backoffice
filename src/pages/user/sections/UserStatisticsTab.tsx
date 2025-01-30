import { IUser } from "../../../types/IUser";
import { LineChart } from "../../../components/charts/LineChart";
import { PieChart } from "../../../components/charts/PieChart";
import { OneLineAreaChart } from "../../../components/charts/OneLineAreaChart";
import Card from "../../../components/Card";
import { BasicStatCard } from "../../../components/charts/BasicStatCard";

export default function UserStatisticsTab({ userData }: { userData: IUser }) {
  // Pie chart için kullanıcı etkileşim verileri
  const interactionData = [
    userData?.vogCount || 0,
    userData?.vogLikeCount || 0,
    userData?.postCommentCount || 0,
    userData?.blogsReadCount || 0,
    userData?.blogsLikeCount || 0,
  ];

  const interactionLabels = [
    "Vog Sayısı",
    "Vog Beğenileri",
    "Yorumlar",
    "Okunan Bloglar",
    "Blog Beğenileri",
  ];

  // Line chart için son 7 günlük aktivite verisi (örnek)
  const last7DaysActivity = [
    { date: "2024-01-01", value: userData?.vogCount || 0 },
    { date: "2024-01-02", value: (userData?.vogCount || 0) + 5 },
    { date: "2024-01-03", value: (userData?.vogCount || 0) + 8 },
    { date: "2024-01-04", value: (userData?.vogCount || 0) + 12 },
    { date: "2024-01-05", value: (userData?.vogCount || 0) + 15 },
    { date: "2024-01-06", value: (userData?.vogCount || 0) + 18 },
    { date: "2024-01-07", value: (userData?.vogCount || 0) + 20 },
  ];

  // Area chart için sosyal medya metrikleri
  const socialMetrics = [
    { date: "2024-01-01", value: userData?.followerCount || 0 },
    { date: "2024-01-02", value: (userData?.followerCount || 0) + 10 },
    { date: "2024-01-03", value: (userData?.followerCount || 0) + 25 },
    { date: "2024-01-04", value: (userData?.followerCount || 0) + 35 },
    { date: "2024-01-05", value: (userData?.followerCount || 0) + 50 },
    { date: "2024-01-06", value: (userData?.followerCount || 0) + 65 },
    { date: "2024-01-07", value: (userData?.followerCount || 0) + 80 },
  ];

  return (
    <div className="space-y-6">
      {/* Üst Metrikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BasicStatCard
          title="Toplam Takipçi"
          value={userData?.followerCount || 0}
        />

        <BasicStatCard title="Toplam Vog" value={userData?.vogCount || 0} />

        <BasicStatCard
          title="Toplam Beğeni"
          value={userData?.vogLikeCount || 0}
        />

        <BasicStatCard
          title="Etkileşim Oranı"
          value={
            ((userData?.vogLikeCount || 0) / (userData?.vogCount || 1)) * 100
          }
          isIncreased
        />
      </div>

      {/* Grafikler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Etkileşim Dağılımı - Pie Chart */}
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-medium mb-4">Etkileşim Dağılımı</h3>
            <PieChart
              data={interactionData}
              labels={interactionLabels}
              label="Kullanıcı Etkileşimleri"
            />
          </div>
        </Card>

        {/* Takipçi Artış Trendi - Area Chart */}
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-medium mb-4">Takipçi Artış Trendi</h3>
            <OneLineAreaChart
              data={socialMetrics.map((item) => item.value)}
              labels={socialMetrics.map((item) => item.date)}
              label="Takipçi Sayısı"
            />
          </div>
        </Card>

        {/* Aktivite Trendi - Line Chart */}
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-medium mb-4">Günlük Aktivite</h3>
            <LineChart
              dailyInteractions={last7DaysActivity.map((item) => item.value)}
              dailyLabels={last7DaysActivity.map((item) => item.date)}
              averageInteractionRatio={0.75}
              title="Günlük Aktivite"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
