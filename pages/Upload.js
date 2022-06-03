import FormContainer from "../components/form/formContainer";
import Page from "../components/page";
import Title from '../components/title';
import InputContainer from '../components/form/InputContainer';
import Input from "../components/form/input";
import Button from '../components/form/button';
import ProductItem from '../components/productItem';
import { useEffect, useState } from "react";
import { Contract, ethers } from "ethers";
import product_abi from '../artifacts/contracts/Product.sol/Product.json';
 
export default function Upload(){
    const [name,setName] = useState();
    const [img,setImg] = useState();
    const [amount,setAmount] = useState(0);
    const [signer,setSigner]=useState('');
    const contract_address = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const abi= product_abi.abi;
    async function connect(){
    try{
     await window.ethereum.request({method:"eth_requestAccounts"});
     let connectedProvider = new ethers.providers.Web3Provider(window.ethereum);
     setSigner(connectedProvider.getSigner())
    }
    catch(e){console.log(e)}
    } 
    async function upload(){
        if(typeof window.ethereum !== 'undefined'){
            let connectedProvider = new ethers.providers.Web3Provider(window.ethereum);
            const contract= new ethers.Contract(contract_address,abi,connectedProvider.getSigner());
            await contract.uploadProduct(name,amount,img);
        }else{
             connect();
        }
    }
    useEffect(()=>{
        if(typeof window.ethereum !== 'undefined'){
            let connectedProvider = new ethers.providers.Web3Provider(window.ethereum);
            setSigner(connectedProvider.getSigner());
        }
        },[]);
    return(
        <div>
            <Page>
                <section className="UpdateForm">
                    <FormContainer>
                        <form>
                            <Title title="Upload" />
                            <InputContainer>
                                <Input type="product_name" name="product_name" placeholder="Product Name" onChange={(value)=>setName(value)} value={name}/>
                                <Input type="product_img" name="product_img" placeholder="Product Image" onChange={(value)=>setImg(value)} value={img}/>
                                <Input type="product_amount" name="product_amount" placeholder="Product Amount" onChange={(value)=>setAmount(value)} value={amount}/>
                                <a onClick={()=>upload()}type="submit" className="btn" title="Upload" >Upload</a>
                            </InputContainer>
                        </form>
                    </FormContainer>
                </section>
 
            </Page>
            <style jsx>{`
        form {
          width: 100%;
          align-items: center;
        }
        form .formTitle {
          text-align: center;
          font-size: 38px;
          font-weight: 1000;
          letter-spacing: 1.65px;
          color: #b2b2b2;
          text-transform: uppercase;
          margin-bottom: 84px;
        }
        .switchForm {
          color: #b2b2b2;
          margin-top: 12px;
          font-weight: 500;
        }
        .btn {
            width: 100%;
            margin-top: 32px;
            background-color: #1875f0;
            color: #ffffff;
            border: none;
            width: 50%;
            font-size: 18px;
            border-radius: 6px;
            padding-bottom: 1em;
            padding-top: 1em;
            text-align:center;
            align-self: center;
          }
          @media (max-width: 1000px) {
            .btn {
              width: 70vw;
            }
          }
          @media (max-width: 800px) {
            .btn {
              width: 75vw;
            }
          }
      `}</style>
        </div>
    )
}