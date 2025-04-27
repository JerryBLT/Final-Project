// implemented by Jerry Teixeira
//Displays the visual representation of a single cocktail, such as its name and image, in a card format.
//You can click on the card, and the info (idDrink) will be saved on the onclick, which will be utilized to display the card info

import styled from 'styled-components';
import { Cocktail } from '../interfaces/Cocktail';

export interface CocktailCardProps {
  //data = CocktailListItem (all the information imported)
  data: Cocktail;
  // onclick takes type string name ID
  // handles clicks, without producing a result (void)
  onClick: (id: string) => void;
}

//styling starts here
const Card = styled.div`
  border: 1px solid #FF3131;
  border-radius: 8px;
  padding: 10px;
  margin: 5px;
  width: 20%;
  cursor: pointer;
  text-align: center;
  background: white;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  border-radius: 8px;
`;
//styling ends here 

//the exported function
export default function CocktailCard(props: CocktailCardProps) {
  const { data, onClick } = props;
  return (
    <Card onClick={() => onClick(data.idDrink)}>
      <Thumbnail src={data.strDrinkThumb} alt={data.strDrink} />
      <h3>{data.strDrink}</h3>
    </Card>
  );
}
