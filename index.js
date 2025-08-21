const form=document.querySelector('#Shortner-form');
form.addEventListener('submit',async (event)=>{
    event.preventDefault();
    const formData=new FormData(event.target);
    const url=formData.get("url");
    const shortCode=formData.get("short-form");
    console.log(url,shortCode);
    try {
        const response=await fetch("/shorten",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({url,shortCode})
        });
        if(response.ok){
            alert("Form submitted successfully");
        }else{
            const errorMessage=await response.text();
            alert(errorMessage);
        }
    } catch (error) {
        console.log(error);
    }
    
});