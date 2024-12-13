
import ProtectedRoute from "@/app/protectRoute/index";
export default function Home() {


  return (
      <ProtectedRoute>
          <div
              className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
              <button>
                  login
              </button>
          </div>
      </ProtectedRoute>
  );
}
