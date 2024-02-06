"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "./ui/textarea"
import cactus from "@/public/images/slider/5.jpg"
import Image from "next/image"
import { useState } from "react"
import { Star } from "lucide-react"
import { ref, uploadBytes } from "firebase/storage"
import { db, storage } from "@/firebase"
import { addDoc, collection } from "firebase/firestore"
import { toast } from "sonner"
import { DialogClose } from "@radix-ui/react-dialog"
import { ChangeText, GetText } from "./TextEditable"
type Props = {}

const AddReview = (props: Props) => {
    const [file, setFile] = useState<File|null>(null);
    const [image, setImage] = useState("");
    function handleChange(e:any) {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }


    const [name,setName] = useState("");
    const [rating,setRating] = useState(4);
    const [review,setReview] = useState("");
    const [loading,setLoading] = useState(false)
    const create = () => {
      const name1 = "" + Date.now() as string
      const storageRef = ref(storage, 'reviews/'+name1);
      setLoading(true)
      if(file){
        uploadBytes(storageRef, file as File).then((snapshot) => {
           console.log(snapshot)
           addDoc(
            collection(db, "reviews"),
            {
              name,
              image: name1,
              createdAt : new Date(),
              review,
              rating,
              show:false
            }
           )
        }).then(()=>{
          setFile(null)
          setImage("")
          setName("")
          setRating(4)
          toast("Review added", {
            icon: "👍",
            description: "Thank you for your review",
          })
          setLoading(false)
        });
      }else{
        addDoc(
          collection(db, "reviews"),
          {
            name,
            createdAt : new Date(),
            rating,
            image:"no image",
            show:false,
            review,
          }
        ).then(()=>{
          setFile(null)
          setImage("")
          setName("")
          setRating(4)
          toast("Review added", {
            icon: "👍",
            description: "Thank you for your review",
          })
          setLoading(false)
        })
      }
      
    }
  return (
<Dialog>
    <ChangeText reference={{page:"home",ref:"addReview"}}>
  <DialogTrigger asChild>
      <Button className="p-6 text-lg"><GetText reference={{page:"home",ref:"addReview"}}/></Button>
  </DialogTrigger>
    </ChangeText>
  <DialogContent className="max-w-4xl pt-8 max-h-[80vh] overflow-auto">
    <DialogHeader>
      <DialogDescription className="flex flex-col  md:flex-row gap-4 ">
            <input type="file" onChange={handleChange} className='hidden' id='image' accept='image/*'></input>
            <label className='cursor-pointer' htmlFor='image'>
                {
                  file ? 
                  <Image className='z-[0] top-[170px] rounded-xl w-full md:w-fit'  src={image} alt='' width={250} height={250}>
                  </Image>
                  :
                  <h3 className="p-6 text-white py-4 rounded-full bg-primary ">Upload Image</h3>
                }
            </label>
        <div className="flex-1 flex flex-col gap-2">
          <Label>Name</Label>
          <Input value={name} onInput={(e:any)=>setName(e.target.value)} placeholder="Name"  />
          <Label>Rating</Label>
          <div>
            {
              Array(5).fill(0).map((_, index) => (
                <Button variant={"ghost"} size="icon" key={index}  onClick={() => setRating(index + 1)}><Star className={index < rating ? "text-primary fill-primary" : "text-gray-300"} size={20} /></Button>
              ))
            }
          </div>
          <Label>Review</Label>
          <Textarea value={review} onInput={(e:any)=>setReview(e.target.value)} placeholder="Review" className="flex-1 min-h-[300px]" />
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="flex-row items-end justify-end gap-2">
      <DialogClose>
      <Button variant={"outline"}>Cancel</Button>
      </DialogClose>
      <DialogClose>
      <Button onClick={create} disabled={ !name || !review} type="submit">Add Review</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default AddReview