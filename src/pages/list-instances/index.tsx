import ComponentWrapper from "@/components/component-wrapper";
import { request } from "@/lib/request";
import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
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
import {Input} from "@/components/ui/input"
import {useState} from "react"
import {Button} from "@/components/ui/button"


const Courses = () => {

    const [instances, setInstances] = useState<any>([])
    const [instancesForm, setInstancesForm] = useState<any>({});

  const deleteInstance = async (year:string, semester:string, id:string) => {
    const res = (await request.delete(`/instances/${year}/${semester}/${id}/delete/`));
    if(res.status === 204){
      alert("Course deleted successfully");
      setTimeout(()=>{
        window.location.reload();
      },500)
    }
  }

  const getInstances = async (e:any) => {
    e.preventDefault();
    if(!instancesForm.year || !instancesForm.semester){
      alert("Please select a course and enter a year and semester");
      return;
    }

    const res = (await request.get(`/instances/${instancesForm.year}/${instancesForm.semester}/`));
    if(res.status === 200){
      setInstances(res.data);
    }
  }

  console.log(instancesForm)
  
  return (
    <ComponentWrapper>
<div className="flex flex-col justify-center items-center">
        <div className="flex flex-row gap-5">
            <Input type="number" required placeholder="Year" name="year" onChange={(e) => setInstancesForm({...instancesForm, year: e.target.value})} />
            <Select
                    onValueChange={(value) => {
                        setInstancesForm({
                            ...instancesForm,
                            semester: value
                        })
                    }}
                >
                    <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Select a Course" />
                    </SelectTrigger>
                    <SelectContent>       
                        <SelectGroup>
                            <SelectLabel>Courses</SelectLabel>
                            {/* @ts-ignore */}
                            {[...Array(8).keys()]?.map((course:any) => (
                                <SelectItem key={course} value={course}>{course}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button onClick={getInstances}>Get Courses</Button>
        </div>

        {instances && instances.length && (
      <Table>
        <TableCaption>A list of all the Instances for {instancesForm.year} {instancesForm.semester}.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Course Title</TableHead>
            <TableHead>Year - Sem</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {instances.map((instance: any) => (
            <TableRow key={instance.id}>
              <TableCell className="font-medium">{instance.course.title}</TableCell>
              <TableCell className="font-medium">{instance.year} - {instance.semester}</TableCell>
              <TableCell>{instance.course.course_code}</TableCell>
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
        <span className="font-bold">Course Title:</span> {instance.course.title}
      </p>
      <p>
        <span className="font-bold">Course Code:</span> {instance.course.course_code}
      </p>
      <p>
        <span className="font-bold">Course ID:</span> {instance.course.id}
      </p>
      <p>
        <span className="font-bold">Course Description:</span> {instance.course.description}
      </p>

    </div>
  </PopoverContent>
</Popover>
                  </div>
                  <div>
                    <MdDelete onClick={()=>{
                      deleteInstance(instance.year, instance.semester, instance.course_id)
                    }}/>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        )}
        </div>
    </ComponentWrapper>
  );
};

export default Courses;
