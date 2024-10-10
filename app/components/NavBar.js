export default function NavBar({ handleNewChatButtonClick }) {
  return (
    <nav
      id="navbar"
      className="is-fullwidth has-background-success is-flex justify-content-space-between is-align-items-center"
    >
      <div className="navbar-item is-flex-grow-1 is-flex is-justify-content-flex-start"></div>
      <div className="navbar-item is-flex-grow-1 is-flex is-justify-content-center">
        <h1 className="has-text-white is-size-4">Postgres Chat</h1>
      </div>
      <div className="navbar-item is-flex-grow-1 is-flex is-justify-content-flex-end">
        <button
          className="button is-success is-medium has-text-white"
          onClick={handleNewChatButtonClick}
        >
          <span className="icon">
            <i className="fa fa-plus"></i>
          </span>
        </button>
      </div>
    </nav>
  );
}
