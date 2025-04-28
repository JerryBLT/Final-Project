// This component fetches and displays the details of a single cocktail based on its ID
 // Implemented by Caroline
 import { useEffect, useState } from 'react';
 import { useParams } from 'react-router-dom';
 import { getCocktailById } from '../api.ts';
 import { Cocktail } from '../interfaces/Cocktail';
 import styled from 'styled-components';
 
 const CocktailDetail = () => {
     const { idDrink } = useParams<{ idDrink: string }>();
     const [cocktail, setCocktail] = useState<Cocktail | null>(null);
     const [loading, setLoading] = useState(true);
 
     useEffect(() => {
         if (idDrink) {
             getCocktailById(idDrink)
                 .then((data) => {
                     setCocktail(data);
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
         return <LoadingContainer>Cocktail not found</LoadingContainer>;
     }
     return (
         <CocktailContainer>
             <DrinkName>{cocktail.strDrink}</DrinkName>
             <DrinkImage src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
             <DrinkDetails>Instructions</DrinkDetails>
             <DrinkText>{cocktail.strInstructions}</DrinkText>
   
             <DrinkDetails>Ingredients</DrinkDetails>
             <StyledList>
             {Array.from({ length: 15 }, (_, i) => {
                 const ingredient = cocktail[`strIngredient${i + 1}` as keyof Cocktail];
                 const measure = cocktail[`strMeasure${i + 1}` as keyof Cocktail];
                 return ingredient ? (
                 <StyledListItem key={i}>
                     {measure} {ingredient}
                 </StyledListItem>
                 ) : null;
             })}
             </StyledList>
         </CocktailContainer>
     );
 }
 
 export default CocktailDetail;
 
 // Styled components for the CocktailDetail component
 // container divs 
 const LoadingContainer = styled.div`
 `;
 
 const CocktailContainer = styled.div`
 `;
 
 // text and heading styles
 const DrinkName = styled.h1`
 `;
 
 const DrinkDetails = styled.h2`
 `;
 
 const DrinkText = styled.p`
 `;
 
 // list styles
 const StyledList = styled.ul`
 `;
 
 const StyledListItem = styled.li`
 `;
 
 // image styles
 const DrinkImage = styled.img`
 `;