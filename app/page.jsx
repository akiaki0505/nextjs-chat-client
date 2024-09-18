import { Header } from "@/app/components/header";
import { LoignForm } from "@/app/components/login-form/form";

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col justify-between bg-gradient-to-r from-teal-800 to-teal-600 before:absolute before:w-full before:h-full before:bg-teal-800 before:[clip-path:circle(17.2%_at_24%_26%)]">
      <div className=""></div>

        <div className="flex flex-col h-screen">
            <Header />
            <LoignForm />
        </div>

    </main>
  );
}
