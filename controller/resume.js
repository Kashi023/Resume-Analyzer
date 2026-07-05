const ResumeModel=require('../models/resume');
const multer =require('multer');
const pdfParse=require('pdf-parse');
const path=require('path');
const {CohereClient}=require('cohere-ai');

const cohere=new CohereClient({
    token:'cohere_12Jqti7Zoe6dGaifXCkJhPjsT5y5ZUNUtlCYDXze0YY0Q8'
});

exports.addResume=async(req,res)=>{
    try{

        const {job_desc,user}=req.body;
        // console.log(req.file);
        // console.log(job_desc,user);

        const pdfBuffer=req.file.buffer ||null;
        const pdfPath=req.file.path;
        const fs=require('fs');
        const data=fs.readFileSync(pdfPath);
        const pdfData=await pdfParse(data);
        
        const prompt=`
        Analyze the resume against the job description.

        Resume: ${pdfData.text}

       Job Description: ${job_desc}
       Return the response  EXACTLY in the following layout.
       
       Score: <number between 0 and 100>
      🎯 Summary
      < only 2 sentences no more then this >

     💪 Strengths
      • Point 1
      • Point 2

     ❌ Missing Skills
    • Skill 1
    • Skill 2

    💡 Improvements
     • Suggestion 1

     IMPORTANT:
     - Leave ONE blank line after every heading.
     - Leave ONE blank line between each bullet point.
    - Use the exact headings above.
    - Do not return JSON.
        `
        ;

        const response = await cohere.chat({
           model: "command-a-03-2025",
           message: prompt,
           maxTokens: 250,
           temperature: 0.7,
         });

        const result = response.text;

        const match=result.match(/Score:\s*(\d+)/);
        const score=match ?parseInt(match[1],10) : 0;
       

        const reasonMatch=result.match(/Reason:\s*([\s\S]*)/);
        // const reason=reasonMatch ?reasonMatch[1].trim() : null;

        const reason = result;
        const newResume=new ResumeModel({
            user,
            resume_name:req.file.originalname,
            job_desc,
            score,
            feedback:reason
        })

        await newResume.save();

        fs.unlinkSync(pdfPath);

        res.status(200).json({message:"Your analysis are ready", data:newResume});
    }

    catch(err){
        console.log(err);
        res.status(500).json({error:'server errror',message:err.message});
    }
}

exports.getAllResumerForUser=async(req,res)=>{
    try{

        const {user}=req.params;

        let resumes=await ResumeModel.find({user}).sort({createdAt:-1})
        return res.status(200).json({message:"Your Previous History",resumes:resumes});

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'server errror',message:err.message});
    }
}


exports.getResumeForAdmin=async(req,res)=>{
    try{

        let resumes=await ResumeModel.find({}).sort({createdAt:-1}).populate('user');
        return res.status(200).json({message:"Fetch All History",resumes:resumes});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'server errror',message:err.message});
    }
}