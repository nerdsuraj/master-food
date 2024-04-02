/* eslint-disable no-unused-vars */
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect,useContext } from "react";
import UserContext from "../utils/UserContext";
import Shimmer from "./Shimmer";

const Body = () => {
    const [restaurantList, setRestaurantList] = useState([]);
    const [originalRestaurantList, setOriginalRestaurantList] = useState([]);
    const [showTopRated, setShowTopRated] = useState(false);
    const [searchText, setSearchText] = useState("");

    const {setUsername,logggedInUser} = useContext(UserContext)


    useEffect(() => {
        fetchApiData();
    }, [])

    const fetchApiData = async () => {
        let apiListres = await fetch("https://foodfire.onrender.com/api/restaurants?lat=19.0759837&lng=72.8776559&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING", {
        })

        let json = await apiListres.json();
        let dataManipulate = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        if (dataManipulate) {
            let finalData = dataManipulate.map((info) => {
                return info.info;
            })
            setRestaurantList(finalData);
            setOriginalRestaurantList(finalData);
        }

    }

    const handleTopRatedClick = () => {
        if (!showTopRated) {
            let filterData = restaurantList.filter((restaurant) => {
                return restaurant.avgRating > 4;
            });
            setRestaurantList(filterData);
            toast.success("Top Rated Restaurants");
        } else {
            setRestaurantList(originalRestaurantList);
            toast.success("All Restaurants");
        }
        setShowTopRated(!showTopRated);
    };
    const searchList = () => {
        let searchInput = document.querySelector(".search-input").value;
        let filterData = originalRestaurantList.filter((restaurant) => {
            return restaurant.name.toLowerCase().includes(searchInput.toLowerCase());
        });
        setRestaurantList(filterData);
    }

    return restaurantList.length === 0 ? <Shimmer /> : (
        <>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    data-testid="search-input"
                    placeholder="Search a restaurant you want..."
                    value={searchText}
                    onChange={(e) => {
                        const searchTextValue = e.target.value.toLowerCase();
                        setSearchText(searchTextValue);

                        if (searchTextValue === "") {
                            setRestaurantList(originalRestaurantList);
                        } else {
                            const filteredList = originalRestaurantList.filter(
                                (res) =>
                                    res.name.toLowerCase().includes(searchTextValue) ||
                                    res.cuisines.some((cuisine) =>
                                        cuisine.toLowerCase().includes(searchTextValue)
                                    )
                            );
                            setRestaurantList(filteredList);
                        }
                    }}
                >
                </input>
                <button className="search-btn" onClick={searchList}>
                    Search
                </button>
            </div>

            <div className="sort-button-container">
                <button className="sort-button" onClick={handleTopRatedClick}>
                    {showTopRated ? "Back to All List" : "Top Rated Restaurants"}
                </button>
            </div>

            <div className="restaurant-list">

                {restaurantList.length > 0 && (
                    <div className="restaurant-list">
                        {restaurantList.map((restaurant, index) => {
                            return (
                                <Link key={restaurant.id}
                                    to={"/restaurants/" + restaurant.id}>
                                    <RestaurantCard {...restaurant} />
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};


export default Body;