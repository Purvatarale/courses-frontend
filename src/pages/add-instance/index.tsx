import {request} from "@/lib/request"
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"

export default function AddInstance({courses}:any) {
    const [coursesData, setCoursesData] = useState(courses);
    const [formdata, setFormdata] = useState({});

    const refreshCourses = async () => {
        const courses = (await request.get(`/courses/`)).data;
        setCoursesData(courses);
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault()

        console.log(formdata);
        try {
            const res = (await request.post('/instances/', formdata)).data;
            if(res.id) {
                window.alert("Instance added successfully")
            } 
        } catch (error:any) {
            console.log(error)
            if(error.response?.data) {
                return window.alert(JSON.stringify(error.response.data))
            }
            window.alert("Failed to add course")
        }
    }


    return (
        <div>
            <h1 className="text-center pb-10 text-3xl">Add Instance</h1>
            <form className="w-[550px] mx-auto border-2 rounded p-5">
                <div className="flex flex-row gap-5 justify-center items-center mb-10">
                <Select
                    onValueChange={(value) => {
                        setFormdata({
                            ...formdata,
                            course_id: value
                        })
                    }}
                >
                    <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Select a Course" />
                    </SelectTrigger>
                    <SelectContent>       
                        <SelectGroup>
                            <SelectLabel>Courses</SelectLabel>
                            {coursesData?.map((course:any) => (
                                <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button onClick={refreshCourses} className="">Refresh</Button>
                </div>
                <div className="flex flex-row gap-5">
                <Input type="number" min={1} required placeholder="Year" name="year" onChange={(e) => setFormdata({...formdata, year: e.target.value})} />
                <Input type="number" min={1} required placeholder="Semester" name="semester" onChange={(e) => setFormdata({...formdata, semester: e.target.value})} />
                </div>

                <Button onClick={handleSubmit} className="w-full mt-10" >Submit</Button>
        </form>
        </div>
    );
}

export const getServerSideProps = async () => {

    const courses = (await request.get(`/courses`)).data;

    return {
        props: {
            courses
        }
    }
}