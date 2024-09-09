import { Header } from "@/app/components/header";
import { LoignForm } from "@/app/components/login-form/form";

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col justify-between bg-gradient-to-r from-teal-800 to-teal-600">

        <div className="flex flex-col h-screen">
            <Header />
            <LoignForm />
        </div>

    </main>
  );
}
