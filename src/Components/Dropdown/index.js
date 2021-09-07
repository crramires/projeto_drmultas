import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";
import { logo2, logo3, logo4 } from "../Imagens";

const axios = require("axios");

export const Dropdown = () => {
 
  const [carrosDados, setCarrosDados] = useState([]);
  const [caminhoesDados, setCaminhoesDados] = useState([]);
  const [motosDados, setMotosDados] = useState([]);

  const objHandler = {
    carros: (dados) => setCarrosDados(dados),
    caminhoes: (dados) => setCaminhoesDados(dados),
    motos: (dados) => setMotosDados(dados),
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleGet("carros");
    handleGet("motos");
    handleGet("caminhoes");
  }, []);

  const handleGet = async (param) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://parallelum.com.br/fipe/api/v1/${param}/marcas`
      );
      const orderedArr = [];
      const mapped = data.map((e) => orderedArr.push(e));
      orderedArr.sort((a, b) => {
        let x = a.nome.toUpperCase();
        let y = b.nome.toUpperCase();
        return x === y ? 0 : x > y ? 1 : -1;
      });

      objHandler[`${param}`](orderedArr);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>loading...</div>;
  } else {
    return (
      <>

        <div style= {{display:"flex", flexDirection:"column", alignItems:"center", width:"100%"}}>
        <div><img src="logo.png" /></div>

        <div style={{display:"flex", backgroundColor:"#F4F4F4", minWidth:"360px", width:"1200px", justifyContent:"center", alignItems:"center"}}> 
          <div>
            {logo2}
          </div> 
          <div  className="margin" style={{display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            {logo3}  
            {logo4}  
          </div> 
        </div>

         <Accordion allowZeroExpanded style={{ width: "940px", border:"none"}}>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton
                style={{
                  backgroundColor: "#0B3A5E",
                  color: "white",
                  borderRadius: "6px",
                }}
              >
                Carros
              </AccordionItemButton>
            </AccordionItemHeading>
            {carrosDados.map((e) => (
              <AccordionItemPanel>
                <Link to={`about/carros/${e.nome}/${e.codigo}`}>{e.nome}</Link>
              </AccordionItemPanel>
            ))}
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton
                style={{
                  backgroundColor: "#0B3A5E",
                  color: "white",
                  borderRadius: "6px",
                }}
              >
                Motos
              </AccordionItemButton>
            </AccordionItemHeading>
            {motosDados.map((e) => (
              <AccordionItemPanel>
                <Link to={`about/motos/${e.nome}/${e.codigo}`}>{e.nome}</Link>
              </AccordionItemPanel>
            ))}
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton
                style={{
                  backgroundColor: "#0B3A5E",
                  color: "white",
                  borderRadius: "6px",
                }}
              >
                Caminhões
              </AccordionItemButton>
            </AccordionItemHeading>
            {caminhoesDados.map((e) => (
              <AccordionItemPanel>
                <Link to={`about/caminhoes/${e.nome}/${e.codigo}`}>
                  {e.nome}
                </Link>
              </AccordionItemPanel>
            ))}
          </AccordionItem>
        </Accordion>
        </div>
      </>
    );
  }
};
