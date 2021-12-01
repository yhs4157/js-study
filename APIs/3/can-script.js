const request = new XMLHttpRequest(); 
request.open('GET', 'products.json'); 
request.responseType = 'json'; 

request.onload = function() {
    if(request.status === 200) {
        let products = request.response; 
        initialize(products); 
    }
}

function initialize(products) {
    const category = document.querySelector('#category'); 
    const searchTerm = document.querySelector('#searchTerm'); 
    // for에 대한 querySelector의 반응을 확인할 수 있다. 
    const searchBtn = document.querySelector('button'); 
    const main = document.querySelector('main'); 

    let lastCategory = category.value;
    let lastSearch = ''; 

    let categoryGroup; 
    let finalGroup; 

    finalGroup = products; 
    updateDisplay(); 

    categoryGroup = [];
    finalGroup = []; 

    searchBtn.onclick = selectCategory; 

    function selectCategory(e) {
        e.preventDefault(); 

        categoryGroup = []; 
        finalGroup = []; 

        if(category.value === lastCategory && searchTerm.value.trim() === lastSearch) {
            return;
        } else {
            lastCategory = category.value; 
            lastSearch = searchTerm.value.trim(); 

            if(category.value === 'All') {
                categoryGroup = products;
                selectProducts(); 
            } else {
                let lowerCaseType = category.value.toLowerCase(); 
                for(let i = 0; i<products.length; i++) {
                    if(products[i].type === lowerCaseType) {
                        categoryGroup.push(products[i]); 
                    }
                }
                selectProducts();
            }
        }
    }

    function selectProducts() {
        if(searchTerm.value.trim() === '') {
            finalGroup = categoryGroup; 
            updateDisplay(); 
        } else {
            let lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
            for(let i = 0; i < categoryGroup.length; i++) {
                if(categoryGroup[i].name.indexOf(lowerCaseSearchTerm) != -1) {
                    finalGroup.push(categoryGroup[i]); 
                }
            }

            updateDisplay(); 
        }
    }

    function updateDisplay() {
        while(main.firstChild) {
            main.removeChild(main.firstChild); 
        }
        
        if(finalGroup.length === 0) {
            const para = document.createElement('p'); 
            para.textcontent = "No results to display";
            main.appendChild(para); 
        } else {
            for(let i = 0; i < finalGroup.length; i++) {
                // let으로 잘 쓰다가 var로 변경했을까? 
                // 일단 나는 let으로 진행
                fetchBlob(finalGroup[i]); 
            }
        }
    }

    function fetchBlob(product) {
        let url = 'images/' + product.image; 
        const request = new XMLHttpRequest(); 
        request.open('GET', url); 
        request.responseType = 'blob';

        request.onload = function() {
            if(request.status === 200) {
                let blob = request.response;
                let objectURL = URL.createObjectURL(blob); 
                showProduct(objectURL, product); 
            } else {
                console.log('Network request for "' + product.name + '" image failed with response ' + request.status + ': ' + request.statusText); 
            }
        };
        request.send(); 
    }

    function showProduct(objectURL, product) {
        const section = document.createElement('section'); 
        const heading = document.createElement('h2'); 
        const para = document.createElement('p'); 
        const image = document.createElement('img'); 

        section.setAttribute('class', product.type); 

        heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase()); 

        para.textContent = '$' + product.price.toFixed(2); 

        image.src = objectURL; 
        image.alt = product.name; 

        main.appendChild(section); 
        section.appendChild(heading); 
        section.appendChild(para); 
        section.appendChild(image); 
    }

}