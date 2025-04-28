// This component fetches and displays the details of a single cocktail based on its ID
 // Implemented by Caroline
 import { useEffect, useState } from 'react';
 import { useParams } from 'react-router-dom';
 import { getCocktailById } from '../api.ts';
 import { Cocktail } from '../interfaces/Cocktail';
 import styled from 'styled-components';
 
 const CocktailDetail = () => {
    // Get the cocktail ID from the URL parameters using the useParams hook
     const { idDrink } = useParams<{ idDrink: string }>();
    // Init state variables for cocktail(null by default) and loading(true by default)
     const [cocktail, setCocktail] = useState<Cocktail | null>(null);
     const [loading, setLoading] = useState(true);
    // Fetch the cocktail details by ID when the component mounts or when idDrink changes
     useEffect(() => {
         if (idDrink) {
            // if idDrink is not null, fetch the cocktail details
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
    // Render loading state or cocktail not found if cocktail is null
     if (loading) {
         return <LoadingContainer>Loading...</LoadingContainer>;
     }
     if (!cocktail) {
         return <LoadingContainer>Cocktail not found</LoadingContainer>;
     }
     // Otherwise, render the cocktail details including name, image, instructions, and ingredients
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
 
 // Export the CocktailDetail component for use in other parts of the application
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