import { Header } from "@/app/components/header";
import { LoignForm } from "@/app/components/login-form/form";

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col justify-between">

        <div className="flex flex-col h-screen">
            <Header />
            <LoignForm />
        </div>

    </main>
  );
}
