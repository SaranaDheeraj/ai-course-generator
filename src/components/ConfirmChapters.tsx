"use client"
import React, { useEffect, useRef } from 'react';
import { Chapter, Course, Unit } from "@prisma/client";
import ChapterCard, { ChapterCardHandler } from './ChapterCard';
import { Separator } from './ui/separator';
import { Button, buttonVariants } from './ui/button';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};

const ConfirmChapters: React.FC<Props> = ({ course }) => {
  const [loading, setLoading] = React.useState(false);
  const chapterRefs: Record<string, React.RefObject<ChapterCardHandler>> = {};

  // Create refs outside the loop
  course.units.forEach((unit) => {
    unit.chapters.forEach((chapter) => {
      chapterRefs[chapter.id] = useRef(null);
    });
  });

  const [completedChapters, setCompletedChapters] = React.useState<Set<String>>(new Set());
  const totalChaptersCount = React.useMemo(() => {
    return course.units.reduce((acc, unit) => {
      return acc + unit.chapters.length;
    }, 0);
  }, [course.units]);

  useEffect(() => {
    console.log(completedChapters);
  }, [completedChapters]);

  return (
    <div className="w-full mt-4">
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unit.id} className="mt-5">
            <h2 className="text-sm uppercase text-secondary-foreground/60">
              Unit {unitIndex + 1}
            </h2>
            <h3 className="text-2xl font-bold">{unit.name}</h3>
            <div className="mt-3">
              {unit.chapters.map((chapter, chapterIndex) => {
                return (
                  <ChapterCard
                    completedChapters={completedChapters}
                    setCompletedChapters={setCompletedChapters}
                    ref={chapterRefs[chapter.id]} // Access ref using chapter ID
                    key={chapter.id}
                    chapter={chapter}
                    chapterIndex={chapterIndex}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      </div>)

    }

export default ConfirmChapters;
