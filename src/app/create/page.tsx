import CreateCourseForm from "@/components/CreateCourseForm";
import { getAuthSession } from "@/lib/auth";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

type Props = {};

const CreatePage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/gallery");
  }
  return (
    <section className="h-screen mx-auto pt-6 max-w-7xl py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8 ">
  <h2 className="text-4xl font-bold tracking-wide uppercase">
    Unleash Your Learning Potential
  </h2>
  <p className="text-xl leading-relaxed text-center opacity-75">
    Ignite your thirst for knowledge with our cutting-edge course creation platform.
  </p>
  <div className="flex justify-center gap-4">
    <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:bg-opacity-75 text-lg font-bold rounded-md">
      Embark on Your Learning Adventure
    </button>
    <button className="px-6 py-2 border border-indigo-900 hover:border-opacity-75 text-lg font-bold rounded-md">
      Explore Inspiration
    </button>
  </div>
  <CreateCourseForm />
</section>
  );
};

export default CreatePage;
