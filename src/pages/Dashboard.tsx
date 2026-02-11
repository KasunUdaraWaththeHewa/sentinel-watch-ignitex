import { TopNav, BottomNav } from "@/components/sentinel/Navigation";
import { FloatingActionButton } from "@/components/sentinel/FloatingActionButton";
import { CommandCenter } from "@/components/sentinel/CommandCenter";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background bg-noise">
      <TopNav />
      <main>
        <CommandCenter />
      </main>
      <FloatingActionButton />
      <BottomNav />
    </div>
  );
};

export default Dashboard;
