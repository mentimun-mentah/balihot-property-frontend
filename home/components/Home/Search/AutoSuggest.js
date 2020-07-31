import { useState } from "react";
import AutoSuggest from "react-autosuggest";

const companies = [
  { id: 1, name: "Argentina" },
  { id: 2, name: "Brazil" },
  { id: 3, name: "Canada" },
  { id: 3, name: "Canada" },
  { id: 4, name: "Delima" },
  { id: 5, name: "Fanaski" },
  { id: 6, name: "Onami" },
  { id: 7, name: "Karimspi" },
];

const lowerCasedCompanies = companies.map((company) => {
  return {
    id: company.id,
    name: company.name.toLowerCase(),
  };
});

const SearchBox = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (value) => {
    return lowerCasedCompanies.filter((company) =>
      company.name.includes(value.trim().toLowerCase())
    );
  };

  return (
    <div>
      <AutoSuggest
        suggestions={suggestions}
        onSuggestionsClearRequested={() => setSuggestions([])}
        onSuggestionsFetchRequested={({ value }) => {
          console.log(value);
          setValue(value);
          setSuggestions(getSuggestions(value));
        }}
        onSuggestionSelected={(_, { suggestionValue }) =>
          console.log("Selected: " + suggestionValue)
        }
        getSuggestionValue={(suggestion) => suggestion.name}
        renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
        inputProps={{
          placeholder: "Location",
          value: value,
          onChange: (_, { newValue, method }) => {
            setValue(newValue);
          },
        }}
        highlightFirstSuggestion={true}
      />
      <style global jsx>
        {`
          .react-autosuggest__container {
            position: relative;
          }

          .react-autosuggest__input {
            width: 100%;
            height: 50px;
            padding: 10px 20px;
            font-family: Helvetica, sans-serif;
            font-weight: 300;
            font-size: 16px;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
          }

          .react-autosuggest__input--focused {
            outline: none;
            border: 1px solid #ced4da;
          }

          .react-autosuggest__input--open {
          }

          .react-autosuggest__suggestions-container {
            display: none;
          }

          .react-autosuggest__suggestions-container--open {
            top: 113px !important;
            background-color: #ffffff;
            border-radius: 8px;
            display: block;
            position: absolute;
            width: 280px;
            border: 1px solid #aaa;
            color: #222;
            text-align: left;
            font-family: Helvetica, sans-serif;
            font-weight: 300;
            font-size: 16px;
            z-index: 2;
            padding-top: 8px;
            padding-bottom: 8px;
          }

          .react-autosuggest__suggestions-container--open:before {
            background-color: #ffffff;
            content: "";
            height: 20px;
            left: 40px;
            margin: 0 auto;
            position: absolute;
            right: auto;
            top: -5px;
            width: 20px;
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
            z-index: -1;
          }

          .react-autosuggest__suggestions-list {
            margin-top: 5px;
            margin: 0;
            padding: 0;
            list-style-type: none;
            max-height: 250px;
            overflow-y: auto;
          }

          .react-autosuggest__suggestion {
            cursor: pointer;
            padding: 10px 20px;
          }

          .react-autosuggest__suggestion:hover {
            background-color: #efefef;
            border-radius: 0px;
          }

          .react-autosuggest__suggestion--highlighted {
            background-color: #efefef;
            border-radius: 0px;
            color: #222;
            text-align: left;
          }
        `}
      </style>
    </div>
  );
};

export default SearchBox;
