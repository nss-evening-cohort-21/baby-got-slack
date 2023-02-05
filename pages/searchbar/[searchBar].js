/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
// hook that accesses URL and query parameters
import React, { useEffect, useState } from 'react';
// useState component state, useEffect side effects
import { getMessages } from '../../api/messagesData';
// API function that retrieves messages data
import MessageCard from '../../components/MessageCard';
// custom coponent that displays indiv messages

export default function SearchBar() {
  const [searchMessages, setSearchMessages] = useState([]);
  // searchMessages array stores messages that match search criteria
  // setSearchMessages function updates searchMessages state

  const router = useRouter();
  const { searchBar } = router.query;
  // destructures searchBar object from URL query parameters
  // router.query has all the URL query parameters, including searchBar
  // destructuring gives the code direct access to the searchBar value
  // destructuring extracts values from objects or array
  // assigns them to variables with the same name
  // router - object used for client-side navigation in Next.js apps
  // query - contains URL query parameters
  // aka the key-value pairs in URL after ? symbol
  // this line extracts value of searchBar parameter from URL query and assigns it to variable searchBar

  const searchAllMessages = () => {
    // retrieves all messages using getMessages API
    getMessages().then((messages) => {
      const filteredMessages = messages.filter((message) => message.message.toLowerCase().includes(searchBar) || message.name.toLowerCase().includes(searchBar) || message.timestamp.includes(searchBar));
      // filters messages based on searchBar value

      setSearchMessages(filteredMessages);
      // filtered messages stored in searchMessages state
    });
  };

  useEffect(() => {
    // performs side effect when searchBar value changes
    searchAllMessages();
    // called to update searchMessages state with new filtered messages
    return () => {
      setSearchMessages([]);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBar]);

  return (
    <>
      <div className="d-flex flex-wrap">
        {searchMessages.map((aim) => <MessageCard key={aim.firebaseKey} messageObj={aim} onUpdate={searchAllMessages} />)}
      </div>
    </>
  );

  // maps over searchMessages array and returns MessageCard component for each message
  // key prop set to message's firebaseKey for optimization
  // messageObj prop set to message object being displayed
  // onUpdate prop set to searchAllMessages function to allow MessageCard component to update search result when needed
}

// useState manages and updates state of a React component
// lets you store data in component and update it
// takes initial value as argument returns array with 2 elements
// current state value and function to update the state
// state can be any type of data (number, string, object, etc.)

// const [currentState, setCurrentState] = useState(initial value);

// useEffect performs side effects in a React component
// side effect is any logic executed outside of the render function
// i.e. fetching data from API or setting up event listeners
// takes two arguments
// function to run on compoent mount and/or update
// array of dependencies that determines when effect should run

// useEffect(() => {what to do}, [when to do it]);

// useState manages component state
// useEffect performs side effects in response to component updates
