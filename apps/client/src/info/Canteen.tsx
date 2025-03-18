import { useCanteen } from "../context";

interface MealProps {
    name: string;
    meal: string;
}

const Meal = ({ name, meal }: MealProps) => {
    return (
        <div>
            <div className="nunito-bold shrink-0">{name}:</div>
            <div className="">{meal}</div>
        </div>
    );
};

const Canteen = () => {
    const canteen = useCanteen();

    const showCommonSuffix =
        (canteen.lunch1 || canteen.lunch2 || canteen.lunch3) &&
        canteen.commonSuffix;

    return (
        <div className="flex w-full flex-col gap-1">
            {canteen.soup && <Meal name="Polévka" meal={canteen.soup} />}

            {canteen.soup &&
                (canteen.lunch1 || canteen.lunch2 || canteen.lunch3) && <div />}

            {canteen.lunch1 && <Meal name="Oběd 1" meal={canteen.lunch1} />}
            {canteen.lunch2 && <Meal name="Oběd 2" meal={canteen.lunch2} />}
            {canteen.lunch3 && <Meal name="Oběd 3" meal={canteen.lunch3} />}

            {showCommonSuffix && (
                <div className="text-center">+ {canteen.commonSuffix}</div>
            )}

            {canteen.snack &&
                (canteen.lunch1 || canteen.lunch2 || canteen.lunch3) && <div />}

            {canteen.snack && <Meal name="Svačina" meal={canteen.snack} />}

            {!canteen.snack &&
                !canteen.soup &&
                !canteen.lunch1 &&
                !canteen.lunch2 &&
                !canteen.lunch3 && (
                    <div className="nunito-bold my-4 text-lg">
                        Na dnešek nejsou nahlášena žádná jídla
                    </div>
                )}
        </div>
    );
};
export default Canteen;
