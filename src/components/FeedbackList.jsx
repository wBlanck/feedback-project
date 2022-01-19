import PropTypes from "prop-types";
import FeedbackItem from "./FeedbackItem";

function FeedbackList({ feedback, handleDelete }) {
  if (!feedback || feedback.length === 0) {
    return <p>no feedback yet</p>;
  }
  return (
    <div className="feedback-list">
      {feedback.map((item) => (
        <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
      ))}
    </div>
  );
}

FeedbackList.propTypes = {
  // should be an array of objects
  feedback: PropTypes.arrayOf(
    // object should have these props (id, text, rating)
    PropTypes.shape({
      // prop value should be a "number"
      id: PropTypes.number.isRequired,
      // prop value should be a "string"
      text: PropTypes.string.isRequired,
      // prop value should be a "number"
      rating: PropTypes.number.isRequired,
    })
  ),
};

export default FeedbackList;
