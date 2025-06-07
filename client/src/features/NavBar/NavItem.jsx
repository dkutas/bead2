import {useDispatch} from "react-redux";
import {setCurrentDay, setSelectedDate, setSelectedMovie, setSelectedScreening,} from "../store/store";
import {format} from "date-fns";

export const Navitem = ({index, classNames, day}) => {
    const dispatch = useDispatch();

    return (
        <li
            key={index}
            onClick={(e) => {
                e.preventDefault();
                dispatch(setCurrentDay(index + 1));
                dispatch(setSelectedMovie(null));
                dispatch(setSelectedScreening(null));
                dispatch(setSelectedDate(day.toISOString()));
            }}
            className={classNames}
        >
            <a>{format(day, 'EEEE')}</a>
        </li>
    );
};
