import { useQuery } from '@apollo/client';
import { CART, PRODUCTS_BY_IDS_PRICE } from '../apollo/client/queries';
import { useState } from 'react';
import { ethers } from "ethers";
import { useEffect } from 'react';
import product_abi from '../artifacts/contracts/Product.sol/Product.json';
 
export default function FinishOrderCart(cost) {
  const [finalPrice, setFinalPrice] = useState(0);
  const cart = useQuery(CART);
  const contract_address = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const abi= product_abi.abi;
  useEffect(() =>{setFinalPrice(cost.cost)},[])

  const [signer,setSigner]=useState();
  async function connect(){
   try{
    if (
      typeof window.ethereum !== "undefined"
    )
    {
     await window.ethereum.request({method:"eth_requestAccounts"});
     let connectedProvider = new ethers.providers.Web3Provider(window.ethereum);
     setSigner(connectedProvider.getSigner())
    }
  } 
  catch(e){console.log(e)}
} 
async function execute(){
  if(typeof window.ethereum !== 'undefined'){
      let connectedProvider = new ethers.providers.Web3Provider(window.ethereum);
      const contract= new ethers.Contract(contract_address,abi,connectedProvider.getSigner());
      await contract.TransferInitialization(parseInt(finalPrice));
      await console.log(contract.product_name);
  }else{
       connect();
  }
}
  return (
    <div className="finishOrder">
      <div className="info">
        <p className="total">Total({cart?.data.cart.cartCount} Item):</p>
        <p className="price">$ {finalPrice}</p>
      </div>
      <button onClick={()=>execute()}>Finish Order</button>
      <style jsx>{`
        .finishOrder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #ffff;
          border-radius: 6px;
          width: 280px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
          padding-top: 30px;
          padding-bottom: 30px;
        }
        .finishOrder .info {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-bottom: 30px;
        }
        .finishOrder .info p.total {
          font-weight: 500;
          font-size: 20px;
          color: #666666;
          padding-right: 8px;
        }
        .finishOrder .info p.price {
          font-weight: 900;
          font-size: 22px;
          color: #666666;
        }
        .finishOrder button {
          width: 220px;
          color: #fff;
          background: #808080;
          border-radius: 6px;
          border: none;
          padding-bottom: 16px;
          padding-top: 16px;
          font-weight: bold;
          font-size: 15px;
          transition: 0.7s;
        }
        .finishOrder button:focus {
          outline: none;
          opacity: 0.5;
        }
        @media (max-width: 1100px) {
          .finishOrder {
            flex-grow: 1;
            width: 100%;
            margin-bottom: 30px;
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </div>
  );
}
