import { faUser, faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { marked } from 'marked'


export default function MessageItem({ message }) {
  const roleClass =
    message.role === "user" ? "has-background-white" : "has-background-light";

  const getMarkdownFormattedContent = (content) => {
    const rawMarkup = marked(content);
    return { __html: rawMarkup };
  }

  return (
    <div className={`p-5 ${roleClass}`}>
      <div className="container is-max-desktop">
        <div className="columns is-mobile">
          <div className="column is-narrow">
            <span className="icon">
              {
                message.role === "user" ?
                  <FontAwesomeIcon icon={faUser} /> :
                  <FontAwesomeIcon icon={faRobot} />
              }
            </span>
          </div>
          <div className="column">
            <div className="content" dangerouslySetInnerHTML={getMarkdownFormattedContent(message.content)}></div>
          </div>
        </div>
      </div>
    </div >
  );
}
