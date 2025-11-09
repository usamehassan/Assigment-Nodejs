const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
client.connect()
.then(() => {
    console.log('connected to mongodb');
})
.catch(err =>{
    console.error('error connecting to MongoDB', err);

})
.finally(()=>{
    client.close();

});
async function run() {
    try{
        await client.connect();
        console.log('connected to mongodb');

        const db = client.db('university');
        const students = db.collection('students');
        ///insert one
       const result=await students.insertOne({name:"fartuun",age:56,department:"IT"}
       )
        console.log('inserted document with _id:', result.insertedId);
        //insert many
        const insertMany=await students.insertMany([
            {
                name:"ali",age:8,department:"social",year:2},{
                    name:"kaafi", age:9, department:"islamic",year:3},
                    {name:"xamdi", age:76, department:"cs",year:9
            }
        ]);

        //kuulli soo wada aqri 
       const allstudents=await students.find().toArray();
       console.log("all students:", allstudents)

    //    hal qof in soo aqriyo 
    const astudents=await students.find({department:"cs"}).toArray();
    console.log("astudents",astudents);
        
    //  update one 
     const updateOne=await students.updateOne({
        name:"xamdi"},
        {$set:{year:15}
     });
     console.log("update one:", updateOne.modifiedCount);
       
    // updateMany
    const updateMany=await students.updateMany({
        name:"muno"},
        {$set:{year:11}
     });
     console.log("update many:", updateMany.modifiedCount);
   
    // delete one
    const deleteOne = await students.deleteOne({name:"fartuun"});
    console.log("delete One:", deleteOne.deletedCount)

    } catch(err){
        console.error('error connected to mongodb', err);

    }
    finally{
        await client.close();
    }
    
} 
run();
