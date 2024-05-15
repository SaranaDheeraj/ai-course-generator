import ConfirmChapters from "@/components/ConfirmChaptersComponent";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Info } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    courseId: string;
  };
};

const CreateChapters = async ({ params: { courseId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/gallery");
  }
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });
  if (!course) {
    return redirect("/create");
  }
  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto my-16">
  <h5 className="text-sm uppercase text-gray-500 tracking-wide mb-2">
    Productivity Masterclass
  </h5>
  <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
    Unlock Your Potential: Strategies for Peak Performance
  </h1>
  <section className="py-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg mx-auto max-w-4xl">
  <div className="flex items-center px-8">
    <span className="mr-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-12 h-12 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.832c0-.367-.299-.66-.662-.66h-7.686c-.363 0-.662.293-.662.66V21M0 0h24v24H0z"
        />
      </svg>
    </span>
    <div className="text-white text-lg leading-relaxed">
      <p className="mb-2">
        Unlock the secrets of unparalleled efficiency with our meticulously
        crafted curriculum.
      </p>
      <p>
        Dive into a transformative odyssey, where every module unveils profound
        insights into optimizing your productivity.
      </p>
    </div>
  </div>
</section>
  <ConfirmChapters course={course} />
</div>
  );
};

export default CreateChapters;
