//drawpoints for our facemesh 

export const drawPoints = (predictions,ctx)=>{
    if (predictions.length>0){
        predictions.forEach(prediction => {
             const keyPoints = prediction.scaledMesh
             for(let i =0;i<keyPoints.length;i++){
                const xAxis = keyPoints[i][0];
                const yAxis = keyPoints[i][1];
                ctx.beginPath();
                ctx.arc(xAxis,yAxis,1,0,3*Math.PI);
                ctx.fillStyle = "aqua";
                ctx.fill();
             }

            
        });
    }
}