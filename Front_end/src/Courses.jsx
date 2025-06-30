import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();
  console.log("Fetched Data:", data);

  if (isError)
    return (
      <div className="text-center py-10">
        <h1 className="text-red-500 font-semibold">Failed to load courses.</h1>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Retry
        </button>
      </div>
    );

  // Ensure at least 8 courses are displayed (fill missing slots with skeletons)
  const courses = data?.courses || [];
  const numCoursesToShow = 8;
  const placeholders = numCoursesToShow - courses.length; // Fill missing slots

  return (
    <div className="bg-gray-50 dark:bg-[#141414]">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: numCoursesToShow }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : [
                ...courses.map((course) => (
                  <Course key={course._id} course={course} />
                )),
                ...Array.from({ length: placeholders }).map((_, index) => (
                  <CourseSkeleton key={`placeholder-${index}`} />
                )),
              ]}
        </div>
      </div>
    </div>
  );
};

export default Courses;

// Skeleton Loader Component for Placeholder Cards
const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36 animate-pulse" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4 animate-pulse" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full animate-pulse" />
            <Skeleton className="h-4 w-20 animate-pulse" />
          </div>
          <Skeleton className="h-4 w-16 animate-pulse" />
        </div>
        <Skeleton className="h-4 w-1/4 animate-pulse" />
      </div>
    </div>
  );
};
