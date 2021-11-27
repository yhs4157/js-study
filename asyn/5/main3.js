function timeoutPromise(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve("done"); 
        }, interval);
    }); 
};

async function timeTest() {
    await timeoutPromise(3000); 
    await timeoutPromise(3000); 
    await timeoutPromise(3000); 
}

let startTime = Date.now(); 

timeTest().then(() => {
    let finishTime = Date.now(); 
    let timeTaken = finishTime - startTime; 
    alert("Time taken in millisecond: " + timeTaken); 
})