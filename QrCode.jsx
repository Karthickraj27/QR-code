import { createElement, useState } from "react"


const QrCode = () => {
  const [img,setImg]=useState("");
  const[loading,setLoading]=useState(false);
  const[qrdata,setqrdata]= useState("https://karthickraj27.github.io/karthick.github.io/");
  const[qrsize,setqrsize]= useState ("150")
   async function generateQR(){
    setLoading(true);
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?
      size=${qrsize}x${qrsize}&data=karthick=${encodeURIComponent(qrdata)}`;
      setImg(url);

    }catch (error){

console.error("Error generating QR code",error);
    }
    finally{ 
      setLoading(false);

    }
    
  }
  function downloadqr() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link); // Fix the typo here
        link.click();
        document.body.removeChild(link);
      });
  }
  
 
  
  return (
    <div className="app_container" >
        
        <h1> QR CODE GENERATOR</h1>
        {loading && <p>Please wait for loading...</p>}
        {img &&<img src={img} className="qr_code_image"/>}
        
      <div>
        
        <label  htmlFor="dataInput" className="input_label">
            Data for  QR code:
        </label>
        <input type="text" id="dataInput" value={qrdata} placeholder="Enter data for QR code" onChange={(e)=>setqrdata(e.target.value)}/>
        <label  htmlFor="sizeInput" className="input_label">
            Image size(e.g., 150):
        </label>
        <input type="text"  value={qrsize}id="sizeInput" placeholder="Enter image size"onChange={(e)=>setqrsize(e.target.value)}/>
        <button className="generate-button" disabled={loading} onClick={generateQR}>
            Generate QR code</button>
        <button className="down_button" onClick={downloadqr}>Download QR code</button>
        <p className="footer">Designed By <a href="https://karthickraj27.github.io/karthick.github.io/">Karthick</a></p>
      </div>
    </div>
  )
}

export default QrCode
