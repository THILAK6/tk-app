import { DashboardLayout } from "./components/layout/DashboardLayout";
import { DashboardContent } from "./components/DashboardContent";

export default async function DashboardPage() {
  return (
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
  );
}