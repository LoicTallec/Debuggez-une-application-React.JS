import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
    // Changement d'operateur logique < -> > pour trier par ordre descendant
  );
  const nextCard = () => {
    setTimeout(
      /* Ajout de +1 pour passer au slide suivant (et que le slider sois reset au début) */
      /* Ajout de ? a byDateDesc pour supprimer l'erreur "is undefined" */
      () => setIndex(index + 1 < byDateDesc?.length ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        /* Remplacement du fragment par une div pour englober l'élement 
         et remplecement de la key pour qu'elle sois unique a chaque slide */
          <div key={event.date}>
            <div className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            {/* Changement de alt pour l'image */}
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  /* changement de la key pour qu'elle corresponde a la slide en cours */
                  key={_.date}
                  type="radio"
                  name="radio-button"
                  /* idx > index pour que les bouton radio fonctionnent correctement */
                  checked={index === radioIdx}
                  /* Ajout de readOnly pour supprimer l'erreur */
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;