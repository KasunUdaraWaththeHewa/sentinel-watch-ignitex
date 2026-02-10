import { TopNav, BottomNav } from "@/components/sentinel/Navigation";
import { AddWatchedItem } from "@/components/sentinel/AddWatchedItem";

const AddItem = () => {
  return (
    <div className="min-h-screen bg-background bg-noise">
      <TopNav />
      <main>
        <AddWatchedItem />
      </main>
      <BottomNav />
    </div>
  );
};

export default AddItem;