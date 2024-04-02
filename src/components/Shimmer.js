import { ShimmerPostList } from "react-shimmer-effects";

const Shimmer = () => {

    return (
        <div className="shimmer-container">
            <div>
                <ShimmerPostList className="shimmer-card" postStyle="STYLE_FOUR" col={4} row={3} gap={30} />;
            </div>
        </div>
    );

}

export default Shimmer;