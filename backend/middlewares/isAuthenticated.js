import jwt from 'jsonwebtoken';

export function isAuthenticated(req,res,next){
    try{
        // console.log(req)
        // console.log(res)
        const token=req.cookies?.token;
        if(!token){
            return res.status(401).json({success:false,message:"No token found"});
            
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({success:false,tokenvalid:false,message:"Invalid token"});
        }
        req.id=decoded.userId;
        next();
    }

    catch(err){
   return  res.status(500).json({success:false,message:"Internal server error"});
}                   
}
export function firstcheck(req,res,next){
    try{
    console.log("funccalled")
        const token=req.cookies?.token;
        console.log(token,"tken")
        if(!token){
            return res.status(401).json({success:false,message:"No token found",validToken:false});
            
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({success:false,validToken:false,message:"Invalid token"});
        }
        req.id=decoded.userId;
        return res.status(200).json({success:true,validTokenR:true,message:"Invalid token"});
    }

    catch(err){
   return  res.status(500).json({success:false,message:"Internal server error"});
}                   
}

