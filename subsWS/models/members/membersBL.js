var Member = require('./memberSchema');

var getAllMembers = () => {
    return new Promise((resolve,reject) =>{
    Member.find({}, (err,data)=>{
        if(err){
            reject(err);
        } else resolve(data);
    })
    })
}

var getMemberById = (memId) => {
    return new Promise((resolve,reject)=>{
        Member.findById((memId), (err,data)=>{
            if(err){
                reject(err);
            } else resolve(data);
        })
    })

}

var addMember = (newMem) => {
    return new Promise((resolve,reject)=>{
        var mem = new Member({
            name: newMem.name,
            email: newMem.email,
            city: newMem.address.city
        })
        console.log(mem);
        mem.save((err)=>{
            if(err){
                reject(err);
            } else {
                resolve(mem);
            }
        })
    })

}

var updateMember = (memId, newData) => { 
    return new Promise((resolve,reject)=>{
        Member.findByIdAndUpdate(memId,{
            name: newData.name,
            email: newData.email,
            city: newData.city
        },(err)=>{
            if(err){
                reject(err);
            } else {
                resolve("member updated!");
            }
        })
    })

}

var deleteMember = (id) => { 
    return new Promise((resolve,reject)=> {
        Member.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err)
            }
            else resolve("member deleted!");
        })
    })

}
module.exports = {getAllMembers,getMemberById,addMember,updateMember,deleteMember};