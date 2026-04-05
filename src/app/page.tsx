export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-4xl font-bold">Buggy App</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Buggy App is running. Try the endpoints below:
        </p>
        <div className="flex flex-col gap-4">
          <a
            href="/api/slow"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            /api/slow (10s latency)
          </a>
          <a
            href="/api/get-weather"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            /api/get-weather
          </a>
        </div>
      </main>
    </div>
  );
}