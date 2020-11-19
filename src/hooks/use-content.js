import { useEffect, useState } from 'react';

export default function useContent(firebase, target) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    firebase.firestore
      .collection(target)
      .get()
      .then((snapshot) => {
        const allContent = snapshot.docs.map((contentObj) => ({
          ...contentObj.data(),
          docId: contentObj.id,
        }));

        setContent(allContent);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return { [target]: content };
}
