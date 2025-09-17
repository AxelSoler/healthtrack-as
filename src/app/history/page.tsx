import { Header } from "@/components/layout/Header";

const HistoryPage = async () => {

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <Header />

      <main className="p-4 md:p-8 flex flex-col items-center gap-2 md:gap-8">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">History</h2>
          <p className="text-center text-neutral-500 py-8">
            User history will be displayed here.
          </p>
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;
