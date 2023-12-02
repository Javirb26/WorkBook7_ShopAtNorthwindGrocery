window.onload = () => {
    // viewAllCat();
    searchCat(); // Remove the parentheses here
}
    const categorySelectEl = document.getElementById('selectCategoryEl');
    const selectSpecificEl = document.getElementById('selectSpecific');
    const outputEl = document.getElementById('output')

let searchCat = () => {
    
    categorySelectEl.onchange = () => {
        if (categorySelectEl.selectedIndex === 0) {
            selectSpecificEl.innerHTML = '';
            selectSpecificEl.classList.add('d-none');
        } else if (categorySelectEl.selectedIndex === 1) {
            selectSpecificEl.classList.remove('d-none');
            selectSpecificEl.innerHTML = '';

            fetch('http://localhost:8081/api/categories')
                .then((res) => res.json())
                .then((categories) => {
                    for (let category of categories) {
                        // Create an <option> element and append it to the select
                        const optionEl = document.createElement('option');
                        optionEl.value = category.id;
                        optionEl.textContent = `${category.name}`;
                        selectSpecificEl.appendChild(optionEl);
                    }
                });
        } else if (categorySelectEl.selectedIndex === 2){

            selectSpecificEl.innerHTML = '';
            selectSpecificEl.classList.add('d-none');

            fetch('http://localhost:8081/api/products')
                .then((res) => res.json())
                .then((products) => {
                    for (let product of products) {
                        // Create an <option> element and append it to the select
                        const listEl = document.createElement('li');
                        listEl.value = product.productId;
                        listEl.textContent = `${product.productName}: $${product.unitPrice}, IN STOCK: ${product.unitsInStock}`;
                        outputEl.appendChild(listEl);
                    }
                });
        }
        // if(categorySelectEl.selectedIndex === 2) {}
    }
}









