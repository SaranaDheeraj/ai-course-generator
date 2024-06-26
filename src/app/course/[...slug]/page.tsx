import CourseSideBar from '@/components/CourseSideBarComponent'
import MainVideoSummary from '@/components/MainVideoSummary'
import QuizCards from '@/components/QuizCards'
import { prisma } from "@/lib/db"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params:{
        slug: string[]
    }
}

const CoursePage = async ({params:{slug}}: Props) => {
const[courseId,unitIndexParam,chapterIndexParam]=slug
const course=await prisma.course.findUnique({
    where:{id:courseId},
    include:{
        units:{
            include:{chapters:{
                include:{questions:true}
            }}
        }
    }
})
if(!course){
    return redirect('/gallery')

}
let unitIndex=parseInt(unitIndexParam)
let chapterIndex=parseInt(chapterIndexParam)

const unit = course.units[unitIndex]
if (!unit){
    return redirect('/gallery')
}
const chapter=unit.chapters[chapterIndex]
if(!chapter){
    return redirect('/gallery')
}

const nextChapter=unit.chapters[chapterIndex+1]
const prevChapter=unit.chapters[chapterIndex-1]
    return (
        
        <div className=' py-7 mx-auto max-w-2xl'>
            <div>
        <CourseSideBar course={course} currentChapterId={chapter.id}/>
        </div>
        <div className='h-auto'>
                    <MainVideoSummary 
                    chapter={chapter} 
                    chapterIndex={chapterIndex} 
                    unit={unit} 
                    unitIndex={unitIndex}
                    />
                    {/* <QuizCards chapter={chapter}/> */}

                </div>
        </div>
    )
    
  
}

export default CoursePage;