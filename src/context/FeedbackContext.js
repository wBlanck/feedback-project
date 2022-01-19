import { createContext, useEffect, useState } from "react";
const FeedbackContext = createContext();

//wraps all the components that needs access to the context
export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  //on load call this once
  useEffect(() => {
    fetchFeedback();
  }, []);

  //fetches the data and updates state
  const fetchFeedback = async () => {
    const response = await fetch("/feedback?_sort=id&_order=asc");
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };

  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updItem),
    });

    const data = response.json();

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  const deleteFeedback = async (id) => {
    if (window.confirm("are you sure you want to delete?")) {
      //deletes item from database
      await fetch(`feedback/${id}`, { method: "DELETE" });
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedback = async (newFeedback) => {
    //updates the backend
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });
    const data = await response.json();

    //when adding to a state of an array/object, copy it first with spread, then add new value
    setFeedback([data, ...feedback]);
  };

  // set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  //any values/states/functions you want to use from this context has to be passed in to value
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
