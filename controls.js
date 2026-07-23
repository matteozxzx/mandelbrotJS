
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
    xOffsetSlider.addEventListener('input', (event) => {
        const newValue = parseFloat(event.target.value);

        onParamChange('xOffset', newValue);

        console.log(10);
        
    }); 
    yOffsetSlider.addEventListener('input', (event) => {
        const newValue = parseFloat(event.target.value);

        onParamChange('yOffset', newValue);

        console.log(10);
        
    }); 
    scaleFactorSlider.addEventListener('input', (event) => {
        const newValue = parseFloat(event.target.value);

        onParamChange('scaleFactor', newValue);

        console.log(10);
        
    }); 
}
