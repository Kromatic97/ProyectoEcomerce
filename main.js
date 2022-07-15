
const arrayProducts = [
    {
      id: 1,
      name: 'Hoodies',
      price: '$14.00',
      image: './img/featured1.png',
    //   category: 'hoodies',
      quantity: 5,
    },
    {
      id: 2,
      name: 'Shirts',
      price: '$24.00',
      image: './img/featured2.png',
    //   category: 'shirts',
      quantity: 15,
    },
    {
      id: 3,
      name: 'Sweatshirts',
      price: '$24.00',
      image: './img/featured3.png',
    //   category: 'sweatshirts',
      quantity: 20,
    },

    
  ]


const sales = {};

document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener("click",function(event){
        
        if (event.target.classList.contains("products_button")) {
            const idProduct=event.target.parentElement.dataset.idproduct;

            let currentProduct=null;

            for (let i = 0; i < arrayProducts.length; i++) {
               if (arrayProducts[i].id=== parseInt(idProduct)) {
                    currentProduct=arrayProducts[i];  
                }
            }

            if (sales[currentProduct.id]) {
                if (sales[currentProduct.id].amount===
                    sales[currentProduct.id].quantity) {
                        alert("no existe mas en stock")
                        return;
                }

                sales[currentProduct.id].amount++;
                // alert("ya cuenta con ese producto")
                // return;
            }else{
                sales[currentProduct.id]=currentProduct;
                sales[currentProduct.id].amount=1;
            }
        
        
       

        // amount;
        contadorCarrito();
      
        }
    });

    agregarCardsProducts();
    openAndCloseCards();
    
});


function agregarCardsProducts() {

const products=document.querySelector(".products_content-grid");

const shoppingObj = {};

products.addEventListener("click",(event)=>{
        if(event.target.classList.contains('products_button')){
            const idProduct2=parseInt(event.target.parentElement.dataset.idproduct); 
            let currentProduct2=null;
            for (let i = 0; i < arrayProducts.length; i++) {
               if (arrayProducts[i].id=== parseInt(idProduct2)) {
                    currentProduct2=arrayProducts[i];  
                    
                }   
            }

           if (shoppingObj[currentProduct2.id]){
            shoppingObj[currentProduct2.id].amount++;
           }else{
            shoppingObj[currentProduct2.id]=currentProduct2;
            shoppingObj[currentProduct2.id].amount=1;

           }
          
           const shoppingArray= Object.values(shoppingObj)
           const contentShoping=document.querySelector(".content_shoping")
           let html2='';

           shoppingArray.forEach(({id, name, price, image, quantity, amount})=>{
                    html2+=`<div class="shopping">

                            <div class="shopping_header">
                                <div class="shopping_img">
                                    <img src="${image}" alt="${name}">
                                </div>
                                <div class="shoping_info">
                                    <p>Nombre: ${name}</p>
                                    <p>Precio${price}</p>
                                    <p>Stock${quantity}</p>
                                </div>

                            </div>

                            <div class="shopping_action" id="${id}>
                                <span class="rest">-</span>
                                <b class="amount">${amount}</b>
                                <span class="add">+</span>
                                <span class="del">
                                    <i class='bx bxs-trash' ></i>
                                </span>
                            </div>
                        </div>`
           })
           contentShoping.innerHTML= html2;
        }
    });



let html = "";

for (let i = 0; i < arrayProducts.length; i++) {  
    html+= `<article class="products_card">                 
                    <div class="products_shape">
                        <img src='${arrayProducts[i].image}' alt='${arrayProducts[i].name}' class="products_img">
                    </div>
                        <div class="products_data" data-idproduct='${arrayProducts[i].id}'>
                            <h2 class="products_price">${arrayProducts[i].price}  
                                <p class="products_quantity">| Stock:${arrayProducts[i].quantity}</p>
                            </h2>
                            <h3 class="products_name">${arrayProducts[i].name}</h3>                     
                            
                            <button class="products_button">+</button>
                            
                        </div>
            </article>`;   
}
products.innerHTML=html;
    
}




function openAndCloseCards() {
    const sidebarCard=document.querySelector(".sidebar_card");//card_shopping
    const navMenuBoton=document.querySelector(".box_sale");//container_shpopping
    navMenuBoton.addEventListener("click", function(){
        sidebarCard.classList.toggle('show_sidebar_card')
    })
}

function contadorCarrito() {
    const amount=document.querySelector("#amount");
    amount.textContent=Object.entries(sales).length;
};

