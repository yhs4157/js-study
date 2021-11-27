function timeoutPromise(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve("done"); 
        }, interval);
    });
};

async function timeTest() {
    const timeoutPromise1 = timeoutPromise(3000); 
    const timeoutPromise2 = timeoutPromise(3000); 
    const timeoutPromise3 = timeoutPromise(3000); 

    await timeoutPromise1;
    await timeoutPromise2;
    await timeoutPromise3;
}

let startTime = Date.now(); 

timeTest().then(()=> {
    let finishTime = Date.now(); 
    let timeTaken = finishTime - startTime; 
    alert("time Taken in milliseconds: " + timeTaken); 
})