const productListDom = document.querySelector("#productListDom");
const productList = [];

function showProductCardInDom() {
  productListDom.innerHTML = "";
  productList.forEach((product) => {
    // console.log(
    //   `${product.nameProduct}, quantité ${product.quantityProduct}, prix d'achat: ${product.prixAchat}, prix de vente: ${product.prixVente}, ${product.typeDrink}, ${product.degreAlcool} `
    // );
 
    const productCard = document.createElement("div");
    productCard.classList.add("product");
    productCard.classList.add("animate__fadeOut");


    productCard.innerHTML = `
        <button class="btnDelete"> <i class="fa-solid fa-trash"></i> </button>
        <p contenteditable="true">${product.nameProduct}</p>
        <p contenteditable="true">Prix d'achat : ${product.prixAchat}</p>
        <p contenteditable="true">Prix de vente HT : ${product.prixVente}</p>
        <p id="prixHT" contenteditable="true">Marge HT : ${product.margeHT}€</p>
        <p id="prixVenteTTC" contenteditable="true">Prix de vente TTC : ${product.prixVenteTTC}€</p>
        <p contenteditable="true">Type de boisson : <br> ${product.typeDrink}</p>
        ${product.typeDrink === "Boisson alcoolisée" ? `<p id="degreAlcool" contenteditable="true">Degré alcool : ${product.degreAlcool}%</p>` : ''}
        
        <div contenteditable="true" class="stock">
        Stock : ${product.quantityProduct} unité
        </div>
        <button class="btnDown"><i class="fa-solid fa-square-minus"></i></button>
        <button class="btnUp"><i class="fa-solid fa-square-plus"></i></button>
        `;

    const btnDown = productCard.querySelector(".btnDown");
    const btnUp = productCard.querySelector(".btnUp");
    const btnDelete = productCard.querySelector(".btnDelete")
    const quantityDom = productCard.querySelector(".stock");

    if(product.quantityProduct<=10){
      quantityDom.style.color= "red"
    } else{
      quantityDom.style.color= "green"
    }

    btnDelete.addEventListener("click", () =>{
     productCard.remove() 
     
    })


    btnDown.addEventListener("click", () => {
      product.downgradeQuantity()
      quantityDom.innerText = `Stock: ${product.quantityProduct} unité`;
      if(product.quantityProduct<=10){
        quantityDom.style.color= "red"
      } else{
        quantityDom.style.color= "green"
      }
      
    });

      btnUp.addEventListener("click",() => {
      product.upgradeQuantity()
      quantityDom.innerText=`Stock: ${product.quantityProduct} unité`
      if(product.quantityProduct<=10){
        quantityDom.style.color= "red"
      } else{
        quantityDom.style.color= "green"
      }
    })

    productListDom.append(productCard);
    console.log(productListDom);
  });
}

showProductCardInDom();

const form = document.querySelector("form");

degreAlcool.style.display = "none";

typeDrink.addEventListener("change", function (event) {
  if (typeDrink.value == "Boisson alcoolisée") {
    degreAlcool.style.display = "inline-block";
  } else {
    degreAlcool.style.display = "none";
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const nameProduct = document.querySelector("#nameProduct");
  const quantityProduct = document.querySelector("#quantityProduct");
  const prixAchat = document.querySelector("#prixAchat");
  const prixVente = document.querySelector("#prixVente");
  const typeDrink = document.querySelector("#typeDrink");
  const degreAlcool = document.querySelector("#degreAlcool");
  const margeHT = document.querySelector('#margeHT')
  const prixVenteTTC= document.querySelector('#prixVenteTTC')
  const nameProductValue = nameProduct.value;
  const quantityProductValue = quantityProduct.value;
  const prixVenteValue = prixVente.value;
  const prixAchatValue = prixAchat.value;
  const typeDrinkValue = typeDrink.value;
  const degreAlcoolValue = degreAlcool.value;
  
  const product = {
    nameProduct: nameProductValue,
    quantityProduct: parseInt(quantityProductValue),
    prixAchat: prixAchatValue,
    prixVente: prixVenteValue,
    margeHT: parseInt(prixVenteValue) - parseInt(prixAchatValue),
    prixVenteTTC: parseInt(prixVenteValue)*1.2,
    typeDrink: typeDrinkValue,
    degreAlcool: degreAlcoolValue,
    
    
    upgradeQuantity: function(){
      this.quantityProduct += 1
      
    },
    downgradeQuantity: function(){
      this.quantityProduct += -1

      if(this.quantityProduct <= -1){
       this.quantityProduct=0
      }


    }

    
  };

  
  console.log("fiche produit", product);
  productList.push(product);
  showProductCardInDom();
});
