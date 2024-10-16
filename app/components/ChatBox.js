import styles from "./ChatBox.module.css";

export default function ChatBox({
  activeMessage,
  setActiveMessage,
  handleSendButtonClick,
}) {
  const handleChange = (event) => {
    setActiveMessage(event.target.value);
  };

  const handleClick = () => {
    handleSendButtonClick();
  };

  return (
    <div className={styles.chat}>
      <div className="columns is-mobile">
        <div className="column">
          <textarea
            className={styles.textarea}
            value={activeMessage}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (e.ctrlKey || e.metaKey) {
                  // Add a new line to the text area
                  setActiveMessage(`${activeMessage}\n`);
                } else {
                  e.preventDefault();
                  handleClick();
                }
              }
            }}
          ></textarea>
        </div>
        <div className="column is-narrow is-flex is-flex-direction-column is-justify-content-flex-end">
          <button
            className="button is-primary is-block mr-3 is-rounded has-text-white"
            onClick={handleClick}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
