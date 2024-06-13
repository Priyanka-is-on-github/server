import { createUploadthing, type FileRouter } from "uploadthing/express";
//  import {auth} from '@clerk/clerk-react'  

//auth can be implemented, but how to send the auth state from frontend to our backend

const f = createUploadthing();
  
// const handleAuth =()=>{
//     const {userId} = auth();
//     if(!userId) throw new Error("Unauthorized")
//         return {userId};
// }

export const uploadRouter = {
  courseImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete((data) => {
    console.log("upload completed", data);
  }),

  courseAttachment: f(['text', 'image', 'video', 'audio', 'pdf'])
  // .middleware(()=>handleAuth())
  .onUploadComplete((data) => {
    console.log("upload completed", data);
  }),

  chapterVideo: f({video: {maxFileSize:'512GB', maxFileCount:1}})
  // .middleware(()=>handleAuth())
  .onUploadComplete((data) => {
    console.log("upload completed", data);
  }),
} satisfies FileRouter;
 


export type OurFileRouter = typeof uploadRouter;

