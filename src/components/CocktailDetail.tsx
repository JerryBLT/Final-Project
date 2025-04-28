// This component fetches and displays the details of a single cocktail based on its ID
 // Implemented by Caroline
 import { useEffect, useState } from 'react';
 import { useParams } from 'react-router-dom';
 import { getCocktailById } from '../interfaces/api.ts';
 import { Cocktail } from '../interfaces/Cocktail';
 import styled from 'styled-components';
 
 interface CocktailDetailProps {
  cocktailId?: string;
}

const CocktailDetail = ({ cocktailId }: CocktailDetailProps) => {
  const params = useParams<{ idDrink: string }>();
  const idDrink = cocktailId || params.idDrink;

  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (idDrink) {
      getCocktailById(idDrink)
        .then((data) => {
          setCocktail(data.drinks[0]);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching cocktail:', error);
          setLoading(false);
        });
    }
  }, [idDrink]);

  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }
  if (!cocktail) {
    return <ErrorContainer>Cocktail not found</ErrorContainer>;
  }

  return (
    <Card>
      <DrinkName>{cocktail.strDrink}</DrinkName>
      <TopSection>
        <DrinkImage src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
        <Details>
          <DetailRow><Label>Category:</Label> {cocktail.strCategory}</DetailRow>
          <DetailRow><Label>Glass:</Label> {cocktail.strGlass}</DetailRow>
          <DetailRow><Label>Type:</Label> {cocktail.strAlcoholic}</DetailRow>
          <IngredientsSection>
            <SectionTitle>Ingredients</SectionTitle>
            <StyledList>
              {Array.from({ length: 15 }, (_, i) => {
                const ingredient = cocktail[`strIngredient${i + 1}` as keyof Cocktail];
                const measure = cocktail[`strMeasure${i + 1}` as keyof Cocktail];
                return ingredient ? (
                  <StyledListItem key={i}>
                    <Ingredient>
                      <span>{ingredient}</span>
                      {measure && <Measure>{measure}</Measure>}
                    </Ingredient>
                  </StyledListItem>
                ) : null;
              })}
            </StyledList>
          </IngredientsSection>
        </Details>
      </TopSection>
      <SectionTitle>Instructions</SectionTitle>
      <Instructions>{cocktail.strInstructions}</Instructions>
    </Card>
  );
};

export default CocktailDetail;

// Styled Components

const Card = styled.div`
  background: white;
  border-radius: 18px;
  margin: 3vh auto;
  padding: 3px;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
 `;

const TopSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 32px;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DrinkImage = styled.img`
  border: 2px solid #FF3131;
  border-radius: 12px;
  padding: 8px;
  background: #fff5f5;
  max-width: 220px;
  width: 100%;
  `;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DrinkName = styled.h1`
  font-size: calc(3px + 2vw);
  text-align: center;
  color: #FF3131;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: 0.06em;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  margin: 1.2rem 0 0.5rem 0;
  color: black;
  letter-spacing: 0.03em;
`;

const Instructions = styled.p`
  font-size: calc(2px + 2vw);
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 0.5rem;
  color: black;
`;

const IngredientsSection = styled.div`
  margin-top: 2px;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledListItem = styled.li`
  margin-bottom: 2px;
`;

const Ingredient = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: pink;
  border-radius: 5px;
  padding: 1px;
  font-size: calc(2px + 2vw);
  color: black;
`;

const Measure = styled.span`
  color: #FF3131;
  font-weight: 600;
  margin-left: 1.2em;
  font-size: calc(2px + 2vw);
`;

const DetailRow = styled.div`
  font-size: calc(2px + 2vw);
  margin-bottom: 3px;
`;

const Label = styled.span`
  color: #FF3131;
  font-weight: 600;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 10px;
  font-size: calc(2px + 2vw);
  color: #FF3131;
`;

const ErrorContainer = styled.div`
  color: #b20000;
`;
