import './MainPage.css';
import axios, { Axios } from 'axios';
import { useEffect, useState } from 'react';
import Modal from './ModalWindow/Modal';
function MainPage() {
    const [modalActiv, setModalActiv] = useState(false);
    const [ISPop, setISPop] = useState(false);
    useEffect(() => {
        //
        //      Get Popular products
        //
       if(ISPop === false){
        setISPop(true);
        axios({
            method: 'get',
            url: 'https://localhost:7031/api/ControllerClass/GetPopularProducts',
            dataType: "dataType",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        }).then(popularData => {
            console.log("Popular");
            var mainDiv = document.getElementById('MainDiv');
            for (const iterPopular of popularData['data']['value']) {
                if (iterPopular['status'] === 'Enabled') {
                    var divCard = document.createElement('div');
                    divCard.setAttribute('class', 'cardDiv');
                    var img = document.createElement('img');
                    img.setAttribute('class', 'imgCard');
                    img.src = iterPopular['uriPhoto'];
                    var title = document.createElement('h3');
                    title.textContent = iterPopular['title'] + ' ' + iterPopular['model'];
                    var price = document.createElement('h4');
                    price.textContent = iterPopular['price'] + 'грн';
                    var btnBuy = document.createElement('button');
                    btnBuy.textContent = 'Buy';
                    divCard.append(img);
                    divCard.append(title);
                    divCard.append(price);
                    divCard.append(btnBuy);
                    mainDiv.append(divCard);
                    btnBuy.addEventListener('click', () => {
                        var busketDiv = document.getElementById('ModalDiv');
                        var divInBusket = document.createElement('div');
                        divInBusket.id = 'inBusket';
                        var basketImg = document.createElement('img');
                        basketImg.src = iterPopular['uriPhoto'];
                        basketImg.width = 90;
    
                        var titleBuscket = document.createElement('h3');
                        titleBuscket.textContent = iterPopular['title'] + iterPopular['model'];
                        titleBuscket.id = 'titleBusket';
    
                        var priceBusket = document.createElement('p');
                        priceBusket.textContent = 'Price: ' + iterPopular['price'];
    
                        divInBusket.appendChild(basketImg);
                        divInBusket.appendChild(titleBuscket);
                        divInBusket.appendChild(priceBusket);
                        busketDiv.append(divInBusket);
                    });
                }
            }
        });
       }





        //
        //      Get all list category
        //

        axios({
            method: 'get',
            url: 'https://localhost:7031/api/ControllerClass/GetAllCategory',
            dataType: "dataType",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        }).then(data => {
            console.log(data);
            var divMenu = document.getElementById('menuDivInner');
            divMenu.innerHTML = "";
            for (const iterator of data['data']['value']) {
                var h3 = document.createElement('h3');
                h3.textContent = iterator['title'];
                //
                //      Click in category
                //
                h3.addEventListener('click', () => {
                    console.log(iterator['id']);

                    //
                    //      get list product by category id
                    //

                    axios({
                        method: 'get',
                        url: `https://localhost:7031/api/ControllerClass/GetProductsByID?id=${iterator['id']}`,
                        dataType: "dataType",
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/json'
                        }
                    }).then(product => {
                        console.log(product);

                        var mainDiv = document.getElementById('MainDiv');
                        mainDiv.innerHTML = "";
                        // const [totalPrice,setTotalPrice] = useState(0);
                        for (const iter of product['data']['value']) {
                            if(iter['status'] === 'Enabled'){
                                var divCard = document.createElement('div');
                                divCard.setAttribute('class','cardDiv');
                                var img = document.createElement('img');
                                img.setAttribute('class','imgCard');
                                img.src = iter['uriPhoto'];
                                var title = document.createElement('h3');
                                title.textContent = iter['title'] + ' ' + iter['model'];
                                var price  = document.createElement('h4');
                                price.textContent = iter['price'] + 'грн';
                                var btnBuy = document.createElement('button');
                                btnBuy.textContent = 'Buy';
                                btnBuy.addEventListener('click',()=>{
                                    var busketDiv = document.getElementById('ModalDiv');
                                    var divInBusket = document.createElement('div');
                                    divInBusket.id = 'inBusket';
                                    var basketImg = document.createElement('img');
                                    basketImg.src = iter['uriPhoto'];
                                    basketImg.width = 90;
    
                                    var titleBuscket = document.createElement('h3');
                                    titleBuscket.textContent = iter['title'] + iter['model'];
                                    titleBuscket.id = 'titleBusket';
    
                                    var priceBusket = document.createElement('p');
                                    priceBusket.textContent = 'Price: '+ iter['price'];
    
                                    divInBusket.appendChild(basketImg);
                                    divInBusket.appendChild(titleBuscket);
                                    divInBusket.appendChild(priceBusket);
                                    busketDiv.append(divInBusket);
                                });
    
    
                                divCard.append(img);
                                divCard.append(title);
                                divCard.append(price);
                                divCard.append(btnBuy);
                                mainDiv.append(divCard);
                            }
                        }
                    });


                });
                divMenu.append(h3);
            }
            return data;
        });
        return undefined;
    });
    return (
        <div>
            <div id="SearchDiv">
                <h1 id='NameMarket'>M1n1_MarKet.ua</h1>
                <input id='searchtext' type="search" placeholder='Search....' />
                <button id='buttonSearch' onClick={() => {
                    //
                    //      Search
                    //
                    axios({
                        method: 'get',
                        url: `https://localhost:7031/api/ControllerClass/SearchProduct?text=${document.getElementById('searchtext').value}`,
                        dataType: "dataType",
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/json'
                        }
                    }).then(product => {
                        var mainDiv = document.getElementById('MainDiv');
                        mainDiv.innerHTML = "";
                        for (const iter of product['data']['value']) {
                            if(iter['status'] === 'Enabled'){
                                var divCard = document.createElement('div');
                            divCard.setAttribute('class','cardDiv');
                            var img = document.createElement('img');
                            img.setAttribute('class','imgCard');
                            img.src = iter['uriPhoto'];
                            var title = document.createElement('h3');
                            title.textContent = iter['title'] + ' ' + iter['model'];
                            var price  = document.createElement('h4');
                            price.textContent = iter['price'] + 'грн';
                            //
                            //  add in basket
                            //
                            var btnBuy = document.createElement('button');
                            btnBuy.textContent = 'Buy';
                            // btnBuy.addEventListener('click',()=>{
                            //     var busketDiv = document.getElementById('ModalDiv');
                            //         var divInBusket = document.createElement('div');
                            //         divInBusket.id = 'inBusket';
                            //         var basketImg = document.createElement('img');
                            //         basketImg.src = iter['uriPhoto'];
                            //         basketImg.width = 90;
    
                            //         var titleBuscket = document.createElement('h3');
                            //         titleBuscket.textContent = iter['title'] + iter['model'];
                            //         titleBuscket.id = 'titleBusket';
    
                            //         var priceBusket = document.createElement('p');
                            //         priceBusket.textContent = 'Price: '+ iter['price'];
    
                            //         divInBusket.appendChild(basketImg);
                            //         divInBusket.appendChild(titleBuscket);
                            //         divInBusket.appendChild(priceBusket);
                            //         busketDiv.append(divInBusket);

                            // });
                            divCard.append(img);
                            divCard.append(title);
                            divCard.append(price);
                            divCard.append(btnBuy);
                            mainDiv.append(divCard);
                            }
                        }
                    });
                }}>Confirm</button>
                <img id='basketImg' src="https://pngimg.com/uploads/shopping_cart/shopping_cart_PNG38.png" alt="busket" onClick={()=>{
                   setModalActiv(true);
                }}/>
                <a id='signInLink' href="/authorize">Sign In</a>
            </div>
            <div id='MenuDiv'>
                <div id='menuDivInner'></div>
                <div id="MainDiv"></div>
            </div>
            <Modal  activ={modalActiv} setActiv={setModalActiv}>
                <h2>Basket</h2>
                <div style={{ height: 200 }} id='ModalDiv'></div>
                <div style={{marginTop:100}}></div>
            </Modal>
            <footer id='footerStyle'></footer>
        </div>
    );
}
export default MainPage;
