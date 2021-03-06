import React, { useEffect, useState } from "react";
import { logo1, logo2, logo3, logo4 } from '../../Imagens/index'
import "react-accessible-accordion/dist/fancy-example.css";
const axios = require("axios");

export const About = (param) => {
  const paramId = param.match.params.id;
  const paramType = param.match.params.type;
  const paramFabricante = param.match.params.fabr;

  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);


  


  useEffect(() => {
    handleGet();
  }, []);

  const handleGet = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://parallelum.com.br/fipe/api/v1/${paramType}/marcas/${paramId}/modelos`
      );
      const orderedArr = [];
      const mapped = data.modelos.map((e) => orderedArr.push(e));
      orderedArr.sort((a, b) => {
        let x = b.nome.toUpperCase();
        let y = a.nome.toUpperCase();
        return x === y ? 0 : x > y ? 1 : -1;
      });
      setData(orderedArr);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>loading...</div>;
  } else {
    return (
      <>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}><img src="../Dropdown/logo.png" /></div>

        <div style={{display:"flex", backgroundColor:"#F4F4F4", minWidth:"360px", width:"1200px", justifyContent:"center", alignItems:"center"}}> 
          <div>
            {logo2}
          </div> 
          <div  className="margin" style={{display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            {logo3}  
            {logo4}  
          </div> 
        </div>
        <button onClick={() => param.history.goBack()}>{`< Voltar`}</button>
        <div
          style={{
            width: "940px",
            fontSize: "26px",
            fontWeight: "700",
            color: "#0B3A5E",
          }}
        >
          {paramFabricante}
        </div>

        {data.map((e) => {
          return (
            <div
              style={{
                color: "#0B3A5E",
                border: "1px solid #E0E0E0",
                height: "40px",
                width: "940px",
                margin: "20px 0 ",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                fontSize: "16px",
              }}
            >
              {e.nome}
            </div>
          );
        })}
      </>
    );
  }
};
