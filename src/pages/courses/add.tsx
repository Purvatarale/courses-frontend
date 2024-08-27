import { useState } from "react"
import { Input, Button } from "@/components/ui"
import {request} from "@/lib/request"

export default function AddCourses () {
    const [formData, setFormdata] = useState({})
    const onSubmit = async (e:any) => {
        e.preventDefault()
        console.log(formData)

        try {
            const res = (await request.post('/courses/', formData)).data;
            if(res.id) {
                window.alert("Course added successfully")
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
            <h1 className="text-center pb-10 text-3xl">Add Courses</h1>
            <form onSubmit={onSubmit} className="flex flex-col gap-4 justify-center items-center w-[550px] p-2 border-2 rounded-xl mx-auto">
                <Input type="text" required placeholder="Title" name="title" onChange={(e) => setFormdata({...formData, title: e.target.value})} />
                <Input type="text" required maxLength={10} placeholder="Course Code" name="course_code" onChange={(e) => setFormdata({...formData, course_code: e.target.value})} />
                <Input type="text" required placeholder="Course Description" name="description" onChange={(e) => setFormdata({...formData, description: e.target.value})} />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}