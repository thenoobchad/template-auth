

export default function HomePage() {
  return (
    <main className="mt-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>

        <div className="bg-muted my-2 h-1" />

        <h2 className="text-2xl font-bold tracking-tight">Created With</h2>

        <ul className="mt-4 grid grid-cols-4 gap-2">
          <li className=" p-2 shadow hover:bg-muted">NextJs</li>
          <li className=" p-2 shadow hover:bg-muted">Tailwindcss</li>
          <li className=" p-2 shadow hover:bg-muted">Shadcn</li>
          <li className=" p-2 shadow hover:bg-muted">AuthJs</li>
          <li className=" p-2 shadow hover:bg-muted">Drizzle ORM</li>
          <li className=" p-2 shadow hover:bg-muted">LibSQL</li>
          <li className=" p-2 shadow hover:bg-muted">Valibot</li>
          <li className=" p-2 shadow hover:bg-muted">Typescript</li>
          
        </ul>
      </div>
    </main>
  );
}
