import React from 'react'
import {Chapter, Course,  Unit } from "@prisma/client"
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Separator } from './ui/separator'

type Props = {
    course:Course&{
        units:(Unit&{
          chapters:Chapter[]
        })[]
    }
    currentChapterId:string
}

const CourseSideBar = async ({course, currentChapterId}: Props) => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-700 text-white rounded-lg shadow-lg p-8 ">
  <h1 className="text-3xl font-bold mb-6">{course.name}</h1>
  <div className="grid grid-cols-1  gap-6">
    {course.units.map((unit, unitIndex) => (
      <div key={unit.id} className="bg-white bg-opacity-10 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">
          Module {unitIndex + 1}: {unit.name}
        </h2>
        <ul className="space-y-2">
          {unit.chapters.map((chapter, chapterIndex) => (
            <li key={chapter.id}>
              <Link
                href={`/course/${course.id}/${unitIndex}/${chapterIndex}`}
                className={`block p-2 rounded-md transition-colors duration-300 ${
                  chapter.id === currentChapterId
                    ? "bg-white text-indigo-700"
                    : "hover:bg-white hover:bg-opacity-20"
                }`}
              >
                {chapter.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
</div>
  )
    }
  


export default CourseSideBar