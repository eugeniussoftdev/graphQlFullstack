import React, { useEffect, useState } from "react";

import { Form } from "./components/Form/Form";
import { Header } from "./components/Header/Header";
import { UserTable } from "./components/UserTable/UserTable";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import "./App.css";

const client = new ApolloClient({
  uri: "http://127.0.0.1:8080/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [shouldUsersRefetch, setShouldUsersRefetch] = useState(false);
  const [countriesList, setCountriesList] = useState([]);

  const onFormSubmit = () => {
    setShouldUsersRefetch(true);
  };

  useEffect(() => {
    async function load() {
      try {
        const resposne = await fetch("http://127.0.0.1:8080/countries");
        const data = await resposne.json();
        if (data.countries) {
          console.log("*** DATA", data);
          setCountriesList(data.countries);
        }
      } catch (error) {
        console.log("Countries fetch error", error);
      }
    }

    load();
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <div className="container">
          <Form onFormSubmit={onFormSubmit} countriesList={countriesList} />
          <UserTable
            shouldUsersRefetch={shouldUsersRefetch}
            setShouldUsersRefetch={setShouldUsersRefetch}
          />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
