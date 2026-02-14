import { AppLayout } from "@/components/sentinel/AppLayout";
import { AddWatchedItem } from "@/components/sentinel/AddWatchedItem";

const AddItem = () => {
  return (
    <AppLayout
      title="Add Watched Item"
      subtitle="Set up a new item for Sentinel to watch."
      showDate={false}
    >
      <AddWatchedItem />
    </AppLayout>
  );
};

export default AddItem;
