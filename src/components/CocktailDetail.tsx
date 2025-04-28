// This component fetches and displays the details of a single cocktail based on its ID
 // Implemented by Caroline
 import { useEffect, useState } from 'react';
 import { useParams } from 'react-router-dom';
 import { getCocktailById } from '../api.ts';
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
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.10), 0 1.5px 6px rgba(255,49,49,0.08);
  max-width: 700px;
  margin: 3vh auto;
  padding: 2.5rem 2rem;
  font-family: 'Segoe UI', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
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
    gap: 18px;
  }
`;

const DrinkImage = styled.img`
  border: 2px solid #FF3131;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(255,49,49,0.10);
  padding: 8px;
  background: #fff5f5;
  max-width: 220px;
  width: 100%;
  height: auto;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 220px;
`;

const DrinkName = styled.h1`
  font-size: 2.2rem;
  text-align: center;
  color: #FF3131;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: 0.06em;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  margin: 1.2rem 0 0.5rem 0;
  color: #333;
  font-weight: 600;
  letter-spacing: 0.03em;
`;

const Instructions = styled.p`
  font-size: 1.1rem;
  background: #f9f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 0.5rem;
  color: #222;
  line-height: 1.5;
`;

const IngredientsSection = styled.div`
  margin-top: 1.2rem;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledListItem = styled.li`
  margin-bottom: 0.4rem;
`;

const Ingredient = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff0ee;
  border-radius: 5px;
  padding: 0.4em 0.7em;
  font-size: 1rem;
  color: #222;
`;

const Measure = styled.span`
  color: #FF3131;
  font-weight: 600;
  margin-left: 1.2em;
  font-size: 0.98em;
`;

const DetailRow = styled.div`
  font-size: 1.05rem;
  margin-bottom: 0.3rem;
`;

const Label = styled.span`
  color: #FF3131;
  font-weight: 600;
  margin-right: 0.4em;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 3rem 0;
  font-size: 1.3rem;
  color: #FF3131;
  letter-spacing: 0.05em;
`;

const ErrorContainer = styled(LoadingContainer)`
  color: #b20000;
`;
