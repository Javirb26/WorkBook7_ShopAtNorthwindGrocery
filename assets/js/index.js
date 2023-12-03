window.onload = () => {
    searchCat();
}

const categorySelectEl = document.getElementById('selectCategoryEl');
const selectSpecificEl = document.getElementById('selectSpecific');
const outputEl = document.getElementById('output')

let searchCat = () => {
    categorySelectEl.onchange = () => {
        // Resetting previous selections and outputs
        selectSpecificEl.innerHTML = '';
        outputEl.innerHTML = '';
        selectSpecificEl.classList.toggle('d-none', categorySelectEl.selectedIndex === 0);

        if (categorySelectEl.selectedIndex === 1) {

            const defaultOption = document.createElement('option');
            defaultOption.textContent = "Please Choose a Category";
            defaultOption.value = "";
            selectSpecificEl.appendChild(defaultOption);


            fetch('http://localhost:8081/api/categories')
                .then((res) => res.json())
                .then((categories) => {
                    categories.forEach(category => {
                        const optionEl = document.createElement('option');
                        optionEl.value = category.categoryId;
                        optionEl.textContent = category.name;
                        selectSpecificEl.appendChild(optionEl);
                    });
                });
        } else if (categorySelectEl.selectedIndex === 2) {

            selectSpecificEl.innerHTML = '';
            selectSpecificEl.classList.add('d-none');

            fetch('http://localhost:8081/api/products')
                .then((res) => res.json())
                .then((products) => {
                    for (let product of products) {
                        // Create an <option> element and append it to the select
                        const listEl = document.createElement('li');
                        const detailLink = document.createElement('a');
                        detailLink.href = `../details.html?id=${product.productId}`;
                        detailLink.innerHTML = 'See Details';
                        listEl.value = product.productId;
                        listEl.textContent = `${product.productName}: $${product.unitPrice}`;
                        listEl.appendChild(detailLink);
                        outputEl.appendChild(listEl);
                    }
                });
        }
    }


    selectSpecificEl.onchange = () => {
        let selectedCategoryId = selectSpecificEl.value;
        outputEl.innerHTML = '';

        fetch(`http://localhost:8081/api/products`)
            .then((res) => res.json())
            .then((products) => {
                let productsToShow = products.filter(product => product.categoryId.toString() === selectedCategoryId);
                productsToShow.forEach(product => {
                    const listEl = document.createElement('li');
                    const detailLink = document.createElement('a');
                    detailLink.href = `../details.html?productId=${product.productId}`;
                    detailLink.innerHTML = 'See Details';
                    listEl.textContent = `${product.productName}: $${product.unitPrice}`;
                    listEl.appendChild(detailLink);
                    outputEl.appendChild(listEl);
                });
            });
    }
}
