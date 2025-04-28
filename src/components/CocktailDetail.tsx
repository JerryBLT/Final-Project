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
             <TopSection>
                <DrinkImage src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                <IngredientsSection>
                <DrinkDetails>Ingredients</DrinkDetails>
                <StyledList>
                    {Array.from({ length: 15 }, (_, i) => {
                    const ingredient = cocktail[`strIngredient${i + 1}` as keyof Cocktail];
                    const measure = cocktail[`strMeasure${i + 1}` as keyof Cocktail];
                    return ingredient ? (
                        <li key={i}>
                            <DrinkText>{measure} {ingredient}</DrinkText>
                        </li>
                        ) : null;
                    })}
                </StyledList>
                </IngredientsSection>
             </TopSection>

             <DrinkDetails>Instructions</DrinkDetails>
             <DrinkText>{cocktail.strInstructions}</DrinkText>
   
             
         </CocktailContainer>
     );
 }
 
 // Export the CocktailDetail component for use in other parts of the application
 export default CocktailDetail;
 
 // Styled components for the CocktailDetail component
 // container divs 
 const LoadingContainer = styled.div`
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: calc(4px + 1.2vw);    
    align-items: center;
    margin-top: 2vh;
    padding: 2vh 0;
 `;
 
 const CocktailContainer = styled.div`
     font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
     margin: 1vh 1vw;
 `;

 const TopSection = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
    flex-wrap: wrap; 
    margin-bottom: 20px;
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

 const IngredientsSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 40%;
`;
 
 // text and heading styles
 const DrinkName = styled.h1`
      font-size: calc(8px + 2vw);   
      text-align: center;
      padding: 2vh 0;
      letter-spacing: 0.1em;
 `;
 
 const DrinkDetails = styled.h2`
      font-size: calc(6px + 1.5vw);   
      margin: 0 1.7vw; 
 `;
 
 const DrinkText = styled.p`
     font-size: calc(6px + 1vw);  
     margin: 0 1.5vw; 
 `;
 
 // list styles
 const StyledList = styled.ul`
    list-style-type: square;
 `;
 
 // image styles
 const DrinkImage = styled.img`
     border: 1px solid #FF3131;
     border-radius: 8px;
     padding: 10px;
     margin: 5px;
     max-width: 50%;
 `;