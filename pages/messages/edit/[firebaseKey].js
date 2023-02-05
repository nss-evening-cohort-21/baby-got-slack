import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getSingleMessage } from '../../../api/messagesData';
import MessageForm from '../../../components/forms/MessageForm';

export default function EditMessage() {
  const [editMessage, setEditMessage] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMessage(firebaseKey).then(setEditMessage);
  }, [firebaseKey]);

  return (
    <MessageForm obj={editMessage} />
  );
}
