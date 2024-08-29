import "reflect-metadata";
import express, { Request, Response } from "express";
import dataSource from "./datasource/dataSource";
import { User } from "./entities/User.entity";

const PORT = 5000;
const app = express();

dataSource.initialize().then(() => { 
    console.log("Database connected");
}).catch((err) => {
    console.log("Database connection Failed",err);
})

app.get("/", async (req : Request, res : Response ) => {
    
    let userRepo = dataSource.getRepository("User");

    //adding data
    let user1 = new User();
    user1.firstName = "Shykat";
    user1.lastName = "himu";
    user1.isActive = true;

    let user2 = new User();
    user2.firstName = "Maynul";
    user2.lastName = "hossain";
    user2.isActive = true;

    res.json(await userRepo.save([user1, user2]));
    


    //fetching data
    res.json(await userRepo.find({
        select: ["id", "firstName", "lastName"]
    }));



    //fetching data with order
    res.json(await userRepo.find({
        order: {
            id: "DESC"
        }
    }));


    //delete data
    res.json(await userRepo.delete(1)); //delete by id

    
    //upadte data
    res.json(await userRepo.update(2, {isActive: false})); //update by id

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})