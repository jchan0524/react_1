import { useEffect} from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams, Link } from "react-router-dom";
import UseFetch from "../hooks/UseFetch";
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";

export default function Definition() {
  let { search } = useParams();

  

  const { request, data: [{ meanings: word }] = [{}], errorStatus } = UseFetch(
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + search
  );
  useEffect(() => {
    request(); 
  })



  if (errorStatus === 404) {
    return (
      <>
        <NotFound />
        <Link to="/dictionary">Search Another?</Link>
      </>
    );
  }
  if (errorStatus === true) {
    return (
      <>
        <p>Something went wrong, Try Again later?</p>
        <Link to="/dictionary">Search another</Link>
      </>
    );
  }

  return (
    <>
      {word ? (
        <>
          <h1>Here is a definition:</h1>
          {word.map((meaning) => {
            return (
              <p key={uuidv4()}>
                {meaning.partOfSpeech + ": "}
                {meaning.definitions[0].definition}
              </p>
            );
          })}
          <p>Search Again: </p>
          <DefinitionSearch />
        </>
      ) : null}
    </>
  );
}
