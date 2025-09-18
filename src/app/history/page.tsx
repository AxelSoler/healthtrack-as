import { Header } from "@/components/layout/Header";
import { createClient } from "@/utils/supabase/server";

const HistoryPage = async () => {
  const supabase = await createClient();
  const { data: history, error } = await supabase
    .from("history_logs")
    .select("created_at, description")
    .order("created_at", { ascending: false });

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <Header />

      <main className="p-4 md:p-8 flex flex-col items-center gap-2 md:gap-8">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">History</h2>
          {history && history.length > 0 ? (
            <ul className="space-y-4">
              {history.map((item, index) => (
                <li
                  key={index}
                  className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <p className="text-lg md:text-2xl font-bold md:ml-4">
                      {item.description}
                    </p>
                    <p className="text-sm text-neutral-500 ml-auto mt-2 md:mt-0">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-neutral-500 py-8">
              No history found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;
