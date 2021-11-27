
async function myFetch() {
    let response = await fetch('coffee.jpg')
    if(!response.ok) {
        throw new Error('HTTP error! status: ${response.status}'); 
    }
    return await response.blob(); 
}

myFetch().then((myBlob) => {
    let objectURL = URL.createObjectURL(myBlob); 
    let image = document.createElement('img'); 
    image.src = objectURL; 
    document.appendChild(image); 
}).catch(e => console.log(e)); 

