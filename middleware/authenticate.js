const authenticate=async(req,res,next)=>{

    try{

        if(!req.get("Authorization"))
        {
            var err=new Error("Not Authenticated")
            res.status(401).set("WWW-Authenticate","Basic").json({message:"not authorized"})
            // next(err);
        }
        else{
            var credentials=Buffer.from(req.get("Authorization").split(' ')[1],'base64')
            .toString()
            .split(":")

            var username=credentials[0]
            var password=credentials[1]

            if(!username=="Wings2@24" && password=="Pass123@")
            {
                var err=new Error("Not Authorized")
                res.set("WWW-Authenticate","Basic").status(401)
                next(err)
            }

            res.status(200)
            next()
        }
        }catch(error)
        {
            return res.json({message:error.message}).status(500)
        }
    

}

module.exports=authenticate