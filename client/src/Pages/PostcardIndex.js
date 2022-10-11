import React, { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";


function PostcardIndex({currentUser}) {
    const [postcards, setPostcards] = useState([])

    useEffect(() => {
        fetch('/api/postcards')
            .then((res) => res.json())
            .then((postcards) => {
                setPostcards(postcards)
            })
    }, [])


    console.log(postcards)
    console.log(currentUser)

    return (
        <div>
            <ul>
                {postcards.map((postcard) => (
                    <li key={postcard.id}>
                        <PostCard postcard={postcard}/>
                    </li>
                    )
                )}
            </ul>
        </div>
    );
}

export default PostcardIndex;