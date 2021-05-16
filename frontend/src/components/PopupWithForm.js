function PopupWithForm(props) {
  return (
    <>
     <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_visible' : ''}`}>
        <div className="popup__container">
          <button type="button" className="popup__close-btn" aria-label="Закрыть" onClick={props.onClose}></button>
          <h3 className="popup__title">{props.title}</h3>

          <form className="form form_type_edit" name={props.name} onSubmit={props.onSubmit} noValidate>
            {props.children}
          </form>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
