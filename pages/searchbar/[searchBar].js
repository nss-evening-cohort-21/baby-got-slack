/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getMessages } from '../../api/messagesData';
import { useAuth } from '../../utils/context/authContext';
import MessageCard from '../../components/MessageCard';

export default function SearchBar() {
  const [searchMessages, setSearchMessages] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { searchBar } = router.query;

  const searchAllMessages = () => {
    getMessages(user.uid).then((messages) => {
      const filteredMessages = messages.filter((message) => message.message.toLowerCase().includes(searchBar) || message.name.toLowerCase().includes(searchBar));

      setSearchMessages(filteredMessages);
    });
  };

  useEffect(() => {
    searchAllMessages();
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
}
