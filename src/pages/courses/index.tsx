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

const Courses = ({ courses }: any) => {
  console.log(courses);
  return (
    <ComponentWrapper>
      <Table>
        <TableCaption>A list of all the courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Course ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Course Code</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course: any) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.id}</TableCell>
              <TableCell className="font-medium">{course.title}</TableCell>
              <TableCell>{course.course_code}</TableCell>
              <TableCell>{course.description}</TableCell>
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
