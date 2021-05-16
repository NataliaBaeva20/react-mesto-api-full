function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card.isOpen ? 'popup_visible' : ''}`}>
      <figure className="popup__figure">
        <button type="button" className="popup__close-btn popup__close-btn_type_add-image" aria-label="Закрыть" onClick={props.onClose}></button>
        <img src={props.card.link} alt={props.card.title} className="popup__image" />
        <figcaption className="popup__caption">
          {props.card.title}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
