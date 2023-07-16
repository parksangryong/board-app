import "../css/AnswerItem.css";

function AnswerItem(props) {
  return (
    <div id="answer-item">
      {props.alist.id} / {props.alist.answer}/ {props.alist.date}/{" "}
      {props.alist.board_id}/ {props.alist.name}
    </div>
  );
}

export default AnswerItem;
