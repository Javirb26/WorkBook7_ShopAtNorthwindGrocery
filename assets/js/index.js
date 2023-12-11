// products search page
/*
    search and view products
    users can click on product from list and link takes you to details.html

    dropdown that contains static options: 
        select one, search by category, and view all
    
    view all shows all products and a few text w/ link

    search by category populates second select el
        select el #2 contains category names
        if user selects a category then products in that category are shown
*/

window.onload = () => {
    
    viewAll();
    let defaultOption = document.getElementById('default')

}

// view all products
let viewAll = () => {
    let selectEl = document.getElementById('selectCategoryEl');
    let selectSpecificEl = document.getElementById('selectSpecific');
    let outputEl = document.getElementById('output')    
    let allCatUrl = 'http://localhost:8081/api/categories'
    let allProductsURL = 'http://localhost:8081/api/products';

    selectEl.onchange = () => {
        if (selectEl.value === '1') {
            outputEl.innerHTML = '';
            selectSpecificEl.classList.toggle('d-none');
            fetch(allCatUrl)
                .then((res)=>res.json())
                .then((allCategories)=>{
                    console.log(allCategories);
                    allCategories.forEach((category)=>{
                        console.log(category.name);
                        let option = document.createElement('option');
                        option.value = category.categoryId
                        option.textContent = category.name;
                        selectSpecificEl.appendChild(option); 
                    })
                })
        }
        else if (selectEl.value === '2') {
            outputEl.innerHTML = '';
            fetch(allProductsURL)
                .then((res)=>res.json())
                .then((allProducts)=>{
                    console.log(allProducts);
                    allProducts.forEach(product => {
                        let li = document.createElement('li');
                        li.innerHTML = `${product.productName} `
                        li.value = product.productId;
                        const link = document.createElement('a')
                        link.innerHTML = 'see details'
                        link.href = `details.html?id=${product.productId}`
                        li.appendChild(link)
                        outputEl.appendChild(li);
                    });

                })
        }
    }

    selectSpecificEl.onchange = () => {
        console.log(selectSpecificEl.value);
        outputEl.innerHTML = '';
        fetch(allProductsURL)
            .then((res)=>res.json())
            .then((allProducts)=>{
                let selectedCategory = allProducts.filter((product => {
                    return product.categoryId === Number(selectSpecificEl.value)
                }))
                console.log(selectedCategory);
                selectedCategory.forEach((product)=> {
                    let li = document.createElement('li');
                    li.innerHTML = `${product.productName} `
                    li.value = product.productId;
                    let link = document.createElement('a');
                    link.innerHTML = 'see details'
                    link.href = `details.html?id=${product.productId}`
                    li.appendChild(link)
                    outputEl.appendChild(li);
                })
            })
    }
}