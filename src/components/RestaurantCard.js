import { NEW_CDN_URL } from "../utils/constant";

const RestaurantCard = ({ cloudinaryImageId, name, cuisines, areaName, costForTwo, avgRating, avgRatingString, aggregatedDiscountInfoV3, sla }) => {

    return (
        <div className="card">
            <img src={NEW_CDN_URL + cloudinaryImageId} alt="card_image" />
            <h3>{name}</h3>
            <h5>{cuisines && cuisines.length > 0 ? cuisines.join(", ") : "no cuisines available"}</h5>
            <span>
                <h4
                    style={
                        avgRatingString < 4
                            ? { backgroundColor: "var(--light-red)" }
                            : avgRatingString === "--"
                                ? { backgroundColor: "white", color: "black" }
                                : { color: "white" }
                    }
                >
                    <i className="fa-solid fa-star"></i>
                    {avgRatingString}
                </h4>
                <h4>•</h4>
                <h4>{sla?.lastMileTravelString ?? '2.0 km'}</h4>
                <h4>•</h4>
                <h4>{costForTwo ?? '₹200 for two'}</h4>
            </span>
        </div>
    );
};

// Higher Order Component
// export const withPromtedLabel = (RestaurantCard) => {
//   return (props) => {
//     return (
//       <div>
//         <label>
//           Promoted
//         </label>
//         <RestaurantCard {...props} />
//       </div>
//     );
//   };
// };



export default RestaurantCard;


