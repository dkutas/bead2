import {useDispatch} from "react-redux";
import {
    setCurrentDay,
    setSelectedMovie,
    setSelectedScreening,
} from "../movies/store";

export const Navitem = ({index, classNames, day}) => {
    const dispatch = useDispatch();

    return (
        <li
            key={index}
            onClick={() => {
                dispatch(setCurrentDay(index + 1));
                dispatch(setSelectedMovie(null));
                dispatch(setSelectedScreening(null));
            }}
            className={classNames}
        >
            <a>{day}</a>
        </li>
    );
};
