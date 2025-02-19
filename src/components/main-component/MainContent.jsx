// components/MainContent.jsx
import Sidebar from "./Sidebar";
import StoryGrid from "../../features/story/StoryGrid";

export default function MainContent() {
  return (
    <main className="container mx-auto px-4 py-8 flex-1">
      <div className="flex gap-8">
        {/* Sidebar (3/12) */}
        <div className="w-3/12">
          <Sidebar />
        </div>

        {/* Story Grid (9/12) */}
        <div className="w-9/12">
          <StoryGrid />
        </div>
      </div>
    </main>
  );
}
