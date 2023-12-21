const pdfkit = require('pdfkit');
const fs = require('fs');


const generatePass = async(req, res) => {

    const{regId,fullName,identity}=req.body
    try {

        // Create a document
        const doc = new pdfkit({size:"A5"});

        // Pipe its output somewhere, like to a file or HTTP response
        // See below for browser usage
        

        if(String(regId).includes("SV"))
        {
            if(identity==undefined)
            {
               return res.status(400).json({message:"college should not be empty"})
            }

            doc.pipe(fs.createWriteStream(`${regId}.pdf`));
            doc.image("visitor.jpg", {
                fit: [500, 470],
                // align: 'center',
                valign: 'center',
                // width:300,
                // height:100
            });
    
            
    
            doc.fontSize(18).fillColor("#FFFFFF").text("RegNo : "+regId,100,305)
            doc.fontSize(18).fillColor("#FFFFFF").text("Name : "+fullName,100,359)
            doc.fontSize(18).fillColor("#FFFFFF").text("College : "+identity,100,410)
    
            // Finalize PDF file
            doc.end();
        }else if(String(regId).includes("IV") || String(regId).includes("WP"))
        {

            if(identity==undefined)
            {
                return res.status(400).json({message:"company should not be empty"})
            }

            doc.pipe(fs.createWriteStream(`${regId}.pdf`));
            doc.image("professional.jpg", {
                fit: [500, 470],
                // align: 'center',
                valign: 'center',
                // width:300,
                // height:100
            });
    
            doc.fontSize(18).fillColor("#FFFFFF").text("RegNo : "+regId,100,305)
            doc.fontSize(18).fillColor("#FFFFFF").text("Name : "+fullName,100,359)
            doc.fontSize(18).fillColor("#FFFFFF").text("Company : "+identity,100,410)
    
            // Finalize PDF file
            doc.end();
        }else if(String(regId).includes("OT"))
        {

            if(identity==undefined)
            {
                return res.status(400).json({message:"identity should not be empty"})
            }

            doc.pipe(fs.createWriteStream(`${regId}.pdf`));
            doc.image("other.jpg", {
                fit: [500, 470],
                // align: 'center',
                valign: 'center',
                // width:300,
                // height:100
            });
    
            doc.fontSize(18).fillColor("#FFFFFF").text("RegNo : "+regId,100,305)
            doc.fontSize(18).fillColor("#FFFFFF").text("Name : "+fullName,100,359)
            doc.fontSize(18).fillColor("#FFFFFF").text("Other : "+identity,100,410)
    
            // Finalize PDF file
            doc.end();
        }
        else{
           return  res.status(400).json({message:"check registration id"})
        }
        
        

        return res.json({ success: true })

    } catch (error) {
       return res.json({ error: error.message })
    }
}

const downloadPass=(req,res)=>{
    const{id}=req.query
    if(String(id).includes("SV") || String(id).includes("IV") || String(id).includes("WP") || String(id).includes("OT"))
    {
        var data =fs.readFileSync(`${id}.pdf`)
        res.contentType("application/pdf");
        res.send(data); 
        // return res.download(`${id}.pdf`);
    }
    else{
        return res.status(400).json({message:"invalid id"})
    }
    
}

module.exports = {generatePass,downloadPass}