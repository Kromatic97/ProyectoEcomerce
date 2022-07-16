
import { dataProducts } from "./js/data.js";

const contentProducts=document.querySelector(".products_content-grid");

const sidebarCard=document.querySelector(".sidebar_card");//card_shopping
const navMenuBoton=document.querySelector(".box_sale");//container_shpopping
const contentShoping=document.querySelector(".content_shoping");

const shoppingTotal=document.querySelector(".shoppingTotal");
const btnComprar=document.querySelector("#btn_comprar")
const amountSale=document.querySelector(".amountSale");

const shoppingObj = {};

contentShoping.addEventListener("click", (event) => {
  if (event.target.classList.contains("restar")){
      const id = parseInt(event.target.parentElement.id);

      if(shoppingObj[id].amount===1){
       const res= confirm("esta seguro quieres eliminar esto?")

       if(res){
        delete shoppingObj[id];
       }

      }else{
        shoppingObj[id].amount--;

      }
  }

  if (event.target.classList.contains("add")){
    const id = parseInt(event.target.parentElement.id);

    if(shoppingObj[id].quantity > shoppingObj[id].amount){
      shoppingObj[id].amount++;
    }else{
        alert("No hay en stock");
    } 

  }

  if (event.target.classList.contains("del")){
    const id = parseInt(event.target.parentElement.id);
    const res= confirm("esta seguro quieres eliminar esto?")

       if(res){
        delete shoppingObj[id];
       }

    delete shoppingObj[id];
  }

  amountProductInCard();
  printTotalPrice();
  printShoppingCard();

});










contentProducts.addEventListener(("click"), (event) => {

if (event.target.classList.contains("add_principal")) {
  const id= parseInt(event.target.parentElement.id);
  
  const [currentProduct]= dataProducts.filter((n)=> n.id === id)
  

  if(shoppingObj[id]){
        
        if(shoppingObj[id].quantity > shoppingObj[id].amount){
          shoppingObj[id].amount++;
        }else{
            alert("No hay en stock");
        }  
  }else{
    
    shoppingObj[id] = currentProduct;
    shoppingObj[id].amount = 1;
  }



  
 
  amountProductInCard()
  printTotalPrice();
  printShoppingCard();

}

});

function amountProductInCard(){
  // const amountSale=document.querySelector(".amountSale");
  amountSale.textContent = Object.values(shoppingObj).length;
}

function printTotalPrice(){
  const shoppingArray = Object.values(shoppingObj);
   let suma = 0;

   shoppingArray.forEach((n) => {
    suma += n.amount * n.price;
   });

   shoppingTotal.textContent = suma;


}

function printShoppingCard() {

  const shoppingArray= Object.values(shoppingObj);
  
  let html= "";
  shoppingArray.forEach(({id, name, price, image, quantity, amount})=>{
    html += `<div class="shopping">
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
                                      
                                      

                                      <b class="amount">${amount}</b>

                                      <span class="add"> + </span>
                                      <span class="restar"> - </span>
                                      
                                           <i class='bx bxs-trash del' ></i>
                                   
                                 </div>
                             </div>`;
  })
  contentShoping.innerHTML=html;  
  }

function printProduct() {
  let html = "";
  dataProducts.forEach(({id, name, price, image, quantity})=>{
    html+= 
    
    `<article class="products_card">              
    <div class="contenedorImg">
    <img src="${image}" alt="">
    </div>
    
    <div class="products_data" data-idproduct='${id}'>
    <h2 class="products_price">$${price}  
    <p class="products_quantity">| Stock:${quantity}</p>
    </h2>
    <h3 class="products_name">${name}</h3>                     
    <div class="product_action" id="${id}">
    <button class="add_principal">+</button>
    </div>
    
    </div>
    </article>`; 
    
  });
  contentProducts.innerHTML=html;
}

printProduct();

navMenuBoton.addEventListener("click", () => {
sidebarCard.classList.toggle('show_sidebar_card')
})


btnComprar.addEventListener("click", () => {

  // const res = confirm("Desea agregar el producto?")

  // if(res){
  //   shoppingTotal.textContent=0;
  //   amountSale.textContent = 0;

  // }

})






