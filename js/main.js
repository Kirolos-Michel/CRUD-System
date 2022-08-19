// crud system

var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");

var productsContainer = []

if (localStorage.getItem('myProducts') != null) {
    productsContainer = JSON.parse(localStorage.getItem('myProducts'));
    displayProducts(productsContainer);
}
else {
    productsContainer = [];
}

function addProduct() {

    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desscreption: productDescInput.value
    }

    productsContainer.push(product)
    // console.log(productsContainer);
    localStorage.setItem('myProducts', JSON.stringify(productsContainer))

    clearForm();
    displayProducts(productsContainer);
}

function clearForm() {

    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";

}

function displayProducts(productList) {

    var cartoona = ``;
    for (var i = 0; i < productList.length; i++) {
        cartoona += `<tr>
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desscreption}</td>
        <td> <button onclick="setFormForUpdate(${i})" class="btn btn-sm btn-warning">Update</button> </td>
        <td> <button onclick="deleteProducts(${i})" class="btn btn-sm btn-danger">Delete</button> </td>
        </tr> `
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}

function deleteProducts(deletedIndex) {
    productsContainer.splice(deletedIndex, 1);
    localStorage.setItem('myProducts', JSON.stringify(productsContainer))

    displayProducts(productsContainer);
}

function setFormForUpdate(updatedIndex) {
    productNameInput.value = productsContainer[updatedIndex].name;
    productPriceInput.value = productsContainer[updatedIndex].price;
    productCategoryInput.value = productsContainer[updatedIndex].category;
    productDescInput.value = productsContainer[updatedIndex].desscreption;
}

function searchProducts(x) {
    var searchedItems = [];
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(x.toLowerCase()) == true) {
            searchedItems.push(productsContainer[i]);
        }
    }
    displayProducts(searchedItems);
}

function validationProductName() {
    var regx = /^[A-Z][a-z]{3,8}$/;

    if (regx.test(productNameInput.value)) {
        productNameInput.classList.replace('is-invalid', 'is-valid');
        return true;
    }
    else {
        productNameInput.classList.add('is-invalid');
        return false;
    }
}