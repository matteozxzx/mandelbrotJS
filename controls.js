
export function initControls(canvas, onViewChange, onParamChange){

    let mouseX = 0;
    let mouseY = 0;

    const xOffsetSlider = document.getElementById("xOffset");
    const yOffsetSlider = document.getElementById("yOffset");
    const scaleFactorSlider = document.getElementById("scaleFactor");

    canvas.addEventListener('mousemove', (event) =>{
        const rect = canvas.getBoundingClientRect();

        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
    })
    canvas.addEventListener('click', (event) =>{
        onViewChange(mouseX, mouseY)
    })

    
    canvas.addEventListener('click', (event) =>{
        onViewChange(mouseX, mouseY)
    })
    
    scaleFactorSlider.addEventListener('input', (event) => {
        const newValue = parseFloat(event.target.value);

        onParamChange('scaleFactor', newValue);

        console.log(10);
        
    }); 
}
