import { useQuery } from "@tanstack/react-query";
import { instance }  from "../instance.js";




export function useGetAllMovies(){
     return useQuery({
         queryKey:["Movie"],
         queryFn:()=> instance.get("/movies").then(res=>res.data).catch(error=>{
            console.log(error.message);
            throw new Error(error.message)

        })
     })
}





export function useGetFilm(id){
    return useQuery({
        queryKey:["Movie"],
        queryFn:()=> instance.get("/movies/:id").then(res=>res.data).catch(error=>{
            throw new Error(error.message)
        })
    })
}







