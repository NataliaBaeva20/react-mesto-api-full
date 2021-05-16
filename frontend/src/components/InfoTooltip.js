import imageErrorPath from '../image/error.png';
import imageLuckPath from '../image/luck.png';

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.tooltip.isOpen ? 'popup_visible' : ''}`}>
      <div className="popup__container popup__container_type_tooltip">
          <button type="button" className="popup__close-btn" aria-label="Закрыть" onClick={props.onClose}></button>
          <img src={props.tooltip.success ? imageLuckPath : imageErrorPath} className="popup__success" alt="Информативное сообщение"/>
          <h3 className="popup__title popup__title_type_tooltip">{props.tooltip.message}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
