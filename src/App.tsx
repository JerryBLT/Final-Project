import { useEffect, useState } from "react";
import styled from "styled-components";
import CocktailCard from "./components/CocktailCard";
import Modal from "./components/Modal";
import { Cocktail } from "./interfaces/Cocktail";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";

// Styled Components
const AppContainer = styled.div`
  display: flex;
  background: pink;
`;

const MainContent = styled.div`
  padding: 10px;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  justify-content: center;
  margin-top: 5vh;
`;



export default function App() {
  const [data, setData] = useState<Cocktail[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function handleSearchResults(drinks: Cocktail[]) {
    setData(drinks);
    setSelectedId(null);
    setModalOpen(false);
  }


  useEffect(() => {
    async function fetchData() {
      const rawData = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail");
      const results = await rawData.json();
      setData(results.drinks);
    }
    fetchData()
      .then(() => console.log("Yayy!! Data fetched successfully"))
      .catch((e) => console.log("No!! This happened:" + e));
  }, []);

  function handleCardClick(id: string) {
    setSelectedId(id);
    setModalOpen(true);
  }

  function handleClose() {
    setModalOpen(false);
    setSelectedId(null);
  }

  return (
    <>
      <Header />
      <AppContainer>
        <MainContent>
          <SearchBar onResults={handleSearchResults} />
          <CardGrid>
            {data.map((cocktail) => (
              <CocktailCard key={cocktail.idDrink} data={cocktail} onClick={handleCardClick} />
            ))}
          </CardGrid>
        </MainContent>
        {/* Show Modal with CocktailDetail inside */}
        {selectedId && (
          <Modal open={modalOpen} onClose={handleClose} cocktailId={selectedId} />
        )}
      </AppContainer>
    </>
  );
}
