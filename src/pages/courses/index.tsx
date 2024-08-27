import ComponentWrapper from "@/components/component-wrapper";
import { request } from "@/lib/request";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CiSearch } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const Courses = ({ courses }: any) => {
  const deleteCourse = async (id:string) => {
    const res = (await request.delete('/courses/'+id+"/delete/"));
    if(res.status === 204){
      alert("Course deleted successfully");
      setTimeout(()=>{
        window.location.reload();
      },500)
    }
  }
  return (
    <ComponentWrapper>
      <Table>
        <TableCaption>A list of all the courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Course Title</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course: any) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.title}</TableCell>
              <TableCell>{course.course_code}</TableCell>
              <TableCell>
                <div className="flex flex-row gap-4">
                  <div>
                  <Popover>
  <PopoverTrigger className="p-0 bg-transparent">
  <CiSearch />

  </PopoverTrigger>
  <PopoverContent>
    <div>
      <h1 className="text-xl font-bold">Course Details</h1>
      <p>
        <span className="font-bold">Course Title:</span> {course.title}
      </p>
      <p>
        <span className="font-bold">Course Code:</span> {course.course_code}
      </p>
      <p>
        <span className="font-bold">Course ID:</span> {course.id}
      </p>
      <p>
        <span className="font-bold">Course Description:</span> {course.description}
      </p>

    </div>
  </PopoverContent>
</Popover>
                  </div>
                  <div>
                    <MdDelete onClick={()=>{
                      deleteCourse(course.id)
                    }}/>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{courses.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </ComponentWrapper>
  );
};

export default Courses;

export const getServerSideProps = async () => {
  const courses = (await request.get(`/courses`)).data;
  return {
    props: {
      courses,
    },
  };
};
